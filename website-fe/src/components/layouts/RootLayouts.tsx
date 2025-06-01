'use client'

import { FloatingWhatsApp } from '@carlos8a/react-whatsapp-floating-button'

const RootLayouts = ({
  children
}: Readonly<{
  children: React.ReactNode
}>) => {
  return (
    <main>
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
  )
}

export default RootLayouts
