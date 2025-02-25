'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Container } from '@/components/ui/container'
import { fadeIn } from '@/lib/animations'
import { Logo } from '@/components/atoms/logo'
import { BookButton } from '@/components/atoms/book-button'
import { NavMenu } from '@/components/molecules/nav-menu'
import { MobileMenu } from '@/components/molecules/mobile-menu'
import { PromoRibbon } from '@/components/atoms/promo-ribbon'
import { cn } from '@/lib/utils'

interface HeaderProps {
  className?: string
  variant?: 'default' | 'transparent'
}

export function Header({ className, variant = 'default' }: HeaderProps) {
  return (
    <>
      <PromoRibbon className="fixed top-0 left-0 right-0 z-50" />
      <motion.header 
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className={cn(
          'fixed top-8 z-40 w-full transition-all duration-300',
          'border-b border-indigo-900/10 bg-white/90 backdrop-blur-md shadow-sm',
          'dark:border-neutral-800 dark:bg-neutral-900/90',
          'hover:bg-white hover:shadow-md hover:border-indigo-900/20',
          'dark:hover:bg-neutral-900 dark:hover:border-neutral-700',
          className
        )}
      >
        <Container>
          <div className="flex h-20 items-center justify-between lg:h-24">
            <Logo />
            <div className="flex flex-1 items-center justify-end space-x-4 md:space-x-6 lg:space-x-8">
              <NavMenu />
              <div className="flex items-center space-x-3">
                <BookButton className="hidden md:block" />
                <MobileMenu />
              </div>
            </div>
          </div>
        </Container>
      </motion.header>
    </>
  )
} 