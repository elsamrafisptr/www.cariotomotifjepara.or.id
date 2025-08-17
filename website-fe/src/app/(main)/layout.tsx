import type { Metadata } from 'next'

import { ReactNode } from 'react'

import { getBaseUrl } from '@/lib/utils'

import DashboardLayouts from '@/components/layouts/dashboard-layouts'

const BASE_URL = getBaseUrl()

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Bantu Cari Otomotif Terbaik Buat Kamu',
    template: '%s | Cari Otomotif Jepara'
  },
  description:
    'Compelling description with location and services. Include your main keywords naturally while staying under 160 characters.',
  keywords: [
    'primary service + location',
    'secondary service + location',
    'industry keywords',
    'local keywords'
  ],
  authors: [{ name: 'Your Business Name' }],
  creator: 'Your Business Name',
  publisher: 'Your Business Name',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: BASE_URL,
    title: 'Your Business - Professional Service',
    description: 'Engaging description for social media sharing',
    images: [
      {
        url: '/hero-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Descriptive alt text for your main image'
      }
    ],
    siteName: 'Cari Otomotif Jepara'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Your Business - Professional Service',
    description: 'Engaging description for Twitter sharing',
    images: ['/hero-image.jpg']
  },
  alternates: {
    canonical: BASE_URL
  },
  other: {
    'theme-color': '#your-brand-color',
    'msapplication-TileColor': '#your-brand-color'
  }
}

export default function DashboardLayout({
  children
}: Readonly<{
  children: ReactNode
}>) {
  return <DashboardLayouts>{children}</DashboardLayouts>
}
