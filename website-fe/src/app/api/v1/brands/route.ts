import { NextResponse } from 'next/server'

import { db } from '@/lib/db'
import { brands } from '@/lib/db/schema'

export async function GET() {
  const data = await db
    .select({
      name: brands.name,
      url: brands.url,
      imageUrl: brands.imageUrl
    })
    .from(brands)

  return NextResponse.json({
    result: data
  })
}
