import { relations } from 'drizzle-orm'
import {
  boolean,
  index,
  integer,
  numeric,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  uuid
} from 'drizzle-orm/pg-core'

// -------------------- USERS --------------------

export const user = pgTable(
  'user',
  {
    id: text('id').primaryKey(),
    name: text('name').notNull(),
    email: text('email').notNull().unique(),
    emailVerified: boolean('email_verified')
      .$defaultFn(() => false)
      .notNull(),
    image: text('image'),
    createdAt: timestamp('created_at')
      .$defaultFn(() => /* @__PURE__ */ new Date())
      .notNull(),
    updatedAt: timestamp('updated_at')
      .$defaultFn(() => /* @__PURE__ */ new Date())
      .notNull()
  },
  table => [index('users_email_idx').on(table.email)]
)

export const session = pgTable(
  'session',
  {
    id: text('id').primaryKey(),
    expiresAt: timestamp('expires_at').notNull(),
    token: text('token').notNull().unique(),
    createdAt: timestamp('created_at').notNull(),
    updatedAt: timestamp('updated_at').notNull(),
    ipAddress: text('ip_address'),
    userAgent: text('user_agent'),
    userId: text('user_id')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' })
  },
  table => [
    index('sessions_users_id_idx').on(table.userId),
    index('sessions_token_idx').on(table.token)
  ]
)

export const account = pgTable(
  'account',
  {
    id: text('id').primaryKey(),
    accountId: text('account_id').notNull(),
    providerId: text('provider_id').notNull(),
    userId: text('user_id')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
    accessToken: text('access_token'),
    refreshToken: text('refresh_token'),
    idToken: text('id_token'),
    accessTokenExpiresAt: timestamp('access_token_expires_at'),
    refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
    scope: text('scope'),
    password: text('password'),
    createdAt: timestamp('created_at').notNull(),
    updatedAt: timestamp('updated_at').notNull()
  },
  table => [index('accounts_user_id_idx').on(table.userId)]
)

export const verification = pgTable(
  'verification',
  {
    id: text('id').primaryKey(),
    identifier: text('identifier').notNull(),
    value: text('value').notNull(),
    expiresAt: timestamp('expires_at').notNull(),
    createdAt: timestamp('created_at').$defaultFn(() => /* @__PURE__ */ new Date()),
    updatedAt: timestamp('updated_at').$defaultFn(() => /* @__PURE__ */ new Date())
  },
  table => [index('verifications_identifier_idx').on(table.identifier)]
)

// -------------------- PRODUCTS --------------------

export const productTypeEnum = pgEnum('product_type', [
  'motorcycle',
  'sparepart',
  'car'
])

export const conditionEnum = pgEnum('condition', ['new', 'used'])

export const fuelTypeEnum = pgEnum('fuel_type', [
  'Petrol',
  'Electric (EV)',
  'Hybrid (Electric & Petrol)',
  'Hydrogen'
])

export const transmissionTypeEnum = pgEnum('transmission_type', ['Automatic', 'Manual'])

export const statusTypeEnum = pgEnum('status_type', [
  'moderation',
  'active',
  'dissaproved',
  'hidden',
  'disabled'
])

export const brands = pgTable('brands', {
  id: serial('id').primaryKey(),
  name: text('name').notNull().unique(),
  type: productTypeEnum('type').notNull(),
  url: text('url').notNull(),
  imageUrl: text('image_url').notNull(),
  status: statusTypeEnum('status').default('moderation').notNull()
})

export const categories = pgTable('categories', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  parentId: integer('parent_id'),
  status: statusTypeEnum('status').default('moderation').notNull()
})

export const products = pgTable(
  'products',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    type: productTypeEnum('type').notNull(),
    brandId: integer('brand_id').references(() => brands.id),
    categoryId: integer('category_id').references(() => categories.id),
    title: text('title').notNull(),
    description: text('description'),
    condition: conditionEnum('condition').default('used'),
    status: statusTypeEnum('status').default('moderation').notNull(),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').defaultNow()
  },
  table => [
    index('products_category_idx').on(table.categoryId),
    index('products_brand_idx').on(table.brandId)
  ]
)

export const motorcycleDetails = pgTable('motorcycle_details', {
  productId: uuid('product_id')
    .primaryKey()
    .references(() => products.id, { onDelete: 'cascade' }),
  year: integer('year'),
  transmission: transmissionTypeEnum('transmission_type').notNull(),
  fuelType: fuelTypeEnum('fuel_type').notNull(),
  htmlDescription: text('html_description')
})

export const sparepartDetails = pgTable('sparepart_details', {
  productId: uuid('product_id')
    .primaryKey()
    .references(() => products.id, { onDelete: 'cascade' }),
  stockQuantity: integer('stock_quantity').default(1),
  htmlDescription: text('html_description')
})

export const productImages = pgTable('product_images', {
  id: serial('id').primaryKey(),
  productId: uuid('product_id').references(() => products.id, { onDelete: 'cascade' }),
  imageUrl: text('image_url').notNull()
})

export const productPrices = pgTable('product_prices', {
  id: serial('id').primaryKey(),
  productId: uuid('product_id').references(() => products.id),
  listPrice: numeric('list_price', { precision: 12, scale: 2 }).notNull(),
  normalPrice: numeric('normal_price', { precision: 12, scale: 2 }).notNull(),
  discountPrice: text('discount_price').notNull()
})

export const reviews = pgTable('reviews', {
  id: serial('id').primaryKey(),
  productId: uuid('product_id').references(() => products.id, { onDelete: 'cascade' }),
  userId: text('user_id')
    .notNull()
    .references(() => user.id, { onDelete: 'cascade' }),
  rating: integer('rating').notNull(),
  comment: text('comment'),
  createdAt: timestamp('created_at').defaultNow()
})

export const categoryRelations = relations(categories, ({ one, many }) => ({
  parent: one(categories, {
    fields: [categories.parentId],
    references: [categories.id]
  }),
  children: many(categories)
}))

export const productRelations = relations(products, ({ one, many }) => ({
  brand: one(brands, {
    fields: [products.brandId],
    references: [brands.id]
  }),
  category: one(categories, {
    fields: [products.categoryId],
    references: [categories.id]
  }),
  images: many(productImages),
  reviews: many(reviews)
}))

export const motorcycleRelations = relations(motorcycleDetails, ({ one }) => ({
  product: one(products, {
    fields: [motorcycleDetails.productId],
    references: [products.id]
  })
}))

export const sparepartRelations = relations(sparepartDetails, ({ one }) => ({
  product: one(products, {
    fields: [sparepartDetails.productId],
    references: [products.id]
  })
}))
