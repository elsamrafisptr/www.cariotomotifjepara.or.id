'use client'

import Image from 'next/image'

import { motion } from 'framer-motion'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import * as React from 'react'

import { cn } from '@/lib/utils'

interface Motorcycle {
  id: string
  name: string
  brand: string
  image: string
  price: number
  originalPrice?: number
  location: string
  year: number
  mileage?: string
  isNew?: boolean
  discount?: number
}

interface NewRecommendationsProps {
  motorcycles?: Motorcycle[]
  title?: string
  viewAllText?: string
  onViewAll?: () => void
  onProductClick?: (motorcycle: Motorcycle) => void
  className?: string
  showNavigation?: boolean
  itemsPerView?: {
    mobile: number
    tablet: number
    desktop: number
  }
}

const defaultMotorcycles: Motorcycle[] = [
  {
    id: '1',
    name: 'NMAX 155',
    brand: 'Yamaha',
    image: '/placeholder.svg?height=200&width=300',
    price: 32500000,
    originalPrice: 35000000,
    location: 'Jakarta Selatan',
    year: 2024,
    isNew: true,
    discount: 7
  },
  {
    id: '2',
    name: 'PCX 160',
    brand: 'Honda',
    image: '/placeholder.svg?height=200&width=300',
    price: 31200000,
    location: 'Jakarta Pusat',
    year: 2024,
    isNew: true
  },
  {
    id: '3',
    name: 'Aerox 155',
    brand: 'Yamaha',
    image: '/placeholder.svg?height=200&width=300',
    price: 28900000,
    originalPrice: 30500000,
    location: 'Bekasi',
    year: 2024,
    isNew: true,
    discount: 5
  },
  {
    id: '4',
    name: 'Vario 160',
    brand: 'Honda',
    image: '/placeholder.svg?height=200&width=300',
    price: 26800000,
    location: 'Tangerang',
    year: 2024,
    isNew: true
  },
  {
    id: '5',
    name: 'Scoopy 110',
    brand: 'Honda',
    image: '/placeholder.svg?height=200&width=300',
    price: 22500000,
    location: 'Jakarta Timur',
    year: 2024,
    isNew: true
  },
  {
    id: '6',
    name: 'Mio M3 125',
    brand: 'Yamaha',
    image: '/placeholder.svg?height=200&width=300',
    price: 18900000,
    originalPrice: 19500000,
    location: 'Bogor',
    year: 2024,
    isNew: true,
    discount: 3
  }
]

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price)
}

