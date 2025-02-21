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
  BookingSection,
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
      <BookingSection />
      <TestimonialsSection />
      <CTASection />
    </main>
  )
}
