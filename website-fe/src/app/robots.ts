import { MetadataRoute } from 'next'

import { getBaseUrl } from '@/lib/utils'

export default function robots(): MetadataRoute.Robots {
  const BASE_URL = getBaseUrl()
  const isProduction = process.env.NODE_ENV === 'production'

  if (!isProduction) {
    return {
      rules: {
        userAgent: '*',
        disallow: '/'
      },
      sitemap: `${BASE_URL}/sitemap.xml`
    }
  }

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/api/*',
          '/admin/',
          '/admin/*',
          '/auth/',
          '/upload/',
          '/dashboard/',
          '/wp-admin/',
          '/_next/',
          '/private/',
          '/404',
          '/500',
          '/login',
          '/register'
        ],
        crawlDelay: 1
      },

      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/', '/admin/', '/_next/', '/private/']
      },

      {
        userAgent: ['AhrefsBot', 'SemrushBot', 'MJ12bot'],
        disallow: '/'
      }
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL
  }
}
