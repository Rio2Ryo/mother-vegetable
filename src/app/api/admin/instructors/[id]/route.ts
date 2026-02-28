import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyAdmin } from "@/lib/admin-auth";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const denied = await verifyAdmin(request);
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

// ---------------------------------------------------------------------------
// PATCH /api/admin/instructors/[id] — update instructor status
// ---------------------------------------------------------------------------

interface PatchBody {
  subscriptionStatus?: "active" | "inactive" | "canceled";
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const denied = await verifyAdmin(request);
  if (denied) return denied;

  const { id } = await params;

  try {
    const body: PatchBody = await request.json();

    const instructor = await prisma.instructor.findUnique({ where: { id } });
    if (!instructor) {
      return NextResponse.json(
        { error: "Instructor not found" },
        { status: 404 }
      );
    }

    const data: Record<string, string> = {};

    if (body.subscriptionStatus) {
      const allowed = ["active", "inactive", "canceled"];
      if (!allowed.includes(body.subscriptionStatus)) {
        return NextResponse.json(
          { error: "Invalid subscription status" },
          { status: 400 }
        );
      }
      data.subscriptionStatus = body.subscriptionStatus;
    }

    if (Object.keys(data).length === 0) {
      return NextResponse.json(
        { error: "No valid fields to update" },
        { status: 400 }
      );
    }

    const updated = await prisma.instructor.update({
      where: { id },
      data,
    });

    // Derive admin status from subscriptionStatus
    let status: "active" | "pending" | "inactive" = "inactive";
    if (updated.subscriptionStatus === "active") status = "active";
    else if (
      updated.subscriptionStatus === "inactive" &&
      !updated.stripeSubscriptionId
    )
      status = "pending";

    return NextResponse.json({
      id: updated.id,
      subscriptionStatus: updated.subscriptionStatus,
      status,
    });
  } catch (error) {
    console.error("Failed to update instructor:", error);
    return NextResponse.json(
      { error: "Failed to update instructor" },
      { status: 500 }
    );
  }
}
