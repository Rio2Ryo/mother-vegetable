import { NextRequest, NextResponse } from "next/server";
import { getStripe, PRODUCT_PRICES, PRODUCT_PRICES_JPY, REFERRAL_DISCOUNT_RATE, resolveLocaleAndCurrency } from "@/lib/stripe";
import { getProductByCheckoutId } from "@/data/products";
import prisma from "@/lib/prisma";
import { ensureNewTables } from "@/lib/ensure-tables";

interface CheckoutItem {
  productId: string;
  name: string;
  price: number;
  discountedPrice?: number;
  quantity: number;
  image?: string;
}

interface CheckoutBody {
  items: CheckoutItem[];
  shipping: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  referralCode?: string;
  couponCode?: string;
  locale?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: CheckoutBody = await request.json();

    if (!body.items || body.items.length === 0) {
      return NextResponse.json(
        { error: "Cart is empty" },
        { status: 400 }
      );
    }

    if (!body.shipping || !body.shipping.email) {
      return NextResponse.json(
        { error: "Shipping information is required" },
        { status: 400 }
      );
    }

    const locale = body.locale || "en";
    const appUrl =
      process.env.VERCEL_ENV === "production" && process.env.NEXT_PUBLIC_APP_URL
        ? process.env.NEXT_PUBLIC_APP_URL
        : process.env.VERCEL_URL
          ? `https://${process.env.VERCEL_URL}`
          : process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    // Check stock availability before creating checkout session
    for (const item of body.items) {
      const product = getProductByCheckoutId(item.productId);
      if (product && !product.inStock) {
        return NextResponse.json(
          { error: `${item.name} is currently out of stock` },
          { status: 400 }
        );
      }
    }

    // --- Coupon validation ---
    let coupon: {
      id: string;
      code: string;
      discountType: string;
      discountValue: number;
      minOrderAmount: number | null;
      maxUses: number | null;
      usedCount: number;
      isActive: boolean;
      expiresAt: Date | null;
    } | null = null;

    if (body.couponCode) {
      await ensureNewTables();
      coupon = await (prisma.coupon as any).findUnique({
        where: { code: body.couponCode },
      });

      if (!coupon) {
        return NextResponse.json(
          { error: "Invalid coupon code" },
          { status: 400 }
        );
      }

      if (!coupon.isActive) {
        return NextResponse.json(
          { error: "This coupon is no longer active" },
          { status: 400 }
        );
      }

      if (coupon.expiresAt && new Date(coupon.expiresAt) < new Date()) {
        return NextResponse.json(
          { error: "This coupon has expired" },
          { status: 400 }
        );
      }

      if (coupon.maxUses !== null && coupon.usedCount >= coupon.maxUses) {
        return NextResponse.json(
          { error: "This coupon has reached its maximum number of uses" },
          { status: 400 }
        );
      }

      // Check minimum order amount against subtotal (before coupon, after referral)
      const hasReferral = !!body.referralCode;
      const subtotal = body.items.reduce((sum, item) => {
        const sp = PRODUCT_PRICES[item.productId] || 0;
        const price = hasReferral ? Math.round(sp * (1 - REFERRAL_DISCOUNT_RATE)) : sp;
        return sum + price * item.quantity;
      }, 0);

      if (coupon.minOrderAmount !== null && subtotal < coupon.minOrderAmount * 100) {
        return NextResponse.json(
          { error: `Minimum order amount for this coupon is $${coupon.minOrderAmount}` },
          { status: 400 }
        );
      }
    }

    // Currency = JPY for Japanese site, USD otherwise. JPY is zero-decimal (yen),
    // USD is 2-decimal (cents). The price tables are already in the right scale.
    const { stripeLocale, currency } = resolveLocaleAndCurrency(locale);
    const priceTable = currency === "jpy" ? PRODUCT_PRICES_JPY : PRODUCT_PRICES;

