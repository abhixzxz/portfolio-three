import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disable lint errors during build for production deployment
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Disable TypeScript errors during build (use with caution)
  typescript: {
    ignoreBuildErrors: true,
  },
  // Security headers for SEO trust signals
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains",
          },
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://res.cloudinary.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https:;",
          },
        ],
      },
    ];
  },

  // Remove webpack configuration when using Turbopack
  // Turbopack handles optimization automatically

  // Image optimization for SEO
  images: {
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",

    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.cloudinary.com",
        pathname: "/**",
      },
    ],
  },

  // Compression for better SEO performance
  compress: true,

  // Generate source maps for better debugging
  productionBrowserSourceMaps: false,

  // Optimize for production
  poweredByHeader: false,

  // Enable React 18 features for better performance
  reactStrictMode: true,

  // Remove swcMinify as it's not a valid option in NextConfig
  // Turbopack handles minification automatically
};

export default nextConfig;
