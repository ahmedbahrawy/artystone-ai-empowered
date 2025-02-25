'use client';

import React from 'react';
import { SectionHeader, SectionGrid } from '@/components/ui/section-container';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AnimatedElement } from '@/components/ui/animated-element';
import { 
  Heart, 
  Baby, 
  Syringe, 
  Activity,
  Microscope,
  Stethoscope,
  Brain,
  Pill
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface Service {
  title: string;
  description: string;
  icon: LucideIcon;
  category: string;
  features: string[];
}

const services: Service[] = [
  {
    title: "Women's Health",
    description: 'Comprehensive women\'s healthcare services including preventive care, family planning, and health screenings.',
    icon: Heart,
    category: 'Specialized Care',
    features: ['Health screenings', 'Family planning', 'Preventive care']
  },
  {
    title: 'Child Health',
    description: 'Regular check-ups, immunizations, and developmental assessments for children of all ages.',
    icon: Baby,
    category: 'Family Care',
    features: ['Regular check-ups', 'Immunizations', 'Growth monitoring']
  },
  {
    title: 'Vaccinations',
    description: 'Full range of vaccinations for children and adults, including travel vaccinations.',
    icon: Syringe,
    category: 'Preventive Care',
    features: ['Travel vaccines', 'Flu shots', 'Routine immunizations']
  },
  {
    title: 'Health Monitoring',
    description: 'Regular health check-ups and monitoring of chronic conditions.',
    icon: Activity,
    category: 'General Care',
    features: ['Chronic conditions', 'Regular monitoring', 'Health tracking']
  },
  {
    title: 'Pathology',
    description: 'On-site pathology collection and testing services for your convenience.',
    icon: Microscope,
    category: 'Diagnostics',
    features: ['Blood tests', 'Sample collection', 'Quick results']
  },
  {
    title: 'General Practice',
    description: 'Comprehensive medical care for acute and chronic conditions.',
    icon: Stethoscope,
    category: 'Primary Care',
    features: ['Medical consultations', 'Health advice', 'Referrals']
  },
  {
    title: 'Mental Health',
    description: 'Professional support and care for mental health and well-being.',
    icon: Brain,
    category: 'Specialized Care',
    features: ['Counseling', 'Mental health plans', 'Support services']
  },
  {
    title: 'Respiratory Care',
    description: 'Diagnosis and treatment of respiratory conditions and allergies.',
    icon: Stethoscope,
    category: 'Specialized Care',
    features: ['Asthma care', 'COPD management', 'Allergy testing']
  },
  {
    title: 'Medication Management',
    description: 'Expert medication reviews and management for optimal health outcomes.',
    icon: Pill,
    category: 'General Care',
    features: ['Medication reviews', 'Prescriptions', 'Drug monitoring']
  }
];

export function ServicesList() {
  return (
    <div className="space-y-12" id="services-list">
      <SectionHeader
        title="Our Medical Services"
        subtitle="Expert Care"
        description="Comprehensive healthcare services for you and your family"
        align="center"
      />

      <SectionGrid columns={3} gap={8}>
        {services.map((service, index) => (
          <AnimatedElement
            key={service.title}
            animation="fade-up"
            delay={index * 0.1}
          >
            <Card className="p-6 h-full hover:shadow-lg transition-shadow">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Badge variant="outline" className="mb-2">
                    {service.category}
                  </Badge>
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      <service.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">{service.title}</h3>
                      <p className="text-muted-foreground mt-1">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </div>

                <ul className="space-y-2">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary/60" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button
                  variant="ghost"
                  className="w-full justify-start hover:text-primary hover:bg-primary/10"
                  onClick={() => window.location.href = '/appointment'}
                >
                  Book Appointment →
                </Button>
              </div>
            </Card>
          </AnimatedElement>
        ))}
      </SectionGrid>
    </div>
  );
} 