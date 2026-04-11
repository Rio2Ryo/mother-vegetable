import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { ensureNewTables } from "@/lib/ensure-tables";

export async function GET() {
  await ensureNewTables();

  try {
    const news = await prisma.news.findMany({
      where: { isPublished: true },
      orderBy: { publishedAt: "desc" },
      take: 6,
    });

    const formatted = news.map((n) => ({
      id: n.id,
      title: n.title,
      content: n.content,
      slug: n.slug,
      publishedAt: n.publishedAt?.toISOString() || null,
    }));

    return NextResponse.json(formatted);
  } catch (error) {
    console.error("Failed to fetch public news:", error);
    return NextResponse.json(
      { error: "Failed to fetch news" },
      { status: 500 }
    );
  }
}
