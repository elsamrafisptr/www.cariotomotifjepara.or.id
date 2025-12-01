import Image from 'next/image'

import honda_new_motorcycles from '@/common/contents/products/honda/new-motorcycle-contents'

import { BrandMarquee } from '@/modules/home/sections/Home'

import MotorProductCard from '@/components/elements/MotorProductCard'

const BrandDetails = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params

  const dataByBrand = honda_new_motorcycles.filter(
    moto => moto.brand.toLocaleLowerCase() === slug[1]
  )

  const imageByBrand = BrandMarquee.filter(moto =>
    moto.href.toLocaleLowerCase().includes(slug[1]!.toLocaleLowerCase())
  )

  return (
    <section className="flex min-h-screen flex-col gap-4 bg-white px-5 py-8 md:px-44">
      <div className="flex items-center gap-4 md:gap-8">
        {imageByBrand.map((item, index) => {
          return (
            <article
              key={index}
              className="aspect-video w-1/2 rounded border hover:cursor-pointer md:w-1/3 md:rounded-lg"
            >
              <Image
                src={item.src}
                alt={`Brand ${index}`}
                width={1024}
                height={1024}
                className="w-full rounded-lg object-cover"
              />
            </article>
          )
        })}
        <h1 className="text-4xl font-semibold capitalize md:text-6xl">{slug[1]}</h1>
      </div>
      <div className="grid grid-cols-1 gap-x-6 gap-y-8 py-8 md:grid-cols-3 md:gap-x-16 md:py-16">
        {dataByBrand.length > 0 ? (
          dataByBrand.map((item, index) => {
            return (
              <MotorProductCard
                key={index}
                title={item.title}
                brand={item.brand}
                images={item.more_information!.images}
                price={item.pricing.otrPrice}
                rating={item.more_information!.reviews.rating}
                reviewCount={item.more_information!.reviews.total}
                originalPrice={item.pricing.listingPrice}
                transmission={item.transmission}
                fuel={item.fuelType}
              />
            )
          })
        ) : (
          <div className="col-span-1 flex h-48 w-full items-center justify-center rounded-lg bg-gray-100 text-xs text-gray-600 md:col-span-3 md:h-64 md:text-sm">
            Belum ada produk tersedia pada bagian brand {slug[1]}
          </div>
        )}
      </div>
    </section>
  )
}

export default BrandDetails
