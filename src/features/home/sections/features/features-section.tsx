'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FeatureCard } from './feature-card';
import { Container } from '@/components/ui/container';
import { SectionHeader } from '@/components/ui/section-container';
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
    description: 'Comprehensive healthcare for all ages, from children to seniors. Our experienced doctors provide personalized care for your entire family.',
    icon: Stethoscope,
    color: 'blue'
  },
  {
    title: 'Extended Hours',
    description: 'Flexible appointment times to fit your busy schedule. Open early mornings, late evenings, and weekends.',
    icon: Clock,
    color: 'green'
  },
  {
    title: 'Bulk Billing',
    description: 'Medicare bulk billing available for eligible patients. No out-of-pocket expenses for covered services.',
    icon: CreditCard,
    color: 'purple'
  },
  {
    title: 'Telehealth',
    description: 'Remote consultations for your convenience and safety. Connect with our doctors from the comfort of your home.',
    icon: Phone,
    color: 'orange'
  },
  {
    title: 'New Patients Welcome',
    description: 'Accepting new patients with easy registration process. Join our growing community of satisfied patients.',
    icon: UserCheck,
    color: 'pink'
  },
  {
    title: 'Privacy Assured',
    description: 'Your health information is secure and confidential. We follow strict privacy protocols to protect your data.',
    icon: Shield,
    color: 'indigo'
  },
];

export function FeaturesSection() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden" id="features">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-6xl">
          <div className="absolute inset-0 bg-grid-gray-900/[0.02] dark:bg-grid-white/[0.02] opacity-80" />
        </div>
      </div>

      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative"
        >
          <SectionHeader
            title="Why Choose Our Clinic"
            subtitle="Our Features"
            description="Experience healthcare that puts you first with our comprehensive range of services and patient-focused approach."
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1,
                  ease: "easeOut"
                }}
              >
                <FeatureCard {...feature} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
} 