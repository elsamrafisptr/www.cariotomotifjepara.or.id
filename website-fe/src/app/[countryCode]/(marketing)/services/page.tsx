import { notFound } from 'next/navigation'

import { getRegion } from '@/lib/data/regions'

type Props = {
  params: Promise<{
    countryCode: string
  }>
}

const ServicesPage = async (props: Props) => {
  const params = await props.params
  const { countryCode } = params
  const region = await getRegion(countryCode)

  if (!region) {
    notFound()
  }

  return <div>ServicesPage</div>
}

export default ServicesPage
