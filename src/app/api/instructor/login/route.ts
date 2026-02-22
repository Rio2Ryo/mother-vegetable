import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

interface LoginBody {
  email: string;
  password: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: LoginBody = await request.json();

    if (!body.email?.trim() || !body.password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const instructor = await prisma.instructor.findUnique({
      where: { email: body.email.trim() },
    });

    if (!instructor) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const valid = await bcrypt.compare(body.password, instructor.passwordHash);
    if (!valid) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Return instructor data (excluding passwordHash)
    return NextResponse.json({
      id: instructor.id,
      fullName: instructor.fullName,
      email: instructor.email,
      phone: instructor.phone,
      referralCode: instructor.referralCode,
      parentInstructorId: instructor.parentInstructorId,
      stripeCustomerId: instructor.stripeCustomerId,
      stripeConnectId: instructor.stripeConnectId,
      stripeSubscriptionId: instructor.stripeSubscriptionId,
      subscriptionStatus: instructor.subscriptionStatus,
      connectOnboarded: instructor.connectOnboarded,
      locale: instructor.locale,
      createdAt: instructor.createdAt.toISOString(),
    });
  } catch (error) {
    console.error("Instructor login failed:", error);
    return NextResponse.json(
      { error: "Login failed" },
      { status: 500 }
    );
  }
}
