import type { RouteItem, RouteTree } from './route-type'
import type {
  FeaturedProduct,
  SortOptions,
  StoreFreeShippingPrice,
  VariantPrice
} from './store-type'

type IconProps = {
  color?: string
  size?: string | number
} & React.SVGAttributes<SVGElement>

export type {
  RouteItem,
  RouteTree,
  IconProps,
  SortOptions,
  FeaturedProduct,
  VariantPrice,
  StoreFreeShippingPrice
}
