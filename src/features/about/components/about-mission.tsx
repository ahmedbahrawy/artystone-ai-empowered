'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Container, Section } from '@/components/ui/container'
import { slideInFromBottom, stagger } from '@/lib/animations'
import { images } from '@/lib/media-config'

export function AboutMission() {
  return (
    <Section className="relative overflow-hidden bg-neutral-50 dark:bg-neutral-900/50">
      <Container>
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          {/* Image */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideInFromBottom}
            className="relative aspect-square overflow-hidden rounded-3xl"
          >
            <Image
              src={images.clinicWelcome}
              alt="Arty Stone Clinic Welcome Area"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-transparent" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="space-y-8"
          >
            <motion.div variants={slideInFromBottom}>
              <h2 className="font-serif text-3xl font-bold text-neutral-900 dark:text-neutral-50 md:text-4xl">
                Our Mission
              </h2>
              <div className="mt-6 space-y-4 text-lg text-neutral-700 dark:text-neutral-300">
                <p>
                  At Arty Stone Clinic, our mission is to provide comprehensive, personalized healthcare
                  that empowers our patients to achieve optimal wellness. We believe in combining
                  traditional healing wisdom with modern medical advances.
                </p>
                <p>
                  Our approach is holistic, considering not just the symptoms but the whole person. We
                  strive to create a healing environment where patients feel supported, understood, and
                  confident in their journey to better health.
                </p>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={slideInFromBottom}
              className="grid grid-cols-3 gap-4 rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900"
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">13+</div>
                <div className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                  Years of Service
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">5k+</div>
                <div className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                  Happy Patients
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">15+</div>
                <div className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                  Expert Staff
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </Section>
  )
} 