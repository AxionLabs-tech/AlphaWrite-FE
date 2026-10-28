import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
  async redirects() {
    return [
      { source: "/write", destination: "/dashboard/write", permanent: true },
      { source: "/write/quick", destination: "/dashboard/humanize", permanent: true },
      { source: "/dashboard/quick", destination: "/dashboard/humanize", permanent: true },
      { source: "/history", destination: "/dashboard/history", permanent: true },
      { source: "/dashboard/study", destination: "/dashboard/decks", permanent: false },
      { source: "/dashboard/study/session", destination: "/dashboard/decks/session", permanent: false },
    ];
  },
};

export default nextConfig;
