'use client'

import dynamic from 'next/dynamic'

import { useHasMounted } from '@/hooks'
import 'aos/dist/aos.css'
import { ReactNode, useEffect } from 'react'

import Navbar from '../elements/Navbar'
import Footer from './Footer'

const Loading = dynamic(() => import('./Loading'), {
  ssr: false
})

const BackToTopButton = dynamic(() => import('../elements/BackToTopButton'), {
  ssr: false
})

const FloatingWhatsApp = dynamic(() => import('../elements/WhatsappFloatingButton'), {
  ssr: false
})

const RootLayouts = ({
  children
}: Readonly<{
  children: ReactNode
}>) => {
  const mounted = useHasMounted()

  useEffect(() => {
    import('aos').then(AOS => {
      AOS.init({ duration: 800, delay: 50 })
    })
  }, [])

  if (!mounted) return <Loading />

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="">
        <FloatingWhatsApp
          phoneNumber="628122851744"
          accountName="Pak Probo (Admin 1)"
          avatar="/admin_1.jpg"
          initialMessageByServer="Halo, apa ada yang bisa saya bantu buat cari otomotif keinginan anda? 🙏"
          initialMessageByClient="Halo Pak Praba, saya ingin cari-cari otomotif di jepara nih"
          statusMessage="Online"
          startChatText="Hubungi Sekarang"
          tooltipText="Mau cari otomotif apa hari ini?"
          position="bottom-right"
          messageDelay={2}
        />
        <BackToTopButton
          threshold={300}
          scrollDuration={800}
          position="bottom-right"
          size="md"
          backgroundColor="#3B82F6"
          showProgress={true}
        />

        {children}
      </main>
      <Footer />
    </div>
  )
}

export default RootLayouts
