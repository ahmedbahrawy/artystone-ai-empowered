import React from 'react'
import { cn } from '@/lib/utils'
import { tokens } from '../foundations/tokens'

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
  gutter?: keyof typeof tokens.spacing
  className?: string
  children: React.ReactNode
}

const sizes = {
  sm: 'max-w-screen-sm',
  md: 'max-w-screen-md',
  lg: 'max-w-screen-lg',
  xl: 'max-w-screen-xl',
  '2xl': 'max-w-screen-2xl',
  full: 'max-w-full',
}

export function Container({
  size = 'lg',
  gutter = 4,
  className,
  children,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        'mx-auto w-full',
        sizes[size],
        `px-${gutter}`,
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function Section({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <section
      className={cn('py-12 md:py-16 lg:py-20', className)}
      {...props}
    >
      {children}
    </section>
  )
}

export function Grid({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function Stack({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('flex flex-col space-y-4', className)}
      {...props}
    >
      {children}
    </div>
  )
}

export function Cluster({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'flex flex-wrap items-center gap-2',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
} 