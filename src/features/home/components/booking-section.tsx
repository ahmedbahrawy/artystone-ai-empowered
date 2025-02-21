'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Container } from '@/components/ui/container'
import { BookingIframe } from '@/components/atoms/booking-iframe'
import { fadeIn } from '@/lib/animations'

export function BookingSection() {
  return (
    <section className="py-16 md:py-20 lg:py-24">
      <Container>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="mx-auto max-w-4xl"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50 sm:text-4xl">
              Book Your Appointment
            </h2>
            <p className="mt-4 text-lg leading-8 text-neutral-600 dark:text-neutral-300">
              Schedule your visit with our experienced healthcare professionals
            </p>
          </div>
          <div className="rounded-2xl border border-neutral-200 bg-white/80 p-4 shadow-lg backdrop-blur-sm dark:border-neutral-800 dark:bg-neutral-900/80 md:p-6">
            <BookingIframe />
          </div>
        </motion.div>
      </Container>
    </section>
  )
} 