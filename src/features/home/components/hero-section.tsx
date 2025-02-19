'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Container } from '@/design-system/layouts/Container'
import { fadeIn, slideInFromBottom } from '@/design-system/animations/variants'
import { VideoEmbed } from '@/components/atoms/video-embed'

export function HeroSection() {
  return (
    <section className="relative min-h-screen pt-20">
      <Container className="relative z-10">
        <div className="grid gap-8 pt-12 md:grid-cols-2 md:gap-12 lg:pt-16">
          {/* Text Content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={slideInFromBottom}
            className="flex flex-col justify-center"
          >
            <div className="rounded-2xl border border-neutral-200 bg-white/80 p-8 shadow-lg backdrop-blur-sm dark:border-neutral-800 dark:bg-neutral-900/80">
              <h1 className="font-serif text-4xl font-bold text-neutral-900 dark:text-neutral-50 md:text-5xl lg:text-6xl">
                Modern Healthcare{' '}
                <span className="text-primary-500">Redefined</span>
              </h1>
              <p className="mt-6 text-lg text-neutral-700 dark:text-neutral-300">
                Experience the perfect blend of cutting-edge medical care and timeless healing traditions at Arty Stone Clinic.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <button className="rounded-lg bg-primary-500 px-6 py-3 text-lg font-semibold text-white shadow-lg transition-all hover:bg-primary-600 hover:shadow-xl">
                  Book Consultation
                </button>
                <button className="rounded-lg border border-neutral-200 bg-white/90 px-6 py-3 text-lg font-semibold text-neutral-700 shadow-lg transition-all hover:bg-neutral-50 hover:shadow-xl dark:border-neutral-700 dark:bg-neutral-900/90 dark:text-neutral-300 dark:hover:bg-neutral-800">
                  Learn More
                </button>
              </div>
            </div>
          </motion.div>

          {/* Video Content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="relative"
          >
            <VideoEmbed className="shadow-2xl" />
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-center text-sm text-neutral-500 dark:text-neutral-400">
              <a 
                href="https://www.canva.com/design/DAGfdjqqaS0/LjhE9TDOmIIQrapuhmZXtw/watch?utm_content=DAGfdjqqaS0&utm_campaign=designshare&utm_medium=embeds&utm_source=link" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-primary-500 dark:hover:text-primary-400"
              >
                Video by Arty Stone Clinic
              </a>
            </div>
          </motion.div>
        </div>
      </Container>

      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800" />
    </section>
  )
} 