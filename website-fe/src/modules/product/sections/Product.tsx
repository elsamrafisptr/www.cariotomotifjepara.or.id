import React from 'react'

import honda_new_motorcycles from '@/common/contents/products/honda/new-motorcycle-contents'

import MotorProductCard from '@/components/elements/MotorProductCard'

const Product = () => {
  return (
    <section className="min-h-screen bg-white px-5 md:px-44">
      <div className="grid grid-cols-1 gap-x-6 gap-y-8 py-8 md:grid-cols-3 md:gap-x-16 md:py-16">
        {honda_new_motorcycles.splice(0, 10).map((item, index) => {
          return (
            <MotorProductCard
              key={index}
              title={item.title}
              brand={item.brand}
              images={['', '']}
              price={item.otrPrice}
              rating={4.2}
              reviewCount={504}
            />
          )
        })}
      </div>
    </section>
  )
}

export default Product
