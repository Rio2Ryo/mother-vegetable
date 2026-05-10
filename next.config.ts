import createNextIntlPlugin from 'next-intl/plugin';
const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep static-only assets out of every serverless function bundle.
  // Without this, the per-function bundle exceeds Vercel's 250 MB limit
  // (public/cdn alone is ~97 MB and gets traced into all functions).
  outputFileTracingExcludes: {
    '/*': [
      './public/cdn/**',
      './public/Images/**',
      './public/images/**',
      './public/*.mp4',
      './screenshots/**',
      './e2e/**',
      './playwright-report/**',
      './test-results/**',
    ],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mv-prod-1334776400.cos.ap-singapore.myqcloud.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        { key: "X-Frame-Options", value: "DENY" },
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "X-Robots-Tag", value: "noindex, nofollow" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        {
          key: "Strict-Transport-Security",
          value: "max-age=63072000; includeSubDomains; preload",
        },
      ],
    },
  ],
};

export default withNextIntl(nextConfig);
