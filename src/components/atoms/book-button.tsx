'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface BookButtonProps {
  className?: string
  variant?: 'default' | 'secondary' | 'outline'
  size?: 'default' | 'sm' | 'lg'
}

export function BookButton({ className, variant = 'default', size = 'default' }: BookButtonProps) {
  return (
    <Button
      onClick={() => window.location.href = '/booking'}
      variant={variant}
      size={size}
      className={cn(
        "font-semibold",
        variant === 'default' && "bg-gradient-to-r from-indigo-600 via-primary-500 to-primary-600 hover:from-indigo-700 hover:via-primary-600 hover:to-primary-700",
        className
      )}
    >
      Book Appointment
    </Button>
  )
} 