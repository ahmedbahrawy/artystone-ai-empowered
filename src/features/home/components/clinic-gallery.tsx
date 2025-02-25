'use client'

import { motion } from 'framer-motion'
import { Container } from '@/components/ui/container'
import { fadeIn, slideInFromBottom } from '@/lib/animations'
import { OptimizedImage } from '@/components/atoms/optimized-image'
import React from 'react'

interface ClinicImage {
  src: string
  alt: string
  description?: string
}

const clinicImages: ClinicImage[] = [
  {
    src: '/images/clinic-welcome.webp',
    alt: 'Welcome Area',
    description: 'Our welcoming reception area designed for your comfort',
  },
  {
    src: '/images/doctors-signage-board.webp',
    alt: 'Doctor\'s Signage Board',
    description: 'Professional signage indicating our medical services',
  },
  {
    src: '/images/dr-office.webp',
    alt: 'Doctor\'s Office',
    description: 'Modern consultation room equipped with latest technology',
  },
  {
    src: '/images/dr-office1.webp',
    alt: 'Consultation Room',
    description: 'Private and comfortable space for patient consultations',
  },
  {
    src: '/images/equiped-dr-office.webp',
    alt: 'Equipped Doctor\'s Office',
    description: 'State-of-the-art medical equipment for precise diagnostics',
  },
  {
    src: '/images/front-clinic.webp',
    alt: 'Clinic Front View',
    description: 'Modern and accessible clinic entrance',
  },
  {
    src: '/images/main-signage.webp',
    alt: 'Main Clinic Signage',
    description: 'Clear and visible clinic identification',
  },
  {
    src: '/images/street-clinic.webp',
    alt: 'Street View of Clinic',
    description: 'Easily accessible location in the heart of the city',
  },
  {
    src: '/images/waiating-area.webp',
    alt: 'Waiting Area',
    description: 'Comfortable waiting area with modern amenities',
  },
]

function GalleryImage({ image, index }: { image: ClinicImage; index: number }) {
  const [isLoaded, setIsLoaded] = React.useState(false)

  return (
    <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-neutral-100 dark:bg-neutral-800">
      <OptimizedImage
        src={image.src}
        alt={image.alt}
        fill
        sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
        className={`object-cover transition-all duration-500 ${
          isLoaded ? 'scale-100 opacity-100' : 'scale-105 opacity-0'
        } group-hover:scale-105`}
        priority={index < 3}
        loading={index < 3 ? 'eager' : 'lazy'}
        onLoadingComplete={() => setIsLoaded(true)}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <h3 className="text-lg font-semibold">{image.alt}</h3>
        {image.description && (
          <p className="mt-1 text-sm text-white/90">{image.description}</p>
        )}
      </div>
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-8 w-8 rounded-full border-2 border-primary-500/20 border-t-primary-500 animate-spin" />
        </div>
      )}
    </div>
  )
}

export function ClinicGallery() {
  return (
    <section className="relative bg-neutral-50 py-24 dark:bg-neutral-900/50">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="space-y-12"
        >
          <motion.div variants={slideInFromBottom} className="text-center">
            <h2 className="font-serif text-3xl font-bold text-neutral-900 dark:text-neutral-50 md:text-4xl">
              Our Modern Facilities
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-neutral-700 dark:text-neutral-300">
              Take a virtual tour of our state-of-the-art clinic facilities, designed for your comfort and care.
            </p>
          </motion.div>

          <motion.div
            variants={slideInFromBottom}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {clinicImages.map((image, index) => (
              <GalleryImage key={image.src} image={image} index={index} />
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
} 