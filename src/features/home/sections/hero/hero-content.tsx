'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, Star } from 'lucide-react';
import Link from 'next/link';
import { AnimatedGroup, AnimatedElement } from '@/components/ui/animated-element';
import { useThemeContext } from '@/providers/theme-provider';

export function HeroContent() {
  const { isReducedMotion } = useThemeContext();

  return (
    <AnimatedGroup
      animation="fade-up"
      staggerChildren={0.1}
      delayChildren={0.1}
      className="space-y-6"
    >
      <motion.div className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium">
        <span className="flex h-2 w-2 rounded-full bg-emerald-500 mr-2" />
        <span className="text-muted-foreground">Trusted by 10,000+ patients</span>
      </motion.div>
      
      <motion.h1 
        className="text-4xl font-bold tracking-tight sm:text-5xl xl:text-6xl"
      >
        <span className="block">Modern Healthcare</span>
        <span className="block text-primary">For Your Family</span>
      </motion.h1>
      
      <motion.p 
        className="max-w-lg text-muted-foreground text-lg sm:text-xl"
      >
        Experience exceptional care with our team of specialists dedicated to your well-being. We combine cutting-edge technology with compassionate service.
      </motion.p>
      
      <motion.div 
        className="flex flex-col sm:flex-row gap-4 pt-4"
      >
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
        
        <Button asChild variant="outline" size="lg" className="group">
          <Link href="/services">
            Our Services
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
      </motion.div>
      
      <motion.div className="flex items-center gap-4 pt-6">
        <div className="flex -space-x-2">
          {[1, 2, 3, 4].map((i) => (
            <AnimatedElement
              key={i}
              animation="fade-down"
              delay={0.8 + (i * 0.1)}
              className="h-10 w-10 rounded-full border-2 border-background bg-muted overflow-hidden"
              skipAnimation={isReducedMotion}
            >
              <motion.div 
                className="h-full w-full bg-gradient-to-br from-primary/70 to-primary-foreground/70"
                whileHover={{ y: -3, scale: 1.05 }}
              />
            </AnimatedElement>
          ))}
        </div>
        
        <div>
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((i) => (
              <AnimatedElement
                key={i}
                animation="zoom-in"
                delay={1.2 + (i * 0.1)}
                skipAnimation={isReducedMotion}
              >
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              </AnimatedElement>
            ))}
          </div>
          <AnimatedElement
            animation="fade-up"
            delay={1.7}
            className="text-sm text-muted-foreground"
            skipAnimation={isReducedMotion}
          >
            From 500+ patient reviews
          </AnimatedElement>
        </div>
      </motion.div>
    </AnimatedGroup>
  );
} 