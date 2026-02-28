import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const { token, email } = await request.json();

    if (!token || !email?.trim()) {
      return NextResponse.json(
        { error: "errorTokenInvalid" },
        { status: 400 },
      );
    }

    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const verificationToken = await prisma.verificationToken.findUnique({
      where: {
        identifier_token: {
          identifier: `verify:${email.trim()}`,
          token: hashedToken,
        },
      },
    });

    if (!verificationToken) {
      return NextResponse.json(
        { error: "errorTokenInvalid" },
        { status: 400 },
      );
    }

    if (verificationToken.expires < new Date()) {
      await prisma.verificationToken.delete({
        where: {
          identifier_token: {
            identifier: `verify:${email.trim()}`,
            token: hashedToken,
          },
        },
      });
      return NextResponse.json(
        { error: "errorTokenExpired" },
        { status: 400 },
      );
    }

    await prisma.user.update({
      where: { email: email.trim() },
      data: { emailVerified: new Date() },
    });

    await prisma.verificationToken.delete({
      where: {
        identifier_token: {
          identifier: `verify:${email.trim()}`,
          token: hashedToken,
        },
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Verify email error:", error);
    return NextResponse.json({ error: "errorGeneric" }, { status: 500 });
  }
}
