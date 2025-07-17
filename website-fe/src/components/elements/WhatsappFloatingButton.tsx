'use client'

import Image from 'next/image'

import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useCallback, useEffect, useMemo, useState } from 'react'

import { cn } from '@/lib/utils'

interface WhatsAppFloatingButtonProps {
  phoneNumber: string
  accountName?: string
  avatar?: string
  statusMessage?: string
  initialMessageByServer?: string
  initialMessageByClient?: string
  startChatText?: string
  tooltipText?: string
  showTooltip?: boolean
  backgroundColor?: string
  iconColor?: string
  size?: 'sm' | 'md' | 'lg'
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
  chatboxHeight?: number
  messageDelay?: number
  darkMode?: boolean
  className?: string
  show?: boolean
  icon?: React.ReactNode
  tooltipPosition?: 'top' | 'left' | 'right'
  enablePulse?: boolean
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void
  onClose?: () => void
  ariaLabel?: string
  allowClickAway?: boolean
  allowEsc?: boolean
}

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.516" />
  </svg>
)

const TypingIndicator = () => (
  <div className="flex space-x-1 p-3">
    <div className="flex space-x-1">
      {[0, 1, 2].map(i => (
        <motion.div
          key={i}
          className="h-2 w-2 rounded-full bg-gray-400"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 1,
            repeat: Number.POSITIVE_INFINITY,
            delay: i * 0.2
          }}
        />
      ))}
    </div>
  </div>
)

const sizeClasses = {
  sm: 'w-12 h-12',
  md: 'w-14 h-14',
  lg: 'w-16 h-16'
}

const iconSizeClasses = {
  sm: 'w-6 h-6',
  md: 'w-7 h-7',
  lg: 'w-8 h-8'
}

const positionClasses = {
  'bottom-right': 'bottom-6 right-6',
  'bottom-left': 'bottom-6 left-6',
  'top-right': 'top-6 right-6',
  'top-left': 'top-6 left-6'
}

const closeButtonPositionClasses = {
  sm: '-top-1 -right-1',
  md: '-top-0.5 -right-0.5',
  lg: 'top-0 right-0'
}

