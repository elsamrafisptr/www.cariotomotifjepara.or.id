import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Cari Otomotif Jepara Website',
    short_name: 'Cari Otomotif Jepara',
    description: 'Bantu Kamu Buat Cari Otomotif Terbaik dan Sesuai Di Jepara',
    start_url: '/',
    display: 'standalone',
    background_color: '#fff',
    theme_color: '#fff',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon'
      }
    ]
  }
}
