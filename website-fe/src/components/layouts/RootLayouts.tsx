'use client'

import dynamic from 'next/dynamic'

import { useHasMounted } from '@/hooks'
import 'aos/dist/aos.css'
import { ReactNode, Suspense, useEffect } from 'react'

import BackToTopButton from '../elements/BackToTopButton'
import Navbar from '../elements/Navbar'
import Footer from './Footer'
import Loading from './Loading'

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
        <Suspense fallback={<Loading />}>
          <FloatingWhatsApp
            phoneNumber="628132614262"
            accountName="Pak Probo (Admin 1)"
            avatar="../../../admin_1.jpg"
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
            position="bottom-center"
            size="md"
            backgroundColor="#3B82F6"
            showProgress={true}
          />
          {children}
          <Footer />
        </Suspense>
      </main>
    </div>
  )
}

export default RootLayouts
