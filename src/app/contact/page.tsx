import type { Metadata } from 'next'
import { Header } from '@/components/layout/header'
import { ContactHero, ContactDetails, ContactOfficeHours, ContactCTA } from '@/features/contact'

export const metadata: Metadata = {
  title: "Contact & Book Appointments",
  description: "Book appointments with our family doctors at Arty Stone Clinic. Easy online booking, multiple contact options, and flexible office hours for your convenience.",
  openGraph: {
    title: "Contact & Book Appointments | Arty Stone Clinic",
    description: "Book appointments with our family doctors at Arty Stone Clinic. Easy online booking and flexible office hours.",
  },
}

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