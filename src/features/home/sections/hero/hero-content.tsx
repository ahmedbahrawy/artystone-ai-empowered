'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { BookButton } from '@/components/atoms/book-button';
import { Badge } from '@/components/ui/badge';

export function HeroContent() {
  return (
    <div className="flex flex-col gap-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <Badge variant="secondary" className="mb-4">
          ✨ Now Accepting New Patients
        </Badge>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white">
          Expert Healthcare in{' '}
          <span className="text-blue-600 dark:text-blue-400">Frankston</span>
        </h1>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-xl text-gray-600 dark:text-gray-300"
      >
        Experience comprehensive medical care with Dr. Farzaneh. We offer family medicine,
        women's health services, and bulk billing for eligible patients.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <BookButton size="lg" className="w-full sm:w-auto">
          Book Appointment
        </BookButton>
        <Button
          variant="outline"
          size="lg"
          className="w-full sm:w-auto"
        >
          Learn More
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="mt-6 flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300"
      >
        <div className="flex items-center gap-2">
          <svg
            className="h-5 w-5 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Bulk Billing Available</span>
        </div>
        <div className="flex items-center gap-2">
          <svg
            className="h-5 w-5 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Same Day Appointments</span>
        </div>
      </motion.div>
    </div>
  );
} 