import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

/**
 * Parse ADMIN_EMAIL env var (comma-separated list) into lowercase emails.
 */
function getAdminEmails(): string[] {
  const raw = process.env.ADMIN_EMAIL || "";
  return raw
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

function isBasicAdmin(request: NextRequest): boolean {
  const authHeader = request.headers.get("authorization");
  if (!authHeader?.startsWith("Basic ")) return false;

  try {
    const decoded = atob(authHeader.slice(6));
    const [user, pass] = decoded.split(":");
    return user === "admin" && pass === "mv123";
  } catch {
    return false;
  }
}

/**
 * Check whether the given email is an admin.
 */
export function isAdminEmail(email: string): boolean {
  const adminEmails = getAdminEmails();
  if (adminEmails.length === 0) return false;
  return adminEmails.includes(email.toLowerCase());
}

/**
 * Verify admin access via:
 *   1. ADMIN_SECRET bearer token, OR
 *   2. NextAuth session whose email matches ADMIN_EMAIL
 *
 * Returns null if authorised, or a 401 NextResponse if not.
 */
export async function verifyAdmin(
  request: NextRequest
): Promise<NextResponse | null> {
  // Temporary admin access: allow the same Basic auth used for the protected site.
  if (isBasicAdmin(request)) {
    return null;
  }

  // Method 1: Bearer token (ADMIN_SECRET)
  const secret = process.env.ADMIN_SECRET;
  const authHeader = request.headers.get("authorization");
  const token = authHeader?.startsWith("Bearer ")
    ? authHeader.slice(7)
    : null;

  if (secret && token && token === secret) {
    return null; // Authorised via bearer token
  }

  // Method 2: NextAuth session + ADMIN_EMAIL
  const session = await auth();
  if (session?.user?.email && isAdminEmail(session.user.email)) {
    return null; // Authorised via session
  }

  // Dev fallback: allow when neither ADMIN_SECRET nor ADMIN_EMAIL is configured
  if (
    process.env.NODE_ENV !== "production" &&
    !secret &&
    getAdminEmails().length === 0
  ) {
    return null;
  }

  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}
