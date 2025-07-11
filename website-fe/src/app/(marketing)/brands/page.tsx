import Image from 'next/image'
import Link from 'next/link'

import { BrandMarquee } from '@/modules/home/sections/Home'

const BrandsPage = () => {
  return (
    <section className="min-h-screen w-full bg-white px-5 py-12 sm:px-30">
      <div>
        <h1 className="text-3xl font-semibold">Brand/Merek Motor Tersedia</h1>
        <div className="mt-4 grid grid-cols-2 items-center gap-4 sm:gap-6 md:mt-6 md:grid-cols-3 md:gap-8">
          {BrandMarquee.map((item, index) => {
            return (
              <Link
                href={item.href}
                key={index}
                className="aspect-video w-full rounded border hover:cursor-pointer hover:border-gray-500 md:w-80 md:rounded-lg"
              >
                <Image
                  src={item.src}
                  alt={`Brand ${index}`}
                  width={1024}
                  height={1024}
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
