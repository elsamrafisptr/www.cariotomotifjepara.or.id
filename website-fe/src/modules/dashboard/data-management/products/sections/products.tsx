import { Product } from '@/common/types'

import { columns } from './table/columns'
import { DataTable } from './table/data-table'

const ProductsManagement = ({ data }: { data: Product[] }) => {
  return (
    <div>
      <DataTable data={data} columns={columns} />
    </div>
  )
}

export default ProductsManagement
