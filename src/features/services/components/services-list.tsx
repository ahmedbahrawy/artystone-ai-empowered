'use client'

import { motion } from 'framer-motion'
import { Container, Section, Grid } from '@/components/ui/container'
import { slideInFromBottom, stagger } from '@/lib/animations'

const services = [
  {
    title: 'Physiotherapy',
    description: 'Expert physiotherapy services to help you recover and maintain optimal physical function.',
    icon: '🏃‍♂️',
    details: [
      'Joint and muscle rehabilitation',
      'Post-surgery recovery',
      'Sports injury treatment',
      'Posture correction',
      'Movement analysis',
    ],
  },
  {
    title: 'Massage Therapy',
    description: 'Therapeutic massage treatments to relieve pain, reduce stress, and promote relaxation.',
    icon: '💆‍♂️',
    details: [
      'Deep tissue massage',
      'Sports massage',
      'Relaxation massage',
      'Trigger point therapy',
      'Myofascial release',
    ],
  },
  {
    title: 'Rehabilitation',
    description: 'Comprehensive rehabilitation programs designed to restore function and mobility.',
    icon: '🔄',
    details: [
      'Custom exercise programs',
      'Balance training',
      'Strength conditioning',
      'Mobility improvement',
      'Functional training',
    ],
  },
  {
    title: 'Pain Management',
    description: 'Advanced techniques and treatments to help manage and reduce chronic pain.',
    icon: '🌟',
    details: [
      'Chronic pain treatment',
      'Joint pain relief',
      'Nerve pain management',
      'Therapeutic exercises',
      'Pain education',
    ],
  },
  {
    title: 'Sports Therapy',
    description: 'Specialized care for athletes and sports-related injuries.',
    icon: '⚽',
    details: [
      'Injury prevention',
      'Performance enhancement',
      'Sports-specific training',
      'Recovery programs',
      'Return to play protocols',
    ],
  },
  {
    title: 'Wellness Programs',
    description: 'Holistic wellness programs to improve your overall health and quality of life.',
    icon: '🌿',
    details: [
      'Lifestyle counseling',
      'Stress management',
      'Preventive care',
      'Health education',
      'Wellness workshops',
    ],
  },
] as const

export function ServicesList() {
  return (
    <Section className="relative overflow-hidden bg-neutral-50 dark:bg-neutral-900/50">
      <Container className="relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="space-y-12"
        >
          <Grid className="gap-8">
            {services.map((service) => (
              <motion.div
                key={service.title}
                variants={slideInFromBottom}
                className="group relative rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-primary/50 hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900/50"
              >
                <div className="mb-4 text-4xl">{service.icon}</div>
                <h3 className="font-serif text-2xl font-semibold text-neutral-900 dark:text-neutral-50">
                  {service.title}
                </h3>
                <p className="mt-2 text-neutral-700 dark:text-neutral-300">
                  {service.description}
                </p>
                <ul className="mt-4 space-y-2">
                  {service.details.map((detail) => (
                    <li
                      key={detail}
                      className="flex items-center text-neutral-700 dark:text-neutral-300"
                    >
                      <span className="mr-2 text-primary">•</span>
                      {detail}
                    </li>
                  ))}
                </ul>
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