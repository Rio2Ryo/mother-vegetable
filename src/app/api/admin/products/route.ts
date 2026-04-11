import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyAdmin } from "@/lib/admin-auth";

export async function GET(request: NextRequest) {
  const denied = await verifyAdmin(request);
  if (denied) return denied;

  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    });

    const formatted = products.map((p) => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      description: p.description,
      price: p.price,
      currency: p.currency,
      images: JSON.parse(p.images || "[]"),
      category: p.category,
      sku: p.sku,
      inStock: p.inStock,
      createdAt: p.createdAt.toISOString(),
      updatedAt: p.updatedAt.toISOString(),
    }));

    return NextResponse.json(formatted);
  } catch (error) {
    console.error("Failed to fetch admin products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const denied = await verifyAdmin(request);
  if (denied) return denied;

  try {
    const body = await request.json();

    const { name, slug, description, price, currency, images, category, sku, inStock } = body;

    if (!name || !slug || price == null || !category || !sku) {
      return NextResponse.json(
        { error: "Missing required fields: name, slug, price, category, sku" },
        { status: 400 }
      );
    }

    const product = await prisma.product.create({
      data: {
        name,
        slug,
        description: description || null,
        price: Number(price),
        currency: currency || "USD",
        images: JSON.stringify(images || []),
        category,
        sku,
        inStock: inStock !== false,
      },
    });

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
    }, { status: 201 });
  } catch (error) {
    console.error("Failed to create product:", error);
    if (error instanceof Error && error.message.includes("Unique")) {
      return NextResponse.json(
        { error: "A product with this slug or SKU already exists" },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}
