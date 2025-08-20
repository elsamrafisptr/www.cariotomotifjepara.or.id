import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { BASE_URL } from '@/common/constants'
import { Brand } from '@/common/types'
import { brandService } from '@/services'

export const metadata: Metadata = {
  title: 'Brand/Merek',
  description:
    'Pelajari lebih lanjut tentang brand/merek dari Cari Otomotif, platform terpercaya untuk jual beli motor, mobil, dan sparepart baru & bekas di Jepara.',
  keywords: [
    'brand Otomotif Jepara',
    'merek Otomotif Jepara',
    'dealer motor Jepara',
    'dealer mobil Jepara',
    'sparepart otomotif Jepara'
  ],
  openGraph: {
    url: `${BASE_URL}/brands`,
    type: 'website',
    title: 'Brand/Merek',
    description:
      'Cari Otomotif Jepara adalah platform terpercaya untuk jual beli otomotif di Jepara.',
    images: [
      {
        url: `${BASE_URL}/images/about.jpg`,
        width: 1200,
        height: 630,
        alt: 'Brand/Merek Cari Otomotif Jepara'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Brand/Merek',
    description: 'Platform terpercaya untuk jual beli otomotif di Jepara.'
  },
  alternates: {
    canonical: `${BASE_URL}/brands`
  }
}

const BrandsPage = async () => {
  const brands = await brandService.listBrands()

  return (
    <section className="min-h-screen w-full bg-white px-5 py-12 sm:px-30">
      <div>
        <h1 className="text-3xl font-semibold">Brand/Merek Motor Tersedia</h1>
        <div className="mt-4 grid grid-cols-2 items-center gap-4 sm:gap-6 md:mt-6 md:grid-cols-3 md:gap-8">
          {brands.map((item: Partial<Brand>, index: number) => {
            return (
              <Link
                href={'/brands' + item.url}
                key={index}
                className="aspect-video w-full rounded border hover:cursor-pointer hover:border-gray-500 md:w-80 md:rounded-lg"
              >
                <Image
                  src={item.imageUrl!}
                  alt={`Brand ${item.name}`}
                  width={1024}
                  height={1024}
                  priority
                  className="w-full rounded-lg object-cover"
                />
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default BrandsPage
