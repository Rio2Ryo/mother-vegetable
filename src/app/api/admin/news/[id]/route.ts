import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyAdmin } from "@/lib/admin-auth";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const denied = await verifyAdmin(request);
  if (denied) return denied;

  const { id } = await params;

  try {
    const body = await request.json();

    const news = await prisma.news.findUnique({ where: { id } });
    if (!news) {
      return NextResponse.json(
        { error: "News article not found" },
        { status: 404 }
      );
    }

    const data: Record<string, unknown> = {};
    if (body.title !== undefined) data.title = body.title;
    if (body.content !== undefined) data.content = body.content;
    if (body.slug !== undefined) data.slug = body.slug;
    if (body.isPublished !== undefined) {
      data.isPublished = body.isPublished;
      // Set publishedAt when publishing for the first time
      if (body.isPublished === true && !news.publishedAt) {
        data.publishedAt = new Date();
      }
      // Clear publishedAt when unpublishing
      if (body.isPublished === false) {
        data.publishedAt = null;
      }
    }

    if (Object.keys(data).length === 0) {
      return NextResponse.json(
        { error: "No valid fields to update" },
        { status: 400 }
      );
    }

    const updated = await prisma.news.update({ where: { id }, data });

    return NextResponse.json({
      id: updated.id,
      title: updated.title,
      content: updated.content,
      slug: updated.slug,
      isPublished: updated.isPublished,
      publishedAt: updated.publishedAt?.toISOString() || null,
      createdAt: updated.createdAt.toISOString(),
      updatedAt: updated.updatedAt.toISOString(),
    });
  } catch (error) {
    console.error("Failed to update news:", error);
    if (error instanceof Error && error.message.includes("Unique")) {
      return NextResponse.json(
        { error: "A news article with this slug already exists" },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { error: "Failed to update news" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const denied = await verifyAdmin(request);
  if (denied) return denied;

  const { id } = await params;

  try {
    const news = await prisma.news.findUnique({ where: { id } });
    if (!news) {
      return NextResponse.json(
        { error: "News article not found" },
        { status: 404 }
      );
    }

    await prisma.news.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete news:", error);
    return NextResponse.json(
      { error: "Failed to delete news" },
      { status: 500 }
    );
  }
}
