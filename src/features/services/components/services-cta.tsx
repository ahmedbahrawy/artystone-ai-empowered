'use client'

import { motion } from 'framer-motion'
import { Container, Section } from '@/components/ui/container'
import { slideInFromBottom, stagger } from '@/lib/animations'
import { BookButton } from '@/components/atoms/book-button'

export function ServicesCTA() {
  return (
    <Section className="relative overflow-hidden bg-white dark:bg-neutral-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

      <Container className="relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="mx-auto max-w-4xl space-y-8 text-center"
        >
          <motion.div variants={slideInFromBottom} className="space-y-4">
            <h2 className="font-serif text-3xl font-bold text-neutral-900 dark:text-neutral-50 md:text-4xl">
              Ready to Start Your Journey to Better Health?
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-neutral-700 dark:text-neutral-300">
              Book an appointment today and let our expert team help you achieve your health and wellness goals.
            </p>
          </motion.div>

          <motion.div variants={slideInFromBottom}>
            <BookButton />
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  )
} 