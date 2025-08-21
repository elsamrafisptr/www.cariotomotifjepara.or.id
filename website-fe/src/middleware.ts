import { NextRequest, NextResponse } from 'next/server'

import { getSessionCookie } from 'better-auth/cookies'

import { PROTECTED_PATHS, PUBLIC_PATHS } from './common/constants'

export async function middleware(request: NextRequest) {
  const sessionCookie = getSessionCookie(request)
  const pathname = request.nextUrl.pathname.replace(/\/+$/, '') || '/'

  // For unauthenticated -> block the protected routes
  if (!sessionCookie && PROTECTED_PATHS.includes(pathname)) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // For authenticated -> keep away from auth pages (login/register)
  if (sessionCookie && PUBLIC_PATHS.includes(pathname) && pathname !== '/') {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard',
    '/login',
    '/register',
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'
  ]
}
