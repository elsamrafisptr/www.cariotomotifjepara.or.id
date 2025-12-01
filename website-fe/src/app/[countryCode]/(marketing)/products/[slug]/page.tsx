import { notFound } from 'next/navigation'

import { getRegion } from '@/lib/data/regions'

type Props = {
  params: Promise<{
    countryCode: string
    slug: string
  }>
}

const ProductDetails = async (props: Props) => {
  const params = await props.params
  const { countryCode, slug } = params
  const region = await getRegion(countryCode)

  if (!region) {
    notFound()
  }

  return (
    <div className="flex h-screen w-full items-center justify-center">halo {slug}</div>
  )
}

export default ProductDetails
