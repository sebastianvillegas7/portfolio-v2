import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  allowedDevOrigins: [
    "192.168.1.4",
  ],

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "randomuser.me",
        pathname: "/api/portraits/**",
      },
    ],
  },
};

export default nextConfig;
