import { brandService } from '@/services'

import BrandsManagement from '@/modules/dashboard/data-management/brands'

const BrandsDataManagement = async () => {
  const data = await brandService.listBrands()

  return <BrandsManagement data={data} />
}

export default BrandsDataManagement
