import { notFound } from 'next/navigation'

import { getRegion } from '@/lib/data/regions'

import Blog from '@/modules/blog'

type Props = {
  params: Promise<{
    countryCode: string
  }>
}

const BlogPage = async (props: Props) => {
  const params = await props.params
  const { countryCode } = params
  const region = await getRegion(countryCode)

  if (!region) {
    notFound()
  }

  return <Blog />
}

export default BlogPage
