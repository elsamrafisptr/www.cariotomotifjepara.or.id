import { Brain, Compass, MessageCircle, Scale, Server, Ship } from 'lucide-react'

import BenefitCard from '@/components/elements/BenefitCard'
import ServiceCard from '@/components/elements/ServiceCard'

const ServicesCard = () => {
  const benefits = [
    {
      icon: Ship,
      title: 'Hubungi kami darimana saja',
      description:
        'All of our products are built with simplicity at their core, so you can spend your time focusing on building apps, not infrastructure.'
    },
    {
      icon: Scale,
      title: 'Kami Proses dan dapatkan penawaran terbaik untuk Anda ',
      description:
        'Our predictable pricing and leading price-to-performance ratio contribute to an ROI of 186%, according to a Forrester study.'
    },
    {
      icon: MessageCircle,
      title: 'Otomotif impian Anda siap menuju jalanan bersama Anda',
      description:
        'Get free, personalized support or upgrade to paid plans to receive dedicated help and faster response times.'
    }
  ]

  const services = [
    {
      icon: Server,
      title: 'Harga Transparan & Terbaik',
      description:
        'DigitalOcean Droplets are simple, scalable virtual machines for all your web hosting and VPS hosting needs.',
      links: ['web hosting', 'VPS hosting']
    },
    {
      icon: Brain,
      title: 'Pembelian Tanpa Ribet',
      description:
        'Build, train, and deploy AI apps, and create AI agents with a suite of simple-to-use tools and GPU compute.'
    },
    {
      icon: Compass,
      title: 'Layanan Terpercaya',
      description:
        'DigitalOcean Kubernetes is a managed solution that is easy to scale and includes a 99.95% SLA and free control plane.'
    },
    {
      icon: Compass,
      title: 'Jaminan Kepuasan & Kenyamanan',
      description:
        'DigitalOcean Kubernetes is a managed solution that is easy to scale and includes a 99.95% SLA and free control plane.'
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

          <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2 lg:grid-cols-4">
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
              Bagaimana Langkah Mudah Menuju Jalanan?
            </h2>
            <p className="mx-auto max-w-4xl text-base text-gray-600 sm:text-lg">
              Pilih otomotif impian Anda, lakukan pembayaran aman, dan kami antar
              langsung ke rumah. Proses simpel, tanpa drama. Karena beli motor harusnya
              semudah berkendara.
            </p>
          </div>

          <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2">
            {benefits.map((benefit, index) => (
              <BenefitCard
                key={index}
                Icon={benefit.icon}
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
