'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GalleryImage } from './gallery-image';

const galleryImages = [
  {
    src: '/images/front-clinic.webp',
    alt: 'Arty Stone Medical Clinic Front View',
    caption: 'Modern Medical Facility',
  },
  {
    src: '/images/dr-office.webp',
    alt: 'Clean and professional doctor\'s office',
    caption: 'Professional Consultation Room',
  },
  {
    src: '/images/waiating-area.webp',
    alt: 'Comfortable patient waiting area',
    caption: 'Comfortable Waiting Area',
  },
  {
    src: '/images/equiped-dr-office.webp',
    alt: 'Well-equipped medical examination room',
    caption: 'State-of-the-art Equipment',
  },
  {
    src: '/images/main-signage.webp',
    alt: 'Clinic main entrance signage',
    caption: 'Easy to Find Location',
  },
  {
    src: '/images/street-clinic.webp',
    alt: 'Street view of the clinic',
    caption: 'Convenient Location',
  },
];

export function ClinicGallery() {
  return (
    <section className="py-16 md:py-24" id="gallery">
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
            Our Modern Facility
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Take a virtual tour of our state-of-the-art medical clinic
          </p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {galleryImages.map((image, index) => (
          <motion.div
            key={image.src}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <GalleryImage {...image} />
          </motion.div>
        ))}
      </div>
    </section>
  );
} 