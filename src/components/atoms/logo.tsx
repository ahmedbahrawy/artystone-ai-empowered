'use client'

import Image from 'next/image'
import Link from 'next/link'

export function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <Image
        src="/images/Artystone Logo.New Feb19.svg"
        alt="Arty Stone Clinic Logo"
        width={150}
        height={40}
        className="h-10 w-auto dark:brightness-200"
      />
    </Link>
  )
} 