const MotorcycleCard = ({
  motorcycle,
  onClick
}: {
  motorcycle: Motorcycle
  onClick?: () => void
}) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="group cursor-pointer overflow-hidden rounded-lg border border-gray-100 bg-white shadow-sm transition-shadow duration-300 hover:shadow-md"
      onClick={onClick}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-50">
        <Image
          src={motorcycle.image || '/placeholder.svg'}
          alt={`${motorcycle.brand} ${motorcycle.name}`}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          width={1024}
          height={1024}
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {motorcycle.isNew && (
            <span className="rounded bg-green-500 px-2 py-1 text-xs font-semibold text-white">
              BARU
            </span>
          )}
          {motorcycle.discount && (
            <span className="rounded bg-red-500 px-2 py-1 text-xs font-semibold text-white">
              -{motorcycle.discount}%
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="space-y-3 p-4">
        {/* Brand & Name */}
        <div>
          <p className="text-sm font-medium text-gray-500">{motorcycle.brand}</p>
          <h3 className="font-semibold text-gray-900 transition-colors group-hover:text-blue-600">
            {motorcycle.name}
          </h3>
        </div>

        {/* Price */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-gray-900">
              {formatPrice(motorcycle.price)}
            </span>
          </div>
          {motorcycle.originalPrice && (
            <span className="text-sm text-gray-400 line-through">
              {formatPrice(motorcycle.originalPrice)}
            </span>
          )}
        </div>

        {/* Location & Year */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>{motorcycle.location}</span>
          <span>{motorcycle.year}</span>
        </div>
      </div>
    </motion.div>
  )
}

export default function NewRecommendations({
  motorcycles = defaultMotorcycles,
  title = 'New Recommendations',
  viewAllText = 'View All Products',
  onViewAll,
  onProductClick,
  className,
  showNavigation = true,
  itemsPerView = {
    mobile: 1.2,
    tablet: 2.5,
    desktop: 4
  }
}: NewRecommendationsProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [itemWidth, setItemWidth] = React.useState(0)
  const containerRef = React.useRef<HTMLDivElement>(null)
  const scrollContainerRef = React.useRef<HTMLDivElement>(null)

  // Calculate item width based on screen size
  React.useEffect(() => {
    const updateItemWidth = () => {
      if (!containerRef.current) return

      const containerWidth = containerRef.current.offsetWidth
      const gap = 16 // 1rem gap
      let itemsVisible = itemsPerView.desktop

      if (window.innerWidth < 768) {
        itemsVisible = itemsPerView.mobile
      } else if (window.innerWidth < 1024) {
        itemsVisible = itemsPerView.tablet
      }

      const totalGaps = (itemsVisible - 1) * gap
      const width = (containerWidth - totalGaps) / itemsVisible
      setItemWidth(width)
    }

    updateItemWidth()
    window.addEventListener('resize', updateItemWidth)
    return () => window.removeEventListener('resize', updateItemWidth)
  }, [itemsPerView])

  const maxIndex = Math.max(0, motorcycles.length - Math.floor(itemsPerView.desktop))

  const scrollToIndex = (index: number) => {
    if (!scrollContainerRef.current) return

    const newIndex = Math.max(0, Math.min(index, maxIndex))
    setCurrentIndex(newIndex)

    const scrollLeft = newIndex * (itemWidth + 16)
    scrollContainerRef.current.scrollTo({
      left: scrollLeft,
      behavior: 'smooth'
    })
  }

  const handlePrevious = () => {
    scrollToIndex(currentIndex - 1)
  }

  const handleNext = () => {
    scrollToIndex(currentIndex + 1)
  }

  const handleViewAll = () => {
    if (onViewAll) {
      onViewAll()
    }
  }

  return (
    <section className={cn('py-8', className)}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">{title}</h2>
          <button
            onClick={handleViewAll}
            className="group flex items-center gap-2 font-medium text-blue-600 transition-colors hover:text-blue-700"
          >
            {viewAllText}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Carousel Container */}
        <div className="relative" ref={containerRef}>
          {/* Navigation Buttons */}
          {showNavigation && (
            <>
              <button
                onClick={handlePrevious}
                disabled={currentIndex === 0}
                className="absolute top-1/2 left-0 z-10 flex h-10 w-10 -translate-x-4 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-lg transition-all duration-200 hover:text-gray-900 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Previous products"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={handleNext}
                disabled={currentIndex >= maxIndex}
                className="absolute top-1/2 right-0 z-10 flex h-10 w-10 translate-x-4 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 shadow-lg transition-all duration-200 hover:text-gray-900 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Next products"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}

          {/* Carousel */}
          <div
            ref={scrollContainerRef}
            className="scrollbar-hide flex gap-4 overflow-x-auto scroll-smooth"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
          >
            {motorcycles.map(motorcycle => (
              <div
                key={motorcycle.id}
                className="flex-shrink-0"
                style={{ width: itemWidth || 'auto' }}
              >
                <MotorcycleCard
                  motorcycle={motorcycle}
                  onClick={() => onProductClick?.(motorcycle)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Dots Indicator */}
        <div className="mt-6 flex justify-center gap-2">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToIndex(index)}
              className={cn(
                'h-2 w-2 rounded-full transition-all duration-200',
                currentIndex === index
                  ? 'w-6 bg-blue-600'
                  : 'bg-gray-300 hover:bg-gray-400'
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
