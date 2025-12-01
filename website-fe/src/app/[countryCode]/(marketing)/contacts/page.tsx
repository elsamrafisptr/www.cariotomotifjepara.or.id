import { notFound } from 'next/navigation'

import { getRegion } from '@/lib/data/regions'

import Contact from '@/modules/contact'

type Props = {
  params: Promise<{
    countryCode: string
  }>
}

const ContactPage = async (props: Props) => {
  const params = await props.params
  const { countryCode } = params
  const region = await getRegion(countryCode)

  if (!region) {
    notFound()
  }

  return <Contact />
}

export default ContactPage
