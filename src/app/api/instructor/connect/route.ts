import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import prisma from "@/lib/prisma";
import { requireInstructorAuth } from "@/lib/instructor-auth";

export async function POST(request: NextRequest) {
  // Verify instructor authentication
  const auth = requireInstructorAuth(request);
  if (auth instanceof NextResponse) return auth;

  try {
    const body = await request.json();
    const { locale: reqLocale } = body;
    const instructorId = auth.instructorId;

    const instructor = await prisma.instructor.findUnique({
      where: { id: instructorId },
    });

    if (!instructor) {
      return NextResponse.json(
        { error: "Instructor not found" },
        { status: 404 }
      );
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const locale = reqLocale || instructor.locale || "en";
    let connectAccountId = instructor.stripeConnectId;

    // Create Connect account if not exists
    if (!connectAccountId) {
      const account = await getStripe().accounts.create({
        type: "express",
        email: instructor.email,
        metadata: {
          instructorId: instructor.id,
        },
        capabilities: {
          transfers: { requested: true },
        },
      });

      connectAccountId = account.id;

      await prisma.instructor.update({
        where: { id: instructor.id },
        data: { stripeConnectId: connectAccountId },
      });
    }

    // Create account link for onboarding
    const accountLink = await getStripe().accountLinks.create({
      account: connectAccountId,
      refresh_url: `${appUrl}/${locale}/instructor/dashboard?connect=refresh`,
      return_url: `${appUrl}/${locale}/instructor/dashboard?connect=success`,
      type: "account_onboarding",
    });

    return NextResponse.json({ url: accountLink.url });
  } catch (error) {
    console.error("Stripe Connect setup failed:", error);
    return NextResponse.json(
      { error: "Failed to setup Stripe Connect" },
      { status: 500 }
    );
  }
}

// GET: Check Connect account status
export async function GET(request: NextRequest) {
  // Verify instructor authentication
  const auth = requireInstructorAuth(request);
  if (auth instanceof NextResponse) return auth;

  const instructorId = auth.instructorId;

  try {
    const instructor = await prisma.instructor.findUnique({
      where: { id: instructorId },
    });

    if (!instructor || !instructor.stripeConnectId) {
      return NextResponse.json({ connected: false, onboarded: false });
    }

    const account = await getStripe().accounts.retrieve(instructor.stripeConnectId);
    const onboarded = account.details_submitted ?? false;

    if (onboarded !== instructor.connectOnboarded) {
      await prisma.instructor.update({
        where: { id: instructor.id },
        data: { connectOnboarded: onboarded },
      });
    }

    return NextResponse.json({
      connected: true,
      onboarded,
      accountId: instructor.stripeConnectId,
    });
  } catch (error) {
    console.error("Failed to check Connect status:", error);
    return NextResponse.json(
      { error: "Failed to check Connect status" },
      { status: 500 }
    );
  }
}
