'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';

interface Qualification {
  title: string;
  institution: string;
  year: string;
}

interface Specialty {
  name: string;
  icon: string;
}

const qualifications: Qualification[] = [
  {
    title: 'MBBS',
    institution: 'University of Melbourne',
    year: '2010',
  },
  {
    title: 'FRACGP',
    institution: 'Royal Australian College of General Practitioners',
    year: '2015',
  },
];

const specialties: Specialty[] = [
  { name: 'Family Medicine', icon: '👨‍👩‍👧‍👦' },
  { name: "Women's Health", icon: '👩‍⚕️' },
  { name: 'Preventive Care', icon: '🛡️' },
];

export function DoctorProfile(): JSX.Element {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
    >
      <div className="flex flex-col md:flex-row gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative w-full md:w-1/3 aspect-[3/4]"
        >
          <Image
            src="/images/dr.farzaneh.png"
            alt="Dr. Farzaneh"
            fill
            className="object-cover rounded-xl"
            sizes="(max-width: 768px) 100vw, 33vw"
            priority
          />
        </motion.div>

        <div className="flex-1 space-y-6">
          <div>
            <Badge variant="secondary" className="mb-2">
              Principal Doctor
            </Badge>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Dr. Farzaneh
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              MBBS, FRACGP
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Qualifications
            </h3>
            <div className="space-y-2">
              {qualifications.map((qual, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex flex-col"
                >
                  <span className="font-medium text-gray-900 dark:text-white">
                    {qual.title}
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {qual.institution} • {qual.year}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Specialties
            </h3>
            <div className="flex flex-wrap gap-2">
              {specialties.map((specialty, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 px-3 py-1.5 rounded-full"
                >
                  <span role="img" aria-label={specialty.name}>
                    {specialty.icon}
                  </span>
                  <span className="text-sm text-gray-800 dark:text-gray-200">
                    {specialty.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
} 