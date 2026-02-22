import type { MetadataRoute } from "next";

const BASE_URL =
  process.env.NEXT_PUBLIC_APP_URL || "https://mother-vegetable.vercel.app";

const locales = ["en", "ja", "zh"];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "",
    "/product/achieve",
    "/product/confidence",
    "/product/forever",
    "/healthcare",
    "/achieve-howto",
    "/confidence-howto",
    "/forever-howto",
    "/mv/certifiedInstructor",
    "/privacy",
    "/terms",
  ];

  const entries: MetadataRoute.Sitemap = [];

  for (const page of staticPages) {
    for (const locale of locales) {
      const url = `${BASE_URL}/${locale}${page}`;
      entries.push({
        url,
        lastModified: new Date(),
        changeFrequency: page === "" ? "weekly" : "monthly",
        priority: page === "" ? 1.0 : page.startsWith("/product") ? 0.9 : 0.7,
        alternates: {
          languages: Object.fromEntries(
            locales.map((l) => [l, `${BASE_URL}/${l}${page}`])
          ),
        },
      });
    }
  }

  return entries;
}
