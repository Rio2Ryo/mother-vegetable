import { NextRequest, NextResponse } from "next/server";
import { getStripe, REFERRAL_DISCOUNT_RATE, SUBSCRIPTION_PRICES_JPY, resolveLocaleAndCurrency } from "@/lib/stripe";

interface SubscriptionCheckoutBody {
  planId: string;
  email?: string;
  locale?: string;
  referralCode?: string;
  productId?: string;
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

    const plan = SUBSCRIPTION_PLANS[body.planId];
    if (!plan) {
      return NextResponse.json(
        { error: `Invalid planId: ${body.planId}. Must be one of: basic, standard, premium` },
        { status: 400 }
      );
    }

    const locale = body.locale || "en";
    const appUrl = (process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000").trim();

    // Locale → Stripe locale + currency. JPY is zero-decimal: amounts are in YEN.
    const { stripeLocale, currency, zeroDecimal } = resolveLocaleAndCurrency(locale);

    // Pick base amount in the right currency.
    const baseAmount = currency === "jpy"
      ? (SUBSCRIPTION_PRICES_JPY[body.planId] ?? plan.unitAmount)
      : plan.unitAmount;

    // Apply referral discount (10% off) if referralCode is present
    const hasReferralDiscount = !!body.referralCode;
    let unitAmount = hasReferralDiscount
      ? Math.round(baseAmount * (1 - REFERRAL_DISCOUNT_RATE))
      : baseAmount;

    // Stripe minimum: 1 unit (1 cent or 1 yen)
    unitAmount = Math.max(unitAmount, 1);
    void zeroDecimal; // documented above; not needed at runtime since we already use the right scale

    // Early, actionable error when Stripe is not configured. The client
    // surfaces this message in an alert so it's visible to developers/users.
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        {
          error:
            "Stripe is not configured on the server. Please set STRIPE_SECRET_KEY to enable subscription checkout.",
        },
        { status: 500 }
      );
    }

    // Create Stripe Checkout Session in subscription mode. If no email was
    // supplied by the client we let Stripe collect it on its hosted page
    // (omit `customer_email` when it's empty / obviously a placeholder).
    const isRealEmail =
      typeof body.email === "string" &&
      body.email.length > 0 &&
      !body.email.endsWith("@placeholder.invalid");

    const session = await getStripe().checkout.sessions.create({
      mode: "subscription",
      locale: stripeLocale,
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency,
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
      ...(isRealEmail ? { customer_email: body.email } : {}),
      metadata: {
        planId: body.planId,
        referralCode: body.referralCode || "",
        locale: locale,
        productId: body.productId || "",
      },
      success_url: `${appUrl}/${locale}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/${locale}/checkout`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Subscription checkout session creation failed:", error);
    const message =
      error instanceof Error && error.message
        ? error.message
        : "Failed to create subscription checkout session";
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
