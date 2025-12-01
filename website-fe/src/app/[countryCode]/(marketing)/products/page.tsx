import { notFound } from 'next/navigation'

import { getRegion } from '@/lib/data/regions'

import Product from '@/modules/product'

type Props = {
  params: Promise<{
    countryCode: string
  }>
}

const ProductPage = async (props: Props) => {
  const params = await props.params
  const { countryCode } = params
  const region = await getRegion(countryCode)

  if (!region) {
    notFound()
  }

  return <Product />
}

export default ProductPage
