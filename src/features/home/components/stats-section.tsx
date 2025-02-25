'use client'

import { motion } from 'framer-motion'
import { Container } from '@/components/ui/container'
import { fadeIn, slideInFromBottom } from '@/lib/animations'

const stats = [
  {
    value: '15+',
    label: 'Years Experience',
    description: 'Serving our community with dedication',
  },
  {
    value: '5000+',
    label: 'Patients Treated',
    description: 'Trust and satisfaction from our patients',
  },
  {
    value: '98%',
    label: 'Success Rate',
    description: 'Proven track record of positive outcomes',
  },
  {
    value: '24/7',
    label: 'Support',
    description: 'Always here when you need us',
  },
]

export function StatsSection() {
  return (
    <section className="section-spacing-sm relative brand-gradient-3 bg-opacity-5">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={slideInFromBottom}
              className="group relative overflow-hidden rounded-2xl bg-white/80 p-6 shadow-lg transition-all hover:shadow-xl hover:shadow-indigo-900/5 dark:bg-neutral-900/80"
            >
              <div className="relative z-10">
                <div className="brand-text-gradient text-4xl font-bold transition-colors group-hover:opacity-90">
                  {stat.value}
                </div>
                <div className="mt-2 text-lg font-semibold text-indigo-950 dark:text-neutral-100">
                  {stat.label}
                </div>
                <div className="mt-1 text-sm text-indigo-900/70 dark:text-neutral-400">
                  {stat.description}
                </div>
              </div>
              <div className="absolute inset-0 -z-10 brand-gradient-2 opacity-0 transition-opacity group-hover:opacity-5" />
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  )
} 