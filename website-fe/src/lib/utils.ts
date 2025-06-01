import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

import { generatePageMetadata } from './seo'

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const getBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL
  }

  if (
    process.env.VERCEL_ENV === 'production' &&
    process.env.VERCEL_PROJECT_PRODUCTION_URL
  ) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
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

export { cn, getBaseUrl, getLocalStorage, sanitizeText, generatePageMetadata }
