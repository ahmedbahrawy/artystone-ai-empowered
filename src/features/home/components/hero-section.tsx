'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import { PageHero } from '@/components/molecules/page-hero'
import { BookButton } from '@/components/atoms/book-button'

export function HeroSection() {
  return (
    <PageHero
      title="Modern Healthcare"
      highlightedText="Redefined"
      description="Experience exceptional medical care at Dr. Farzaneh's Arty Stone Medical Clinic in Frankston. We provide comprehensive family healthcare services with a focus on personalized attention and modern medical solutions."
      showVideo
      actions={
        <>
          <BookButton size="lg" />
          <Button size="lg" variant="outline">
            Learn More
          </Button>
        </>
      }
    />
  )
}