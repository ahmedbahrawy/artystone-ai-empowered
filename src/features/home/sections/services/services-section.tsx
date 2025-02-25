'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ServiceCard } from './service-card';
import { 
  Heart, 
  Baby, 
  Syringe, 
  Activity,
  Microscope,
  Stethoscope
} from 'lucide-react';

const services = [
  {
    title: "Women's Health",
    description: 'Comprehensive women's healthcare services including preventive care, family planning, and health screenings.',
    icon: Heart,
    color: 'pink',
  },
  {
    title: 'Child Health',
    description: 'Regular check-ups, immunizations, and developmental assessments for children of all ages.',
    icon: Baby,
    color: 'blue',
  },
  {
    title: 'Vaccinations',
    description: 'Full range of vaccinations for children and adults, including travel vaccinations.',
    icon: Syringe,
    color: 'green',
  },
  {
    title: 'Health Monitoring',
    description: 'Regular health check-ups and monitoring of chronic conditions.',
    icon: Activity,
    color: 'red',
  },
  {
    title: 'Pathology',
    description: 'On-site pathology collection and testing services for your convenience.',
    icon: Microscope,
    color: 'purple',
  },
  {
    title: 'General Practice',
    description: 'Comprehensive medical care for acute and chronic conditions.',
    icon: Stethoscope,
    color: 'indigo',
  },
];

export function ServicesSection() {
  return (
    <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-800/50" id="services">
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
            Our Medical Services
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Comprehensive healthcare services for you and your family
          </p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <ServiceCard {...service} />
          </motion.div>
        ))}
      </div>
    </section>
  );
} 