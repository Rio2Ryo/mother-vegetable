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
    const product = await prisma.product.findUnique({ where: { id } });

    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      id: product.id,
      name: product.name,
      slug: product.slug,
      description: product.description,
      price: product.price,
      currency: product.currency,
      images: JSON.parse(product.images || "[]"),
      category: product.category,
      sku: product.sku,
      inStock: product.inStock,
      createdAt: product.createdAt.toISOString(),
      updatedAt: product.updatedAt.toISOString(),
    });
  } catch (error) {
    console.error("Failed to fetch product:", error);
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const denied = await verifyAdmin(request);
  if (denied) return denied;

  const { id } = await params;

  try {
    const body = await request.json();

    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    const data: Record<string, unknown> = {};
    if (body.name !== undefined) data.name = body.name;
    if (body.slug !== undefined) data.slug = body.slug;
    if (body.description !== undefined) data.description = body.description;
    if (body.price !== undefined) data.price = Number(body.price);
    if (body.currency !== undefined) data.currency = body.currency;
    if (body.images !== undefined) data.images = JSON.stringify(body.images);
    if (body.category !== undefined) data.category = body.category;
    if (body.sku !== undefined) data.sku = body.sku;
    if (body.inStock !== undefined) data.inStock = body.inStock;

    if (Object.keys(data).length === 0) {
      return NextResponse.json(
        { error: "No valid fields to update" },
        { status: 400 }
      );
    }

    const updated = await prisma.product.update({ where: { id }, data });

    return NextResponse.json({
      id: updated.id,
      name: updated.name,
      slug: updated.slug,
      description: updated.description,
      price: updated.price,
      currency: updated.currency,
      images: JSON.parse(updated.images || "[]"),
      category: updated.category,
      sku: updated.sku,
      inStock: updated.inStock,
      createdAt: updated.createdAt.toISOString(),
      updatedAt: updated.updatedAt.toISOString(),
    });
  } catch (error) {
    console.error("Failed to update product:", error);
    if (error instanceof Error && error.message.includes("Unique")) {
      return NextResponse.json(
        { error: "A product with this slug or SKU already exists" },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { error: "Failed to update product" },
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
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    await prisma.product.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete product:", error);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}
