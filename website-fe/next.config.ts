import type { NextConfig } from 'next'

import withBundleAnalyzer from '@next/bundle-analyzer'

const baseConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: true,
  serverExternalPackages: [],
  images: {
    remotePatterns: []
  },
  turbopack: {
    resolveAlias: {
      underscore: 'lodash'
    },
    resolveExtensions: ['.mdx', '.tsx', '.ts', '.jsx', '.js', '.json']
  },
  experimental: {
    optimizeCss: false,
    turbopackMinify: true,
    turbopackTreeShaking: true,
    optimisticClientCache: true,
    optimizeServerReact: true,
    optimizePackageImports: [
      'motion',
      'lucide-react',
      'react',
      'react-dom',
      '@radix-ui/react-dialog',
      '@radix-ui/react-slot'
    ],
    serverMinification: true
  }
}

const withAnalyzers = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true'
})

const nextConfig = withAnalyzers(baseConfig)

export default nextConfig
