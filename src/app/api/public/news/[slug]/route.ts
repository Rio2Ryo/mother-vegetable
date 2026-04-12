import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { ensureNewTables } from "@/lib/ensure-tables";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  await ensureNewTables();

  const { slug } = await params;

  try {
    const news = await prisma.news.findUnique({
      where: { slug },
    });

    if (!news || !news.isPublished) {
      return NextResponse.json(
        { error: "News article not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      id: news.id,
      title: news.title,
      content: news.content,
      slug: news.slug,
      publishedAt: news.publishedAt?.toISOString() || null,
    });
  } catch (error) {
    console.error("Failed to fetch news by slug:", error);
    return NextResponse.json(
      { error: "Failed to fetch news article" },
      { status: 500 }
    );
  }
}
