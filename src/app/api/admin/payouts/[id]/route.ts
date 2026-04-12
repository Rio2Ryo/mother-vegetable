import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyAdmin } from "@/lib/admin-auth";
import { ensureNewTables } from "@/lib/ensure-tables";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const denied = await verifyAdmin(request);
  if (denied) return denied;
  await ensureNewTables();

  const { id } = await params;

  try {
    const body = await request.json();
    const { status } = body;

    if (!status || !["approved", "rejected", "completed"].includes(status)) {
      return NextResponse.json(
        { error: "Status must be 'approved', 'rejected', or 'completed'" },
        { status: 400 }
      );
    }

    const payout = await prisma.payoutRequest.findUnique({ where: { id } });
    if (!payout) {
      return NextResponse.json(
        { error: "Payout request not found" },
        { status: 404 }
      );
    }

    const updated = await prisma.payoutRequest.update({
      where: { id },
      data: { status },
    });

    // If completed, mark related commissions as paid out
    if (status === "completed") {
      await prisma.commission.updateMany({
        where: {
          instructorId: payout.instructorId,
          paidOut: false,
        },
        data: { paidOut: true },
      });
    }

    return NextResponse.json({
      id: updated.id,
      status: updated.status,
      amount: updated.amount,
      updatedAt: updated.updatedAt.toISOString(),
    });
  } catch (error) {
    console.error("Failed to update payout request:", error);
    return NextResponse.json(
      { error: "Failed to update payout request" },
      { status: 500 }
    );
  }
}
