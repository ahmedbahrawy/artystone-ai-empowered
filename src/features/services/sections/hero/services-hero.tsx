'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { HeroContainer, HeroGrid, HeroContent, HeroMedia } from '@/components/ui/hero-container';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar } from 'lucide-react';
import Link from 'next/link';
import { AnimatedElement } from '@/components/ui/animated-element';
import { useThemeContext } from '@/providers/theme-provider';

export function ServicesHero() {
  const { isReducedMotion } = useThemeContext();

  return (
    <HeroGrid>
      <HeroContent>
        <AnimatedElement
          animation="fade-up"
          className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium mb-6"
        >
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 mr-2" />
          <span className="text-muted-foreground">Comprehensive Healthcare Services</span>
        </AnimatedElement>

        <motion.h1 
          className="text-4xl font-bold tracking-tight sm:text-5xl xl:text-6xl mb-6"
        >
          <AnimatedElement animation="fade-up" delay={0.1}>
            <span className="block">Expert Medical</span>
          </AnimatedElement>
          <AnimatedElement animation="fade-up" delay={0.2}>
            <span className="block text-primary">Services & Care</span>
          </AnimatedElement>
        </motion.h1>

        <AnimatedElement 
          animation="fade-up" 
          delay={0.3}
          className="max-w-lg text-muted-foreground text-lg sm:text-xl mb-8"
        >
          <p>
            Experience comprehensive healthcare services tailored to your needs. From family medicine to specialized care, we&apos;re here to support your well-being.
          </p>
        </AnimatedElement>

        <div className="flex flex-col sm:flex-row gap-4">
          <AnimatedElement animation="fade-up" delay={0.4}>
            <Button asChild size="lg" className="group">
              <Link href="/appointment">
                Book Appointment
                <AnimatedElement
                  animation="none"
                  className="ml-2 inline-block"
                  skipAnimation={isReducedMotion}
                >
                  <motion.span 
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Calendar className="h-4 w-4" />
                  </motion.span>
                </AnimatedElement>
              </Link>
            </Button>
          </AnimatedElement>

          <AnimatedElement animation="fade-up" delay={0.5}>
            <Button asChild variant="outline" size="lg" className="group">
              <Link href="#services-list">
                View All Services
                <AnimatedElement
                  animation="none"
                  className="ml-2 inline-block"
                  skipAnimation={isReducedMotion}
                >
                  <motion.span 
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </motion.span>
                </AnimatedElement>
              </Link>
            </Button>
          </AnimatedElement>
        </div>
      </HeroContent>

      <HeroMedia>
        <AnimatedElement
          animation="fade-up"
          delay={0.2}
          className="relative w-full h-full"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 dark:from-blue-500/10 dark:to-purple-500/10 rounded-2xl" />
          <div className="absolute inset-0 bg-grid-white/[0.02] rounded-2xl" />
          <div className="relative h-full w-full overflow-hidden rounded-2xl bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-950 dark:to-purple-950">
            {/* Add your hero image or video here */}
          </div>
        </AnimatedElement>
      </HeroMedia>
    </HeroGrid>
  );
} 