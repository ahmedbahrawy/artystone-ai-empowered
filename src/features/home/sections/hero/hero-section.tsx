'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionStyle } from 'framer-motion';
import { HeroContent } from './hero-content';
import { HeroImage } from './hero-image';
import { SectionGrid } from '@/components/ui/section-container';
import { useThemeContext } from '@/providers/theme-provider';
import { AnimatedElement } from '@/components/ui/animated-element';
import { Container } from '@/components/ui/container';

export function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { isReducedMotion } = useThemeContext();
  
  const { scrollY } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });
  
  // Enhanced parallax effect
  const contentY = useTransform(scrollY, [0, 500], [0, 75]);
  const imageY = useTransform(scrollY, [0, 500], [0, 100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.6]);
  const scale = useTransform(scrollY, [0, 300], [1, 1.05]);

  const contentStyle: MotionStyle = isReducedMotion ? {} : { y: contentY };
  const imageStyle: MotionStyle = isReducedMotion ? {} : { 
    y: imageY,
    opacity,
    scale
  };

  return (
    <section 
      ref={sectionRef}
      className="relative min-h-[90vh] flex items-center py-20 overflow-hidden"
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/25 to-background pointer-events-none" />
      
      {/* Content container */}
      <Container className="relative z-10">
        <SectionGrid 
          columns={2}
          gap={12}
          className="items-center"
        >
          <AnimatedElement
            animation="fade-up"
            duration={0.6}
            className="z-10 relative"
            style={contentStyle}
          >
            <HeroContent />
          </AnimatedElement>

          <AnimatedElement
            animation="zoom-in"
            duration={0.6}
            delay={0.2}
            className="relative w-full min-h-[600px] lg:min-h-[700px] rounded-2xl overflow-hidden"
            style={imageStyle}
          >
            <HeroImage />
          </AnimatedElement>
        </SectionGrid>
      </Container>

      {/* Decorative elements */}
      {!isReducedMotion && (
        <>
          <div className="absolute top-1/4 left-0 w-1/3 h-1/3 bg-primary/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-0 w-1/3 h-1/3 bg-secondary/10 rounded-full blur-3xl animate-pulse" />
        </>
      )}
    </section>
  );
} 