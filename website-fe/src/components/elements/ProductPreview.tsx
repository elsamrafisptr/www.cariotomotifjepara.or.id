import { HttpTypes } from '@medusajs/types'
import { Text } from '@medusajs/ui'

import LocalizedLink from './LocalizedLink'
import PreviewPrice from './Price'
import Thumbnail from './Thumnail'

import { getProductPrice } from '@/lib/util/get-product-price'

export default async function ProductPreview({
  product,
  isFeatured
}: {
  product: HttpTypes.StoreProduct
  isFeatured?: boolean
}) {
  const { cheapestPrice } = getProductPrice({
    product
  })

  return (
    <LocalizedLink href={`/products/${product.handle}`} className="group">
      <div data-testid="product-wrapper">
        <Thumbnail
          thumbnail={product.thumbnail}
          images={product.images}
          size="full"
          isFeatured={isFeatured}
        />
        <div className="txt-compact-medium mt-4 flex justify-between">
          <Text className="text-ui-fg-subtle" data-testid="product-title">
            {product.title}
          </Text>
          <div className="flex items-center gap-x-2">
            {cheapestPrice && <PreviewPrice price={cheapestPrice} />}
          </div>
        </div>
      </div>
    </LocalizedLink>
  )
}