    // Build line items for Stripe — enforce server-side pricing
    // Apply referral discount first, then coupon discount stacks on top
    const lineItems = body.items.map((item) => {
      const product = getProductByCheckoutId(item.productId);
      const checkoutProductId = product?.slug ?? item.productId;
      const serverPrice = priceTable[checkoutProductId] ?? priceTable[item.productId];
      if (!serverPrice) {
        throw new Error(`Unknown product: ${item.productId}`);
      }

      // Step 1: Apply referral discount if present
      const hasReferralDiscount = !!body.referralCode;
      let unitAmount = hasReferralDiscount ? Math.round(serverPrice * (1 - REFERRAL_DISCOUNT_RATE)) : serverPrice;

      // Step 2: Apply coupon discount (stacks with referral)
      if (coupon) {
        if (coupon.discountType === "percentage") {
          unitAmount = Math.round(unitAmount * (1 - coupon.discountValue / 100));
        } else if (coupon.discountType === "fixed") {
          // Fixed coupon is denominated in the major currency unit (USD dollars,
          // JPY yen). Convert to minor units to match unit_amount.
          const totalQuantity = body.items.reduce((sum, i) => sum + i.quantity, 0);
          const fixedInMinor = currency === "jpy"
            ? Math.round(coupon.discountValue) // JPY: discountValue is yen
            : Math.round(coupon.discountValue * 100); // USD: dollars → cents
          const perUnitDiscount = Math.round(fixedInMinor / totalQuantity);
          unitAmount = Math.max(0, unitAmount - perUnitDiscount);
        }
      }

      unitAmount = Math.max(unitAmount, 1);

      return {
        price_data: {
          currency,
          product_data: {
            name: item.name,
            ...(item.image ? { images: [item.image.startsWith("http") ? item.image : `${appUrl}${item.image}`] } : {}),
          },
          unit_amount: unitAmount,
        },
        quantity: item.quantity,
      };
    });

    // Increment coupon usedCount before creating session
    if (coupon) {
      await (prisma.coupon as any).update({
        where: { id: coupon.id },
        data: { usedCount: coupon.usedCount + 1, updatedAt: new Date() },
      });
    }

    // Create Stripe Checkout Session (stripeLocale resolved above)
    const session = await getStripe().checkout.sessions.create({
      mode: "payment",
      locale: stripeLocale,
      payment_method_types: ["card"],
      line_items: lineItems,
      customer_email: body.shipping.email,
      metadata: {
        shipping: JSON.stringify(body.shipping),
        referralCode: body.referralCode || "",
        couponCode: coupon ? coupon.code : "",
        couponDiscount: coupon
          ? `${coupon.discountType === "percentage" ? `${coupon.discountValue}%` : `$${coupon.discountValue}`}`
          : "",
        locale: locale,
        items: JSON.stringify(
          body.items.map((i) => {
            const product = getProductByCheckoutId(i.productId);
            const checkoutProductId = product?.slug ?? i.productId;
            const sp = PRODUCT_PRICES[checkoutProductId] || PRODUCT_PRICES[i.productId] || 0;
            const hasDiscount = !!body.referralCode;
            let price = hasDiscount ? Math.round(sp * (1 - REFERRAL_DISCOUNT_RATE)) : sp;

            // Apply coupon to item metadata price as well
            if (coupon) {
              if (coupon.discountType === "percentage") {
                price = Math.round(price * (1 - coupon.discountValue / 100));
              } else if (coupon.discountType === "fixed") {
                const totalQuantity = body.items.reduce((sum, it) => sum + it.quantity, 0);
                const perUnitDiscount = Math.round((coupon.discountValue * 100) / totalQuantity);
                price = Math.max(0, price - perUnitDiscount);
              }
            }

            return {
              productId: i.productId,
              name: i.name,
              price: Math.max(price, 1) / 100,
              quantity: i.quantity,
            };
          })
        ),
      },
      success_url: `${appUrl}/${locale}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/${locale}/checkout`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Checkout session creation failed:", error);
    if (error instanceof Error && error.message.includes("STRIPE_SECRET_KEY")) {
      return NextResponse.json(
        { error: "Stripe is not configured on this deployment. Please set STRIPE_SECRET_KEY to enable checkout." },
        { status: 503 }
      );
    }
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
