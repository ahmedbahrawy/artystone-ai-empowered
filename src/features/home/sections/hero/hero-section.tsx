'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionStyle } from 'framer-motion';
import { HeroContent } from './hero-content';
import { HeroImage } from './hero-image';
import { SectionGrid } from '@/components/ui/section-container';
import { useThemeContext } from '@/providers/theme-provider';
import { AnimatedElement } from '@/components/ui/animated-element';

export function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { isReducedMotion } = useThemeContext();
  
  const { scrollY } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });
  
  // Parallax effect on scroll - with reduced values for better performance
  const contentY = useTransform(scrollY, [0, 500], [0, 50]);
  const imageY = useTransform(scrollY, [0, 500], [0, 75]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.6]);

  const contentStyle: MotionStyle = isReducedMotion ? {} : { y: contentY };
  const imageStyle: MotionStyle = isReducedMotion ? {} : { 
    y: imageY,
    opacity
  };

  return (
    <SectionGrid 
      ref={sectionRef}
      columns={2}
      gap={12}
      className="items-center"
    >
      <AnimatedElement
        animation="fade-up"
        duration={0.6}
        className="z-10"
        style={contentStyle}
      >
        <HeroContent />
      </AnimatedElement>

      <AnimatedElement
        animation="zoom-in"
        duration={0.6}
        delay={0.2}
        className="relative w-full h-full lg:min-h-[600px] rounded-2xl overflow-hidden"
        style={imageStyle}
      >
        <HeroImage />
        
        {/* Background decorative elements - only render if not using reduced motion */}
        {!isReducedMotion && (
          <motion.div 
            className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] pointer-events-none"
            animate={{
              rotate: [0, 12],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            <div className="absolute inset-0 bg-grid-gray-900/[0.02] dark:bg-grid-white/[0.02] opacity-70" />
          </motion.div>
        )}
      </AnimatedElement>
    </SectionGrid>
  );
} 