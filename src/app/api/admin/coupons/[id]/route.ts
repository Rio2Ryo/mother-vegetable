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

  const { id } = await params;

  try {
    const body = await request.json();

    const coupon = await prisma.coupon.findUnique({ where: { id } });
    if (!coupon) {
      return NextResponse.json(
        { error: "Coupon not found" },
        { status: 404 }
      );
    }

    const data: Record<string, unknown> = {};
    if (body.code !== undefined) data.code = body.code.toUpperCase();
    if (body.discountType !== undefined) {
      if (!["percentage", "fixed"].includes(body.discountType)) {
        return NextResponse.json(
          { error: "discountType must be 'percentage' or 'fixed'" },
          { status: 400 }
        );
      }
      data.discountType = body.discountType;
    }
    if (body.discountValue !== undefined) data.discountValue = Number(body.discountValue);
    if (body.minOrderAmount !== undefined) data.minOrderAmount = body.minOrderAmount != null ? Number(body.minOrderAmount) : null;
    if (body.maxUses !== undefined) data.maxUses = body.maxUses != null ? Number(body.maxUses) : null;
    if (body.isActive !== undefined) data.isActive = body.isActive;
    if (body.expiresAt !== undefined) data.expiresAt = body.expiresAt ? new Date(body.expiresAt) : null;

    if (Object.keys(data).length === 0) {
      return NextResponse.json(
        { error: "No valid fields to update" },
        { status: 400 }
      );
    }

    const updated = await prisma.coupon.update({ where: { id }, data });

    return NextResponse.json({
      id: updated.id,
      code: updated.code,
      discountType: updated.discountType,
      discountValue: updated.discountValue,
      minOrderAmount: updated.minOrderAmount,
      maxUses: updated.maxUses,
      usedCount: updated.usedCount,
      isActive: updated.isActive,
      expiresAt: updated.expiresAt?.toISOString() || null,
      createdAt: updated.createdAt.toISOString(),
      updatedAt: updated.updatedAt.toISOString(),
    });
  } catch (error) {
    console.error("Failed to update coupon:", error);
    if (error instanceof Error && error.message.includes("Unique")) {
      return NextResponse.json(
        { error: "A coupon with this code already exists" },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { error: "Failed to update coupon" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const denied = await verifyAdmin(request);
  if (denied) return denied;

  const { id } = await params;

  try {
    const coupon = await prisma.coupon.findUnique({ where: { id } });
    if (!coupon) {
      return NextResponse.json(
        { error: "Coupon not found" },
        { status: 404 }
      );
    }

    await prisma.coupon.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete coupon:", error);
    return NextResponse.json(
      { error: "Failed to delete coupon" },
      { status: 500 }
    );
  }
}
