import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disable ESLint during production builds (recommended way)
  eslint: {
    ignoreDuringBuilds: true, // This skips next lint / ESLint entirely on build
  },

  // Optional: also disable TypeScript type checking during build
  // (useful if you're in a hurry and want the build to pass regardless of type errors)
  typescript: {
    ignoreBuildErrors: true,
  },

  // your other config options...
};

export default nextConfig;
