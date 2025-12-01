import { PAGE_ROUTES } from '@/common/constants'
import { FacebookIcon, InstagramIcon, LinkedinIcon } from 'lucide-react'

export const NAVIGATION_ITEMS = [
  {
    title: 'Layanan',
    href: PAGE_ROUTES.marketing.products.path,
    content: {
      sections: [
        {
          title: 'Cari Motor Baru',
          href: PAGE_ROUTES.marketing.products.path + ''
        },
        {
          title: 'Cari Motor Second/Pemakaian',
          href: PAGE_ROUTES.marketing.products.path + '/motorcycle/used'
        },
        {
          title: 'Cari Sparepart',
          href: PAGE_ROUTES.marketing.products.path + '/sparepart'
        }
      ]
    }
  },
  {
    title: 'Informasi',
    href: PAGE_ROUTES.marketing.products.path,
    content: {
      sections: [
        {
          title: 'Tentang Kami',
          href: PAGE_ROUTES.marketing.about.path
        },
        {
          title: 'Daftar Brand/Merek',
          href: PAGE_ROUTES.marketing.brands.path
        },
        {
          title: 'Kontak',
          href: PAGE_ROUTES.marketing.contacts.path
        }
      ]
    }
  }
]

export const FOOTER_ITEMS = [
  {
    title: 'Perusahaan',
    links: [
      { label: 'Tentang Kami', href: '#' },
      { label: 'Layanan', href: '#' },
      { label: 'Karir', href: '#' },
      { label: 'Menjadi Mitra', href: '#' },
      { label: 'Kontak Kami', href: '#' }
    ]
  },
  {
    title: 'Layanan Konsumen',
    links: [
      { label: 'Pusat Bantuan', href: '#' },
      { label: 'Pertanyaan-Pertanyaan (FAQ)', href: '#' },
      { label: 'Progres Pembelian', href: '#' }
    ]
  },
  {
    title: 'Legalitas',
    links: [
      { label: 'Kebijakan Privasi', href: '#' },
      { label: 'Ketentuan Layanan', href: '#' },
      { label: 'Perlindungan Data', href: '#' }
    ]
  }
]

export const SOCIAL_ITEMS = [
  { icon: FacebookIcon, href: '#', label: 'Facebook' },
  { icon: InstagramIcon, href: '#', label: 'Instagram' },
  { icon: LinkedinIcon, href: '#', label: 'LinkedIn' }
]

export const SIMPLE_ITEMS = [
  { title: 'Beranda', href: PAGE_ROUTES.marketing.home.path }
]
