'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { StatCard } from './stat-card';

const stats = [
  {
    title: 'Years Experience',
    value: '15+',
    description: 'Serving the Frankston community',
  },
  {
    title: 'Patients Served',
    value: '10k+',
    description: 'Happy and healthy patients',
  },
  {
    title: 'Medicare Bulk Billing',
    value: '100%',
    description: 'For eligible patients',
  },
  {
    title: 'Patient Satisfaction',
    value: '98%',
    description: 'Based on patient reviews',
  },
];

export function StatsSection() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 * index }}
        >
          <StatCard {...stat} />
        </motion.div>
      ))}
    </div>
  );
} 