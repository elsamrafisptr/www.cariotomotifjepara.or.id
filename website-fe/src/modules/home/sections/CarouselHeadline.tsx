'use client'

import { useResponsive } from '@/hooks'
import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'

import { cn } from '@/lib/utils'

interface HeadlineCarouselProps {
  slides: string[]
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
  const { screenSize } = useResponsive()
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
        'relative aspect-video w-full overflow-hidden bg-white sm:h-96 md:h-[480px]',
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence mode="wait">
        <motion.img
          key={currentSlide}
          src={slides[currentSlide]}
          alt={`Slide ${currentSlide + 1}`}
          initial={{ opacity: 0, x: screenSize.width }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -screenSize.width }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="block h-full w-full object-cover"
        />
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
