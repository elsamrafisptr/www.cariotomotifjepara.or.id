enum TransmissionType {
  Manual = 'Manual',
  Automatic = 'Matic'
}

enum FuelType {
  Petrol = 'Bensin',
  Electric = 'Electric (EV)',
  Hydrogen = 'Hydrogen (Air)'
}

enum MotorcycleType {
  Cruiser = 'Cruiser',
  Sport = 'Sport',
  Touring = 'Touring',
  Standard = 'Standard',
  Scooter = 'Scooter',
  OffRoad = 'OffRoad'
}

interface BaseMotorcycle {
  title: string
  type: MotorcycleType
  brand: string
  transmission: TransmissionType
  fuelType: FuelType
}

interface MotorcycleVariants {
  category: string
  sub_category: string
}

interface MotorcycleMoreInformation {
  reviews: {
    rating: number
    total: number
  }
  images: string[]
}

interface MotorcycleTechnicalSpecifications {
  bla: string
}

interface MotorcycleKeyFeatures {
  bla: string
}

interface MotorcyclePricing {
  downPayment: number
  otrPrice: number
  listingPrice: number
  standardPrice: number
  discountPrice: number
}

interface MotorcycleConversionMetrics {
  whatsappClicks: number
  productUrlClicks: number
}

interface NewMotorcycleDetails extends BaseMotorcycle {
  pricing: MotorcyclePricing
  variants: MotorcycleVariants
  more_information?: MotorcycleMoreInformation
  metrics?: MotorcycleConversionMetrics
  key_features?: MotorcycleKeyFeatures
  technical_specifications?: MotorcycleTechnicalSpecifications
}

export type {
  BaseMotorcycle,
  MotorcyclePricing,
  MotorcycleVariants,
  MotorcycleMoreInformation,
  MotorcycleConversionMetrics,
  NewMotorcycleDetails,
  MotorcycleKeyFeatures,
  MotorcycleTechnicalSpecifications
}

export { TransmissionType, FuelType, MotorcycleType }
