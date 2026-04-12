import Stripe from "stripe";

// Lazy singleton – avoids throwing at module-evaluation time so Next.js
// can collect page data during build without STRIPE_SECRET_KEY being set.
let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!_stripe) {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error("STRIPE_SECRET_KEY is not set");
    }
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  }
  return _stripe;
}

// Instructor annual subscription price ($250/year)
export const INSTRUCTOR_SUBSCRIPTION_PRICE_AMOUNT = 25000; // cents
export const INSTRUCTOR_REFERRAL_REWARD = 5000; // $50 in cents

// Product prices in cents — these IDs must match the frontend product IDs
// used in ProductPage (product.id) and sent via the checkout API.
export const PRODUCT_PRICES: Record<string, number> = {
  achieve: 3670, // $36.70
  confidence: 3670, // $36.70
  'tilapia': 1350,     // $13.50
  'mv-salt': 1350,     // $13.50
  'mv-soy-sauce': 1350, // $13.50
  'mv-toner': 1350,     // $13.50
  'mv-balm': 1350,      // $13.50
  'mv-soap': 1350,      // $13.50
};

// Referral discount rate (10% off)
export const REFERRAL_DISCOUNT_RATE = 0.10;
