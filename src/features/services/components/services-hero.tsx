'use client'

import { motion } from 'framer-motion'
import { Container } from '@/components/ui/container'
import { slideInFromBottom, stagger } from '@/lib/animations'
import { BookButton } from '@/components/atoms/book-button'
import { VideoEmbed } from '@/components/atoms/video-embed'
import { videos } from '@/lib/media-config'
import { cn } from '@/lib/utils'

interface ServicesHeroProps {
  className?: string
}

export function ServicesHero({ className }: ServicesHeroProps) {
  return (
    <section 
      className={cn(
        "relative min-h-[90vh] pt-32 lg:min-h-screen",
        "overflow-hidden bg-white dark:bg-neutral-900",
        className
      )}
    >
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
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/50" />
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
              Our Comprehensive Services
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-neutral-200 md:text-xl">
              Discover our range of specialized healthcare services designed to help you achieve optimal health and wellness.
            </p>
          </motion.div>

          <motion.div variants={slideInFromBottom}>
            <BookButton variant="secondary" className="shadow-lg" />
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
} 