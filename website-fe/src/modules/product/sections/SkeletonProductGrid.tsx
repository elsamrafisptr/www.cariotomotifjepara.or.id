import { Container } from '@medusajs/ui'

import repeat from '@/lib/util/repeat'

const SkeletonProductGrid = ({
  numberOfProducts = 8
}: {
  numberOfProducts?: number
}) => {
  return (
    <ul
      className="small:grid-cols-3 medium:grid-cols-4 grid flex-1 grid-cols-2 gap-x-6 gap-y-8"
      data-testid="products-list-loader"
    >
      {repeat(numberOfProducts).map(index => (
        <li key={index}>
          <div className="animate-pulse">
            <Container className="bg-ui-bg-subtle aspect-[9/16] w-full bg-gray-100" />
            <div className="text-base-regular mt-2 flex justify-between">
              <div className="h-6 w-2/5 bg-gray-100"></div>
              <div className="h-6 w-1/5 bg-gray-100"></div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default SkeletonProductGrid
