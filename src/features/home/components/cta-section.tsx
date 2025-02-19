'use client'

import { motion } from 'framer-motion'
import { Container, Section } from '@/design-system/layouts/Container'
import { fadeIn, slideInFromBottom } from '@/design-system/animations/variants'

export function CTASection() {
  return (
    <Section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 dark:from-primary-500/10 dark:to-secondary-500/10" />
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative z-10 mx-auto max-w-3xl text-center"
        >
          <motion.h2
            variants={slideInFromBottom}
            className="font-serif text-3xl font-bold text-neutral-900 dark:text-neutral-50 md:text-4xl lg:text-5xl"
          >
            Start Your Healing Journey Today
          </motion.h2>
          <motion.p
            variants={slideInFromBottom}
            className="mt-6 text-lg text-neutral-700 dark:text-neutral-300"
          >
            Book your consultation and experience the difference of our holistic approach to healthcare
          </motion.p>
          <motion.div
            variants={fadeIn}
            className="mt-8 flex flex-wrap justify-center gap-4"
          >
            <button className="rounded-lg bg-primary-500 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-primary-600">
              Book Appointment
            </button>
            <button className="rounded-lg border border-neutral-200 bg-white/90 px-8 py-4 text-lg font-semibold text-neutral-700 shadow-lg transition-all hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-900/90 dark:text-neutral-300 dark:hover:bg-neutral-800">
              Contact Us
            </button>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  )
} 