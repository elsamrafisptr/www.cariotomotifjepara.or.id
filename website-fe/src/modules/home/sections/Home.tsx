import Image from 'next/image'
import Link from 'next/link'

import { BRANDS_MARQUEE } from '@/common/constants'

import CarouselHeadline from './CarouselHeadline'
import ServicesCard from './ServicesCard'

import { Marquee } from '@/components/ui/marquee'

const Home = () => {
  return (
    <section className="min-h-screen w-full">
      <CarouselHeadline
        slides={['/banner_1.webp', '/banner_2.avif', '/banner_3.webp']}
        autoPlay={true}
        autoPlayInterval={4000}
        showNavigation={true}
        showDots={true}
      />

      <Marquee pauseOnHover className="bg-white py-6 [--duration:20s]">
        {BRANDS_MARQUEE.map((item, index) => (
          <Link
            href={item.href}
            key={index}
            className="aspect-video w-64 rounded-lg border hover:cursor-pointer hover:border-gray-500 md:w-80"
          >
            <Image
              src={item.src}
              alt={`Brand ${index}`}
              width={1024}
              height={1024}
              className="w-full rounded-lg object-cover"
            />
          </Link>
        ))}
      </Marquee>

      <ServicesCard />

      {/* <NewRecommendations
        title="New Recommendations"
        viewAllText="View All Products"
        className="bg-white"
        showNavigation={true}
        itemsPerView={{
          mobile: 1.2,
          tablet: 2.5,
          desktop: 4
        }}
      /> */}

      {/* <PopulerSecondHand /> */}

      {/* <NewRelease /> */}

      {/* By Type */}

      {/* By Brands */}

      {/* CTA 1 */}

      {/* Latest Blog */}

      {/* Review */}

      {/* CTA 2 */}
    </section>
  )
}

export default Home
