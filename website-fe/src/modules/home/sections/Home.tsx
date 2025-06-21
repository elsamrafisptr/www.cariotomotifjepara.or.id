import CarouselHeadline from './CarouselHeadline'
import NewRecommendations from './NewRecommendations'
import NewRelease from './NewRelease'
import PopulerSecondHand from './PopulerSecondHand'
import ServicesCard from './ServicesCard'

export interface CarouselSlide {
  id: string
  title: string
  subtitle?: string
  description?: string
  image?: string
  badges?: Array<{
    text: string
    type: 'discount' | 'promo' | 'info'
  }>
  cta?: {
    text: string
    href: string
  }
}

const Home = () => {
  return (
    <section className="min-h-screen w-full">
      <CarouselHeadline
        slides={[]}
        autoPlay={true}
        autoPlayInterval={4000}
        showNavigation={true}
        showDots={true}
        className="mb-8"
      />

      <ServicesCard />

      <NewRecommendations
        title="New Recommendations"
        viewAllText="View All Products"
        className="bg-white"
        showNavigation={true}
        itemsPerView={{
          mobile: 1.2,
          tablet: 2.5,
          desktop: 4
        }}
      />

      <PopulerSecondHand />

      <NewRelease />

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
