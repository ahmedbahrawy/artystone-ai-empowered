import type { Metadata } from 'next'
import { ContactPageClient } from '@/features/contact/contact-page-client'

export const metadata: Metadata = {
  title: "Contact & Book Appointments",
  description: "Book appointments with our family doctors at Arty Stone Clinic. Easy online booking, multiple contact options, and flexible office hours for your convenience.",
  keywords: ['contact', 'appointments', 'booking', 'office hours', 'clinic contact', 'medical appointments'],
  openGraph: {
    title: "Contact & Book Appointments | Arty Stone Clinic",
    description: "Book appointments with our family doctors at Arty Stone Clinic. Easy online booking and flexible office hours.",
    type: 'website',
    url: 'https://artystoneclinic.com.au/contact',
    images: [
      {
        url: '/images/contact-og.webp',
        width: 1200,
        height: 630,
        alt: 'Arty Stone Medical Clinic Contact',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Contact & Book Appointments | Arty Stone Clinic",
    description: "Book appointments with our family doctors at Arty Stone Clinic. Easy online booking and flexible office hours.",
    images: ['/images/contact-og.webp'],
  },
}

export default function ContactPage() {
  return <ContactPageClient />;
} 