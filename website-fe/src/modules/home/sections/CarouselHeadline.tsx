'use client'

import Image from 'next/image'

import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'

import { CarouselSlide } from './Home'

import { cn } from '@/lib/utils'

interface HeadlineCarouselProps {
  slides: CarouselSlide[]
  autoPlay?: boolean
  autoPlayInterval?: number
  showNavigation?: boolean
  showDots?: boolean
  className?: string
  height?: string
  onSlideChange?: (index: number) => void
}

export default function HeadlineCarousel({
  slides,
  autoPlay = true,
  autoPlayInterval = 5000,
  showNavigation = true,
  showDots = true,
  className,
  height = '500px',
  onSlideChange
}: HeadlineCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const nextSlide = useCallback(() => {
    setCurrentSlide(prev => {
      const next = (prev + 1) % slides.length
      onSlideChange?.(next)
      return next
    })
  }, [slides.length, onSlideChange])

  const prevSlide = useCallback(() => {
    setCurrentSlide(prev => {
      const next = prev === 0 ? slides.length - 1 : prev - 1
      onSlideChange?.(next)
      return next
    })
  }, [slides.length, onSlideChange])

  const goToSlide = useCallback(
    (index: number) => {
      setCurrentSlide(index)
      onSlideChange?.(index)
    },
    [onSlideChange]
  )

  useEffect(() => {
    if (autoPlay && !isHovered) {
      intervalRef.current = setInterval(nextSlide, autoPlayInterval)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [autoPlay, autoPlayInterval, isHovered, nextSlide])

  const getBadgeStyles = (type: string) => {
    switch (type) {
      case 'discount':
        return 'bg-orange-500 text-white border-2 border-white'
      case 'promo':
        return 'bg-cyan-400 text-white border-2 border-white'
      case 'info':
        return 'bg-white/20 text-white border-2 border-white backdrop-blur-sm'
      default:
        return 'bg-white/20 text-white border-2 border-white'
    }
  }

  return (
    <div
      className={cn('relative overflow-hidden', className)}
      style={{ height }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -300 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="absolute inset-0 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 h-32 w-32 rounded-full bg-white blur-3xl" />
            <div className="absolute right-20 bottom-20 h-40 w-40 rounded-full bg-white blur-3xl" />
            <div className="absolute top-1/2 left-1/4 h-24 w-24 rounded-full bg-cyan-300 blur-2xl" />
          </div>

          {/* Content */}
          <div className="relative flex h-full items-center">
            <div className="container mx-auto px-6 lg:px-8">
              <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
                {/* Text Content */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="space-y-6 text-white"
                >
                  <div className="space-y-2">
                    <h1 className="text-3xl leading-tight font-bold md:text-4xl lg:text-5xl">
                      {slides[currentSlide]!.title}
                    </h1>
                    {slides[currentSlide]!.subtitle && (
                      <h2 className="text-2xl font-bold text-cyan-200 md:text-3xl lg:text-4xl">
                        {slides[currentSlide]!.subtitle}
                      </h2>
                    )}
                  </div>

                  {slides[currentSlide]!.description && (
                    <p className="max-w-2xl text-lg text-blue-100 md:text-xl">
                      {slides[currentSlide]!.description}
                    </p>
                  )}

                  {/* Badges */}
                  {slides[currentSlide]!.badges && (
                    <div className="flex flex-wrap gap-4">
                      {slides[currentSlide]!.badges!.map((badge, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                          className={cn(
                            'rounded-lg px-4 py-2 text-sm font-semibold md:text-base',
                            getBadgeStyles(badge.type)
                          )}
                        >
                          {badge.text}
                        </motion.div>
                      ))}
                    </div>
                  )}

                  {/* CTA Button */}
                  {slides[currentSlide]!.cta && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.6 }}
                    >
                      <button className="rounded-lg bg-white px-8 py-4 text-lg font-semibold text-blue-600 shadow-lg transition-colors duration-200 hover:bg-blue-50">
                        {slides[currentSlide]!.cta!.text}
                      </button>
                    </motion.div>
                  )}
                </motion.div>

                {/* Image/Visual Content */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="relative flex items-center justify-center"
                >
                  {slides[currentSlide]!.image ? (
                    <Image
                      src={slides[currentSlide]!.image || '/placeholder.svg'}
                      alt={slides[currentSlide]!.title}
                      className="h-auto max-w-full"
                      width={1024}
                      height={1024}
                    />
                  ) : (
                    // Default car illustration
                    <div className="relative">
                      <div className="flex h-48 w-80 items-center justify-center rounded-2xl border border-white/30 bg-white/20 backdrop-blur-sm">
                        <div className="text-6xl">🚗</div>
                      </div>
                      <div className="absolute -right-4 -bottom-4 h-24 w-24 rounded-full bg-cyan-400 opacity-80 blur-xl" />
                      <div className="absolute -top-4 -left-4 h-16 w-16 rounded-full bg-white opacity-60 blur-lg" />
                    </div>
                  )}
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      {showNavigation && (
        <>
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-4 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-white/20 text-white backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:bg-white/30"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-4 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-white/20 text-white backdrop-blur-sm transition-all duration-200 hover:scale-110 hover:bg-white/30"
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}

      {/* Dots Navigation */}
      {showDots && (
        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                'h-3 w-3 rounded-full transition-all duration-200',
                currentSlide === index
                  ? 'scale-125 bg-white'
                  : 'bg-white/50 hover:bg-white/75'
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
