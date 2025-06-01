'use client'

import { geistMono, geistSans } from '@/assets/fonts'

import RootLayouts from '@/components/layouts/RootLayouts'

const GlobalErrorPage = () => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <RootLayouts>Error</RootLayouts>
      </body>
    </html>
  )
}

export default GlobalErrorPage
