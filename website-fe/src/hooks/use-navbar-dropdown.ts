import { useCallback, useEffect, useState } from 'react'

export const useNavbarDropdown = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  const toggleDropdown = useCallback((title: string) => {
    setActiveDropdown(prev => (prev === title ? null : title))
  }, [])

  const closeDropdown = useCallback(() => {
    setActiveDropdown(null)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeDropdown()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [closeDropdown])

  return {
    activeDropdown,
    toggleDropdown,
    closeDropdown
  }
}
