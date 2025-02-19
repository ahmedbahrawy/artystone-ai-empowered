'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Container } from '@/components/ui/container'
import { fadeIn, slideInFromBottom } from '@/lib/animations'

const doctorInfo = {
  name: 'Dr. Farzaneh',
  title: 'Clinic Owner & Lead Practitioner',
  message: `Welcome to Arty Stone Clinic. As the founder and lead practitioner, I am committed to providing exceptional healthcare services that blend modern medical science with personalized care. Our mission is to ensure every patient receives the highest standard of treatment in a comfortable and welcoming environment.

We believe in a holistic approach to healthcare, combining cutting-edge technology with compassionate care. Our team is dedicated to understanding your unique needs and creating personalized treatment plans that deliver the best possible outcomes.`,
  image: {
    src: '/images/dr.farzaneh.png',
    alt: 'Dr. Farzaneh - Clinic Owner',
  },
}

export function DoctorMessage() {
  return (
    <section className="relative bg-gradient-to-br from-indigo-900/5 via-purple-800/5 to-fuchsia-700/5 py-24">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="grid gap-12 md:grid-cols-2"
        >
          {/* Image */}
          <motion.div
            variants={slideInFromBottom}
            className="group relative aspect-[3/4] overflow-hidden rounded-3xl shadow-2xl transition-all hover:shadow-3xl"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/10 via-purple-800/10 to-fuchsia-700/10 opacity-0 transition-opacity group-hover:opacity-100" />
            <Image
              src={doctorInfo.image.src}
              alt={doctorInfo.image.alt}
              fill
              className="object-contain object-center transition-transform duration-500 group-hover:scale-105"
              priority
              sizes="(min-width: 768px) 50vw, 100vw"
              quality={100}
            />
          </motion.div>

          {/* Message */}
          <motion.div
            variants={slideInFromBottom}
            className="flex flex-col justify-center space-y-6"
          >
            <motion.h2 
              className="font-serif text-3xl font-bold text-indigo-900 dark:text-fuchsia-300 md:text-4xl"
              whileHover={{ scale: 1.02 }}
            >
              Message from {doctorInfo.name}
            </motion.h2>
            {doctorInfo.message.split('\n\n').map((paragraph, index) => (
              <motion.p
                key={index}
                className="text-lg leading-relaxed text-neutral-700 dark:text-neutral-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                {paragraph}
              </motion.p>
            ))}
            <motion.div 
              className="pt-4"
              whileHover={{ scale: 1.02 }}
            >
              <span className="bg-gradient-to-r from-indigo-900 via-purple-800 to-fuchsia-700 bg-clip-text font-serif text-xl font-semibold text-transparent dark:from-indigo-400 dark:via-purple-300 dark:to-fuchsia-200">
                {doctorInfo.name}
              </span>
              <p className="mt-1 text-neutral-600 dark:text-neutral-400">
                {doctorInfo.title}
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
} 