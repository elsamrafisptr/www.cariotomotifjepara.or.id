'use client'

import honda_new_motorcycles from '@/common/contents/products/honda/new-motorcycle-contents'

import MotorProductCard from '@/components/elements/MotorProductCard'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const Product = () => {
  return (
    <section className="min-h-screen bg-white px-5 py-8 md:px-44 md:py-0">
      <div className="flex flex-col gap-4 py-6 md:py-16">
        <div className="flex w-full items-center gap-2">
          <Input
            type="text"
            className="w-full"
            placeholder="Cari produk yang anda inginkan . . ."
          />
          <Button type="button" variant="outline">
            Filter Produk
          </Button>
          <Button type="submit" variant="default">
            Cari Produk
          </Button>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          {honda_new_motorcycles.map((item, index) => {
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
          })}
        </div>
      </div>
    </section>
  )
}

export default Product
