import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyAdmin } from "@/lib/admin-auth";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const denied = verifyAdmin(request);
  if (denied) return denied;

  const { id } = await params;

  try {
    const instructor = await prisma.instructor.findUnique({
      where: { id },
      include: {
        commissions: {
          orderBy: { createdAt: "desc" },
          include: {
            order: {
              select: { id: true, total: true, status: true, createdAt: true },
            },
          },
        },
        referredInstructors: {
          select: {
            id: true,
            fullName: true,
            email: true,
            referralCode: true,
            subscriptionStatus: true,
            createdAt: true,
          },
        },
        parentInstructor: {
          select: { id: true, fullName: true, referralCode: true },
        },
        payoutRequests: {
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!instructor) {
      return NextResponse.json(
        { error: "Instructor not found" },
        { status: 404 }
      );
    }

    const directComm = instructor.commissions.filter((c) => c.type === "direct");
    const referralComm = instructor.commissions.filter((c) => c.type === "referral");
    const totalEarned = instructor.commissions.reduce(
      (sum, c) => sum + c.commissionAmount,
      0
    );
    const paidOut = instructor.payoutRequests
      .filter((p) => p.status === "completed")
      .reduce((sum, p) => sum + p.amount, 0);

    let status: "active" | "pending" | "inactive" = "inactive";
    if (instructor.subscriptionStatus === "active") status = "active";
    else if (
      instructor.subscriptionStatus === "inactive" &&
      !instructor.stripeSubscriptionId
    )
      status = "pending";

    // Get orders associated with this instructor's referral code
    const relatedOrders = await prisma.order.findMany({
      where: { referralCode: instructor.referralCode },
      orderBy: { createdAt: "desc" },
      include: {
        user: { select: { name: true, email: true } },
      },
    });

    return NextResponse.json({
      id: instructor.id,
      name: instructor.fullName,
      email: instructor.email,
      phone: instructor.phone,
      referralCode: instructor.referralCode,
      referralUrl: `${process.env.NEXT_PUBLIC_APP_URL || ""}/?ref=${instructor.referralCode}`,
      referredBy: instructor.parentInstructor
        ? {
            id: instructor.parentInstructor.id,
            name: instructor.parentInstructor.fullName,
            referralCode: instructor.parentInstructor.referralCode,
          }
        : undefined,
      status,
      subscriptionStatus: instructor.subscriptionStatus,
      connectOnboarded: instructor.connectOnboarded,
      directSales: directComm.length,
      referralSales: referralComm.length,
      commissionEarned: totalEarned,
      availableBalance: totalEarned - paidOut,
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
        name: ri.fullName,
        email: ri.email,
        referralCode: ri.referralCode,
        status:
          ri.subscriptionStatus === "active"
            ? "active"
            : !ri.subscriptionStatus
              ? "pending"
              : "inactive",
        createdAt: ri.createdAt.toISOString(),
      })),
      payoutHistory: instructor.payoutRequests.map((p) => ({
        id: p.id,
        amount: p.amount,
        status: p.status,
        createdAt: p.createdAt.toISOString(),
      })),
      relatedOrders: relatedOrders.map((o) => {
        const shipping = JSON.parse(o.shippingAddress || "{}");
        return {
          id: o.id,
          customerName:
            o.user?.name ||
            `${shipping.firstName || ""} ${shipping.lastName || ""}`.trim() ||
            "Unknown",
          total: o.total,
          status: o.status,
          createdAt: o.createdAt.toISOString(),
        };
      }),
    });
  } catch (error) {
    console.error("Failed to fetch admin instructor:", error);
    return NextResponse.json(
      { error: "Failed to fetch instructor" },
      { status: 500 }
    );
  }
}
