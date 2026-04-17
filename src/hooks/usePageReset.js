import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Custom hook to reset page state when route changes
 * Ensures components properly reinitialize on navigation
 */
const usePageReset = () => {
  const location = useLocation()

  useEffect(() => {
    // Scroll to top
    window.scrollTo(0, 0)

    // Enable any animations or effects that might have been paused
    document.body.style.overflow = 'auto'
  }, [location.pathname])
}

export default usePageReset
