'use client'

import * as React from 'react'
import { Container } from '@/components/ui/container'
import { ContactForm } from '@/components/molecules/contact-form'
import { ContactInfo } from '@/components/molecules/contact-info'
import { LocationMap } from '@/components/atoms/location-map'
import { motion } from 'framer-motion'
import { fadeIn, stagger } from '@/lib/animations'

export function ContactDetails() {
  return (
    <section className="py-16 md:py-20 lg:py-24">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="space-y-12"
        >
          <div className="grid gap-8 lg:grid-cols-12">
            {/* Contact Info & Form */}
            <motion.div 
              variants={fadeIn} 
              className="lg:col-span-7 space-y-8 bg-white/50 dark:bg-neutral-800/50 rounded-2xl p-6 shadow-lg"
            >
              <ContactInfo />
              <div className="border-t border-neutral-200 dark:border-neutral-700 pt-8">
                <ContactForm />
              </div>
            </motion.div>

            {/* Map */}
            <motion.div 
              variants={fadeIn} 
              className="lg:col-span-5 h-full min-h-[600px] lg:min-h-0"
            >
              <LocationMap />
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  )
} 