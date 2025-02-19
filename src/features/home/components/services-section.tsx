import { motion } from 'framer-motion'
import { Container, Section, Grid, Stack } from '@/design-system/layouts/Container'

const services = [
  {
    title: 'Physiotherapy',
    description: 'Expert physiotherapy services to help you recover and maintain optimal physical function.',
  },
  {
    title: 'Massage Therapy',
    description: 'Therapeutic massage treatments to relieve pain, reduce stress, and promote relaxation.',
  },
  {
    title: 'Rehabilitation',
    description: 'Comprehensive rehabilitation programs designed to help you regain strength and mobility.',
  },
  {
    title: 'Sports Therapy',
    description: 'Specialized treatments for sports-related injuries and performance enhancement.',
  },
  {
    title: 'Acupuncture',
    description: 'Traditional acupuncture treatments to promote natural healing and pain relief.',
  },
  {
    title: 'Chiropractic Care',
    description: 'Professional chiropractic adjustments to improve spinal health and overall wellness.',
  },
] as const

export function ServicesSection() {
  return (
    <Section className="bg-white dark:bg-neutral-800">
      <Container>
        <Stack className="gap-12">
          <div className="text-center">
            <h2 className="font-serif text-3xl font-bold text-neutral-900 dark:text-neutral-50 md:text-4xl">
              Our Services
            </h2>
            <p className="mt-4 text-neutral-700 dark:text-neutral-300">
              Comprehensive care tailored to your needs
            </p>
          </div>
          <Grid>
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.5,
                      delay: index * 0.1,
                    },
                  },
                }}
                className="rounded-xl border border-neutral-200 bg-neutral-50 p-6 shadow-sm transition-all hover:shadow-md dark:border-neutral-700 dark:bg-neutral-900"
              >
                <h3 className="font-serif text-xl font-semibold text-neutral-900 dark:text-neutral-50">
                  {service.title}
                </h3>
                <p className="mt-2 text-neutral-700 dark:text-neutral-300">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </Grid>
        </Stack>
      </Container>
    </Section>
  )
} 