import { NextRequest, NextResponse } from "next/server";

/**
 * Verify admin access via ADMIN_SECRET bearer token.
 * Returns null if authorised, or a 401 NextResponse if not.
 */
export function verifyAdmin(request: NextRequest): NextResponse | null {
  const secret = process.env.ADMIN_SECRET;

  // If ADMIN_SECRET is not configured, deny all access in production
  if (!secret) {
    if (process.env.NODE_ENV === "production") {
      return NextResponse.json(
        { error: "Admin access not configured" },
        { status: 401 }
      );
    }
    // In development, allow access without secret for convenience
    return null;
  }

  const authHeader = request.headers.get("authorization");
  const token = authHeader?.startsWith("Bearer ")
    ? authHeader.slice(7)
    : null;

  if (token !== secret) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  return null;
}
