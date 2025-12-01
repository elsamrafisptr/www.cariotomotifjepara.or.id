import {
  NO_LANDING_NAVBAR,
  PAGE_ROUTES,
  PROTECTED_PATHS,
  PUBLIC_PATHS
} from './page-routes'

import { getBaseUrl } from '@/lib/utils'

const BASE_URL = getBaseUrl()

const BrandMarquee = [
  { src: '/honda-white-logo.png', href: '/brands/motorcycle/honda' },
  { src: '/kawasaki-logo.png', href: '/brands/motorcycle/kawasaki' },
  { src: '/piaggio-logo.png', href: '/brands/motorcycle/piaggio' },
  { src: '/suzuki-logo.png', href: '/brands/motorcycle/suzuki' },
  { src: '/yamaha-logo.png', href: '/brands/motorcycle/yamaha' }
]

export {
  PAGE_ROUTES,
  NO_LANDING_NAVBAR,
  PUBLIC_PATHS,
  PROTECTED_PATHS,
  BASE_URL,
  BrandMarquee
}
