import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import prisma from "@/lib/prisma";
import { sendPasswordResetEmail } from "@/lib/email";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export async function POST(request: NextRequest) {
  try {
    const { email, locale } = await request.json();

    if (!email?.trim()) {
      return NextResponse.json({ success: true });
    }

    const user = await prisma.user.findUnique({
      where: { email: email.trim() },
    });

    if (user) {
      // Delete any existing reset tokens for this email
      await prisma.verificationToken.deleteMany({
        where: { identifier: email.trim() },
      });

      // Generate token
      const rawToken = crypto.randomUUID();
      const hashedToken = crypto
        .createHash("sha256")
        .update(rawToken)
        .digest("hex");

      // Store hashed token with 1-hour expiry
      await prisma.verificationToken.create({
        data: {
          identifier: email.trim(),
          token: hashedToken,
          expires: new Date(Date.now() + 60 * 60 * 1000),
        },
      });

      // Send email with raw token
      const resetUrl = `${APP_URL}/${locale || "en"}/reset-password/${rawToken}?email=${encodeURIComponent(email.trim())}`;

      await sendPasswordResetEmail(
        {
          email: email.trim(),
          name: user.name || email.trim(),
          resetUrl,
        },
        locale
      );
    }

    // Always return success to prevent email enumeration
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json({ success: true });
  }
}
