import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyAdmin } from "@/lib/admin-auth";

export async function GET(request: NextRequest) {
  const denied = await verifyAdmin(request);
  if (denied) return denied;

  try {
    const coupons = await prisma.coupon.findMany({
      orderBy: { createdAt: "desc" },
    });

    const formatted = coupons.map((c) => ({
      id: c.id,
      code: c.code,
      discountType: c.discountType,
      discountValue: c.discountValue,
      minOrderAmount: c.minOrderAmount,
      maxUses: c.maxUses,
      usedCount: c.usedCount,
      isActive: c.isActive,
      expiresAt: c.expiresAt?.toISOString() || null,
      createdAt: c.createdAt.toISOString(),
      updatedAt: c.updatedAt.toISOString(),
    }));

    return NextResponse.json(formatted);
  } catch (error) {
    console.error("Failed to fetch admin coupons:", error);
    return NextResponse.json(
      { error: "Failed to fetch coupons" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const denied = await verifyAdmin(request);
  if (denied) return denied;

  try {
    const body = await request.json();

    const { code, discountType, discountValue, minOrderAmount, maxUses, isActive, expiresAt } = body;

    if (!code || discountValue == null) {
      return NextResponse.json(
        { error: "Missing required fields: code, discountValue" },
        { status: 400 }
      );
    }

    if (discountType && !["percentage", "fixed"].includes(discountType)) {
      return NextResponse.json(
        { error: "discountType must be 'percentage' or 'fixed'" },
        { status: 400 }
      );
    }

    const coupon = await prisma.coupon.create({
      data: {
        code: code.toUpperCase(),
        discountType: discountType || "percentage",
        discountValue: Number(discountValue),
        minOrderAmount: minOrderAmount != null ? Number(minOrderAmount) : null,
        maxUses: maxUses != null ? Number(maxUses) : null,
        isActive: isActive !== false,
        expiresAt: expiresAt ? new Date(expiresAt) : null,
      },
    });

    return NextResponse.json({
      id: coupon.id,
      code: coupon.code,
      discountType: coupon.discountType,
      discountValue: coupon.discountValue,
      minOrderAmount: coupon.minOrderAmount,
      maxUses: coupon.maxUses,
      usedCount: coupon.usedCount,
      isActive: coupon.isActive,
      expiresAt: coupon.expiresAt?.toISOString() || null,
      createdAt: coupon.createdAt.toISOString(),
      updatedAt: coupon.updatedAt.toISOString(),
    }, { status: 201 });
  } catch (error) {
    console.error("Failed to create coupon:", error);
    if (error instanceof Error && error.message.includes("Unique")) {
      return NextResponse.json(
        { error: "A coupon with this code already exists" },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { error: "Failed to create coupon" },
      { status: 500 }
    );
  }
}
