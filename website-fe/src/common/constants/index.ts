import { BRANDS_MARQUEE } from './brands'
import {
  FOOTER_ITEMS,
  NAVIGATION_ITEMS,
  SIMPLE_ITEMS,
  SOCIAL_ITEMS
} from './navigation'
import { PAGE_ROUTES, PUBLIC_PATHS } from './page-routes'

import { getBaseUrl } from '@/lib/utils'

const BASE_URL = getBaseUrl()

export {
  PAGE_ROUTES,
  PUBLIC_PATHS,
  BASE_URL,
  BRANDS_MARQUEE,
  NAVIGATION_ITEMS,
  FOOTER_ITEMS,
  SOCIAL_ITEMS,
  SIMPLE_ITEMS
}
