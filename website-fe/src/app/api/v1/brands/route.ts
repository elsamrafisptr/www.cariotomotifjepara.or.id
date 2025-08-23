import { NextRequest, NextResponse } from 'next/server'

import { brandService } from '@/services'

export async function GET() {
  const data = await brandService.listBrands()

  return NextResponse.json({
    result: data
  })
}

export async function POST(req: NextRequest) {
  const body = await req.json()

  await brandService.createBrand({
    name: body.name,
    type: body.type,
    url: body.url,
    imageUrl: body.imageUrl
  })

  return NextResponse.json({ success: true })
}
