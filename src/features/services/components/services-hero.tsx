'use client'

import { PageHero } from '@/components/molecules/page-hero'
import { Button } from '@/components/ui/button'
import { BookButton } from '@/components/atoms/book-button'

export function ServicesHero() {
  return (
    <PageHero
      title="Comprehensive"
      highlightedText="Healthcare Services"
      description="From routine check-ups to specialized treatments, we offer a wide range of medical services to meet your family's healthcare needs. Medicare bulk billing available for eligible patients."
      image={{
        src: '/images/services-hero.jpg',
        alt: 'Medical services at Arty Stone Medical Clinic'
      }}
      actions={
        <>
          <BookButton size="lg" />
          <Button size="lg" variant="outline">
            View All Services
          </Button>
        </>
      }
    />
  )
} 