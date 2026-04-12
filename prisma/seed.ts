import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import path from "path";

// ---------------------------------------------------------------------------
// DB connection (mirrors src/lib/prisma.ts logic)
// ---------------------------------------------------------------------------

function resolveDbUrl(): string {
  const raw = process.env.DATABASE_URL;
  if (!raw) {
    return `file:${path.resolve(process.cwd(), "dev.db")}`;
  }
  if (
    raw.startsWith("libsql://") ||
    raw.startsWith("https://") ||
    raw.startsWith("http://")
  ) {
    return raw;
  }
  if (raw.startsWith("file:")) {
    const filePart = raw.slice(5);
    if (path.isAbsolute(filePart)) return raw;
    return `file:${path.resolve(process.cwd(), filePart)}`;
  }
  return raw;
}

const url = resolveDbUrl();
const isRemote =
  url.startsWith("libsql://") ||
  url.startsWith("https://") ||
  url.startsWith("http://");

const adapter = new PrismaLibSql({
  url,
  ...(isRemote ? { authToken: process.env.DATABASE_AUTH_TOKEN } : {}),
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const prisma = new PrismaClient({ adapter } as any);

// ---------------------------------------------------------------------------
// Product seed data
// ---------------------------------------------------------------------------

const products = [
  {
    name: "Achieve",
    slug: "achieve",
    description:
      "48 different nutrients at once. Supports a healthy gut, regeneration of cells throughout the body.",
    price: 36.7,
    currency: "USD",
    images: JSON.stringify(["/cdn/products_achieve_10001.png"]),
    category: "food",
    sku: "MV-ACH-030",
    inStock: true,
  },
  {
    name: "Confidence",
    slug: "confidence",
    description: "Skin Healing Effect. Powerful anti-aging benefits.",
    price: 36.7,
    currency: "USD",
    images: JSON.stringify(["/cdn/products_confidence_10001.png"]),
    category: "cosmetic",
    sku: "MV-CON-030",
    inStock: true,
  },
  {
    name: "Tilapia",
    slug: "tilapia",
    description:
      "Fresh Izumi Tai enriched with 48 natural nutrients for a healthy lifestyle.",
    price: 13.5,
    currency: "USD",
    images: JSON.stringify(["/cdn/mv_tilapia.jpg"]),
    category: "food",
    sku: "MV-TIL-001",
    inStock: true,
  },
  {
    name: "MV Salt",
    slug: "mv-salt",
    description:
      "Green nutrient-infused salt. 50g. Rich in minerals and 48 nutrients.",
    price: 13.5,
    currency: "USD",
    images: JSON.stringify(["/cdn/mv_salt.jpg"]),
    category: "food",
    sku: "MV-SAL-050",
    inStock: true,
  },
  {
    name: "MV Soy Sauce",
    slug: "mv-soy-sauce",
    description:
      "Premium dark soy sauce with 48 nutrients. 150ml. Rich umami flavor.",
    price: 13.5,
    currency: "USD",
    images: JSON.stringify(["/cdn/mv_soy_sauce.jpg"]),
    category: "food",
    sku: "MV-SOY-150",
    inStock: true,
  },
  {
    name: "MV Toner",
    slug: "mv-toner",
    description:
      "Nutrient-infused facial toner with Confidence collagen. 150ml. Skin healing and anti-aging.",
    price: 13.5,
    currency: "USD",
    images: JSON.stringify(["/cdn/mv_toner.jpg"]),
    category: "cosmetic",
    sku: "MV-TON-150",
    inStock: true,
  },
  {
    name: "MV Balm",
    slug: "mv-balm",
    description:
      "Luxury nutrient-rich balm with Confidence collagen. 50g. Multi-purpose skin healing.",
    price: 13.5,
    currency: "USD",
    images: JSON.stringify(["/cdn/mv_balm.jpg"]),
    category: "cosmetic",
    sku: "MV-BAL-050",
    inStock: true,
  },
  {
    name: "MV Soap",
    slug: "mv-soap",
    description:
      "Handcrafted green nutrient-rich soap with Confidence collagen. 100g. Deep cleansing with skin care.",
    price: 13.5,
    currency: "USD",
    images: JSON.stringify(["/cdn/mv_soap.jpg"]),
    category: "cosmetic",
    sku: "MV-SOP-100",
    inStock: true,
  },
];

// ---------------------------------------------------------------------------
// Seed
// ---------------------------------------------------------------------------

async function main() {
  console.log("Seeding products...");

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {
        name: product.name,
        description: product.description,
        price: product.price,
        currency: product.currency,
        images: product.images,
        category: product.category,
        sku: product.sku,
        inStock: product.inStock,
      },
      create: product,
    });
    console.log(`  Upserted: ${product.name}`);
  }

  console.log("Done. 9 products seeded.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
