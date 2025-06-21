'use client'

import { useResponsive } from '@/hooks'
import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'

import { CarouselSlide } from './Home'

import { cn } from '@/lib/utils'

import { Button } from '@/components/ui/button'

interface HeadlineCarouselProps {
  slides: CarouselSlide[]
  autoPlay?: boolean
  autoPlayInterval?: number
  showNavigation?: boolean
  showDots?: boolean
  className?: string
  onSlideChange?: (index: number) => void
}

export default function HeadlineCarousel({
  slides,
  autoPlay = true,
  autoPlayInterval = 5000,
  showDots = true,
  className,
  onSlideChange
}: HeadlineCarouselProps) {
  const { screenSize, isMobile } = useResponsive()
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

  return (
    <div
      className={cn(
        'relative h-80 overflow-hidden bg-gradient-to-tl from-blue-700 via-blue-600 to-blue-500 sm:h-96 md:h-[480px]',
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 1, x: screenSize.width }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 1, x: -1 * screenSize.width }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="absolute inset-0 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700"
        >
          <div className="relative flex h-full items-center">
            <div className="container mx-auto px-6 lg:px-8">
              <div className="grid grid-cols-1 items-center gap-8">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="flex flex-col items-start justify-center space-y-6 text-white"
                >
                  <div className="w-full space-y-2">
                    <h1 className="w-full text-3xl leading-tight font-bold capitalize md:text-4xl lg:text-5xl">
                      {slides[currentSlide]?.title}
                    </h1>
                    {slides[currentSlide]?.description && (
                      <p className="max-w-xl text-blue-100 sm:max-w-2xl md:max-w-2xl md:text-xl">
                        {slides[currentSlide]?.description}
                      </p>
                    )}
                  </div>

                  {slides[currentSlide]?.cta && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.6 }}
                    >
                      <Button
                        size={isMobile ? 'default' : 'lg'}
                        className="rounded bg-white font-semibold text-blue-600 shadow-lg transition-colors duration-200 hover:bg-blue-50"
                      >
                        {slides[currentSlide]?.cta?.text}
                      </Button>
                    </motion.div>
                  )}
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {showDots && (
        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                'h-3 w-3 cursor-pointer rounded-full transition-all duration-200',
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
