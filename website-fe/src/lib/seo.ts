interface SEOProps {
  title: string
  description: string
  keywords?: string[]
  canonical?: string
  images?: string[]
  type?: 'website' | 'article'
}

export function generatePageMetadata({
  title,
  description,
  keywords = [],
  canonical,
  images = ['/default-og-image.jpg'],
  type = 'website'
}: SEOProps) {
  const baseKeywords = ['your industry', 'your location', 'your services']
  return {
    title,
    description,
    keywords: [...baseKeywords, ...keywords],
    openGraph: {
      title,
      description,
      type,
      images: images.map(img => ({
        url: img,
        width: 1200,
        height: 630,
        alt: title
      })),
      locale: 'en_US',
      siteName: 'Your Business Name'
    },
    twitter: {
      card: 'summary_large_image' as const,
      title,
      description,
      images: images[0]
    },
    alternates: canonical ? { canonical } : undefined
  }
}
