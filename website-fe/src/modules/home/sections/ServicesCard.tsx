import { Brain, Compass, Server } from 'lucide-react'

import BenefitCard from '@/components/elements/BenefitCard'
import ServiceCard from '@/components/elements/ServiceCard'

const ServicesCard = () => {
  const benefits = [
    {
      icon: 1,
      title: 'Hubungi Kami Kapan Saja, dari Mana Saja',
      description:
        'Tim kami siap membantu Anda melalui telepon, chat, atau kunjungan langsung, dengan pertemuan yang sudah dijanjikan untuk Anda.'
    },
    {
      icon: 2,
      title: 'Kami Proses & Tawarkan Penawaran Terbaik',
      description:
        'Setelah memahami kebutuhan Anda, kami akan memproses dengan cepat dan memberikan penawaran paling menguntungkan sesuai pilihan Anda.'
    },
    {
      icon: 3,
      title: 'Kendaraan Impian Anda Siap Meluncur',
      description:
        'Akhirnya transaksi selesai, kendaraan langsung kami antar ke lokasi Anda. Siap menemani setiap petualangan Anda di jalan. Layanan terbaik untuk Anda!'
    }
  ]

  const services = [
    {
      icon: Server,
      title: 'Harga Transparan & Terbaik',
      description:
        'Kami selalu memberikan informasi harga yang jelas di awal dan tanpa biaya tersembunyi. Anda mendapatkan layanan terbaik untuk setiap rupiah yang Anda keluarkan.',
      links: ['web hosting', 'VPS hosting']
    },
    {
      icon: Brain,
      title: 'Pembelian Tanpa Ribet',
      description:
        'Proses beli kendaraan seharusnya menyenangkan, bukan melelahkan. Sistem kami bisa menyelesaikan pembelian dengan cepat, mudah, dan bebas stres.'
    },
    {
      icon: Compass,
      title: 'Layanan Terpercaya',
      description:
        'Tim kami siap mendampingi dengan layanan ramah, responsif, berpengalaman, dan terpercaya. Setiap pelanggan adalah mitra jangka panjang.'
    },
    {
      icon: Compass,
      title: 'Jaminan Kepuasan & Kenyamanan',
      description:
        'Mulai dari layanan, proses pembelian, hingga after-sales support, semuanya dirancang agar Anda merasa nyaman, aman, dan yakin telah membuat pilihan yang tepat.'
    }
  ]

  return (
    <div className="w-full">
      <section className="w-full bg-white py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-16 flex flex-col items-center justify-center text-center">
            <h2 className="mb-4 max-w-sm text-3xl font-bold text-gray-900 sm:max-w-full md:text-4xl">
              Kenapa Orang-Orang Sering Memilih Kami?
            </h2>
            <p className="mx-auto max-w-3xl text-base text-gray-600 sm:text-lg">
              Kami menawarkan lebih dari sekadar otomotif. Dari harga transparan,
              layanan terpercaya, hingga proses pembelian tanpa ribet, semua dirancang
              untuk kepuasan dan kenyamanan Anda.
            </p>
          </div>

          <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2 md:gap-6 md:px-16">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                Icon={service.icon}
                title={service.title}
                description={service.description}
                links={service.links}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="w-full bg-gradient-to-br from-blue-50 to-cyan-50 py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-16 flex flex-col items-center justify-center text-center">
            <h2 className="mb-4 max-w-sm text-3xl font-bold text-gray-900 sm:max-w-full md:text-4xl">
              Bagaimana Langkah Mudah Menuju Otomotif Impian?
            </h2>
            <p className="mx-auto max-w-4xl text-base text-gray-700 sm:text-lg">
              Pilih otomotif impian Anda, lakukan pembayaran aman, dan kami antar
              langsung ke rumah. Proses simpel, tanpa drama. Karena beli motor harusnya
              semudah berkendara.
            </p>
          </div>

          <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
            {benefits.map((benefit, index) => (
              <BenefitCard
                key={index}
                order={benefit.icon}
                title={benefit.title}
                description={benefit.description}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default ServicesCard
