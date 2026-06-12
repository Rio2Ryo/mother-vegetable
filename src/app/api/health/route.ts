import { NextResponse } from "next/server";

export const runtime = "edge";

export function GET() {
  return NextResponse.json({
    status: "ok",
    env: process.env.VERCEL_ENV ?? "local",
    url: process.env.NEXT_PUBLIC_APP_URL ?? "unset",
    ts: new Date().toISOString(),
  });
}
