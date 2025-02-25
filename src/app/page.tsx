import { Metadata } from 'next'
import {
  HeroSection,
  StatsSection,
  DoctorMessage,
} from '@/features/home'
import { Container } from '@/components/ui/container'
import { Separator } from '@/components/ui/separator'

export const metadata: Metadata = {
  title: 'Welcome to Dr. Farzaneh\'s Arty Stone Medical Clinic',
  description: 'Expert healthcare services in Frankston, Victoria. Family medicine, women\'s health, and comprehensive medical care with Medicare bulk billing available.',
}

export default function HomePage() {
  return (
    <>
      {/* Hero Section with Stats */}
      <section className="relative bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
        <Container className="py-12 md:py-20">
          <HeroSection />
          <div className="mt-12 md:mt-16">
            <StatsSection />
          </div>
        </Container>
      </section>

      {/* Doctor Profile Section */}
      <section className="bg-white dark:bg-gray-900">
        <Container className="py-16 md:py-24">
          <DoctorMessage />
        </Container>
      </section>
    </>
  )
}
