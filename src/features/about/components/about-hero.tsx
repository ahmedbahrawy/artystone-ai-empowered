'use client'

import { motion } from 'framer-motion'
import { Container, Section } from '@/components/ui/container'
import { slideInFromBottom, stagger } from '@/lib/animations'
import { VideoEmbed } from '@/components/atoms/video-embed'
import { videos } from '@/lib/media-config'

export function AboutHero() {
  return (
    <Section className="relative overflow-hidden bg-white pt-32 dark:bg-neutral-900">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <VideoEmbed
          src={videos.hero}
          className="h-full w-full object-cover opacity-50"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <Container className="relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="mx-auto max-w-4xl space-y-8 text-center"
        >
          <motion.div variants={slideInFromBottom} className="space-y-4">
            <h1 className="font-serif text-4xl font-bold text-white md:text-5xl lg:text-6xl">
              About Arty Stone Clinic
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-neutral-200 md:text-xl">
              Dedicated to providing exceptional healthcare with a personal touch since 2010.
            </p>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  )
} 