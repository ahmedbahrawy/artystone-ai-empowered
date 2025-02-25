import { motion, type Variants } from 'framer-motion'
import { type ReactNode } from 'react'

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  variants?: Variants
  delay?: number
  once?: boolean
}

export function AnimatedSection({
  children,
  className,
  variants,
  delay = 0,
  once = true,
}: AnimatedSectionProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
      variants={variants}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
} 