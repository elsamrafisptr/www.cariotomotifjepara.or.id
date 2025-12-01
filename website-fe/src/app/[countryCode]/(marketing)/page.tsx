import { listCollections } from '@/lib/data/collections'
import { getRegion } from '@/lib/data/regions'

import Home from '@/modules/home'

type Props = {
  params: Promise<{
    countryCode: string
  }>
}

const HomePage = async (props: Props) => {
  const params = await props.params

  const { countryCode } = params

  const region = await getRegion(countryCode)

  const { collections } = await listCollections({
    fields: 'id, handle, title'
  })

  if (!collections || !region) {
    return null
  }

  return <Home />
}

export default HomePage
