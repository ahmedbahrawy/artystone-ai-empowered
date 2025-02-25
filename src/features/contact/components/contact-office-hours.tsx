'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Container } from '@/components/ui/container'
import { fadeIn, stagger } from '@/lib/animations'
import { Clock } from 'lucide-react'

const OFFICE_HOURS = [
  { day: 'Monday', hours: '9:00 AM - 5:00 PM' },
  { day: 'Tuesday', hours: '9:00 AM - 5:00 PM' },
  { day: 'Wednesday', hours: '9:00 AM - 5:00 PM' },
  { day: 'Thursday', hours: '9:00 AM - 5:00 PM' },
  { day: 'Friday', hours: '9:00 AM - 5:00 PM' },
  { day: 'Saturday', hours: 'Closed' },
  { day: 'Sunday', hours: 'Closed' },
]

export function ContactOfficeHours() {
  return (
    <section className="py-16 md:py-20 lg:py-24 bg-neutral-50 dark:bg-neutral-900/50">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="mx-auto max-w-4xl"
        >
          <motion.div variants={fadeIn} className="text-center mb-12">
            <div className="inline-flex items-center justify-center space-x-2 mb-4">
              <Clock className="h-6 w-6 text-primary-500" />
              <h2 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
                Office Hours
              </h2>
            </div>
            <p className="text-lg text-neutral-600 dark:text-neutral-300">
              Our clinic is open during the following hours. For emergencies outside these hours, please contact emergency services.
            </p>
          </motion.div>

          <motion.div 
            variants={fadeIn}
            className="bg-white/50 dark:bg-neutral-800/50 rounded-2xl p-6 shadow-lg"
          >
            <div className="divide-y divide-neutral-200 dark:divide-neutral-700">
              {OFFICE_HOURS.map((schedule, index) => (
                <div
                  key={schedule.day}
                  className="flex items-center justify-between py-4 first:pt-0 last:pb-0"
                >
                  <span className="font-medium text-neutral-900 dark:text-neutral-50">
                    {schedule.day}
                  </span>
                  <span className="text-neutral-600 dark:text-neutral-300">
                    {schedule.hours}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
} 