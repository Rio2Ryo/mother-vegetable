/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient } from "@/generated/prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import { createClient } from "@libsql/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function makePrisma() {
  const url = process.env.DATABASE_URL || "file:dev.db";
  const client = createClient({
    url,
    ...(url.startsWith("libsql://") || url.startsWith("https://")
      ? { authToken: process.env.DATABASE_AUTH_TOKEN }
      : {}),
  });
  const adapter = new PrismaLibSql(client as any);
  return new PrismaClient({ adapter } as any);
}

export const prisma = globalForPrisma.prisma ?? makePrisma();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
