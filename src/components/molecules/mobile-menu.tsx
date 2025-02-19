'use client'

import * as React from 'react'
import { BookButton } from '@/components/atoms/book-button'

export function MobileMenu() {
  return (
    <div className="md:hidden">
      <BookButton
        variant="secondary"
        className="p-2"
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </BookButton>
    </div>
  )
} 