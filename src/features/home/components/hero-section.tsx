'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { Container } from '@/components/ui/container'
import { fadeIn, slideInFromBottom } from '@/lib/animations'
import dynamic from 'next/dynamic'

// Separate video component to handle client-side logic
const HeroVideo = dynamic(
  () => import('./hero-video').then((mod) => mod.HeroVideo),
  {
    ssr: false,
    loading: () => (
      <div className="relative aspect-video w-full animate-pulse rounded-2xl bg-neutral-100 dark:bg-neutral-800" />
    ),
  }
)

export function HeroSection() {
  const [isMounted, setIsMounted] = React.useState(false)

  React.useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <section className="relative min-h-[90vh] pt-20 lg:min-h-screen">
      <Container className="relative z-10">
        <div className="grid items-center gap-8 pt-8 md:grid-cols-2 md:gap-12 lg:pt-12">
          {/* Text Content */}
          <motion.div
            initial="hidden"
            animate={isMounted ? "visible" : "hidden"}
            variants={slideInFromBottom}
            className="flex flex-col justify-center md:min-h-[600px]"
          >
            <div className="relative rounded-2xl border border-neutral-200 bg-white/80 p-8 shadow-lg backdrop-blur-sm dark:border-neutral-800 dark:bg-neutral-900/80 md:p-10 lg:p-12">
              <div className="absolute -left-2 top-0 h-20 w-1.5 bg-gradient-to-b from-indigo-500 via-primary-500 to-secondary-500" />
              <h1 className="font-serif text-4xl font-bold leading-tight text-neutral-900 dark:text-neutral-50 md:text-5xl lg:text-6xl">
                Modern Healthcare{' '}
                <span className="bg-gradient-to-r from-indigo-600 via-primary-500 to-secondary-500 bg-clip-text text-transparent">
                  Redefined
                </span>
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-neutral-700 dark:text-neutral-300 md:text-xl">
                Experience the perfect blend of cutting-edge medical care and timeless healing traditions at Arty Stone Clinic.
              </p>
              <div className="mt-8 flex flex-wrap gap-4 md:mt-10">
                <button className="rounded-lg bg-gradient-to-r from-indigo-600 via-primary-500 to-primary-600 px-6 py-3 text-lg font-semibold text-white shadow-lg transition-all hover:from-indigo-700 hover:via-primary-600 hover:to-primary-700 hover:shadow-xl">
                  Book Consultation
                </button>
                <button className="rounded-lg border border-neutral-200 bg-white/90 px-6 py-3 text-lg font-semibold text-neutral-700 shadow-lg transition-all hover:bg-neutral-50 hover:shadow-xl dark:border-neutral-700 dark:bg-neutral-900/90 dark:text-neutral-300 dark:hover:bg-neutral-800">
                  Learn More
                </button>
              </div>
            </div>
          </motion.div>

          {/* Video Content */}
          {isMounted && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="relative mx-auto w-full"
            >
              <div className="relative rounded-2xl shadow-2xl">
                <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-indigo-500/20 via-primary-500/20 to-secondary-500/20 blur" />
                <HeroVideo />
              </div>
            </motion.div>
          )}
        </div>
      </Container>

      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/50 via-neutral-100/50 to-neutral-100 dark:from-indigo-950/30 dark:via-neutral-900/50 dark:to-neutral-900" />
    </section>
  )
}