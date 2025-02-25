'use client'

import * as React from 'react'
import dynamic from 'next/dynamic'
import { Container, Section } from '@/components/ui/container'

function LoadingSpinner() {
  return (
    <div className="w-full h-[800px] flex items-center justify-center bg-neutral-50 dark:bg-neutral-900">
      <div className="h-16 w-16 rounded-full border-4 border-primary-500/20 border-t-primary-500 animate-spin" />
    </div>
  )
}

const BookingIframe = dynamic(
  () => import('@/components/atoms/booking-iframe').then(mod => mod.BookingIframe),
  {
    ssr: false,
    loading: () => <LoadingSpinner />,
  }
)

export function BookingSection() {
  return (
    <Section className="relative overflow-hidden bg-white dark:bg-neutral-900">
      <Container>
        <div className="mx-auto max-w-4xl space-y-8 text-center">
          <div className="space-y-4">
            <h2 className="font-serif text-3xl font-bold text-neutral-900 dark:text-neutral-50 md:text-4xl">
              Book Your Appointment
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-neutral-700 dark:text-neutral-300">
              Schedule your visit with our experienced healthcare professionals. Quick and easy online booking available.
            </p>
          </div>
          
          <div className="relative rounded-2xl border border-neutral-200 bg-white p-4 shadow-lg dark:border-neutral-800 dark:bg-neutral-900 md:p-6">
            <BookingIframe />
          </div>
        </div>
      </Container>
    </Section>
  )
} 