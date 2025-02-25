'use client'

import { motion } from 'framer-motion'
import { Container, Grid, Section } from '@/components/ui/container'
import { slideInFromBottom, stagger } from '@/lib/animations'

const features = [
  {
    title: 'Advanced Diagnostics',
    description: 'State-of-the-art diagnostic tools and techniques for accurate assessments.',
    icon: '🔬',
  },
  {
    title: 'Personalized Care',
    description: 'Tailored treatment plans designed to meet your unique needs and goals.',
    icon: '👤',
  },
  {
    title: 'Expert Team',
    description: 'Highly qualified professionals with years of experience in their fields.',
    icon: '👥',
  },
  {
    title: 'Modern Facilities',
    description: 'Clean, comfortable, and well-equipped treatment spaces for optimal care.',
    icon: '🏥',
  },
  {
    title: 'Holistic Approach',
    description: 'Comprehensive treatment that addresses both symptoms and root causes.',
    icon: '🌿',
  },
  {
    title: 'Ongoing Support',
    description: 'Continuous guidance and support throughout your recovery journey.',
    icon: '🤝',
  },
] as const

export function FeaturesSection() {
  return (
    <Section className="bg-white dark:bg-neutral-900">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="space-y-12"
        >
          <motion.div
            variants={slideInFromBottom}
            className="mx-auto max-w-3xl text-center"
          >
            <h2 className="font-serif text-3xl font-bold text-neutral-900 dark:text-neutral-50 md:text-4xl">
              Comprehensive Healthcare Solutions
            </h2>
            <p className="mt-4 text-lg text-neutral-700 dark:text-neutral-300">
              Experience the difference with our advanced facilities and expert care team
            </p>
          </motion.div>
          <Grid className="gap-6 lg:gap-8">
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                variants={slideInFromBottom}
                className="rounded-xl border border-neutral-200 bg-neutral-50 p-6 shadow-sm transition-all hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900"
              >
                <div className="mb-4 text-4xl">{feature.icon}</div>
                <h3 className="font-serif text-xl font-semibold text-neutral-900 dark:text-neutral-50">
                  {feature.title}
                </h3>
                <p className="mt-2 text-neutral-700 dark:text-neutral-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </Grid>
        </motion.div>
      </Container>
    </Section>
  )
} 