import { InferEnum } from 'drizzle-orm'

import { BrandRepository } from './repository'

import { productTypeEnum, statusTypeEnum } from '@/lib/db/schema'

export class BrandService {
  private repo = new BrandRepository()

  async createBrand(input: {
    name: string
    type: InferEnum<typeof productTypeEnum>
    url: string
    imageUrl: string
  }) {
    if (!input.name.trim()) throw new Error('Brand name is required.')
    if (!input.url.startsWith('/')) throw new Error('Invalid slug.')

    return this.repo.create(input)
  }

  async getBrand(id: number) {
    const brand = await this.repo.findById(id)
    if (!brand) throw new Error('Brand not found.')
    return brand
  }

  async listBrands() {
    return this.repo.findAll()
  }

  async listAllByStatus(status: InferEnum<typeof statusTypeEnum>) {
    return this.repo.findAllStatus(status)
  }

  async updateBrand(
    id: number,
    data: Partial<{
      name: string
      type: InferEnum<typeof productTypeEnum>
      url: string
      imageUrl: string
      status: InferEnum<typeof statusTypeEnum>
    }>
  ) {
    const brand = await this.repo.findById(id)
    if (!brand) throw new Error('Brand not found.')

    const updateData: typeof data = {}

    if (data.name !== undefined) {
      if (!data.name.trim()) throw new Error('Brand name cannot be empty.')
      updateData.name = data.name.trim()
    }

    if (data.url !== undefined) {
      if (!data.url.startsWith('/'))
        throw new Error('Invalid slug. Must start with "/"')
      updateData.url = data.url
    }

    if (data.type !== undefined) {
      if (!(productTypeEnum.enumValues as string[]).includes(data.type)) {
        throw new Error('Invalid product type.')
      }
      updateData.type = data.type
    }

    if (data.imageUrl !== undefined) {
      if (!data.imageUrl.trim()) throw new Error('Image URL cannot be empty.')
      updateData.imageUrl = data.imageUrl
    }

    const statusType = ['moderation', 'active', 'dissaproved', 'hidden', 'disabled']

    if (data.status !== undefined) {
      if (!statusType.includes(data.status)) {
        throw new Error('Invalid status value.')
      }
      updateData.status = data.status
    }

    return this.repo.update(id, updateData)
  }

  async deleteBrand(id: number) {
    return this.repo.delete(id)
  }
}
