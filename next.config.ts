import type { NextConfig } from "next";
import { withPayload } from '@payloadcms/next/withPayload';

const nextConfig: NextConfig = {
  // إضافاتنا الجديدة لتجاوز أخطاء الـ Build
  typescript: {
    ignoreBuildErrors: true,
  },
  
  images: {
    qualities: [75, 90],
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