export default function WhatsAppFloatingButton({
  phoneNumber,
  accountName = 'Customer Support',
  avatar = '/placeholder.svg?height=60&width=60',
  statusMessage = 'Typically replies within 1 hour',
  initialMessageByServer = 'Hello there! 🤝\nHow can we help?',
  initialMessageByClient = 'Hello! I got your contact from your website. I would like to chat with you about...',
  startChatText = 'Start chat',
  tooltipText = 'Chat with us on WhatsApp',
  showTooltip = true,
  backgroundColor = '#25D366',
  iconColor = '#ffffff',
  size = 'md',
  position = 'bottom-right',
  chatboxHeight = 400,
  messageDelay = 2,
  darkMode = false,
  className,
  show = true,
  icon,
  tooltipPosition = 'left',
  enablePulse = true,
  onClick,
  onSubmit,
  onClose,
  ariaLabel = 'Open WhatsApp chat',
  allowClickAway = false,
  allowEsc = true
}: WhatsAppFloatingButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isTyping, setIsTyping] = useState(true)
  const [showMessage, setShowMessage] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  const timeNow = useMemo(
    () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    []
  )

  const handleOpen = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      event.stopPropagation()
      if (isOpen) return

      setIsOpen(true)
      setIsTyping(true)
      setShowMessage(false)

      setTimeout(() => {
        setIsTyping(false)
        setShowMessage(true)
      }, messageDelay * 1000)

      onClick?.(event)
    },
    [isOpen, messageDelay, onClick]
  )

  const handleClose = useCallback(() => {
    setIsOpen(false)
    setIsTyping(true)
    setShowMessage(false)
    onClose?.()
  }, [onClose])

  const handleDismiss = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    setIsDismissed(true)
  }, [])

  const handleSubmit = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      const cleanPhone = phoneNumber.replace(/[^\d+]/g, '')
      const encoded = encodeURIComponent(initialMessageByClient.trim())
      const url = `https://api.whatsapp.com/send/?phone=${cleanPhone}&text=${encoded}`
      window.open(url, '_blank', 'noopener,noreferrer')
      onSubmit?.(event)
    },
    [phoneNumber, initialMessageByClient, onSubmit]
  )

  const getTooltipPosition = () => {
    switch (tooltipPosition) {
      case 'top':
        return position.includes('bottom') ? 'bottom-full mb-3' : 'top-full mt-3'
      case 'right':
        return 'left-full ml-3'
      case 'left':
      default:
        return 'right-full mr-3'
    }
  }

  const getTooltipAlignment = () => {
    if (tooltipPosition === 'top') {
      return 'left-1/2 -translate-x-1/2'
    }
    return 'top-1/2 -translate-y-1/2'
  }

  useEffect(() => {
    if (!allowClickAway || !isOpen) return
    const onDocClick = () => handleClose()
    document.addEventListener('click', onDocClick)
    return () => document.removeEventListener('click', onDocClick)
  }, [allowClickAway, isOpen, handleClose])

  useEffect(() => {
    if (!allowEsc || !isOpen) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && handleClose()
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [allowEsc, isOpen, handleClose])

  if (!show || isDismissed) return null

  return (
    <>
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        className={cn(
          'fixed z-50',
          positionClasses[position],
          darkMode && 'dark',
          className
        )}
      >
        {!isOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            onClick={handleDismiss}
            className={cn(
              'absolute z-20 flex h-4.5 w-4.5 cursor-pointer items-center justify-center rounded-full bg-gray-950 transition-all hover:scale-110 hover:bg-black',
              closeButtonPositionClasses[size]
            )}
            aria-label="Dismiss button"
          >
            <X className="h-3 w-3 text-white" />
          </motion.button>
        )}

        {/* Tooltip - Always visible when enabled and chat is closed */}
        {tooltipText && showTooltip && !isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className={cn(
              'absolute rounded-lg bg-gray-900 px-3 py-2 text-sm whitespace-nowrap text-white shadow-lg',
              'flex items-center justify-center',
              darkMode && 'bg-gray-700',
              getTooltipPosition(),
              getTooltipAlignment()
            )}
          >
            {tooltipText}
            {/* Tooltip arrow */}
            <div
              className={cn(
                'absolute h-2 w-2 rotate-45 bg-gray-900',
                darkMode && 'bg-gray-700',
                tooltipPosition === 'left' &&
                  'top-1/2 left-full -ml-1 -translate-y-1/2',
                tooltipPosition === 'right' &&
                  'top-1/2 right-full -mr-1 -translate-y-1/2',
                tooltipPosition === 'top' &&
                  'bottom-full left-1/2 -mb-1 -translate-x-1/2'
              )}
            />
          </motion.div>
        )}

        {/* Main Button */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleOpen}
          className={cn(
            'relative cursor-pointer rounded-full shadow-lg transition-all duration-300 ease-in-out',
            'focus:ring-opacity-50 hover:shadow-xl focus:ring-4 focus:outline-none',
            'flex items-center justify-center',
            sizeClasses[size]
          )}
          style={{
            backgroundColor,
            color: iconColor,
            boxShadow: `0 4px 15px rgba(37, 211, 102, 0.3)`
          }}
          aria-label={ariaLabel}
        >
          {/* Pulse animation */}
          {enablePulse && !isOpen && (
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ backgroundColor }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.7, 0, 0.7]
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: 'easeInOut'
              }}
            />
          )}

          {/* Icon */}
          <div className={cn('relative z-10', iconSizeClasses[size])}>
            {icon || <WhatsAppIcon className="h-full w-full" />}
          </div>
        </motion.div>

        {/* Chat Box */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ duration: 0.2 }}
              className={cn(
                'absolute overflow-hidden rounded-lg bg-white shadow-2xl',
                'border border-gray-200',
                darkMode && 'border-gray-700 bg-gray-800',
                position.includes('right') ? 'right-0' : 'left-0',
                position.includes('bottom') ? 'bottom-full mb-4' : 'top-full mt-4'
              )}
              style={{
                width: 320,
                height: chatboxHeight
              }}
              onClick={e => e.stopPropagation()}
            >
              {/* Header */}
              <div
                className={cn(
                  'flex items-center border-b p-4',
                  darkMode
                    ? 'border-gray-600 bg-gray-700'
                    : 'border-gray-200 bg-gray-50'
                )}
              >
                <Image
                  src={avatar || '/placeholder.svg'}
                  alt={accountName}
                  className="mr-3 h-10 w-10 rounded-full object-cover object-right"
                  width={1024}
                  height={1024}
                />
                <div className="flex-1">
                  <h3
                    className={cn(
                      'text-sm font-semibold',
                      darkMode ? 'text-white' : 'text-gray-900'
                    )}
                  >
                    {accountName}
                  </h3>
                  <div
                    className={cn(
                      'flex items-baseline gap-1.5 text-xs',
                      darkMode ? 'text-gray-300' : 'text-gray-500'
                    )}
                  >
                    <span className="relative flex size-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-300 opacity-75"></span>
                      <span className="relative inline-flex size-2 rounded-full bg-green-400"></span>
                    </span>
                    <p>{statusMessage}</p>
                  </div>
                </div>
                <button
                  onClick={handleClose}
                  className={cn(
                    'rounded-full p-1 transition-colors hover:cursor-pointer hover:bg-gray-200',
                    darkMode && 'hover:bg-gray-600'
                  )}
                >
                  <X
                    className={cn(
                      'h-4 w-4',
                      darkMode ? 'text-gray-300' : 'text-gray-500'
                    )}
                  />
                </button>
              </div>

              {/* Chat Body */}
              <div
                className={cn(
                  'flex-1 space-y-4 overflow-y-auto p-4',
                  darkMode ? 'bg-gray-800' : 'bg-gray-50'
                )}
                style={{ height: chatboxHeight - 140 }}
              >
                {isTyping ? (
                  <div className="flex justify-start">
                    <div
                      className={cn(
                        'max-w-xs rounded-lg',
                        darkMode ? 'bg-gray-700' : 'bg-white'
                      )}
                    >
                      <TypingIndicator />
                    </div>
                  </div>
                ) : showMessage ? (
                  <div className="flex justify-start">
                    <div
                      className={cn(
                        'max-w-xs rounded-lg p-3 shadow-sm',
                        darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'
                      )}
                    >
                      <div className="flex items-start space-x-2">
                        <div className="flex-1">
                          <p className="mb-1 text-sm font-medium">{accountName}</p>
                          <p className="text-sm whitespace-pre-line">
                            {initialMessageByServer}
                          </p>
                          <p
                            className={cn(
                              'mt-2 text-xs',
                              darkMode ? 'text-gray-400' : 'text-gray-500'
                            )}
                          >
                            {timeNow}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>

              {/* Footer */}
              <div
                className={cn(
                  'border-t px-4 py-2',
                  darkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-200 bg-white'
                )}
              >
                <form onSubmit={handleSubmit} className="space-y-3">
                  <button
                    type="submit"
                    disabled={!showMessage}
                    className={cn(
                      'flex w-full items-center justify-center space-x-2 rounded-lg px-4 py-3 hover:cursor-pointer',
                      'bg-green-500 hover:bg-green-600 disabled:cursor-not-allowed disabled:bg-gray-300',
                      'font-medium text-white transition-colors duration-200',
                      darkMode && 'disabled:bg-gray-600'
                    )}
                  >
                    <WhatsAppIcon className="h-5 w-5" />
                    <span>{startChatText}</span>
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/20"
            onClick={handleClose}
          />
        )}
      </AnimatePresence>
    </>
  )
}
