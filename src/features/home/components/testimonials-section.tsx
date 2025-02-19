'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Container, Section } from '@/components/ui/container'
import { slideInFromBottom, stagger } from '@/lib/animations'

const testimonials = [
  {
    quote: "The care and attention I received at Arty Stone Clinic was exceptional. The team's expertise and dedication made my recovery journey much smoother.",
    author: "Sarah Johnson",
    title: "Physical Therapy Patient",
    image: "/testimonials/sarah.jpg"
  },
  {
    quote: "I've been to many clinics, but none compare to the holistic approach and personalized care I experienced here. Truly life-changing results.",
    author: "Michael Chen",
    title: "Sports Rehabilitation Patient",
    image: "/testimonials/michael.jpg"
  },
  {
    quote: "The professional and caring environment at Arty Stone Clinic made me feel comfortable and confident in my treatment plan. Highly recommended!",
    author: "Emma Thompson",
    title: "Massage Therapy Patient",
    image: "/testimonials/emma.jpg"
  }
] as const

export function TestimonialsSection() {
  return (
    <Section className="bg-neutral-50 dark:bg-neutral-900/50">
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
              What Our Patients Say
            </h2>
            <p className="mt-4 text-lg text-neutral-700 dark:text-neutral-300">
              Real stories from real patients about their healing journey
            </p>
          </motion.div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.author}
                variants={slideInFromBottom}
                className="relative rounded-xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900"
              >
                <div className="mb-4">
                  <svg
                    className="h-6 w-6 text-primary-500"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
                <blockquote className="mb-4 text-neutral-700 dark:text-neutral-300">
                  {testimonial.quote}
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="relative h-12 w-12 overflow-hidden rounded-full">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.author}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-semibold text-neutral-900 dark:text-neutral-50">
                      {testimonial.author}
                    </div>
                    <div className="text-sm text-neutral-600 dark:text-neutral-400">
                      {testimonial.title}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </Section>
  )
} 