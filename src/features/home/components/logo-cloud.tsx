'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Container } from '@/components/ui/container'
import { fadeIn, stagger } from '@/lib/animations'

const logos = [
  '/logos/company1.svg',
  '/logos/company2.svg',
  '/logos/company3.svg',
  '/logos/company4.svg',
  '/logos/company5.svg',
] as const

export function LogoCloud() {
  return (
    <div className="border-y border-neutral-200 bg-neutral-50/50 py-8 dark:border-neutral-800 dark:bg-neutral-900/50">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="flex flex-wrap items-center justify-center gap-8 grayscale"
        >
          {logos.map((logo, index) => (
            <motion.div
              key={index}
              variants={fadeIn}
              className="relative h-12 w-32"
            >
              <Image
                src={logo}
                alt={`Company ${index + 1} logo`}
                fill
                className="object-contain"
              />
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </div>
  )
} 