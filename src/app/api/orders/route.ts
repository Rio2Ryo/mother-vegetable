import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

interface OrderItemPayload {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface ShippingAddress {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

interface CreateOrderBody {
  shipping: ShippingAddress;
  items: OrderItemPayload[];
  currency?: string;
}

// POST - Create a new order
export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const body: CreateOrderBody = await request.json();

    if (!body.shipping || !body.items || body.items.length === 0) {
      return NextResponse.json(
        { error: "Shipping address and at least one item are required" },
        { status: 400 }
      );
    }

    const total = body.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const order = await prisma.order.create({
      data: {
        userId: session.user.id,
        status: "pending",
        total,
        currency: body.currency || "USD",
        shippingAddress: JSON.stringify(body.shipping),
        items: JSON.stringify(body.items),
      },
    });

    return NextResponse.json(
      {
        id: order.id,
        status: order.status,
        total: order.total,
        currency: order.currency,
        createdAt: order.createdAt,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to create order:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}

// GET - List orders for the authenticated user
export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Authentication required" },
        { status: 401 }
      );
    }

    const orders = await prisma.order.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
    });

    const formatted = orders.map((order) => ({
      id: order.id,
      status: order.status,
      total: order.total,
      currency: order.currency,
      shippingAddress: JSON.parse(order.shippingAddress),
      items: JSON.parse(order.items),
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    }));

    return NextResponse.json(formatted);
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    return NextResponse.json(
      { error: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}
