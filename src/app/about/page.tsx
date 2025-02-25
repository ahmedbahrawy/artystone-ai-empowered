import type { Metadata } from 'next'
import { AboutHero, AboutMission, AboutValues, AboutCTA } from '@/features/about'
import { Header } from '@/components/layout/header'

export const metadata: Metadata = {
  title: "About Our Medical Practice",
  description: "Learn about Arty Stone Clinic's commitment to excellence in family medicine and healthcare services. Meet our experienced team of doctors and medical professionals.",
  keywords: ['about us', 'medical practice', 'family medicine', 'healthcare services', 'medical team', 'clinic history'],
  openGraph: {
    title: "About Our Medical Practice | Arty Stone Clinic",
    description: "Learn about Arty Stone Clinic's commitment to excellence in family medicine and healthcare services.",
  },
}

export default function AboutPage() {
  return (
    <>
      <Header variant="transparent" />
      <main>
        <AboutHero />
        <AboutMission />
        <AboutValues />
        <AboutCTA />
      </main>
    </>
  )
} 