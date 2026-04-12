import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyAdmin } from "@/lib/admin-auth";
import { ensureNewTables } from "@/lib/ensure-tables";

export async function GET(request: NextRequest) {
  const denied = await verifyAdmin(request);
  if (denied) return denied;
  await ensureNewTables();

  try {
    const payouts = await prisma.payoutRequest.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        instructor: {
          select: {
            id: true,
            fullName: true,
            email: true,
          },
        },
      },
    });

    const formatted = payouts.map((p) => ({
      id: p.id,
      instructorId: p.instructorId,
      instructorName: p.instructor.fullName,
      instructorEmail: p.instructor.email,
      amount: p.amount,
      status: p.status,
      bankAccountInfo: p.bankAccountInfo,
      createdAt: p.createdAt.toISOString(),
      updatedAt: p.updatedAt.toISOString(),
    }));

    return NextResponse.json(formatted);
  } catch (error) {
    console.error("Failed to fetch payout requests:", error);
    return NextResponse.json(
      { error: "Failed to fetch payout requests" },
      { status: 500 }
    );
  }
}
