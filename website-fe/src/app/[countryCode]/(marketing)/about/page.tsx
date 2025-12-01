import { notFound } from 'next/navigation'

import { getRegion } from '@/lib/data/regions'

import About from '@/modules/about'

type Props = {
  params: Promise<{
    countryCode: string
  }>
}

const AboutPage = async (props: Props) => {
  const params = await props.params
  const { countryCode } = params
  const region = await getRegion(countryCode)

  if (!region) {
    notFound()
  }

  return <About />
}

export default AboutPage
