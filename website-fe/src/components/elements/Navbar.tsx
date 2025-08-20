'use client'

import Image from 'next/image'
import Link from 'next/link'

import { PAGE_ROUTES } from '@/common/constants'
import { navigationItems, simpleItems } from '@/common/contents'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDownIcon, Menu, Phone } from 'lucide-react'
import { memo, useEffect, useRef, useState } from 'react'

import { cn } from '@/lib/utils'

import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

const PureNavbar = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isHoveringDropdown, setIsHoveringDropdown] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleMouseEnter = (title: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setActiveDropdown(title)
  }

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      if (!isHoveringDropdown) {
        setActiveDropdown(null)
      }
    }, 100)
  }

  const handleDropdownMouseEnter = () => {
    setIsHoveringDropdown(true)
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }

  const handleDropdownMouseLeave = () => {
    setIsHoveringDropdown(false)
    setActiveDropdown(null)
  }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const handleMobileLinkClick = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-white backdrop-blur supports-[backdrop-filter]:bg-white">
        <div className="container mx-auto px-5 py-2 sm:px-24">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <Link
                href={PAGE_ROUTES.marketing.home.path}
                className="flex items-center space-x-2"
              >
                <div className="relative flex h-8 w-8 items-center justify-center rounded bg-blue-600">
                  <Image
                    src="/logo.png"
                    alt="Jual Otomotif Jepara Logo"
                    width={1024}
                    height={1024}
                    className="w-full rounded object-cover"
                  />
                </div>
                <span className="text-xl font-bold text-gray-900">
                  Cari Otomotif Jepara
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden items-center space-x-1 lg:flex">
              {simpleItems.map(item => (
                <Button
                  key={item.title}
                  variant="ghost"
                  asChild
                  className="h-10 cursor-pointer px-4 py-2 text-sm font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-50 hover:text-blue-600"
                >
                  <Link href={item.href}>{item.title}</Link>
                </Button>
              ))}

              {navigationItems.map(item => (
                <div
                  key={item?.title}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(item?.title)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Button
                    variant="ghost"
                    className={cn(
                      'h-10 px-4 py-2 text-sm font-medium text-gray-700 transition-colors duration-200 hover:cursor-pointer hover:bg-gray-50 hover:text-blue-600',
                      activeDropdown === item.title && 'bg-gray-50 text-blue-600'
                    )}
                  >
                    {item.title}
                    <motion.div
                      animate={{ rotate: activeDropdown === item.title ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDownIcon className="ml-1 h-4 w-4" />
                    </motion.div>
                  </Button>
                </div>
              ))}
            </nav>

            {/* Desktop CTA Buttons */}
            <div className="hidden items-center space-x-3 lg:flex">
              <Button
                onClick={() =>
                  window.open(
                    'https://api.whatsapp.com/send/?phone=628122851744&text=Halo%20Pak%20Praba%2C%20saya%20ingin%20cari-cari%20otomotif%20di%20jepara%20nih',
                    '_blank',
                    'noopener,noreferrer'
                  )
                }
                size={'lg'}
                className="cursor-pointer bg-blue-600 text-white transition-colors duration-200 hover:bg-blue-700"
              >
                <Phone />
                Pesan Sekarang
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:cursor-pointer lg:hidden"
                >
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-10/12 px-6 py-4 sm:w-96">
                <div className="mt-6 flex flex-col space-y-6">
                  <nav className="mt-4 flex flex-col space-y-2">
                    {/* MAKE A CHANGE HERE */}
                    {simpleItems.map(item => (
                      <Link
                        key={item.title}
                        href={item.href}
                        className="flex w-full items-center rounded-lg px-3 py-3 text-left text-base font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-50 hover:text-blue-600"
                        onClick={handleMobileLinkClick}
                      >
                        {item.title}
                      </Link>
                    ))}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Full-width dropdown portal */}
      <AnimatePresence>
        {activeDropdown && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="fixed top-20 right-0 left-0 z-40 border-b border-gray-200 bg-white shadow-lg"
            onMouseEnter={handleDropdownMouseEnter}
            onMouseLeave={handleDropdownMouseLeave}
          >
            <div className="container mx-auto px-4 py-8">
              {navigationItems
                .filter(item => item.title === activeDropdown)
                .map(item => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-8 md:grid-cols-2 lg:grid-cols-3">
                      {item.content.sections.map((section, sectionIndex) => (
                        <motion.a
                          key={section.title}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.3,
                            delay: 0.1 + sectionIndex * 0.05,
                            ease: 'easeOut'
                          }}
                          className="flex h-24 w-full items-center justify-center rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                          href={section.href}
                        >
                          <h3 className="text-sm font-semibold tracking-wide uppercase">
                            {section.title}
                          </h3>
                        </motion.a>
                      ))}
                    </div>
                  </motion.div>
                ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop overlay */}
      <AnimatePresence>
        {activeDropdown && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-30 bg-black/10"
            onClick={() => setActiveDropdown(null)}
          />
        )}
      </AnimatePresence>
    </>
  )
}

const Navbar = memo(PureNavbar)

export default Navbar
