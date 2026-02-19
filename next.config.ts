import createNextIntlPlugin from 'next-intl/plugin';
const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "mv-prod-1334776400.cos.ap-singapore.myqcloud.com",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
