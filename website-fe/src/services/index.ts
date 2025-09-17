import { BrandService } from './brands/service'
import { ProductService } from './products/service'

const brandService = new BrandService()

const productService = new ProductService()

export { brandService, productService }
