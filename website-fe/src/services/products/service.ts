import { Product } from '@/common/types'
import { InferEnum } from 'drizzle-orm'

import { ProductRepository } from './repository'

import { conditionEnum, productTypeEnum, statusTypeEnum } from '@/lib/db/schema'

export class ProductService {
  private repo = new ProductRepository()

  async createProduct(input: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) {
    if (!input.title.trim()) throw new Error('Product title is required.')
    return this.repo.create(input)
  }

  async getProduct(id: string) {
    const product = await this.repo.findById(id)
    if (!product) throw new Error('Product not found.')
    return product
  }

  async listProducts() {
    return this.repo.findAll()
  }

  async listAllByStatus(status: InferEnum<typeof statusTypeEnum>) {
    return this.repo.findAllStatus(status)
  }

  async updateProduct(id: string, data: Partial<Product>) {
    const product = await this.repo.findById(id)
    if (!product) throw new Error('Product not found.')

    const updateData: Partial<Product> = {}

    if (data.title !== undefined) {
      if (!data.title.trim()) throw new Error('Product title cannot be empty.')
      updateData.title = data.title.trim()
    }

    if (data.description !== undefined) {
      updateData.description = data.description
    }

    if (data.status !== undefined) {
      if (!(statusTypeEnum.enumValues as string[]).includes(data.status)) {
        throw new Error('Invalid status.')
      }
      updateData.status = data.status
    }

    if (data.condition !== undefined) {
      if (!(conditionEnum.enumValues as string[]).includes(data.condition!)) {
        throw new Error('Invalid condition.')
      }
      updateData.condition = data.condition
    }

    if (data.type !== undefined) {
      if (!(productTypeEnum.enumValues as string[]).includes(data.type)) {
        throw new Error('Invalid product type.')
      }
      updateData.type = data.type
    }

    if (data.categoryId !== undefined) {
      updateData.categoryId = data.categoryId
    }

    if (data.brandId !== undefined) {
      updateData.brandId = data.brandId
    }

    return this.repo.update(id, updateData)
  }

  async deleteProduct(id: string) {
    return this.repo.delete(id)
  }
}
