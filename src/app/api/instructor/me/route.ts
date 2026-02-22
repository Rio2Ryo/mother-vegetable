import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const instructorId = searchParams.get("id");

  if (!instructorId) {
    return NextResponse.json(
      { error: "Instructor ID is required" },
      { status: 400 }
    );
  }

  try {
    const instructor = await prisma.instructor.findUnique({
      where: { id: instructorId },
      include: {
        commissions: { orderBy: { createdAt: "desc" } },
        referredInstructors: {
          select: {
            id: true,
            fullName: true,
            referralCode: true,
            createdAt: true,
          },
        },
      },
    });

    if (!instructor) {
      return NextResponse.json(
        { error: "Instructor not found" },
        { status: 404 }
      );
    }

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
      commissions: instructor.commissions.map((c) => ({
        id: c.id,
        orderId: c.orderId,
        type: c.type,
        orderTotal: c.orderTotal,
        commissionRate: c.commissionRate,
        commissionAmount: c.commissionAmount,
        paidOut: c.paidOut,
        createdAt: c.createdAt.toISOString(),
      })),
      referredInstructors: instructor.referredInstructors.map((ri) => ({
        id: ri.id,
        fullName: ri.fullName,
        referralCode: ri.referralCode,
        createdAt: ri.createdAt.toISOString(),
      })),
    });
  } catch (error) {
    console.error("Failed to fetch instructor:", error);
    return NextResponse.json(
      { error: "Failed to fetch instructor data" },
      { status: 500 }
    );
  }
}
