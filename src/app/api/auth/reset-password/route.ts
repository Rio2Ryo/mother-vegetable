import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { token, email, password } = await request.json();

    if (!token || !email?.trim() || !password) {
      return NextResponse.json(
        { error: "errorTokenInvalid" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "errorPasswordLength" },
        { status: 400 }
      );
    }

    // Hash incoming token and look up
    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const verificationToken = await prisma.verificationToken.findUnique({
      where: {
        identifier_token: {
          identifier: email.trim(),
          token: hashedToken,
        },
      },
    });

    if (!verificationToken) {
      return NextResponse.json(
        { error: "errorTokenInvalid" },
        { status: 400 }
      );
    }

    if (verificationToken.expires < new Date()) {
      // Clean up expired token
      await prisma.verificationToken.delete({
        where: {
          identifier_token: {
            identifier: email.trim(),
            token: hashedToken,
          },
        },
      });
      return NextResponse.json(
        { error: "errorTokenExpired" },
        { status: 400 }
      );
    }

    // Hash new password and update user
    const hashedPassword = await bcrypt.hash(password, 12);

    await prisma.user.update({
      where: { email: email.trim() },
      data: { password: hashedPassword },
    });

    // Delete used token
    await prisma.verificationToken.delete({
      where: {
        identifier_token: {
          identifier: email.trim(),
          token: hashedToken,
        },
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Reset password error:", error);
    return NextResponse.json({ error: "errorGeneric" }, { status: 500 });
  }
}
