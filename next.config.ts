import type { NextConfig } from "next";
import { MIGRATION_REDIRECTS } from "./src/lib/redirects-data";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "bluestars.us",
      },
      {
        protocol: "https",
        hostname: "www.bluestars.us",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
      {
        protocol: "https",
        hostname: "i.ytimg.com",
      },
      {
        protocol: "https",
        hostname: "i9.ytimg.com",
      },
    ],
  },
  async redirects() {
    return MIGRATION_REDIRECTS;
  },
};

export default nextConfig;
