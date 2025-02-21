'use client'

import * as React from 'react'
import { Container } from '@/components/ui/container'
import { ContactForm } from '@/components/molecules/contact-form'
import { ContactInfo } from '@/components/molecules/contact-info'
import { LocationMap } from '@/components/atoms/location-map'
import { motion } from 'framer-motion'
import { fadeIn, stagger } from '@/lib/animations'

export function ContactSection() {
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-neutral-50 dark:bg-neutral-900/50">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="space-y-12"
        >
          <motion.div variants={fadeIn} className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50 sm:text-4xl">
              Contact Us
            </h2>
            <p className="mt-4 text-lg leading-8 text-neutral-600 dark:text-neutral-300">
              Get in touch with us for any inquiries or to schedule an appointment.
            </p>
          </motion.div>

          <div className="grid gap-8 lg:grid-cols-2">
            <motion.div variants={fadeIn} className="space-y-8 bg-white/50 dark:bg-neutral-800/50 rounded-2xl p-6 shadow-lg">
              <ContactInfo />
              <div className="border-t border-neutral-200 dark:border-neutral-700 pt-8">
                <ContactForm />
              </div>
            </motion.div>
            <motion.div variants={fadeIn} className="h-full min-h-[600px] lg:min-h-0">
              <LocationMap />
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  )
} 