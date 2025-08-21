import { RouteTree } from '../types'

export const PAGE_ROUTES = {
  marketing: {
    home: { path: '/', label: 'Home' },
    about: { path: '/about', label: 'About' },
    blog: { path: '/blog', label: 'Blog' },
    brands: { path: '/brands', label: 'Brands' },
    contacts: { path: '/contacts', label: 'Contacts' },
    products: { path: '/products', label: 'Products' },
    services: { path: '/services', label: 'Services' }
  },
  main: {
    dashboard: {
      root: {
        path: '/dashboard',
        label: 'Dashboard'
      }
    }
  },
  auth: {
    register: {
      path: '/register',
      label: 'Register'
    },
    login: {
      path: '/login',
      label: 'Login'
    }
  }
} as const satisfies RouteTree

export const NO_LANDING_NAVBAR: string[] = [
  PAGE_ROUTES.auth.login.path,
  PAGE_ROUTES.auth.register.path,
  PAGE_ROUTES.main.dashboard.root.path
]

export const PUBLIC_PATHS: string[] = [
  PAGE_ROUTES.marketing.home.path,
  PAGE_ROUTES.auth.login.path,
  PAGE_ROUTES.auth.register.path
]

export const PROTECTED_PATHS: string[] = [PAGE_ROUTES.main.dashboard.root.path]
