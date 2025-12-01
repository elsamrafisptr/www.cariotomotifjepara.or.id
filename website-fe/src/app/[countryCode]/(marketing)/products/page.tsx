import { notFound } from 'next/navigation'

import { SortOptions } from '@/common/types'

import { getRegion } from '@/lib/data/regions'

import Product from '@/modules/product'

type Props = {
  searchParams: Promise<{
    sortBy?: SortOptions
    page?: string
  }>
  params: Promise<{
    countryCode: string
  }>
}

const ProductPage = async (props: Props) => {
  const params = await props.params
  const { countryCode } = params
  const region = await getRegion(countryCode)

  const searchParams = await props.searchParams
  const { sortBy, page } = searchParams

  if (!region) {
    notFound()
  }

  return <Product countryCode={countryCode} sortBy={sortBy} page={page} />
}

export default ProductPage
