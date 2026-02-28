import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import prisma from "@/lib/prisma";
import { sendEmailVerificationEmail } from "@/lib/email";

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

    if (user && !user.emailVerified) {
      await prisma.verificationToken.deleteMany({
        where: { identifier: `verify:${email.trim()}` },
      });

      const rawToken = crypto.randomUUID();
      const hashedToken = crypto
        .createHash("sha256")
        .update(rawToken)
        .digest("hex");

      await prisma.verificationToken.create({
        data: {
          identifier: `verify:${email.trim()}`,
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
        locale,
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Send verification error:", error);
    return NextResponse.json({ success: true });
  }
}
