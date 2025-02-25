'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export function HeroImage(): JSX.Element {
  return (
    <div className="relative w-full h-full min-h-[400px] lg:min-h-[500px]">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.5,
          delay: 0.2,
          ease: [0, 0.71, 0.2, 1.01]
        }}
        className="relative w-full h-full rounded-2xl overflow-hidden"
      >
        <Image
          src="/images/hero-doctor.jpg"
          alt="Doctor consulting with patient"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 mix-blend-overlay" />
      </motion.div>

      {/* Floating Stats Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="absolute -bottom-6 left-6 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg"
      >
        <div className="flex items-center gap-4">
          <div className="flex -space-x-4">
            {[1, 2, 3].map((index) => (
              <div
                key={index}
                className="w-10 h-10 rounded-full bg-blue-100 border-2 border-white dark:border-gray-800 flex items-center justify-center"
              >
                <span className="text-blue-600 text-xs">★</span>
              </div>
            ))}
          </div>
          <div>
            <p className="font-semibold text-gray-900 dark:text-white">
              Trusted by 1000+ Patients
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              5.0 Average Rating
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
} 