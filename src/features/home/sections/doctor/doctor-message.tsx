'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { DoctorProfile } from './doctor-profile';

export function DoctorMessage() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-6"
      >
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
          Welcome to Our Clinic
        </h2>
        <div className="space-y-4 text-gray-600 dark:text-gray-300">
          <p>
            As a dedicated family physician with over 15 years of experience, I am committed
            to providing comprehensive healthcare services to the Frankston community and
            surrounding areas.
          </p>
          <p>
            Our clinic focuses on preventive care, women&apos;s health, chronic disease
            management, and family medicine. We believe in building long-term relationships
            with our patients and providing personalized care that meets their unique needs.
          </p>
          <p>
            We are proud to offer bulk billing services to eligible patients, making quality
            healthcare accessible to everyone in our community.
          </p>
        </div>
        <div className="pt-4">
          <p className="font-semibold text-gray-900 dark:text-white">Dr. Farzaneh</p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            MBBS, FRACGP - Principal Doctor
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <DoctorProfile />
      </motion.div>
    </div>
  );
} 