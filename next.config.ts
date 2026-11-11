import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/vetexpress",
        destination: "https://vetexpress-sv.vercel.app",
        permanent: true,
      },
      {
        source: "/vetexpress/:path*",
        destination: "https://vetexpress-sv.vercel.app/:path*",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/demo/pintores-gardel",
        destination: "/demo/pintores-gardel/index.html",
      },
      {
        source: "/demo/pintores-gardel/",
        destination: "/demo/pintores-gardel/index.html",
      },
    ];
  },
};

export default nextConfig;
