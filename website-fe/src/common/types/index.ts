import type { RouteItem, RouteTree } from './route-type'
import {
  type Brand,
  BrandSchema,
  type Product,
  ProductSchema,
  TableSchema,
  type User,
  brandSchema,
  conditionTypeOptions,
  productSchema,
  productTypeOptions,
  statusTypeOptions,
  tableSchema
} from './schema-type'

export type {
  RouteItem,
  RouteTree,
  TableSchema,
  BrandSchema,
  Brand,
  User,
  Product,
  ProductSchema
}

export {
  tableSchema,
  brandSchema,
  productSchema,
  productTypeOptions,
  statusTypeOptions,
  conditionTypeOptions
}
