import { NextRequest, NextResponse } from 'next/server'

import { productService } from '@/services'

export async function GET() {
  try {
    const products = await productService.listProducts()
    return NextResponse.json(products)
  } catch (error) {
    return NextResponse.json(
      { error: error || 'Failed to fetch products' },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const product = await productService.createProduct(body)
    return NextResponse.json({ success: true, data: product })
  } catch (error) {
    return NextResponse.json(
      { error: error || 'Failed to create product' },
      { status: 500 }
    )
  }
}
