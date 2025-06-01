import type { Metadata, Viewport } from 'next'

import { ReactNode } from 'react'

import '../assets/globals.css'

import { geistMono, geistSans } from '@/assets/fonts'

import { getBaseUrl } from '@/lib/utils'

import RootLayouts from '@/components/layouts/RootLayouts'

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

export const viewport: Viewport = {
  viewportFit: 'auto',
  width: 'device-width',
  initialScale: 1
}

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              '@id': `${BASE_URL}/#organization`,
              name: 'Cari Otomotif Jepara',
              url: BASE_URL,
              logo: {
                '@type': 'ImageObject',
                url: `${BASE_URL}/logo.png`,
                width: 800,
                height: 600
              },
              description: 'What your business does and specializes in',
              foundingDate: '2025',
              numberOfEmployees: {
                '@type': 'QuantitativeValue',
                value: '2-10'
              },
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Your City',
                addressRegion: 'Your State',
                addressCountry: 'ID'
              },
              areaServed: [
                {
                  '@type': 'Place',
                  name: 'Your Primary Market'
                },
                {
                  '@type': 'Place',
                  name: 'Your Secondary Market'
                }
              ],
              serviceType: ['Service 1', 'Service 2', 'Service 3']
            })
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              '@id': `${BASE_URL}/#website`,
              url: BASE_URL,
              name: 'Cari Otomotif Jepara',
              description: 'Brief description of your website',
              publisher: {
                '@id': `${BASE_URL}/#organization`
              },
              inLanguage: 'id-ID'
            })
          }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <RootLayouts>{children}</RootLayouts>
      </body>
    </html>
  )
}
