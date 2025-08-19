import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { openAPI } from 'better-auth/plugins'

import { db } from './db'
import * as schema from './db/schema'

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema
  }),
  emailAndPassword: {
    enabled: true
  },
  socialProviders: {},
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60 // Cache duration in seconds
    }
  },
  plugins: [openAPI()]
})

export async function getCurrentUser() {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if (!session || !session.user) {
    redirect('/login')
  }

  return session.user
}
