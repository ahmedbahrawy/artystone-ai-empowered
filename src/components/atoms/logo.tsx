'use client'

import Image from 'next/image'
import Link from 'next/link'

export function Logo() {
  return (
    <Link href="/" className="flex items-center">
      <Image
        src="/images/artystone-logo.svg"
        alt="Arty Stone Clinic"
        width={180}
        height={48}
        className="h-14 w-auto transition-transform duration-300 hover:scale-105 dark:brightness-[1.15] lg:h-16"
        priority
      />
    </Link>
  )
} 