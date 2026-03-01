import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyAdmin } from "@/lib/admin-auth";
import { sendOrderStatusUpdateEmail } from "@/lib/email";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const denied = await verifyAdmin(request);
  if (denied) return denied;

  const { id } = await params;

  try {
    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        user: { select: { name: true, email: true } },
        commissions: {
          include: {
            instructor: { select: { fullName: true, referralCode: true } },
          },
        },
      },
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    const shipping = JSON.parse(order.shippingAddress || "{}");
    const items = JSON.parse(order.items || "[]");

    return NextResponse.json({
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
      stripeSessionId: order.stripeSessionId || undefined,
      commissions: order.commissions.map((c) => ({
        id: c.id,
        instructorName: c.instructor.fullName,
        instructorCode: c.instructor.referralCode,
        type: c.type,
        orderTotal: c.orderTotal,
        commissionRate: c.commissionRate,
        commissionAmount: c.commissionAmount,
        paidOut: c.paidOut,
        createdAt: c.createdAt.toISOString(),
      })),
    });
  } catch (error) {
    console.error("Failed to fetch admin order:", error);
    return NextResponse.json(
      { error: "Failed to fetch order" },
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
    const { status } = body;

    const validStatuses = [
      "pending",
      "confirmed",
      "processing",
      "shipped",
      "delivered",
      "cancelled",
    ];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: `Invalid status. Must be one of: ${validStatuses.join(", ")}` },
        { status: 400 }
      );
    }

    const order = await prisma.order.update({
      where: { id },
      data: { status },
      include: {
        user: { select: { name: true, email: true } },
      },
    });

    // Send status notification email to customer
    const shipping = JSON.parse(order.shippingAddress || "{}");
    const customerEmail = order.user?.email || shipping.email;
    if (customerEmail) {
      const customerName =
        order.user?.name ||
        `${shipping.firstName || ""} ${shipping.lastName || ""}`.trim() ||
        "Customer";

      sendOrderStatusUpdateEmail(
        {
          customerEmail,
          customerName,
          orderId: order.id,
          status,
        },
        shipping.locale
      ).catch((err) => {
        console.error("Failed to send order status email:", err);
      });
    }

    return NextResponse.json({
      id: order.id,
      status: order.status,
      updatedAt: order.updatedAt.toISOString(),
    });
  } catch (error) {
    console.error("Failed to update order status:", error);
    return NextResponse.json(
      { error: "Failed to update order" },
      { status: 500 }
    );
  }
}
