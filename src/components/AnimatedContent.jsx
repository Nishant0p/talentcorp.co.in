import { motion } from 'framer-motion'

/**
 * AnimatedContent wrapper for smooth fly-in animations
 * Wraps page content to create staggered animations for text, images, etc.
 */
export const AnimatedContent = ({ children, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: 0.1 + delay,
        ease: 'easeOut',
      }}
    >
      {children}
    </motion.div>
  )
}

/**
 * Container for staggered animations across multiple children
 * Each child animates in sequence with a stagger effect
 */
export const StaggerContainer = ({ children, staggerDelay = 0.1 }) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: 0.2,
          },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

/**
 * Individual item for stagger animations
 * Use as children of StaggerContainer
 */
export const StaggerItem = ({ children }) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 15 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: 'easeOut' },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

/**
 * Image animation - flies in from bottom
 */
export const AnimatedImage = ({ src, alt, delay = 0, ...props }) => {
  return (
    <motion.img
      src={src}
      alt={alt}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.7,
        delay: 0.15 + delay,
        ease: 'easeOut',
      }}
      {...props}
    />
  )
}

export default AnimatedContent
