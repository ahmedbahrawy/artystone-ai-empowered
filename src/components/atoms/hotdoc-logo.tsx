'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

interface HotDocLogoProps {
  className?: string
}

export function HotDocLogo({ className }: HotDocLogoProps) {
  return (
    <svg
      viewBox="0 0 1000 250"
      fill="currentColor"
      className={cn("h-8 w-auto", className)}
    >
      <path d="M141.1 0H94.8v108.9H35.4V0H0v249.7h35.4V140.7h59.4v109h46.3V0zM349.4 0h-46.3v108.9h-59.4V0h-35.4v249.7h35.4V140.7h59.4v109h46.3V0zM557.7 0h-46.3v108.9H452V0h-35.4v249.7H452V140.7h59.4v109h46.3V0zM766 0h-46.3v108.9h-59.4V0h-35.4v249.7h35.4V140.7h59.4v109H766V0zM974.3 0H928v108.9h-59.4V0h-35.4v249.7h35.4V140.7H928v109h46.3V0z" />
    </svg>
  )
} 