import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    const { username, email, password } = await request.json();

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

    await prisma.user.create({
      data: {
        name: username.trim(),
        email: email.trim(),
        password: hashedPassword,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Signup failed:", error);
    return NextResponse.json({ error: "errorGeneric" }, { status: 500 });
  }
}
