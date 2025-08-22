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
      },
      'data-management': {
        root: {
          path: '/dashboard/data-management',
          label: 'Data Management'
        },
        products: {
          path: '/dashboard/data-management/products',
          label: 'Products Data Management'
        },
        brands: {
          path: '/dashboard/data-management/brands',
          label: 'Brands Data Management'
        },
        categories: {
          path: '/dashboard/data-management/categories',
          label: 'Categories Data Management'
        }
      },
      'content-management': {
        root: {
          path: '/dashboard/content-management',
          label: 'Content Management'
        },
        blog: {
          path: '/dashboard/content-management/blog',
          label: 'Blog Content Management'
        }
      },
      settings: {
        root: {
          path: '/dashboard/settings',
          label: 'Settings'
        },
        general: {
          path: '/dashboard/settings/general',
          label: 'General Settings'
        },
        personal: {
          path: '/dashboard/settings/personal',
          label: 'Personal Settings'
        },
        changelog: {
          path: '/dashboard/settings/changelog',
          label: 'Credit & Changelog Settings'
        }
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
  PAGE_ROUTES.main.dashboard.root.path,
  PAGE_ROUTES.main.dashboard['data-management'].root.path,
  PAGE_ROUTES.main.dashboard['data-management'].products.path,
  PAGE_ROUTES.main.dashboard['data-management'].brands.path,
  PAGE_ROUTES.main.dashboard['data-management'].categories.path
]

export const PUBLIC_PATHS: string[] = [
  PAGE_ROUTES.marketing.home.path,
  PAGE_ROUTES.auth.login.path,
  PAGE_ROUTES.auth.register.path
]

export const PROTECTED_PATHS: string[] = [
  PAGE_ROUTES.main.dashboard.root.path,
  PAGE_ROUTES.main.dashboard['data-management'].root.path,
  PAGE_ROUTES.main.dashboard['content-management'].root.path,
  PAGE_ROUTES.main.dashboard.settings.root.path
]
