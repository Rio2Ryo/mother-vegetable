import { NextRequest, NextResponse } from "next/server";
import { getStripe, REFERRAL_DISCOUNT_RATE } from "@/lib/stripe";

interface SubscriptionCheckoutBody {
  planId: string;
  email: string;
  locale?: string;
  referralCode?: string;
}

// Subscription plan definitions — prices in cents (USD)
const SUBSCRIPTION_PLANS: Record<
  string,
  { name: string; unitAmount: number; productsPerMonth: number }
> = {
  basic: {
    name: "Basic Plan — 1 product/month",
    unitAmount: 1350, // $13.50/mo (approx. ¥2,000)
    productsPerMonth: 1,
  },
  standard: {
    name: "Standard Plan — 2 products/month",
    unitAmount: 2350, // $23.50/mo (approx. ¥3,500)
    productsPerMonth: 2,
  },
  premium: {
    name: "Premium Plan — 3 products/month",
    unitAmount: 3350, // $33.50/mo (approx. ¥5,000)
    productsPerMonth: 3,
  },
};

export async function POST(request: NextRequest) {
  try {
    const body: SubscriptionCheckoutBody = await request.json();

    if (!body.planId) {
      return NextResponse.json(
        { error: "planId is required" },
        { status: 400 }
      );
    }

    if (!body.email) {
      return NextResponse.json(
        { error: "email is required" },
        { status: 400 }
      );
    }

    const plan = SUBSCRIPTION_PLANS[body.planId];
    if (!plan) {
      return NextResponse.json(
        { error: `Invalid planId: ${body.planId}. Must be one of: basic, standard, premium` },
        { status: 400 }
      );
    }

    const locale = body.locale || "en";
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    // Apply referral discount (10% off) if referralCode is present
    const hasReferralDiscount = !!body.referralCode;
    let unitAmount = hasReferralDiscount
      ? Math.round(plan.unitAmount * (1 - REFERRAL_DISCOUNT_RATE))
      : plan.unitAmount;

    // Ensure unit amount is at least 1 cent (Stripe minimum)
    unitAmount = Math.max(unitAmount, 1);

    // Create Stripe Checkout Session in subscription mode
    const session = await getStripe().checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: plan.name,
            },
            unit_amount: unitAmount,
            recurring: {
              interval: "month",
            },
          },
          quantity: 1,
        },
      ],
      customer_email: body.email,
      metadata: {
        planId: body.planId,
        referralCode: body.referralCode || "",
        locale: locale,
      },
      success_url: `${appUrl}/${locale}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/${locale}/checkout`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Subscription checkout session creation failed:", error);
    return NextResponse.json(
      { error: "Failed to create subscription checkout session" },
      { status: 500 }
    );
  }
}
