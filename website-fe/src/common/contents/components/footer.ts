import { FacebookIcon, InstagramIcon, LinkedinIcon } from 'lucide-react'

const footerSections = [
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

const socialLinks = [
  { icon: FacebookIcon, href: '#', label: 'Facebook' },
  { icon: InstagramIcon, href: '#', label: 'Instagram' },
  { icon: LinkedinIcon, href: '#', label: 'LinkedIn' }
]

export { footerSections, socialLinks }
