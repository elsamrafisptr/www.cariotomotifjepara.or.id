import { NextRequest, NextResponse } from 'next/server'

import { productService } from '@/services'

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const product = await productService.getProduct(id)
    return NextResponse.json(product)
  } catch (error) {
    return NextResponse.json(
      { error: error || 'Failed to fetch product' },
      { status: 500 }
    )
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await req.json()
    const updated = await productService.updateProduct(id, body)
    return NextResponse.json({ success: true, data: updated })
  } catch (error) {
    return NextResponse.json(
      { error: error || 'Failed to update product' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await productService.deleteProduct(id)
    return NextResponse.json({ success: true, message: 'Product deleted successfully' })
  } catch (error) {
    return NextResponse.json(
      { error: error || 'Failed to delete product' },
      { status: 500 }
    )
  }
}
