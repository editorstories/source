// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Inga basePath eller output-inställningar här
  reactStrictMode: true,
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
}

export default nextConfig