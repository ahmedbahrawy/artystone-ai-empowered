'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Container } from '@/components/ui/container'
import { fadeIn, stagger } from '@/lib/animations'

export function ContactHero() {
  return (
    <section className="relative min-h-[60vh] pt-40 lg:min-h-[70vh]">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-900/70 to-neutral-900/50" />
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url("/images/contact-hero.jpg")',
          }}
        />
      </div>

      <Container className="relative z-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.div variants={fadeIn} className="space-y-6">
            <h1 className="font-serif text-4xl font-bold text-white md:text-5xl lg:text-6xl">
              Get in Touch
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-neutral-200 md:text-xl">
              We&apos;re here to help. Contact us for appointments, inquiries, or to learn more about our medical services.
            </p>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
} 