import { productService } from '@/services'

import ProductsManagement from '@/modules/dashboard/data-management/products'

const ProductsDataManagement = async () => {
  const data = await productService.listProducts()

  return <ProductsManagement data={data} />
}

export default ProductsDataManagement
