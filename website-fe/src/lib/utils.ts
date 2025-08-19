import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

import { generatePageMetadata } from './seo'

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const getBaseUrl = () => {
  if (typeof window !== 'undefined') {
    return window.location.origin
  }

  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL
  }

  if (process.env.VERCEL_ENV === 'production' && process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }

  return 'http://localhost:3000'
}

const getLocalStorage = (key: string) => {
  if (typeof window !== 'undefined') {
    return JSON.parse(localStorage.getItem(key) || '[]')
  }
  return []
}

const sanitizeText = (text: string) => {
  return text.replace('<has_function_call>', '')
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price)
}

const imageProviderBaseURL =
  'https://ik.imagekit.io/a5rn4awa3digi2tal1/d3d3LmNhcmlvdG9tb3RpZmplcGFyYS5vci5pZA'

export {
  cn,
  getBaseUrl,
  getLocalStorage,
  sanitizeText,
  generatePageMetadata,
  formatPrice,
  imageProviderBaseURL
}
