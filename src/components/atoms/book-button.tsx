'use client'

import { cn } from '@/lib/utils'

interface BookButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
}

export function BookButton({ 
  variant = 'primary', 
  className, 
  children = 'Book Appointment',
  ...props 
}: BookButtonProps) {
  return (
    <button
      className={cn(
        "rounded-lg px-4 py-2 text-sm font-medium transition-all",
        variant === 'primary' 
          ? "bg-primary-500 text-white hover:bg-primary-600" 
          : "border border-neutral-200 text-neutral-700 hover:bg-neutral-100 dark:border-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-800",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
} 