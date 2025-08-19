import { InferEnum } from 'drizzle-orm'

import { BrandRepository } from './repository'

import { productTypeEnum } from '@/lib/db/schema'

export class BrandService {
  private repo = new BrandRepository()

  async createBrand(input: {
    name: string
    type: InferEnum<typeof productTypeEnum>
    url: string
    imageUrl: string
  }) {
    if (!input.name.trim()) throw new Error('Brand name is required.')
    if (!/^https?:\/\//.test(input.url)) throw new Error('Invalid URL.')
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

  async updateBrand(
    id: number,
    data: Partial<{
      name: string
      type: InferEnum<typeof productTypeEnum>
      url: string
      imageUrl: string
    }>
  ) {
    return this.repo.update(id, data)
  }

  async deleteBrand(id: number) {
    return this.repo.delete(id)
  }
}
