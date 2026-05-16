import type { NextConfig } from "next";
import { withPayload } from '@payloadcms/next/withPayload';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
  output: 'standalone',
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
};

export default withPayload(nextConfig);
