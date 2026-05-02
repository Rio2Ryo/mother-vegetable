import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { sendEmailVerificationEmail } from "@/lib/email";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export async function POST(request: NextRequest) {
  try {
    const { username, email, password, locale } = await request.json();

    if (!username?.trim()) {
      return NextResponse.json({ error: "errorUsernameRequired" }, { status: 400 });
    }
    if (!email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "errorEmailRequired" }, { status: 400 });
    }
    if (!password || password.length < 6) {
      return NextResponse.json({ error: "errorPasswordLength" }, { status: 400 });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const existing = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    const hashedPassword = await bcrypt.hash(password, 12);

    // If this email was first used for a guest purchase, a user row may already
    // exist without a password. Convert that guest record into a real account so
    // past orders remain attached to the same email/user.
    if (existing?.password) {
      return NextResponse.json({ error: "errorEmailExists" }, { status: 409 });
    }

    const user = existing
      ? await prisma.user.update({
          where: { id: existing.id },
          data: {
            name: username.trim(),
            password: hashedPassword,
          },
        })
      : await prisma.user.create({
          data: {
            name: username.trim(),
            email: normalizedEmail,
            password: hashedPassword,
          },
        });

    // Send verification email
    try {
      const rawToken = crypto.randomUUID();
      const hashedToken = crypto
        .createHash("sha256")
        .update(rawToken)
        .digest("hex");

      await prisma.verificationToken.create({
        data: {
          identifier: `verify:${normalizedEmail}`,
          token: hashedToken,
          expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        },
      });

      const verifyUrl = `${APP_URL}/${locale || "en"}/verify-email/${rawToken}?email=${encodeURIComponent(normalizedEmail)}`;

      await sendEmailVerificationEmail(
        {
          email: normalizedEmail,
          name: user.name || normalizedEmail,
          verifyUrl,
        },
        locale
      );
    } catch (emailError) {
      // Don't fail signup if verification email fails
      console.error("Failed to send verification email:", emailError);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Signup failed:", error);
    return NextResponse.json({ error: "errorGeneric" }, { status: 500 });
  }
}
