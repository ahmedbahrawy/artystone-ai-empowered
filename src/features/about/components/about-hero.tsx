'use client'

import { PageHero } from '@/components/molecules/page-hero'
import { Button } from '@/components/ui/button'
import { BookButton } from '@/components/atoms/book-button'

export function AboutHero() {
  return (
    <PageHero
      title="Meet Dr. Farzaneh"
      highlightedText="Your Family Doctor"
      description="With over 15 years of experience in family medicine, Dr. Farzaneh is dedicated to providing comprehensive healthcare services to families in Frankston and surrounding areas. Our approach combines modern medical expertise with compassionate care."
      image={{
        src: '/images/about-hero.jpg',
        alt: 'Dr. Farzaneh at Arty Stone Medical Clinic'
      }}
      actions={
        <>
          <BookButton size="lg" />
          <Button size="lg" variant="outline">
            Our Services
          </Button>
        </>
      }
    />
  )
} 