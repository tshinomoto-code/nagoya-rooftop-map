import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "unpkg.com",
      },
    ],
    // Allow unoptimized local images
    unoptimized: true,
  },
};

export default nextConfig;
