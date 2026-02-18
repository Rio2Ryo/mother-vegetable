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

export default nextConfig;
