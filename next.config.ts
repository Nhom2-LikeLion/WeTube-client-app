import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "yt3.ggpht.com", // Add this hostname
        port: "",
        pathname: "/**",
      },
      // Add other remote patterns as needed
    ],
  },
};
export default nextConfig;
