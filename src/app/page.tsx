import { Metadata } from 'next'
import {
  HeroSection,
  StatsSection,
  DoctorMessage,
  ClinicGallery,
  FeaturesSection,
  ServicesSection,
  CTASection,
  BookingSection,
  ContactSection,
} from '@/features/home'

export const metadata: Metadata = {
  title: 'Arty Stone Clinic',
  description: 'Welcome to Arty Stone Clinic - Your trusted healthcare partner',
  keywords: ['clinic', 'healthcare', 'medical', 'doctor', 'treatment', 'Arty Stone Clinic'],
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <DoctorMessage />
      <FeaturesSection />
      <ClinicGallery />
      <ServicesSection />
      <BookingSection />
      <ContactSection />
      <CTASection />
    </>
  )
}
