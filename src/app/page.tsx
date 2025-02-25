import { Metadata } from 'next'
import {
  HeroSection,
  StatsSection,
  DoctorMessage,
  FeaturesSection,
  ServicesSection,
  ClinicGallery,
  CTASection,
} from '@/features/home'
import { Container } from '@/components/ui/container'
import { Separator } from '@/components/ui/separator'

export const metadata: Metadata = {
  title: 'Welcome to Dr. Farzaneh\'s Arty Stone Medical Clinic',
  description: 'Expert healthcare services in Frankston, Victoria. Family medicine, women\'s health, and comprehensive medical care with Medicare bulk billing available.',
  keywords: [
    'medical clinic frankston',
    'family doctor',
    'bulk billing',
    'women\'s health',
    'healthcare services',
    'medical center',
    'doctor appointment',
    'GP clinic',
    'medical consultation',
    'family medicine'
  ],
}

export default function HomePage() {
  return (
    <main className="relative">
      {/* Hero Section with Stats */}
      <section className="relative bg-gradient-to-b from-blue-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800/50 pt-8 lg:pt-12">
        <Container className="py-12 md:py-20">
          <HeroSection />
          <div className="mt-12 md:mt-16">
            <StatsSection />
          </div>
        </Container>
        <div className="absolute inset-0 bg-grid-gray-900/[0.02] dark:bg-grid-white/[0.02]" />
      </section>

      {/* Doctor Profile Section */}
      <section className="relative bg-white dark:bg-gray-900 py-16 md:py-24">
        <Container>
          <DoctorMessage />
        </Container>
        <div className="absolute inset-0 bg-dot-gray-900/[0.02] dark:bg-dot-white/[0.02]" />
      </section>

      {/* Features Section */}
      <section className="relative bg-gray-50 dark:bg-gray-800/50 py-16 md:py-24">
        <Container>
          <FeaturesSection />
        </Container>
        <div className="absolute inset-0 bg-grid-gray-900/[0.02] dark:bg-grid-white/[0.02]" />
      </section>

      {/* Services Section */}
      <section className="relative bg-white dark:bg-gray-900 py-16 md:py-24">
        <Container>
          <ServicesSection />
        </Container>
        <div className="absolute inset-0 bg-dot-gray-900/[0.02] dark:bg-dot-white/[0.02]" />
      </section>

      {/* Gallery Section */}
      <section className="relative bg-gray-50 dark:bg-gray-800/50 py-16 md:py-24">
        <Container>
          <ClinicGallery />
        </Container>
        <div className="absolute inset-0 bg-grid-gray-900/[0.02] dark:bg-grid-white/[0.02]" />
      </section>

      {/* CTA Section */}
      <section className="relative">
        <CTASection />
        <div className="absolute inset-0 bg-grid-white/[0.02]" />
      </section>

      {/* Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 dark:from-blue-400/5 dark:to-purple-400/5" />
      </div>
    </main>
  )
}
