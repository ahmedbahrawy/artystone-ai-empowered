'use client'

import { PageHero } from '@/components/molecules/page-hero'
import { Button } from '@/components/ui/button'
import { BookButton } from '@/components/atoms/book-button'

export function ContactHero() {
  return (
    <PageHero
      title="Get in"
      highlightedText="Touch"
      description="Have questions or need to schedule an appointment? We're here to help. Contact our friendly team at Arty Stone Medical Clinic in Frankston for all your healthcare needs."
      image={{
        src: '/images/contact-hero.jpg',
        alt: 'Contact Arty Stone Medical Clinic'
      }}
      actions={
        <>
          <BookButton size="lg" />
          <Button size="lg" variant="outline" asChild>
            <a href="tel:+61-YOUR-PHONE-NUMBER">Call Us</a>
          </Button>
        </>
      }
    />
  )
} 