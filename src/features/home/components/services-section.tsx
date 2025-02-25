'use client'

import { motion } from 'framer-motion'
import { Container, Section, Grid } from '@/components/ui/container'
import { slideInFromBottom, stagger } from '@/lib/animations'

const services = [
  {
    title: 'Physiotherapy',
    description: 'Expert physiotherapy services to help you recover and maintain optimal physical function.',
    icon: '🏃‍♂️',
  },
  {
    title: 'Massage Therapy',
    description: 'Therapeutic massage treatments to relieve pain, reduce stress, and promote relaxation.',
    icon: '💆‍♂️',
  },
  {
    title: 'Rehabilitation',
    description: 'Comprehensive rehabilitation programs designed to restore function and mobility.',
    icon: '🔄',
  },
  {
    title: 'Pain Management',
    description: 'Advanced techniques and treatments to help manage and reduce chronic pain.',
    icon: '🌟',
  },
  {
    title: 'Sports Therapy',
    description: 'Specialized care for athletes and sports-related injuries.',
    icon: '⚽',
  },
  {
    title: 'Wellness Programs',
    description: 'Holistic wellness programs to improve your overall health and quality of life.',
    icon: '🌿',
  },
] as const

export function ServicesSection() {
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
            <h2 className="font-serif text-3xl font-bold text-neutral-900 dark:text-neutral-50 md:text-4xl lg:text-5xl">
              Our Services
            </h2>
            <p className="text-lg text-neutral-700 dark:text-neutral-300 md:text-xl">
              Comprehensive healthcare solutions tailored to your needs
            </p>
          </motion.div>

          <Grid className="gap-6 lg:grid-cols-3 lg:gap-8">
            {services.map((service) => (
              <motion.div
                key={service.title}
                variants={slideInFromBottom}
                className="group relative rounded-2xl border border-neutral-800 bg-neutral-900/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/50 hover:bg-gradient-to-br hover:from-neutral-900/50 hover:to-primary/5"
              >
                <div className="mb-4 text-4xl">{service.icon}</div>
                <h3 className="font-serif text-xl font-semibold text-neutral-900 dark:text-neutral-50">
                  {service.title}
                </h3>
                <p className="mt-2 text-neutral-700 dark:text-neutral-300">
                  {service.description}
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