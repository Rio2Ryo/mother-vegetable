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

    const existing = await prisma.user.findUnique({
      where: { email: email.trim() },
    });
    if (existing) {
      return NextResponse.json({ error: "errorEmailExists" }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name: username.trim(),
        email: email.trim(),
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
          identifier: email.trim(),
          token: hashedToken,
          expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        },
      });

      const verifyUrl = `${APP_URL}/${locale || "en"}/verify-email/${rawToken}?email=${encodeURIComponent(email.trim())}`;

      await sendEmailVerificationEmail(
        {
          email: email.trim(),
          name: user.name || email.trim(),
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
