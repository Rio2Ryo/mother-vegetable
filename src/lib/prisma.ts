/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient } from "@/generated/prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import path from "path";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function resolveDbUrl(): string {
  const raw = process.env.DATABASE_URL;
  if (!raw) {
    return `file:${path.resolve(process.cwd(), "dev.db")}`;
  }
  if (raw.startsWith("libsql://") || raw.startsWith("https://") || raw.startsWith("http://")) {
    return raw;
  }
  if (raw.startsWith("file:")) {
    const filePart = raw.slice(5);
    if (path.isAbsolute(filePart)) return raw;
    return `file:${path.resolve(process.cwd(), filePart)}`;
  }
  return raw;
}

function makePrisma() {
  const url = resolveDbUrl();
  const isRemote = url.startsWith("libsql://") || url.startsWith("https://") || url.startsWith("http://");

  // In Prisma 7, PrismaLibSql is a factory that takes a config object
  const adapter = new PrismaLibSql({
    url,
    ...(isRemote ? { authToken: process.env.DATABASE_AUTH_TOKEN } : {}),
  });

  return new PrismaClient({ adapter } as any);
}

export const prisma = globalForPrisma.prisma ?? makePrisma();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
