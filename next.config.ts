import type { NextConfig } from 'next'
import path from 'path'

const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  output: 'export',
  basePath: isProd ? '/projekt' : '',
  assetPrefix: isProd ? '/projekt/' : '',
  trailingSlash: true,
  images: { unoptimized: true },
  typescript: { ignoreBuildErrors: true },
  reactStrictMode: true,
  eslint: { ignoreDuringBuilds: true },
}

export default nextConfig
