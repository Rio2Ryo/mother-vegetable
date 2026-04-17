import { NextRequest, NextResponse } from "next/server";
import { getStripe, PRODUCT_PRICES, REFERRAL_DISCOUNT_RATE } from "@/lib/stripe";
import { getProductBySlug } from "@/data/products";
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
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    // Check stock availability before creating checkout session
    for (const item of body.items) {
      const product = getProductBySlug(item.productId);
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

    // Build line items for Stripe — enforce server-side pricing
    // Apply referral discount first, then coupon discount stacks on top
    const lineItems = body.items.map((item) => {
      const serverPrice = PRODUCT_PRICES[item.productId];
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
          // Fixed discount is in dollars — convert to cents and distribute proportionally
          // For simplicity, apply fixed amount evenly across total (handled below via Stripe coupon line)
          // We apply per-unit: divide fixed discount (in cents) across total quantity
          const totalQuantity = body.items.reduce((sum, i) => sum + i.quantity, 0);
          const perUnitDiscount = Math.round((coupon.discountValue * 100) / totalQuantity);
          unitAmount = Math.max(0, unitAmount - perUnitDiscount);
        }
      }

      // Ensure unit amount is at least 1 cent (Stripe minimum)
      unitAmount = Math.max(unitAmount, 1);

      return {
        price_data: {
          currency: "usd",
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

    // Create Stripe Checkout Session
    const session = await getStripe().checkout.sessions.create({
      mode: "payment",
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
            const sp = PRODUCT_PRICES[i.productId] || 0;
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
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
