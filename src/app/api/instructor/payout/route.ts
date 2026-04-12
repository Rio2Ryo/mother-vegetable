import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireInstructorAuth } from "@/lib/instructor-auth";

export async function POST(request: NextRequest) {
  // Verify instructor authentication
  const auth = requireInstructorAuth(request);
  if (auth instanceof NextResponse) return auth;

  try {
    const instructorId = auth.instructorId;
    const body = await request.json();
    const { amount: requestedAmount, bankAccountInfo } = body;

    const instructor = await prisma.instructor.findUnique({
      where: { id: instructorId },
      include: { commissions: true, payoutRequests: true },
    });

    if (!instructor) {
      return NextResponse.json(
        { error: "Instructor not found" },
        { status: 404 }
      );
    }

    // Calculate available balance (total commissions - already paid out - pending)
    const totalCommissions = instructor.commissions.reduce(
      (sum, c) => sum + c.commissionAmount,
      0
    );
    const totalPaidOut = instructor.payoutRequests
      .filter((p) => p.status === "completed")
      .reduce((sum, p) => sum + p.amount, 0);
    const pendingPayouts = instructor.payoutRequests
      .filter((p) => p.status === "pending" || p.status === "approved")
      .reduce((sum, p) => sum + p.amount, 0);

    const availableBalance = totalCommissions - totalPaidOut - pendingPayouts;

    const amount = requestedAmount != null ? Number(requestedAmount) : availableBalance;

    if (amount < 1 || amount > availableBalance) {
      return NextResponse.json(
        { error: "Insufficient balance for payout (minimum $1.00)" },
        { status: 400 }
      );
    }

    if (!bankAccountInfo || !bankAccountInfo.trim()) {
      return NextResponse.json(
        { error: "Bank account info is required" },
        { status: 400 }
      );
    }

    // Create payout request with "pending" status (no Stripe call)
    const payoutRequest = await prisma.payoutRequest.create({
      data: {
        instructorId: instructor.id,
        amount,
        status: "pending",
        bankAccountInfo: bankAccountInfo.trim(),
      },
    });

    return NextResponse.json({
      success: true,
      amount: payoutRequest.amount,
      requestId: payoutRequest.id,
      status: payoutRequest.status,
    });
  } catch (error) {
    console.error("Payout request failed:", error);
    return NextResponse.json(
      { error: "Failed to process payout request" },
      { status: 500 }
    );
  }
}

// GET: Get payout history and balance
export async function GET(request: NextRequest) {
  // Verify instructor authentication
  const auth = requireInstructorAuth(request);
  if (auth instanceof NextResponse) return auth;

  const instructorId = auth.instructorId;

  try {
    const instructor = await prisma.instructor.findUnique({
      where: { id: instructorId },
      include: {
        commissions: { orderBy: { createdAt: "desc" } },
        payoutRequests: { orderBy: { createdAt: "desc" } },
      },
    });

    if (!instructor) {
      return NextResponse.json(
        { error: "Instructor not found" },
        { status: 404 }
      );
    }

    const totalCommissions = instructor.commissions.reduce(
      (sum, c) => sum + c.commissionAmount,
      0
    );
    const totalPaidOut = instructor.payoutRequests
      .filter((p) => p.status === "completed")
      .reduce((sum, p) => sum + p.amount, 0);
    const pendingPayouts = instructor.payoutRequests
      .filter((p) => p.status === "pending" || p.status === "approved")
      .reduce((sum, p) => sum + p.amount, 0);

    return NextResponse.json({
      totalCommissions,
      totalPaidOut,
      pendingPayouts,
      availableBalance: totalCommissions - totalPaidOut - pendingPayouts,
      commissions: instructor.commissions,
      payoutRequests: instructor.payoutRequests,
    });
  } catch (error) {
    console.error("Failed to get payout info:", error);
    return NextResponse.json(
      { error: "Failed to get payout information" },
      { status: 500 }
    );
  }
}
