import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyAdmin } from "@/lib/admin-auth";
import { ensureNewTables } from "@/lib/ensure-tables";

export async function GET(request: NextRequest) {
  const denied = await verifyAdmin(request);
  if (denied) return denied;
  await ensureNewTables();

  try {
    const news = await prisma.news.findMany({
      orderBy: { createdAt: "desc" },
    });

    const formatted = news.map((n) => ({
      id: n.id,
      title: n.title,
      content: n.content,
      slug: n.slug,
      isPublished: n.isPublished,
      publishedAt: n.publishedAt?.toISOString() || null,
      createdAt: n.createdAt.toISOString(),
      updatedAt: n.updatedAt.toISOString(),
    }));

    return NextResponse.json(formatted);
  } catch (error) {
    console.error("Failed to fetch admin news:", error);
    return NextResponse.json(
      { error: "Failed to fetch news" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const denied = await verifyAdmin(request);
  if (denied) return denied;
  await ensureNewTables();

  try {
    const body = await request.json();

    const { title, content, slug, isPublished } = body;

    if (!title || !content || !slug) {
      return NextResponse.json(
        { error: "Missing required fields: title, content, slug" },
        { status: 400 }
      );
    }

    const news = await prisma.news.create({
      data: {
        title,
        content,
        slug,
        isPublished: isPublished === true,
        publishedAt: isPublished === true ? new Date() : null,
      },
    });

    return NextResponse.json({
      id: news.id,
      title: news.title,
      content: news.content,
      slug: news.slug,
      isPublished: news.isPublished,
      publishedAt: news.publishedAt?.toISOString() || null,
      createdAt: news.createdAt.toISOString(),
      updatedAt: news.updatedAt.toISOString(),
    }, { status: 201 });
  } catch (error) {
    console.error("Failed to create news:", error);
    if (error instanceof Error && error.message.includes("Unique")) {
      return NextResponse.json(
        { error: "A news article with this slug already exists" },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { error: "Failed to create news" },
      { status: 500 }
    );
  }
}
