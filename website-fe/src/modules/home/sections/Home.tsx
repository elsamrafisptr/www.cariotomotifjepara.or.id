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

const defaultSlides: CarouselSlide[] = [
  {
    id: '1',
    title: 'ASURANSI MOBIL LEBIH UNTUNG',
    subtitle: 'CUMA DI PROMO ULANG TAHUN',
    description:
      'Beli Asuransi, dapat hadiah. Dapatkan diskon, e-money, dan tiket ke Singapura. Promo terbatas!',
    badges: [
      { text: 'DISKON PREMI 25% CASHBACK', type: 'discount' },
      { text: 'E-MONEY TOTAL 1,5 JT', type: 'promo' },
      { text: 'TIKET PESAWAT PULANG PERGI JAKARTA - SINGAPORE', type: 'info' }
    ],
    cta: { text: 'Cari Yang Terbaik', href: '#' }
  },
  {
    id: '2',
    title: 'MOBIL BEKAS TERPERCAYA',
    subtitle: 'DENGAN GARANSI RESMI',
    description:
      'Temukan mobil bekas berkualitas dengan inspeksi menyeluruh dan garansi resmi dari OTO.',
    badges: [
      { text: 'GARANSI MESIN 1 TAHUN', type: 'info' },
      { text: 'INSPEKSI 200 POIN', type: 'promo' }
    ],
    cta: { text: 'Lihat Mobil Bekas', href: '#' }
  },
  {
    id: '3',
    title: 'KREDIT MOBIL MUDAH',
    subtitle: 'PROSES CEPAT & AMAN',
    description:
      'Dapatkan kredit mobil dengan bunga kompetitif dan proses persetujuan yang cepat.',
    badges: [
      { text: 'BUNGA MULAI 0%', type: 'discount' },
      { text: 'PROSES 24 JAM', type: 'info' }
    ],
    cta: { text: 'Simulasi Kredit', href: '#' }
  }
]

const Home = () => {
  return (
    <section className="min-h-screen w-full">
      {/* Carousel Banner */}
      <CarouselHeadline
        slides={defaultSlides}
        autoPlay={true}
        autoPlayInterval={4000}
        showNavigation={true}
        showDots={true}
        height="600px"
        className="mb-8"
      />

      {/* Services Card */}
      <ServicesCard />

      {/* New Recommendation */}
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

      {/* Populer Second Hand  */}
      <PopulerSecondHand />

      {/* Coming Soon */}
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
