'use client'

import Link from 'next/link'

export function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <span className="font-serif text-xl font-bold text-neutral-900 dark:text-neutral-50">
        Arty Stone
      </span>
      <span className="text-primary-500">Clinic</span>
    </Link>
  )
} 