import { useLayoutEffect, useState } from 'react'

export type ScreenSize = {
  width: number
  height: number
}

export interface Breakpoints {
  mobile: number
  tablet: number
}

const DEFAULT_BREAKPOINTS: Breakpoints = {
  mobile: 768,
  tablet: 1024
}

export default function useResponsive(breakpoints?: Partial<Breakpoints>) {
  const { mobile, tablet } = { ...DEFAULT_BREAKPOINTS, ...breakpoints }

  const [screenSize, setScreenSize] = useState<ScreenSize>({
    width: 0,
    height: 0
  })
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return

    const handleResize = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      setScreenSize({ width, height })
      setIsMobile(width <= mobile)
      setIsTablet(width > mobile && width <= tablet)
      setIsDesktop(width > tablet)
    }

    handleResize()

    window.addEventListener('resize', handleResize)
    const mqMobile = window.matchMedia(`(max-width: ${mobile}px)`)
    const mqTablet = window.matchMedia(
      `(min-width: ${mobile + 1}px) and (max-width: ${tablet}px)`
    )
    mqMobile.addEventListener('change', handleResize)
    mqTablet.addEventListener('change', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      mqMobile.removeEventListener('change', handleResize)
      mqTablet.removeEventListener('change', handleResize)
    }
  }, [mobile, tablet])

  return { screenSize, isMobile, isTablet, isDesktop }
}
