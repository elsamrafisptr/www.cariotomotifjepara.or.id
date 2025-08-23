import { InferSelectModel } from 'drizzle-orm'
import * as z from 'zod'

import { brands, user } from '@/lib/db/schema'

export type Brand = InferSelectModel<typeof brands>

export type User = InferSelectModel<typeof user>

export const productTypeOptions = [
  { label: 'Motorcycle', value: 'motorcycle' },
  { label: 'Spare Part', value: 'sparepart' },
  { label: 'Car', value: 'car' }
]

export const tableSchema = z.object({
  id: z.string(),
  title: z.string(),
  status: z.string(),
  label: z.string(),
  priority: z.string()
})

export type TableSchema = z.infer<typeof tableSchema>

export const brandSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, 'Brand name is required'),
  type: z.enum(['motorcycle', 'sparepart', 'car']),
  url: z.string().optional(),
  imageUrl: z.string().optional()
})

export type BrandSchema = z.infer<typeof brandSchema>
