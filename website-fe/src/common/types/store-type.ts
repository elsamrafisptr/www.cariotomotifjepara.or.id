import { StorePrice } from '@medusajs/types'

type SortOptions = 'price_asc' | 'price_desc' | 'created_at'

type FeaturedProduct = {
  id: string
  title: string
  handle: string
  thumbnail?: string
}

type VariantPrice = {
  calculated_price_number: number
  calculated_price: string
  original_price_number: number
  original_price: string
  currency_code: string
  price_type: string
  percentage_diff: string
}

type StoreFreeShippingPrice = StorePrice & {
  target_reached: boolean
  target_remaining: number
  remaining_percentage: number
}

export type { SortOptions, FeaturedProduct, VariantPrice, StoreFreeShippingPrice }
