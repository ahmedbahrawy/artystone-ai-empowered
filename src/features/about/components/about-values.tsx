'use client'

import { motion } from 'framer-motion'
import { Container, Section, Grid } from '@/components/ui/container'
import { slideInFromBottom, stagger } from '@/lib/animations'

const values = [
  {
    title: 'Excellence',
    description:
      'We strive for excellence in everything we do, from patient care to administrative processes.',
    icon: '⭐',
  },
  {
    title: 'Compassion',
    description:
      'We treat every patient with genuine care, empathy, and understanding.',
    icon: '💝',
  },
  {
    title: 'Innovation',
    description:
      'We embrace the latest medical advancements while honoring traditional healing practices.',
    icon: '💡',
  },
  {
    title: 'Integrity',
    description:
      'We maintain the highest standards of professional and personal integrity.',
    icon: '🤝',
  },
  {
    title: 'Patient-Centered',
    description:
      'Our patients are at the heart of every decision we make and every service we provide.',
    icon: '👥',
  },
  {
    title: 'Community',
    description:
      'We are committed to serving and improving the health of our local community.',
    icon: '🌍',
  },
] as const

export function AboutValues() {
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
          className="space-y-12"
        >
          <motion.div
            variants={slideInFromBottom}
            className="mx-auto max-w-3xl space-y-4 text-center"
          >
            <h2 className="font-serif text-3xl font-bold text-neutral-900 dark:text-neutral-50 md:text-4xl">
              Our Core Values
            </h2>
            <p className="text-lg text-neutral-700 dark:text-neutral-300">
              These principles guide our practice and shape every interaction with our patients.
            </p>
          </motion.div>

          <Grid className="gap-6 lg:grid-cols-3 lg:gap-8">
            {values.map((value) => (
              <motion.div
                key={value.title}
                variants={slideInFromBottom}
                className="group relative rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-primary/50 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900"
              >
                <div className="mb-4 text-4xl">{value.icon}</div>
                <h3 className="font-serif text-xl font-semibold text-neutral-900 dark:text-neutral-50">
                  {value.title}
                </h3>
                <p className="mt-2 text-neutral-700 dark:text-neutral-300">
                  {value.description}
                </p>
                {/* Gradient Border on Hover */}
                <div className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-br from-primary-500/0 via-secondary-500/0 to-accent/0 opacity-0 blur transition-all group-hover:from-primary-500/10 group-hover:via-secondary-500/10 group-hover:to-accent/10 group-hover:opacity-100" />
              </motion.div>
            ))}
          </Grid>
        </motion.div>
      </Container>
    </Section>
  )
} 