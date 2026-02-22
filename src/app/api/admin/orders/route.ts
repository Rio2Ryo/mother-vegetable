import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyAdmin } from "@/lib/admin-auth";

export async function GET(request: NextRequest) {
  const denied = verifyAdmin(request);
  if (denied) return denied;

  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        user: { select: { name: true, email: true } },
      },
    });

    const formatted = orders.map((order) => {
      const shipping = JSON.parse(order.shippingAddress || "{}");
      const items = JSON.parse(order.items || "[]");

      return {
        id: order.id,
        customerName:
          order.user?.name ||
          `${shipping.firstName || ""} ${shipping.lastName || ""}`.trim() ||
          "Unknown",
        email: order.user?.email || shipping.email || "",
        phone: shipping.phone || "",
        address: {
          address: shipping.address || "",
          city: shipping.city || "",
          state: shipping.state || "",
          zip: shipping.zip || "",
          country: shipping.country || "",
        },
        items: items.map(
          (i: { productId?: string; name?: string; quantity?: number; price?: number; image?: string }) => ({
            productId: i.productId || "",
            name: i.name || "",
            quantity: i.quantity || 1,
            price: i.price || 0,
            image: i.image || "",
          })
        ),
        total: order.total,
        status: order.status,
        createdAt: order.createdAt.toISOString(),
        referralCode: order.referralCode || undefined,
      };
    });

    return NextResponse.json(formatted);
  } catch (error) {
    console.error("Failed to fetch admin orders:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}
