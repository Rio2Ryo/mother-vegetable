import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import prisma from "@/lib/prisma";
import { requireInstructorAuth } from "@/lib/instructor-auth";

export async function POST(request: NextRequest) {
  // Verify instructor authentication
  const auth = requireInstructorAuth(request);
  if (auth instanceof NextResponse) return auth;

  try {
    const instructorId = auth.instructorId;

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

    if (!instructor.stripeConnectId || !instructor.connectOnboarded) {
      return NextResponse.json(
        { error: "Stripe Connect account not set up. Please connect your account first." },
        { status: 400 }
      );
    }

    // Calculate available balance (total commissions - already paid out)
    const totalCommissions = instructor.commissions.reduce(
      (sum, c) => sum + c.commissionAmount,
      0
    );
    const totalPaidOut = instructor.payoutRequests
      .filter((p) => p.status === "completed")
      .reduce((sum, p) => sum + p.amount, 0);
    const pendingPayouts = instructor.payoutRequests
      .filter((p) => p.status === "pending" || p.status === "processing")
      .reduce((sum, p) => sum + p.amount, 0);

    const availableBalance = totalCommissions - totalPaidOut - pendingPayouts;

    if (availableBalance < 1) {
      return NextResponse.json(
        { error: "Insufficient balance for payout (minimum $1.00)" },
        { status: 400 }
      );
    }

    // Create payout request
    const payoutRequest = await prisma.payoutRequest.create({
      data: {
        instructorId: instructor.id,
        amount: availableBalance,
        status: "processing",
      },
    });

    try {
      // Create Stripe Transfer to Connect account
      const transfer = await getStripe().transfers.create({
        amount: Math.round(availableBalance * 100), // cents
        currency: "usd",
        destination: instructor.stripeConnectId,
        metadata: {
          instructorId: instructor.id,
          payoutRequestId: payoutRequest.id,
        },
      });

      // Mark commissions as paid out
      await prisma.commission.updateMany({
        where: {
          instructorId: instructor.id,
          paidOut: false,
        },
        data: { paidOut: true },
      });

      // Update payout request
      await prisma.payoutRequest.update({
        where: { id: payoutRequest.id },
        data: {
          status: "completed",
          stripeTransferId: transfer.id,
        },
      });

      return NextResponse.json({
        success: true,
        amount: availableBalance,
        transferId: transfer.id,
      });
    } catch (transferError) {
      // Mark payout as failed
      await prisma.payoutRequest.update({
        where: { id: payoutRequest.id },
        data: { status: "failed" },
      });

      console.error("Stripe transfer failed:", transferError);
      return NextResponse.json(
        { error: "Transfer failed. Please try again later." },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Payout request failed:", error);
    return NextResponse.json(
      { error: "Failed to process payout" },
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
      .filter((p) => p.status === "pending" || p.status === "processing")
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
