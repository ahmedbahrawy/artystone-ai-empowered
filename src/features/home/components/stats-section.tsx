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
    <section className="relative bg-gradient-to-b from-indigo-900/5 via-purple-800/5 to-fuchsia-700/5 py-16">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={slideInFromBottom}
              className="group relative overflow-hidden rounded-2xl bg-white/50 p-8 shadow-lg transition-all hover:shadow-xl dark:bg-neutral-900/50"
            >
              <div className="relative z-10">
                <div className="text-4xl font-bold text-indigo-900 transition-colors group-hover:text-purple-800 dark:text-fuchsia-400 dark:group-hover:text-fuchsia-300">
                  {stat.value}
                </div>
                <div className="mt-2 text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                  {stat.label}
                </div>
                <div className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                  {stat.description}
                </div>
              </div>
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-900/5 via-purple-800/5 to-fuchsia-700/5 opacity-0 transition-opacity group-hover:opacity-100" />
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  )
} 