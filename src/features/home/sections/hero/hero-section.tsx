'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, MotionStyle } from 'framer-motion';
import { HeroContent } from './hero-content';
import { SectionGrid } from '@/components/ui/section-container';
import { useThemeContext } from '@/providers/theme-provider';
import { AnimatedElement } from '@/components/ui/animated-element';
import { Container } from '@/components/ui/container';
import dynamic from 'next/dynamic';
import { useInView } from 'react-intersection-observer';

// Optimized video component with intersection observer
const HeroVideo = dynamic(
  () => import('@/features/home/components/hero-video').then((mod) => mod.HeroVideo),
  {
    ssr: false,
    loading: () => <HeroVideoPlaceholder />,
  }
);

// Separate placeholder component for better performance
const HeroVideoPlaceholder = () => (
  <div className="relative aspect-video w-full rounded-2xl bg-neutral-100 dark:bg-neutral-800">
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="h-12 w-12 rounded-full border-3 border-primary/20 border-t-primary animate-spin" />
    </div>
  </div>
);

export function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { isReducedMotion } = useThemeContext();
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  
  // Intersection observer for video loading
  const { ref: videoRef, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  
  // Load video when section comes into view
  useEffect(() => {
    if (inView && !shouldLoadVideo) {
      setShouldLoadVideo(true);
    }
  }, [inView, shouldLoadVideo]);
  
  const { scrollY } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });
  
  // Optimized transform calculations
  const contentY = useTransform(scrollY, [0, 500], [0, 50]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.8]);
  const scale = useTransform(scrollY, [0, 300], [1, 1.02]);

  const contentStyle: MotionStyle = isReducedMotion ? {} : { y: contentY };
  const mediaStyle: MotionStyle = isReducedMotion ? {} : { 
    opacity,
    scale
  };

  return (
    <section 
      ref={sectionRef}
      id="hero"
      className="relative min-h-[80vh] flex items-center py-16 overflow-hidden"
      aria-label="Welcome to Arty Stone Medical Clinic"
    >
      {/* Optimized gradient overlay */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/20 to-background" 
        aria-hidden="true"
      />
      
      <Container className="relative z-10">
        <SectionGrid 
          columns={2}
          gap={8}
          className="items-center"
        >
          <AnimatedElement
            animation="fade-up"
            duration={0.5}
            className="z-10 relative"
            style={contentStyle}
          >
            <HeroContent />
          </AnimatedElement>

          <AnimatedElement
            ref={videoRef}
            animation="fade-in"
            duration={0.5}
            delay={0.1}
            className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl"
            style={mediaStyle}
          >
            {shouldLoadVideo ? (
              <HeroVideo />
            ) : (
              <HeroVideoPlaceholder />
            )}
          </AnimatedElement>
        </SectionGrid>
      </Container>

      {/* Optimized decorative elements */}
      {!isReducedMotion && (
        <div 
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
        >
          <div className="absolute top-1/4 left-0 w-1/4 h-1/4 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-0 w-1/4 h-1/4 bg-secondary/5 rounded-full blur-3xl" />
        </div>
      )}
    </section>
  );
} 