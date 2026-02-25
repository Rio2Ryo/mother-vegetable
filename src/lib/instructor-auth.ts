import { createHmac } from "crypto";
import { NextRequest, NextResponse } from "next/server";

const TOKEN_EXPIRY_HOURS = 72; // 3 days

function getSecret(): string {
  const secret = process.env.AUTH_SECRET;
  if (!secret) throw new Error("AUTH_SECRET is not set");
  return secret;
}

/**
 * Create an HMAC-signed token for an instructor session.
 * Format: instructorId.expiresAt.signature
 */
export function signInstructorToken(instructorId: string): string {
  const expiresAt = Date.now() + TOKEN_EXPIRY_HOURS * 60 * 60 * 1000;
  const payload = `${instructorId}.${expiresAt}`;
  const signature = createHmac("sha256", getSecret())
    .update(payload)
    .digest("hex");
  return `${payload}.${signature}`;
}

/**
 * Verify an instructor token and return the instructorId if valid.
 * Returns null if invalid or expired.
 */
export function verifyInstructorToken(token: string): string | null {
  const parts = token.split(".");
  if (parts.length !== 3) return null;

  const [instructorId, expiresAtStr, signature] = parts;
  const expiresAt = parseInt(expiresAtStr, 10);

  if (isNaN(expiresAt) || Date.now() > expiresAt) return null;

  const payload = `${instructorId}.${expiresAtStr}`;
  const expected = createHmac("sha256", getSecret())
    .update(payload)
    .digest("hex");

  if (signature !== expected) return null;

  return instructorId;
}

/**
 * Middleware helper: extract and verify instructor token from Authorization header.
 * Returns the instructorId if valid, or a 401 response if not.
 */
export function requireInstructorAuth(
  request: NextRequest
): { instructorId: string } | NextResponse {
  const authHeader = request.headers.get("authorization");
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;

  if (!token) {
    return NextResponse.json(
      { error: "Authentication required" },
      { status: 401 }
    );
  }

  const instructorId = verifyInstructorToken(token);
  if (!instructorId) {
    return NextResponse.json(
      { error: "Invalid or expired token" },
      { status: 401 }
    );
  }

  return { instructorId };
}
