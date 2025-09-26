import type { NextConfig } from 'next';
import { configService } from './util/config';

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.arijit.xyz'
      },
      {
        protocol: 'https',
        hostname: 'media.meowfans.app'
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos'
      },
      {
        protocol: 'https',
        hostname: 'avatar.iran.liara.run'
      }
    ]
  }
};

export default nextConfig;
