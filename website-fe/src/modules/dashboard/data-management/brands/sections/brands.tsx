import { Brand } from '@/common/types'

import { columns } from './table/columns'
import { DataTable } from './table/data-table'

const BrandsManagement = ({ data }: { data: Brand[] }) => {
  return (
    <div>
      <DataTable data={data} columns={columns} />
    </div>
  )
}

export default BrandsManagement
