'use client'

import { roboto } from '@/assets/fonts'

import { cn } from '@/lib/utils'

import RootLayouts from '@/components/layouts/RootLayouts'

const GlobalErrorPage = () => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('antialiased', roboto.className)}>
        <RootLayouts>Error</RootLayouts>
      </body>
    </html>
  )
}

export default GlobalErrorPage
