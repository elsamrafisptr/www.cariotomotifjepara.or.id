'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { ChevronUp } from 'lucide-react'
import * as React from 'react'

import { cn } from '@/lib/utils'

interface BackToTopButtonProps {
  threshold?: number
  scrollDuration?: number
  position?: 'bottom-right' | 'bottom-left' | 'bottom-center'
  className?: string
  icon?: React.ReactNode
  size?: 'sm' | 'md' | 'lg'
  backgroundColor?: string
  iconColor?: string
  showProgress?: boolean
  onClick?: () => void
}

const sizeClasses = {
  sm: 'w-10 h-10',
  md: 'w-12 h-12',
  lg: 'w-14 h-14'
}

const iconSizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6'
}

const positionClasses = {
  'bottom-right': 'bottom-24 right-7',
  'bottom-left': 'bottom-6 left-6',
  'bottom-center': 'bottom-6 left-1/2 -translate-x-1/2'
}

export default function BackToTopButton({
  threshold = 300,
  scrollDuration = 800,
  position = 'bottom-right',
  className,
  icon,
  size = 'md',
  backgroundColor = '#3B82F6',
  iconColor = '#FFFFFF',
  showProgress = true,
  onClick
}: BackToTopButtonProps) {
  const [isVisible, setIsVisible] = React.useState(false)
  const [scrollProgress, setScrollProgress] = React.useState(0)

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const docHeight = document.documentElement.scrollHeight - window.innerHeight

      setIsVisible(scrollTop > threshold)

      if (showProgress && docHeight > 0) {
        const progress = Math.min((scrollTop / docHeight) * 100, 100)
        setScrollProgress(progress)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [threshold, showProgress])

  const scrollToTop = () => {
    if (onClick) {
      onClick()
      return
    }

    const startPosition = window.pageYOffset
    const startTime = performance.now()

    const easeInOutCubic = (t: number) => {
      return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
    }

    const animateScroll = (currentTime: number) => {
      const timeElapsed = currentTime - startTime
      const progress = Math.min(timeElapsed / scrollDuration, 1)
      const ease = easeInOutCubic(progress)

      window.scrollTo(0, startPosition * (1 - ease))

      if (progress < 1) {
        requestAnimationFrame(animateScroll)
      }
    }

    requestAnimationFrame(animateScroll)
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className={cn(
            'fixed z-40 hover:cursor-pointer',
            positionClasses[position],
            className
          )}
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToTop}
            className={cn(
              'relative cursor-pointer rounded-full shadow-lg transition-all duration-300',
              'focus:ring-opacity-50 hover:shadow-xl focus:ring-4 focus:ring-blue-300 focus:outline-none',
              'group flex items-center justify-center',
              sizeClasses[size]
            )}
            style={{
              backgroundColor,
              color: iconColor
            }}
            aria-label="Back to top"
          >
            {showProgress && (
              <svg
                className="absolute inset-0 h-full w-full -rotate-90"
                viewBox="0 0 36 36"
              >
                <path
                  className="text-white/20"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="transparent"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <motion.path
                  className="text-white"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="transparent"
                  strokeLinecap="round"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  initial={{ strokeDasharray: '0 100' }}
                  animate={{ strokeDasharray: `${scrollProgress} 100` }}
                  transition={{ duration: 0.1 }}
                />
              </svg>
            )}

            <div
              className={cn(
                'relative z-10 transition-transform duration-200 group-hover:-translate-y-0.5',
                iconSizeClasses[size]
              )}
            >
              {icon || <ChevronUp className="h-full w-full" />}
            </div>

            <div className="absolute inset-0 rounded-full bg-white/10 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
          </motion.button>

          <div className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            <div className="rounded bg-gray-900 px-2 py-1 text-xs whitespace-nowrap text-white">
              Back to top
            </div>
            <div className="absolute top-full left-1/2 h-0 w-0 -translate-x-1/2 border-t-4 border-r-4 border-l-4 border-transparent border-t-gray-900" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
