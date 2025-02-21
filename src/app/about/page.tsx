'use client'

import { AboutHero, AboutMission, AboutValues, AboutTeam, AboutCTA } from '@/features/about'
import { Header } from '@/components/layout/header'

export default function AboutPage() {
  return (
    <>
      <Header variant="transparent" />
      <main>
        <AboutHero />
        <AboutMission />
        <AboutValues />
        <AboutTeam />
        <AboutCTA />
      </main>
    </>
  )
} 