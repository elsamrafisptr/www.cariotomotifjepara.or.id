'use client'

import Image from 'next/image'

import { EyeIcon, MessageCircleIcon, StarIcon } from 'lucide-react'
import { useState } from 'react'

import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Card, CardContent } from '../ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '../ui/carousel'

import { formatPrice } from '@/lib/utils'

interface MotorProductCardProps {
  title: string
  images: string[]
  brand: string
  price: number
  originalPrice?: number
  rating: number
  reviewCount: number
  isPopular?: boolean
  isNew?: boolean
  onInquire?: () => void
}

const renderStars = (rating: number) => {
  return Array.from({ length: 5 }, (_, index) => {
    const filled = index < Math.floor(rating)
    const halfFilled = index === Math.floor(rating) && rating % 1 !== 0

    return (
      <StarIcon
        key={index}
        className={`h-4 w-4 ${
          filled
            ? 'fill-yellow-400 text-yellow-400'
            : halfFilled
              ? 'fill-yellow-400/50 text-yellow-400'
              : 'fill-gray-200 text-gray-200'
        }`}
      />
    )
  })
}

const MotorProductCard = ({
  title,
  images,
  brand,
  price,
  originalPrice,
  rating,
  reviewCount,
  isPopular = false,
  isNew = false,
  onInquire
}: MotorProductCardProps) => {
  const [viewCount] = useState(Math.floor(Math.random() * 500) + 100)

  const discountPercentage = originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0

  return (
    <Card className="group relative overflow-hidden bg-white py-0 shadow-none">
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
        {isNew && (
          <Badge variant="destructive" className="bg-green-500 hover:bg-green-600">
            BARU
          </Badge>
        )}
        {isPopular && (
          <Badge
            variant="secondary"
            className="bg-orange-500 text-white hover:bg-orange-600"
          >
            POPULER
          </Badge>
        )}
        {discountPercentage > 0 && (
          <Badge variant="destructive" className="bg-red-500 hover:bg-red-600">
            -{discountPercentage}%
          </Badge>
        )}
      </div>

      <CardContent className="p-0">
        {/* Image Carousel */}
        <div className="relative">
          <Carousel className="w-full">
            <CarouselContent>
              {images.map((src, index) => (
                <CarouselItem key={index}>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-t-lg">
                    <Image
                      src={src || '/placeholder.svg'}
                      alt={`${brand} ${title} - Image ${index + 1}`}
                      fill
                      className="bg-gray-200 object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority={index === 0}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            {images.length > 1 && (
              <>
                <CarouselPrevious className="absolute top-1/2 left-2 -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:cursor-pointer hover:bg-white" />
                <CarouselNext className="absolute top-1/2 right-2 -translate-y-1/2 bg-white/80 backdrop-blur-sm hover:cursor-pointer hover:bg-white" />
              </>
            )}
          </Carousel>

          {/* Image Counter */}
          {images.length > 1 && (
            <div className="absolute right-3 bottom-3 rounded-full bg-black/60 px-2 py-1 text-xs text-white backdrop-blur-sm">
              1/{images.length}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="space-y-3 p-4">
          {/* Brand and Title */}
          <div>
            <p className="text-sm font-medium text-gray-600">{brand}</p>
            <h3 className="line-clamp-2 leading-tight font-semibold text-gray-900 transition-colors group-hover:text-blue-600">
              {title}
            </h3>
          </div>

          {/* Rating and Reviews */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">{renderStars(rating)}</div>
            <span className="text-sm font-medium text-gray-900">
              {rating.toFixed(1)}
            </span>
            <span className="text-sm text-gray-500">
              ({reviewCount.toLocaleString('id-ID')} ulasan)
            </span>
          </div>

          {/* View Count */}
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <EyeIcon className="h-4 w-4" />
            <span>{viewCount.toLocaleString('id-ID')} dilihat</span>
          </div>

          {/* Price */}
          <div className="space-y-1">
            <p className="text-sm text-gray-600">Mulai dari</p>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-gray-900">
                {formatPrice(price)}
              </span>
              {originalPrice && (
                <span className="text-sm text-gray-500 line-through">
                  {formatPrice(originalPrice)}
                </span>
              )}
            </div>
          </div>

          {/* Action Button */}
          <Button
            onClick={onInquire}
            className="w-full bg-blue-600 py-2.5 font-medium text-white transition-all duration-200 hover:bg-blue-700 hover:shadow-lg"
          >
            <MessageCircleIcon className="mr-2 h-4 w-4" />
            Tanyakan Sekarang
          </Button>

          {/* Trust Indicators */}
          <div className="flex items-center justify-between border-t pt-2 text-xs text-gray-500">
            <span>✓ Garansi Resmi</span>
            <span>✓ Cicilan 0%</span>
            <span>✓ Trade-in</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default MotorProductCard
