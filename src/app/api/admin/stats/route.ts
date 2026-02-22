import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyAdmin } from "@/lib/admin-auth";

export async function GET(request: NextRequest) {
  const denied = verifyAdmin(request);
  if (denied) return denied;

  try {
    const [orders, instructors] = await Promise.all([
      prisma.order.findMany({
        select: { status: true, total: true },
      }),
      prisma.instructor.findMany({
        select: { subscriptionStatus: true },
      }),
    ]);

    const totalOrders = orders.length;
    const totalRevenue = orders
      .filter((o) => o.status !== "cancelled")
      .reduce((sum, o) => sum + o.total, 0);
    const activeInstructors = instructors.filter(
      (i) => i.subscriptionStatus === "active"
    ).length;
    const pendingOrders = orders.filter((o) => o.status === "pending").length;

    return NextResponse.json({
      totalOrders,
      totalRevenue,
      activeInstructors,
      pendingOrders,
    });
  } catch (error) {
    console.error("Failed to fetch admin stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
