import {
  Brain,
  Compass,
  MessageCircle,
  Scale,
  Server,
  Settings,
  Ship
} from 'lucide-react'

import BenefitCard from '@/components/elements/BenefitCard'
import ServiceCard from '@/components/elements/ServiceCard'

const ServicesCard = () => {
  const benefits = [
    {
      icon: Ship,
      title: 'Build and ship faster using simple tools',
      description:
        'All of our products are built with simplicity at their core, so you can spend your time focusing on building apps, not infrastructure.'
    },
    {
      icon: Scale,
      title: 'Grow profitably with predictable cloud costs',
      description:
        'Our predictable pricing and leading price-to-performance ratio contribute to an ROI of 186%, according to a Forrester study.'
    },
    {
      icon: MessageCircle,
      title: 'Reduce your roadblocks with dedicated support',
      description:
        'Get free, personalized support or upgrade to paid plans to receive dedicated help and faster response times.'
    },
    {
      icon: Settings,
      title: 'Improve customer experience by building on a reliable platform',
      description:
        'Deliver superior customer experience with our globally distributed platform, minimal downtime, and intuitive products.'
    }
  ]

  const services = [
    {
      icon: Server,
      title: 'Virtual machines',
      description:
        'DigitalOcean Droplets are simple, scalable virtual machines for all your web hosting and VPS hosting needs.',
      links: ['web hosting', 'VPS hosting']
    },
    {
      icon: Compass,
      title: 'Kubernetes',
      description:
        'DigitalOcean Kubernetes is a managed solution that is easy to scale and includes a 99.95% SLA and free control plane.'
    },
    {
      icon: Brain,
      title: 'AI / ML',
      description:
        'Build, train, and deploy AI apps, and create AI agents with a suite of simple-to-use tools and GPU compute.'
    }
  ]

  return (
    <div className="w-full">
      <section className="w-full bg-white py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
              Cari Layanan Terbaik?
            </h2>
            <p className="mx-auto max-w-3xl text-lg text-gray-600">
              Comprehensive cloud solutions designed to power your applications with
              enterprise-grade reliability and developer-friendly simplicity.
            </p>
          </div>

          <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2 lg:grid-cols-3">
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
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
              Benefits to activate the builder in you
            </h2>
            <p className="mx-auto max-w-4xl text-lg text-gray-600">
              From simple tools and predictable pricing to support designed for growing
              businesses, our platform is built to serve the unique needs of startups
              and SMBs.
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
