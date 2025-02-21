'use client'

import { ServicesHero, ServicesList, ServicesCTA } from '@/features/services'
import { Header } from '@/components/layout/header'

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