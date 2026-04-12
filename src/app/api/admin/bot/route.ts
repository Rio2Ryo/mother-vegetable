import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyAdmin } from "@/lib/admin-auth";
import { ensureNewTables } from "@/lib/ensure-tables";

function formatConfig(c: {
  id: string;
  name: string;
  systemPrompt: string;
  persona: string;
  status: string;
  welcomeMessage: string;
  trainingNotes: string;
  createdAt: Date;
  updatedAt: Date;
}) {
  return {
    id: c.id,
    name: c.name,
    systemPrompt: c.systemPrompt,
    persona: c.persona,
    status: c.status,
    welcomeMessage: c.welcomeMessage,
    trainingNotes: c.trainingNotes,
    createdAt: c.createdAt.toISOString(),
    updatedAt: c.updatedAt.toISOString(),
  };
}

async function getOrCreateConfig() {
  let config = await prisma.botConfig.findFirst();
  if (!config) {
    config = await prisma.botConfig.create({ data: {} });
  }
  return config;
}

export async function GET(request: NextRequest) {
  const denied = await verifyAdmin(request);
  if (denied) return denied;
  await ensureNewTables();

  try {
    const config = await getOrCreateConfig();
    return NextResponse.json(formatConfig(config));
  } catch (error) {
    console.error("Failed to fetch bot config:", error);
    return NextResponse.json(
      { error: "Failed to fetch bot config" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  const denied = await verifyAdmin(request);
  if (denied) return denied;
  await ensureNewTables();

  try {
    const body = await request.json();
    const existing = await getOrCreateConfig();

    const allowedFields = [
      "name",
      "systemPrompt",
      "persona",
      "status",
      "welcomeMessage",
      "trainingNotes",
    ] as const;

    const data: Record<string, string> = {};
    for (const field of allowedFields) {
      if (field in body) {
        data[field] = String(body[field]);
      }
    }

    if (data.status && !["active", "inactive"].includes(data.status)) {
      return NextResponse.json(
        { error: "status must be 'active' or 'inactive'" },
        { status: 400 }
      );
    }

    const updated = await prisma.botConfig.update({
      where: { id: existing.id },
      data,
    });

    return NextResponse.json(formatConfig(updated));
  } catch (error) {
    console.error("Failed to update bot config:", error);
    return NextResponse.json(
      { error: "Failed to update bot config" },
      { status: 500 }
    );
  }
}
