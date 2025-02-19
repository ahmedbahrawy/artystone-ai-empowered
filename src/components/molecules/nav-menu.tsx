'use client'

import { NavLink } from '@/components/atoms/nav-link'

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
] as const

export function NavMenu() {
  return (
    <nav className="hidden md:flex md:space-x-8">
      {navigation.map((item) => (
        <NavLink key={item.name} href={item.href}>
          {item.name}
        </NavLink>
      ))}
    </nav>
  )
} 