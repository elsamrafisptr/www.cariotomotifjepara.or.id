import { SortOptions } from '@/common/types'
import { Suspense } from 'react'

import PaginatedProducts from './PaginatedProducts'
import RefinementList from './RefinementList'
import SkeletonProductGrid from './SkeletonProductGrid'

const Product = ({
  sortBy,
  page,
  countryCode
}: {
  sortBy?: SortOptions
  page?: string
  countryCode: string
}) => {
  const pageNumber = page ? parseInt(page) : 1
  const sort = sortBy || 'created_at'

  return (
    <section className="min-h-screen bg-white px-5 py-8 md:px-44 md:py-0">
      <div
        className="small:flex-row small:items-start content-container flex flex-col py-6"
        data-testid="category-container"
      >
        <RefinementList sortBy={sort} />
        <div className="w-full">
          <div className="text-2xl-semi mb-8">
            <h1 data-testid="store-page-title">All products</h1>
          </div>
          <Suspense fallback={<SkeletonProductGrid />}>
            <PaginatedProducts
              sortBy={sort}
              page={pageNumber}
              countryCode={countryCode}
            />
          </Suspense>
        </div>
      </div>
    </section>
  )
}

export default Product
