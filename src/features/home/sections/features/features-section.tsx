'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FeatureCard } from './feature-card';
import { 
  Stethoscope, 
  Clock, 
  CreditCard, 
  Phone,
  UserCheck,
  Shield
} from 'lucide-react';

const features = [
  {
    title: 'Family Medicine',
    description: 'Comprehensive healthcare for all ages, from children to seniors.',
    icon: Stethoscope,
  },
  {
    title: 'Extended Hours',
    description: 'Flexible appointment times to fit your busy schedule.',
    icon: Clock,
  },
  {
    title: 'Bulk Billing',
    description: 'Medicare bulk billing available for eligible patients.',
    icon: CreditCard,
  },
  {
    title: 'Telehealth',
    description: 'Remote consultations for your convenience and safety.',
    icon: Phone,
  },
  {
    title: 'New Patients Welcome',
    description: 'Accepting new patients with easy registration process.',
    icon: UserCheck,
  },
  {
    title: 'Privacy Assured',
    description: 'Your health information is secure and confidential.',
    icon: Shield,
  },
];

export function FeaturesSection() {
  return (
    <section className="py-16 md:py-24" id="features">
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
            Why Choose Our Clinic
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Experience healthcare that puts you first
          </p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <FeatureCard {...feature} />
          </motion.div>
        ))}
      </div>
    </section>
  );
} 