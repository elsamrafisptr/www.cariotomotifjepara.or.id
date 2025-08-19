import { InferSelectModel } from 'drizzle-orm'

import { brands, user } from '@/lib/db/schema'

export type Brand = InferSelectModel<typeof brands>

export type User = InferSelectModel<typeof user>
