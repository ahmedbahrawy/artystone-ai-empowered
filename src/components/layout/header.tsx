'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Container } from '@/design-system/layouts/Container'
import { fadeIn } from '@/design-system/animations/variants'
import { Logo } from '@/components/atoms/logo'
import { BookButton } from '@/components/atoms/book-button'
import { NavMenu } from '@/components/molecules/nav-menu'
import { MobileMenu } from '@/components/molecules/mobile-menu'

export function Header() {
  return (
    <motion.header 
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="fixed top-0 z-50 w-full border-b border-neutral-200 bg-white/80 backdrop-blur-md dark:border-neutral-800 dark:bg-neutral-900/80"
    >
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Logo />
          <NavMenu />
          <div className="flex items-center space-x-4">
            <BookButton className="hidden md:block" />
            <MobileMenu />
          </div>
        </div>
      </Container>
    </motion.header>
  )
} 