'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { AnimatedElement } from '@/components/ui/animated-element';
import { Calendar, Phone } from 'lucide-react';
import Link from 'next/link';

export function ServicesCTA() {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/90 to-secondary/90 dark:from-primary/80 dark:to-secondary/80">
      <div className="absolute inset-0 bg-grid-white/[0.02]" />
      
      <div className="relative px-6 py-24 sm:px-12 sm:py-32 md:px-16 text-center space-y-8">
        <AnimatedElement animation="fade-up">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to Experience Better Healthcare?
          </h2>
        </AnimatedElement>

        <AnimatedElement animation="fade-up" delay={0.1}>
          <p className="mx-auto max-w-2xl text-lg text-blue-100">
            Book your appointment today and take the first step towards better health. Our team of experienced healthcare professionals is here to help you.
          </p>
        </AnimatedElement>

        <AnimatedElement animation="fade-up" delay={0.2}>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="bg-white text-primary hover:bg-blue-50"
            >
              <Link href="/appointment" className="group">
                Book Appointment
                <Calendar className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10"
            >
              <Link href="/contact" className="group">
                Contact Us
                <Phone className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </AnimatedElement>

        <AnimatedElement animation="fade-up" delay={0.3}>
          <p className="text-blue-100 text-sm mt-6">
            Medicare bulk billing available for eligible patients
          </p>
        </AnimatedElement>
      </div>
    </div>
  );
} 