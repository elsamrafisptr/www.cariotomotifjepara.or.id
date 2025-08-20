import type { Metadata, Viewport } from 'next'

import { BASE_URL } from '@/common/constants'
import { ReactNode } from 'react'

import '../assets/globals.css'

import { roboto } from '@/assets/fonts'

import { cn } from '@/lib/utils'

import RootLayouts from '@/components/layouts/RootLayouts'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Bantu Cari Otomotif - Motor, Mobil, Sparepart Baru & Bekas',
    template: '%s | Cari Otomotif (Motor, Mobil, Sparepart Baru & Bekas)'
  },
  description:
    'Temukan motor, mobil, dan sparepart baru & bekas terbaik di Jepara. Harga terjangkau, pilihan lengkap, dan terpercaya.',
  keywords: [
    'jual motor Jepara',
    'jual mobil Jepara',
    'sparepart mobil Jepara',
    'sparepart motor Jepara',
    'otomotif Jepara',
    'dealer mobil Jepara',
    'dealer motor Jepara'
  ],
  authors: [{ name: 'Cari Otomotif' }],
  creator: 'Cari Otomotif',
  publisher: 'Cari Otomotif',
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
    title: 'Cari Otomotif - Motor, Mobil, Sparepart Baru & Bekas',
    description:
      'Beli motor, mobil, dan sparepart baru & bekas di Jepara. Pilihan lengkap, harga terbaik, terpercaya.',
    images: [
      {
        url: '/hero-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Motor, Mobil, dan Sparepart Baru & Bekas'
      }
    ],
    siteName: 'Cari Otomotif'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Your Business - Professional Service',
    description: 'Engaging description for Twitter sharing',
    images: ['/hero-image.jpg']
  },
  alternates: {
    canonical: BASE_URL
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
            __html: JSON.stringify(
              {
                '@context': 'https://schema.org',
                '@type': 'AutoDealer',
                '@id': `${BASE_URL}/#business`,
                name: 'Cari Otomotif',
                url: BASE_URL,
                logo: {
                  '@type': 'ImageObject',
                  url: `${BASE_URL}/logo.png`,
                  width: 800,
                  height: 600
                },
                image: `${BASE_URL}/hero-image.jpg`,
                description:
                  'Jual beli motor, mobil, dan sparepart baru & bekas terpercaya di Jepara.',
                slogan: 'Pilihan Otomotif Terlengkap di Jepara',
                telephone: '+62-812-3456-7890',
                priceRange: 'Rp',
                foundingDate: '2025',
                address: {
                  '@type': 'PostalAddress',
                  streetAddress: 'Jl. Raya Jepara No.123',
                  addressLocality: 'Jepara',
                  addressRegion: 'Jawa Tengah',
                  postalCode: '59411',
                  addressCountry: 'ID'
                },
                geo: {
                  '@type': 'GeoCoordinates',
                  latitude: -6.5944,
                  longitude: 110.678
                },
                areaServed: [
                  { '@type': 'Place', name: 'Jepara' },
                  { '@type': 'Place', name: 'Kudus' },
                  { '@type': 'Place', name: 'Demak' }
                ],
                openingHoursSpecification: [
                  {
                    '@type': 'OpeningHoursSpecification',
                    dayOfWeek: [
                      'Monday',
                      'Tuesday',
                      'Wednesday',
                      'Thursday',
                      'Friday',
                      'Saturday'
                    ],
                    opens: '08:00',
                    closes: '17:00'
                  },
                  {
                    '@type': 'OpeningHoursSpecification',
                    dayOfWeek: 'Sunday',
                    opens: '09:00',
                    closes: '15:00'
                  }
                ],
                sameAs: [
                  'https://facebook.com/cariotomotif',
                  'https://instagram.com/cariotomotif',
                  'https://wa.me/628122851744'
                ],
                makesOffer: [
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'Jual Beli Motor Bekas',
                      description: 'Motor bekas berkualitas dan bergaransi di Jepara'
                    },
                    availability: 'https://schema.org/InStock'
                  },
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'Jual Beli Mobil Bekas',
                      description: 'Mobil bekas terpercaya dengan harga terbaik'
                    },
                    availability: 'https://schema.org/InStock'
                  },
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'Sparepart Otomotif',
                      description: 'Sparepart motor & mobil baru dan bekas'
                    },
                    availability: 'https://schema.org/InStock'
                  }
                ],
                aggregateRating: {
                  '@type': 'AggregateRating',
                  ratingValue: '5',
                  reviewCount: '36'
                },
                review: [
                  {
                    '@type': 'Review',
                    author: { '@type': 'Person', name: 'Ahmad' },
                    reviewRating: {
                      '@type': 'Rating',
                      ratingValue: '5'
                    },
                    reviewBody:
                      'Pelayanan ramah, motor yang saya beli kondisinya bagus dan harga terjangkau.'
                  },
                  {
                    '@type': 'Review',
                    author: { '@type': 'Person', name: 'Siti' },
                    reviewRating: {
                      '@type': 'Rating',
                      ratingValue: '5'
                    },
                    reviewBody:
                      'Tempat terbaik untuk cari sparepart mobil, lengkap dan terpercaya.'
                  },
                  {
                    '@type': 'Review',
                    author: { '@type': 'Person', name: 'Budi' },
                    reviewRating: {
                      '@type': 'Rating',
                      ratingValue: '5'
                    },
                    reviewBody:
                      'Mobil bekas berkualitas, pelayanan sangat profesional. Sangat puas.'
                  }
                ]
              },
              null,
              2
            )
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
              name: 'Cari Otomotif',
              description:
                'Platform otomotif di Jepara untuk jual beli motor, mobil, dan sparepart baru & bekas',
              publisher: {
                '@id': `${BASE_URL}/#organization`
              },
              inLanguage: 'id-ID'
            })
          }}
        />
      </head>
      <body className={cn('antialiased', roboto.className)}>
        <RootLayouts>{children}</RootLayouts>
      </body>
    </html>
  )
}
