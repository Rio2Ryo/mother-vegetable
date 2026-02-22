import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyAdmin } from "@/lib/admin-auth";

export async function GET(request: NextRequest) {
  const denied = verifyAdmin(request);
  if (denied) return denied;

  try {
    const instructors = await prisma.instructor.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        commissions: {
          select: { type: true, commissionAmount: true },
        },
        _count: {
          select: { referredInstructors: true },
        },
      },
    });

    const formatted = instructors.map((inst) => {
      const directComm = inst.commissions.filter((c) => c.type === "direct");
      const referralComm = inst.commissions.filter((c) => c.type === "referral");
      const totalEarned = inst.commissions.reduce(
        (sum, c) => sum + c.commissionAmount,
        0
      );

      // Map subscription status to admin status
      let status: "active" | "pending" | "inactive" = "inactive";
      if (inst.subscriptionStatus === "active") status = "active";
      else if (inst.subscriptionStatus === "inactive" && !inst.stripeSubscriptionId)
        status = "pending";

      return {
        id: inst.id,
        name: inst.fullName,
        email: inst.email,
        phone: inst.phone,
        referralCode: inst.referralCode,
        referralUrl: `${process.env.NEXT_PUBLIC_APP_URL || ""}/?ref=${inst.referralCode}`,
        referredBy: inst.parentInstructorId || undefined,
        status,
        directSales: directComm.length,
        referralSales: referralComm.length,
        commissionEarned: totalEarned,
        createdAt: inst.createdAt.toISOString(),
        subscriptionStatus: inst.subscriptionStatus,
        referredCount: inst._count.referredInstructors,
      };
    });

    return NextResponse.json(formatted);
  } catch (error) {
    console.error("Failed to fetch admin instructors:", error);
    return NextResponse.json(
      { error: "Failed to fetch instructors" },
      { status: 500 }
    );
  }
}
