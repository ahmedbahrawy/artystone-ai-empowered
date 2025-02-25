'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { fadeIn } from '@/lib/animations'
import { Container } from '@/components/ui/container'

interface PromoRibbonProps {
  className?: string
}

export function PromoRibbon({ className }: PromoRibbonProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className={cn(
        "bg-gradient-to-r from-indigo-600 via-primary-500 to-secondary-500 text-white py-2",
        className
      )}
    >
      <Container>
        <div className="flex items-center justify-center text-center">
          <p className="text-sm font-medium md:text-base">
            Doctors Consulting Rooms for rent - 
            <button 
              onClick={() => window.location.href = '/contact'}
              className="underline ml-1 hover:text-white/90 font-semibold"
            >
              Contact us
            </button>
            <span className="hidden md:inline"> - Specialist and Allied health</span>
          </p>
        </div>
      </Container>
    </motion.div>
  )
} 