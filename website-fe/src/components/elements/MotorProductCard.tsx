'use client'

import Image from 'next/image'
import Link from 'next/link'

import {
  BikeIcon,
  FuelIcon,
  InfoIcon,
  MessageCircleIcon,
  PlugZapIcon,
  StarIcon
} from 'lucide-react'
import { useCallback } from 'react'

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
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip'

import { FuelType, TransmissionType } from '@/common/types/new-motorcylce'

import { cn, formatPrice } from '@/lib/utils'

interface MotorProductCardProps {
  title: string
  images: string[]
  brand: string
  price: number
  originalPrice?: number
  rating: number
  reviewCount: number
  transmission: TransmissionType
  fuel: FuelType
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
  transmission,
  fuel
}: MotorProductCardProps) => {
  const handleContact = useCallback(() => {
    const cleanPhone = '628122851744'.replace(/[^\d+]/g, '')
    const encoded = encodeURIComponent(
      `Halo Pak Praba, saya ingin tanya tentang ${brand} ${title}`.trim()
    )
    window.open(
      `https://api.whatsapp.com/send/?phone=${cleanPhone}&text=${encoded}`,
      '_blank'
    )
  }, [brand, title])

  return (
    <Card className="group relative overflow-hidden bg-white py-0 shadow-none">
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex items-center gap-2">
        {transmission && (
          <Badge
            variant="destructive"
            className="cursor-pointer rounded-full bg-sky-600 font-normal text-sky-50 hover:bg-sky-700"
          >
            <BikeIcon />
            {transmission}
          </Badge>
        )}
        {fuel && (
          <Badge
            variant="secondary"
            className={cn(
              'cursor-pointer rounded-full font-normal',
              fuel === FuelType.Petrol
                ? 'bg-yellow-600 text-yellow-50 hover:bg-yellow-700'
                : 'bg-green-600 text-green-50 hover:bg-green-700'
            )}
          >
            {fuel === FuelType.Petrol ? <FuelIcon /> : <PlugZapIcon />}
            {fuel}
          </Badge>
        )}
      </div>

      <CardContent className="flex h-full flex-col p-0">
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
                      loading="lazy"
                      className="bg-white object-cover transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            {images.length > 1 && (
              <>
                <CarouselPrevious className="absolute top-1/2 left-2 -translate-y-1/2 bg-white/80 opacity-0 backdrop-blur-sm group-hover:opacity-100 hover:cursor-pointer hover:bg-white disabled:opacity-0" />
                <CarouselNext className="absolute top-1/2 right-2 -translate-y-1/2 bg-white/80 opacity-0 backdrop-blur-sm group-hover:opacity-100 hover:cursor-pointer hover:bg-white disabled:opacity-0" />
              </>
            )}
          </Carousel>
        </div>

        <div className="flex-grow space-y-3 p-4">
          {/* Brand and Title */}
          <div>
            <Link
              href={`/brands/motorcycle/${brand.toLocaleLowerCase()}`}
              className="text-sm font-medium text-gray-600 hover:underline"
            >
              {brand}
            </Link>
            <h3 className="line-clamp-2 text-base leading-tight font-semibold text-gray-900 transition-colors md:text-xl">
              {title}
            </h3>
          </div>

          {/* Rating and Reviews */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">{renderStars(rating)}</div>
            <span className="text-sm font-medium text-gray-900">
              {rating.toFixed(2)}
            </span>
            <span className="text-sm text-gray-500">
              ({reviewCount.toLocaleString('id-ID')} ulasan)
            </span>
          </div>

          {/* Price */}
          <div className="space-y-1">
            <p className="text-sm text-gray-600">Mulai dari</p>
            <div className="flex flex-col items-start">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-gray-900 md:text-4xl">
                  {formatPrice(price)}
                </span>
                <Tooltip>
                  <TooltipTrigger>
                    <InfoIcon className="size-4 cursor-pointer text-gray-600 transition-colors duration-150 hover:text-blue-600" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <div className="flex flex-col">
                      <p className="max-w-48">*Bukan merupakan harga pasti</p>
                      <p className="max-w-48">
                        Untuk harga pastinya dan ketersediaan bisa tanyakan admin
                      </p>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </div>
              {originalPrice && (
                <span className="text-xs text-gray-500 line-through md:text-sm">
                  {formatPrice(originalPrice)}
                </span>
              )}
            </div>
          </div>
        </div>

        <Button
          onClick={handleContact}
          className="mx-4 mb-4 flex items-center bg-blue-600 py-2.5 font-medium text-white transition-all duration-200 hover:cursor-pointer hover:bg-blue-700"
        >
          <MessageCircleIcon className="h-4 w-4" />
          Tanyakan Sekarang
        </Button>
      </CardContent>
    </Card>
  )
}

export default MotorProductCard
