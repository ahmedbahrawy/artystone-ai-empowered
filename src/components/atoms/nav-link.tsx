'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

interface NavLinkProps {
  href: string
  children: React.ReactNode
}

export function NavLink({ href, children }: NavLinkProps) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      className={cn(
        "text-sm font-medium transition-colors hover:text-primary-500 dark:hover:text-primary-400",
        isActive 
          ? "text-primary-500 dark:text-primary-400" 
          : "text-neutral-700 dark:text-neutral-300"
      )}
    >
      {children}
    </Link>
  )
} 