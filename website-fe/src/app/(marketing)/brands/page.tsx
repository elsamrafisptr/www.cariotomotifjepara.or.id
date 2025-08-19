import Image from 'next/image'
import Link from 'next/link'

import { Brand } from '@/common/types'

import { getBaseUrl } from '@/lib/utils'

const BrandsPage = async () => {
  const url = new URL('/api/v1/brands', getBaseUrl()).toString()
  const res = await fetch(url, { next: { revalidate: 60 } })
  if (!res.ok) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        Mohon Maaf Menunggu Website Sedang Dalam Perbaikan
      </div>
    )
  }
  const brands = await res.json()

  return (
    <section className="min-h-screen w-full bg-white px-5 py-12 sm:px-30">
      <div>
        <h1 className="text-3xl font-semibold">Brand/Merek Motor Tersedia</h1>
        <div className="mt-4 grid grid-cols-2 items-center gap-4 sm:gap-6 md:mt-6 md:grid-cols-3 md:gap-8">
          {brands.result.map((item: Partial<Brand>, index: number) => {
            return (
              <Link
                href={item.url!}
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
