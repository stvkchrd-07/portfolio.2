import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Tell Turbopack the project root to avoid workspace-root detection and warnings
  // @ts-ignore - turbopack option is not yet typed in Next's NextConfig in all versions
  turbopack: { root: __dirname },

  // Use the supported `webpack` hook to adjust dev-time watchOptions.
  webpack: (config, { dev }) => {
    if (dev) {
      try {
        (config as any).watchOptions = {
          ignored: /node_modules|\.next/,
          aggregateTimeout: 200,
          poll: 1000,
        };
      } catch (e) {
        // swallow - if config shape differs, ignore
      }
    }
    return config;
  },
};

export default nextConfig;
