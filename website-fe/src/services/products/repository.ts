import { InferEnum, desc, eq } from 'drizzle-orm'

import { db } from '@/lib/db'
import { products, statusTypeEnum } from '@/lib/db/schema'

export class ProductRepository {
  async create(
    data: Omit<typeof products.$inferInsert, 'id' | 'createdAt' | 'updatedAt'>
  ) {
    const [product] = await db.insert(products).values(data).returning()
    return product
  }

  async findById(id: string) {
    return db.query.products.findFirst({
      where: eq(products.id, id),
      with: {
        brand: true,
        category: true,
        images: true,
        reviews: true
      }
    })
  }

  async findAll() {
    return db.query.products.findMany({
      orderBy: desc(products.createdAt),
      with: {
        brand: true,
        category: true
      }
    })
  }

  async findAllStatus(status: InferEnum<typeof statusTypeEnum>) {
    return db.query.products.findMany({
      where: eq(products.status, status),
      orderBy: desc(products.createdAt)
    })
  }

  async update(id: string, data: Partial<typeof products.$inferInsert>) {
    const [product] = await db
      .update(products)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(products.id, id))
      .returning()
    return product
  }

  async delete(id: string) {
    await db.delete(products).where(eq(products.id, id))
  }
}
