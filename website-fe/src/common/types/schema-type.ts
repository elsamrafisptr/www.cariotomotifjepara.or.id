import { InferSelectModel } from 'drizzle-orm'
import * as z from 'zod'

import { brands, user } from '@/lib/db/schema'

export type Brand = InferSelectModel<typeof brands>

export type User = InferSelectModel<typeof user>

export const tableSchema = z.object({
  id: z.string(),
  title: z.string(),
  status: z.string(),
  label: z.string(),
  priority: z.string()
})

export type TableSchema = z.infer<typeof tableSchema>

export const brandSchema = z.object({
  id: z.number(),
  name: z.string(),
  type: z.enum(['motorcycle', 'sparepart', 'car']),
  url: z.string(),
  imageUrl: z.string()
})

export type BrandSchema = z.infer<typeof brandSchema>
