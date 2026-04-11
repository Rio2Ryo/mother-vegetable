import prisma from "./prisma";

let _ensured = false;

/**
 * Ensure News and Coupon tables exist (for SQLite/libsql environments
 * where Prisma migrations may not have run).
 */
export async function ensureNewTables() {
  if (_ensured) return;
  _ensured = true;

  try {
    await (prisma as any).$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "News" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "title" TEXT NOT NULL,
        "content" TEXT NOT NULL,
        "slug" TEXT NOT NULL,
        "isPublished" BOOLEAN NOT NULL DEFAULT false,
        "publishedAt" DATETIME,
        "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" DATETIME NOT NULL
      )
    `);
    await (prisma as any).$executeRawUnsafe(`
      CREATE UNIQUE INDEX IF NOT EXISTS "News_slug_key" ON "News"("slug")
    `);
    await (prisma as any).$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "Coupon" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "code" TEXT NOT NULL,
        "discountType" TEXT NOT NULL DEFAULT 'percentage',
        "discountValue" REAL NOT NULL,
        "minOrderAmount" REAL,
        "maxUses" INTEGER,
        "usedCount" INTEGER NOT NULL DEFAULT 0,
        "isActive" BOOLEAN NOT NULL DEFAULT true,
        "expiresAt" DATETIME,
        "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" DATETIME NOT NULL
      )
    `);
    await (prisma as any).$executeRawUnsafe(`
      CREATE UNIQUE INDEX IF NOT EXISTS "Coupon_code_key" ON "Coupon"("code")
    `);
  } catch (e) {
    console.error("[ensureNewTables] Error:", e);
  }
}
