import { notFound } from 'next/navigation'

import { getRegion } from '@/lib/data/regions'

type Props = {
  params: Promise<{
    countryCode: string
    slug: string
  }>
}

const BlogDetails = async (props: Props) => {
  const params = await props.params
  const { countryCode, slug } = params
  const region = await getRegion(countryCode)

  if (!region) {
    notFound()
  }

  return <div>{slug}</div>
}

export default BlogDetails
