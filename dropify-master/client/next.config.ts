import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false, // Disables React strict mode
  eslint: {
    ignoreDuringBuilds: true, // Disables ESLint checks during builds
  },
  typescript: {
    ignoreBuildErrors: true, // Ignores TypeScript type errors during builds
  },
};

export default nextConfig;
