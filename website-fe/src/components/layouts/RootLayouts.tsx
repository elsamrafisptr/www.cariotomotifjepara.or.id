'use client'

import { FloatingWhatsApp } from '@carlos8a/react-whatsapp-floating-button'

import Navbar from '../elements/Navbar'

const RootLayouts = ({
  children
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-16">
        <FloatingWhatsApp
          phoneNumber="628132614262"
          accountName="Praba Dwi Yunanto"
          avatar="../../../globe.svg"
          initialMessageByServer="Halo, apa ada yang bisa saya bantu, buat cari otomotif keinginan anda?"
          initialMessageByClient="Halo Pak Praba, saya ingin cari-cari otomotif di jepara nih"
          statusMessage="Online"
          startChatText="Hubungi Sekarang"
          tooltipText="Mau cari otomotif apa hari ini?"
          allowEsc={true}
        />
        {children}
      </main>
    </div>
  )
}

export default RootLayouts
