import Image from 'next/image'
import { notFound } from 'next/navigation'

import { BRANDS_MARQUEE } from '@/common/constants'

import { getRegion } from '@/lib/data/regions'

type Props = {
  params: Promise<{
    countryCode: string
    slug: string
  }>
}

const BrandDetails = async (props: Props) => {
  const params = await props.params
  const { countryCode, slug } = params
  const region = await getRegion(countryCode)

  if (!region) {
    notFound()
  }

  const imageByBrand = BRANDS_MARQUEE.filter(moto =>
    moto.href.toLocaleLowerCase().includes(slug[1]!.toLocaleLowerCase())
  )

  return (
    <section className="flex min-h-screen flex-col gap-4 bg-white px-5 py-8 md:px-44">
      <div className="flex items-center gap-4 md:gap-8">
        {imageByBrand.map((item, index) => {
          return (
            <article
              key={index}
              className="aspect-video w-1/2 rounded border hover:cursor-pointer md:w-1/3 md:rounded-lg"
            >
              <Image
                src={item.src}
                alt={`Brand ${index}`}
                width={1024}
                height={1024}
                className="w-full rounded-lg object-cover"
              />
            </article>
          )
        })}
        <h1 className="text-4xl font-semibold capitalize md:text-6xl">{slug[1]}</h1>
      </div>
    </section>
  )
}

export default BrandDetails
