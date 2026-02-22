import { NextRequest, NextResponse } from "next/server";
import { getStripe, INSTRUCTOR_SUBSCRIPTION_PRICE_AMOUNT } from "@/lib/stripe";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

interface RegisterBody {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  referralCode?: string; // code of the parent instructor who referred them
  desiredReferralCode: string; // the referral code this instructor wants to use
  locale?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: RegisterBody = await request.json();

    // Validation
    if (!body.fullName?.trim()) {
      return NextResponse.json({ error: "Full name is required" }, { status: 400 });
    }
    if (!body.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) {
      return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
    }
    if (!body.phone?.trim()) {
      return NextResponse.json({ error: "Phone is required" }, { status: 400 });
    }
    if (!body.password || body.password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 });
    }
    if (!body.desiredReferralCode?.trim()) {
      return NextResponse.json({ error: "Referral code is required" }, { status: 400 });
    }

    // Validate referral code format (alphanumeric, 3-20 chars)
    const code = body.desiredReferralCode.trim().toUpperCase();
    if (!/^[A-Z0-9_-]{3,20}$/.test(code)) {
      return NextResponse.json(
        { error: "Referral code must be 3-20 alphanumeric characters (dashes and underscores allowed)" },
        { status: 400 }
      );
    }

    // Check for duplicate email
    const existingEmail = await prisma.instructor.findUnique({
      where: { email: body.email.trim() },
    });
    if (existingEmail) {
      return NextResponse.json({ error: "Email already registered" }, { status: 409 });
    }

    // Check for duplicate referral code
    const existingCode = await prisma.instructor.findUnique({
      where: { referralCode: code },
    });
    if (existingCode) {
      return NextResponse.json({ error: "Referral code already taken" }, { status: 409 });
    }

    // Find parent instructor if referral code provided
    let parentInstructorId: string | null = null;
    if (body.referralCode?.trim()) {
      const parent = await prisma.instructor.findUnique({
        where: { referralCode: body.referralCode.trim().toUpperCase() },
      });
      if (!parent) {
        return NextResponse.json({ error: "Invalid referral code" }, { status: 400 });
      }
      parentInstructorId = parent.id;
    }

    // Hash password
    const passwordHash = await bcrypt.hash(body.password, 12);

    // Create instructor record (subscription inactive until payment)
    const instructor = await prisma.instructor.create({
      data: {
        fullName: body.fullName.trim(),
        email: body.email.trim(),
        phone: body.phone.trim(),
        passwordHash,
        referralCode: code,
        parentInstructorId,
        subscriptionStatus: "inactive",
        locale: body.locale || "en",
      },
    });

    // Create Stripe Customer
    const customer = await getStripe().customers.create({
      email: body.email.trim(),
      name: body.fullName.trim(),
      phone: body.phone.trim(),
      metadata: {
        instructorId: instructor.id,
      },
    });

    // Update instructor with Stripe customer ID
    await prisma.instructor.update({
      where: { id: instructor.id },
      data: { stripeCustomerId: customer.id },
    });

    // Create Stripe Price for the subscription
    const price = await getStripe().prices.create({
      unit_amount: INSTRUCTOR_SUBSCRIPTION_PRICE_AMOUNT,
      currency: "usd",
      recurring: { interval: "year" },
      product_data: {
        name: "Mother Vegetable Instructor Program - Annual Subscription",
      },
    });

    const locale = body.locale || "en";
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    // Create Stripe Checkout Session for subscription
    const session = await getStripe().checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      customer: customer.id,
      line_items: [{ price: price.id, quantity: 1 }],
      metadata: {
        instructorId: instructor.id,
        locale: locale,
      },
      success_url: `${appUrl}/${locale}/instructor/dashboard?registration=success`,
      cancel_url: `${appUrl}/${locale}/instructor/register?canceled=true`,
    });

    return NextResponse.json({
      url: session.url,
      instructorId: instructor.id,
    });
  } catch (error) {
    console.error("Instructor registration failed:", error);
    return NextResponse.json(
      { error: "Failed to create instructor registration" },
      { status: 500 }
    );
  }
}
