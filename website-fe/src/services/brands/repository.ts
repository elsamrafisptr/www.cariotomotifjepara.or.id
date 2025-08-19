import { eq } from 'drizzle-orm'

import { db } from '@/lib/db'
import { brands } from '@/lib/db/schema'

export class BrandRepository {
  async create(data: Omit<typeof brands.$inferInsert, 'id'>) {
    const [brand] = await db.insert(brands).values(data).returning()
    return brand
  }

  async findById(id: number) {
    return db.query.brands.findFirst({ where: eq(brands.id, id) })
  }

  async findAll() {
    return db.query.brands.findMany()
  }

  async update(id: number, data: Partial<typeof brands.$inferInsert>) {
    const [brand] = await db
      .update(brands)
      .set(data)
      .where(eq(brands.id, id))
      .returning()
    return brand
  }

  async delete(id: number) {
    await db.delete(brands).where(eq(brands.id, id))
  }
}
