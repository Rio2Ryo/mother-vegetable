import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not set");
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Instructor annual subscription price ($250/year)
export const INSTRUCTOR_SUBSCRIPTION_PRICE_AMOUNT = 25000; // cents
export const INSTRUCTOR_REFERRAL_REWARD = 5000; // $50 in cents

// Product prices in cents
export const PRODUCT_PRICES: Record<string, number> = {
  "achieve-capsule-30": 15000, // $150
  "confidence-tube-30": 18000, // $180
  "forever-capsule-30": 12000, // $120
};

// Referral discount price ($33)
export const REFERRAL_DISCOUNT_PRICE = 3300; // cents
