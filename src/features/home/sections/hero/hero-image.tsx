'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export function HeroImage() {
  return (
    <div className="relative w-full h-full">
      <motion.div
        className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 rounded-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      />
      <Image
        src="/images/clinic-exterior.jpg"
        alt="Arty Stone Medical Clinic Exterior"
        fill
        className="object-cover rounded-2xl"
        sizes="(max-width: 768px) 100vw, 50vw"
        priority
        quality={90}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent rounded-2xl" />
      
      <motion.div
        className="absolute bottom-6 left-6 right-6 bg-white/90 dark:bg-gray-900/90 p-4 rounded-xl backdrop-blur-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className="flex items-center gap-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
              Extended Hours Available
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Mon-Fri: 9am-5pm | Sat: 10am-2pm
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
} 