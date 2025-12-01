import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { BASE_URL, BRANDS_MARQUEE } from '@/common/constants'

import { getRegion } from '@/lib/data/regions'

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

type Props = {
  params: Promise<{
    countryCode: string
  }>
}

const BrandsPage = async (props: Props) => {
  const params = await props.params
  const { countryCode } = params
  const region = await getRegion(countryCode)

  if (!region) {
    notFound()
  }

  return (
    <section className="min-h-screen w-full bg-white px-5 py-12 sm:px-30">
      <div>
        <h1 className="text-3xl font-semibold">Brand/Merek Motor Tersedia</h1>
        <div className="mt-4 grid grid-cols-2 items-center gap-4 sm:gap-6 md:mt-6 md:grid-cols-3 md:gap-8">
          {BRANDS_MARQUEE.map((item, index) => {
            return (
              <Link
                href={item.href}
                key={index}
                className="aspect-video w-full rounded border hover:cursor-pointer hover:border-gray-500 md:w-80 md:rounded-lg"
              >
                <Image
                  src={item.src}
                  alt={`Brand`}
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
