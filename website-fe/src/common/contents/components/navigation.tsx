import { PAGE_ROUTES } from '@/common/constants'

export const navigationItems = [
  {
    title: 'Semua Produk',
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
  }
]

export const simpleItems = [
  { title: 'Beranda', href: PAGE_ROUTES.marketing.home.path },
  { title: 'Tentang Kami', href: PAGE_ROUTES.marketing.about.path },
  { title: 'Brand/Merek', href: PAGE_ROUTES.marketing.brands.path }
]
