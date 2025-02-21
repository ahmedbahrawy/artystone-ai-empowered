'use client'

import { Header } from '@/components/layout/header'
import { ContactHero, ContactDetails, ContactOfficeHours, ContactCTA } from '@/features/contact'

export default function ContactPage() {
  return (
    <>
      <Header variant="transparent" />
      <main>
        <ContactHero />
        <ContactDetails />
        <ContactOfficeHours />
        <ContactCTA />
      </main>
    </>
  )
} 