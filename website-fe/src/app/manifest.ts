import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Cari Otomotif - Motor, Mobil, & Sparepart',
    short_name: 'Cari Otomotif',
    description:
      'Platform otomotif Jepara untuk jual beli motor, mobil, dan sparepart baru & bekas. Lengkap, terpercaya, dan mudah diakses.',
    start_url: '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#ffffff',
    theme_color: '#ffffff',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon'
      }
    ],
    lang: 'id',
    dir: 'ltr',
    scope: '/',
    categories: ['otomotif', 'belanja', 'dealer', 'sparepart', 'motor', 'mobil']
  }
}
