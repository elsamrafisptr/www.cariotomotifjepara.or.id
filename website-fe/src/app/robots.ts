import { MetadataRoute } from 'next'

import { BASE_URL } from '@/common/constants'

export default function robots(): MetadataRoute.Robots {
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
          '/private/',
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
        userAgent: 'Googlebot-Image',
        allow: ['/images/', '/uploads/']
      },

      {
        userAgent: 'Googlebot-News',
        allow: '/'
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
