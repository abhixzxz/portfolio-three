import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // For most common Cloudinary usage (your own cloud)
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        // Allow any path under your cloud name or common subfolders
        pathname: "/**", // This is the key – allow all paths
      },

      // Alternative (more restrictive but still works for your case):
      // {
      //   protocol: "https",
      //   hostname: "res.cloudinary.com",
      //   pathname: "/djv4xa6wu/**", // only your specific cloud
      // },

      // If you use other Cloudinary subdomains (rare)
      {
        protocol: "https",
        hostname: "*.cloudinary.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
