'use client'

import * as React from 'react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'
import { NavLink } from '@/components/atoms/nav-link'
import { BookButton } from '@/components/atoms/book-button'

export function MobileMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <nav className="flex flex-col space-y-4">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/services">Services</NavLink>
          <NavLink href="/about">About</NavLink>
          <NavLink href="/contact">Contact</NavLink>
          <BookButton variant="secondary" />
        </nav>
      </SheetContent>
    </Sheet>
  )
} 