import { InferSelectModel } from 'drizzle-orm'

import { brands } from '@/lib/db/schema'

export type Brand = InferSelectModel<typeof brands>
