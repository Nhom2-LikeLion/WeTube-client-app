import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["placehold.co"], // 👈 allow this host
  },
  /* config options here */
};

export default nextConfig;
