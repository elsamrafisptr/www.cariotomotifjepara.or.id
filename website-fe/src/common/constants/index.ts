import {
  NO_LANDING_NAVBAR,
  PAGE_ROUTES,
  PROTECTED_PATHS,
  PUBLIC_PATHS
} from './page-routes'

import { getBaseUrl } from '@/lib/utils'

const BASE_URL = getBaseUrl()

export { PAGE_ROUTES, NO_LANDING_NAVBAR, PUBLIC_PATHS, PROTECTED_PATHS, BASE_URL }
