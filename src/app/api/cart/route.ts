import { NextRequest, NextResponse } from "next/server";

export interface CartItemPayload {
  productId: string;
  name: string;
  price: number;
  currency: string;
  quantity: number;
  image: string;
  variant?: string;
}

export interface CartResponse {
  items: CartItemPayload[];
  totalItems: number;
  totalPrice: number;
  currency: string;
}

function formatCart(items: CartItemPayload[]): CartResponse {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const currency = items.length > 0 ? items[0].currency : "USD";

  return {
    items,
    totalItems,
    totalPrice,
    currency,
  };
}

export async function GET() {
  return NextResponse.json<CartResponse>(formatCart([]));
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const items: CartItemPayload[] = Array.isArray(body.items)
      ? body.items
      : [];

    return NextResponse.json<CartResponse>(formatCart(items));
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}
