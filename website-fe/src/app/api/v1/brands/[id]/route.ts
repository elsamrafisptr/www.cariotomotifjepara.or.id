import { NextRequest, NextResponse } from 'next/server'

import { brandService } from '@/services'

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const row_id = parseInt(id)

    if (isNaN(row_id)) {
      return NextResponse.json({ error: 'Invalid brand ID' }, { status: 400 })
    }

    const body = await req.json()

    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
    }

    const updatedBrand = await brandService.updateBrand(row_id, body)

    return NextResponse.json({
      success: true,
      message: 'Brand updated successfully.',
      data: updatedBrand
    })
  } catch (error) {
    console.error('API PATCH error:', error)
    return NextResponse.json({ error: 'Failed to update brand' }, { status: 500 })
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const row_id = parseInt(id)

    if (isNaN(row_id)) {
      return NextResponse.json({ error: 'Invalid brand ID' }, { status: 400 })
    }

    await brandService.deleteBrand(row_id)

    return NextResponse.json({ success: true, message: 'Brand deleted successfully.' })
  } catch (error) {
    console.error('API DELETE error:', error)
    return NextResponse.json({ error: 'Failed to delete brand' }, { status: 500 })
  }
}
