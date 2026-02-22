import { NextRequest, NextResponse } from "next/server";
import { stripe, PRODUCT_PRICES, REFERRAL_DISCOUNT_PRICE } from "@/lib/stripe";

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

    // Build line items for Stripe
    const lineItems = body.items.map((item) => {
      // Use discounted price if available (referral), otherwise standard price
      const hasReferralDiscount = item.discountedPrice != null && item.discountedPrice < item.price;
      const unitAmount = hasReferralDiscount
        ? Math.round(item.discountedPrice! * 100)
        : PRODUCT_PRICES[item.productId] || Math.round(item.price * 100);

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

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: lineItems,
      customer_email: body.shipping.email,
      metadata: {
        shipping: JSON.stringify(body.shipping),
        referralCode: body.referralCode || "",
        locale: locale,
        items: JSON.stringify(
          body.items.map((i) => ({
            productId: i.productId,
            name: i.name,
            price: i.discountedPrice ?? i.price,
            quantity: i.quantity,
          }))
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
