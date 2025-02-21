import type { Metadata } from 'next'
import { ServicesHero, ServicesList, ServicesCTA } from '@/features/services'
import { Header } from '@/components/layout/header'

export const metadata: Metadata = {
  title: "Medical Services & Family Healthcare",
  description: "Comprehensive medical services including family medicine, women's health, preventive care, and general wellness. Expert healthcare services provided by experienced family doctors.",
  openGraph: {
    title: "Medical Services & Family Healthcare | Arty Stone Clinic",
    description: "Comprehensive medical services including family medicine, women's health, preventive care, and general wellness.",
  },
}

export default function ServicesPage() {
  return (
    <>
      <Header variant="transparent" />
      <main>
        <ServicesHero />
        <ServicesList />
        <ServicesCTA />
      </main>
    </>
  )
} 