'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Container } from '@/components/ui/container'
import { fadeIn } from '@/lib/animations'
import { BookButton } from '@/components/atoms/book-button'

export function ContactCTA() {
  return (
    <section className="relative py-16 md:py-20 lg:py-24">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/50 via-neutral-100/50 to-neutral-100 dark:from-indigo-950/30 dark:via-neutral-900/50 dark:to-neutral-900" />

      <Container className="relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="mx-auto max-w-4xl text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50 sm:text-4xl">
            Ready to Book Your Appointment?
          </h2>
          <p className="mt-4 text-lg leading-8 text-neutral-600 dark:text-neutral-300">
            Schedule your visit with our experienced healthcare professionals today.
          </p>
          <div className="mt-8">
            <BookButton variant="default" size="lg" className="shadow-lg" />
          </div>
        </motion.div>
      </Container>
    </section>
  )
} 