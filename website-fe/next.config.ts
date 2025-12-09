import type { NextConfig } from 'next'

import withBundleAnalyzer from '@next/bundle-analyzer'

const baseConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: true,
  logging: {
    fetches: {
      fullUrl: true
    }
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  typescript: {
    ignoreBuildErrors: true
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ik.imagekit.io',
        port: ''
      }
    ]
  },
  turbopack: {
    resolveAlias: {
      underscore: 'lodash'
    },
    resolveExtensions: ['.mdx', '.tsx', '.ts', '.jsx', '.js', '.json']
  },
  experimental: {
    optimizePackageImports: [
      'motion',
      'lucide-react',
      'react',
      'react-dom',
      '@radix-ui/react-dialog',
      '@radix-ui/react-slot',
      '@imagekit/next'
    ]
  }
}

const withAnalyzers = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true'
})

const nextConfig = withAnalyzers(baseConfig)

export default nextConfig
