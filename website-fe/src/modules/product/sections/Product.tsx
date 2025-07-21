'use client'

import honda_new_motorcycles from '@/common/contents/products/honda/new-motorcycle-contents'

import MotorProductCard from '@/components/elements/MotorProductCard'

const Product = () => {
  return (
    <section className="min-h-screen bg-white px-5 py-8 md:px-44 md:py-0">
      <div className="grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-3 md:gap-x-16 md:py-16">
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
    </section>
  )
}

export default Product
