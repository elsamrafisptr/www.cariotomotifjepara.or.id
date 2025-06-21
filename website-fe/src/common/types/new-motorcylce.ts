enum TransmissionType {
  Manual = 'Manual',
  Automatic = 'Automatic'
}

enum FuelType {
  Petrol = 'Petrol',
  Electric = 'Electric'
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
  year: number
  type: MotorcycleType
  brand: string
  variant: string
  transmission: TransmissionType
  engineSize: number
  fuelType: FuelType
}

interface MotorcycleTechnicalSpecifications {
  bla: string
}

interface MotorcycleKeyFeatures {
  bla: string
}

interface MotorcyclePricing {
  otrPrice: number
  downPayment: number
  listingPrice: number
  standardPrice: number
  discountPrice: number
  moreInfo?: number
}

interface MotorcycleConversionMetrics {
  whatsappClicks: number
  productUrlClicks: number
}

interface NewMotorcycleDetails
  extends BaseMotorcycle,
    MotorcyclePricing,
    MotorcycleConversionMetrics,
    MotorcycleTechnicalSpecifications,
    MotorcycleKeyFeatures {}

export type {
  BaseMotorcycle,
  MotorcyclePricing,
  MotorcycleConversionMetrics,
  NewMotorcycleDetails,
  MotorcycleKeyFeatures,
  MotorcycleTechnicalSpecifications
}

export { TransmissionType, FuelType, MotorcycleType }
