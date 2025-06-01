import type { Metadata, Viewport } from 'next'

import { geistMono, geistSans } from '@/assets/fonts'

import RootLayouts from '@/components/layouts/RootLayouts'

import '../assets/globals.css'

export const metadata: Metadata = {
  title: {
    absolute: 'Pencarian Otomotif Jepara Terlengkap',
    default: 'Pencarian Otomotif Jepara Terlengkap',
    template: ''
  }
}

export const viewport: Viewport = {
  maximumScale: 1
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <RootLayouts>{children}</RootLayouts>
      </body>
    </html>
  )
}
