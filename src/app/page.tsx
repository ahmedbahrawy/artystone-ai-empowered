'use client'

import {
  HeroSection,
  StatsSection,
  DoctorMessage,
  ClinicGallery,
  FeaturesSection,
  ServicesSection,
  TestimonialsSection,
  CTASection,
} from '@/features/home'

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <StatsSection />
      <DoctorMessage />
      <FeaturesSection />
      <ClinicGallery />
      <ServicesSection />
      <TestimonialsSection />
      <CTASection />
    </main>
  )
}
