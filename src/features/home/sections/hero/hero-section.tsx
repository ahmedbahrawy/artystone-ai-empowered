'use client';

import React, { useState, useEffect, useRef, memo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { HeroContent as HeroContentComponent } from './hero-content';
import { HeroImage } from './hero-image';
import { HeroGrid, HeroMedia } from '@/components/ui/hero-container';

// Memoize components to prevent unnecessary re-renders
const MemoizedHeroContent = memo(HeroContentComponent);
const MemoizedHeroImage = memo(HeroImage);

export function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const { scrollY } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });
  
  // Parallax effect on scroll - with reduced values for better performance
  const contentY = useTransform(scrollY, [0, 500], [0, 50]);
  const imageY = useTransform(scrollY, [0, 500], [0, 75]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.6]);
  
  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    
    const handleChange = () => setIsReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);
  
  // Mouse parallax effect with throttling for better performance
  useEffect(() => {
    if (isReducedMotion) return;
    
    let rafId: number;
    let lastUpdateTime = 0;
    const THROTTLE_INTERVAL = 50; // ms
    
    const handleMouseMove = (e: MouseEvent) => {
      const currentTime = Date.now();
      if (currentTime - lastUpdateTime < THROTTLE_INTERVAL) return;
      
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const { clientX, clientY } = e;
        const x = (clientX / window.innerWidth) - 0.5;
        const y = (clientY / window.innerHeight) - 0.5;
        setMousePosition({ x, y });
        lastUpdateTime = currentTime;
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, [isReducedMotion]);

  return (
    <HeroGrid ref={sectionRef}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="z-10"
        style={isReducedMotion ? undefined : { y: contentY }}
      >
        <MemoizedHeroContent />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative w-full h-full lg:min-h-[600px] rounded-2xl overflow-hidden"
        style={isReducedMotion ? undefined : { 
          y: imageY,
          x: mousePosition.x * 10, // Reduced from 20 for better performance
          rotateX: mousePosition.y * 2.5, // Reduced from 5 for better performance
          rotateY: mousePosition.x * -2.5, // Reduced from -5 for better performance
          opacity
        }}
      >
        <MemoizedHeroImage />
        
        {/* Floating decorative elements - only render if not using reduced motion */}
        {!isReducedMotion && (
          <>
            <motion.div 
              className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-blue-500/10 dark:bg-blue-400/10 z-0 hidden lg:block"
              animate={{
                y: [0, 15, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
            
            <motion.div 
              className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-purple-500/10 dark:bg-purple-400/10 z-0 hidden lg:block"
              animate={{
                y: [0, -15, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 7,
                repeat: Infinity,
                repeatType: "reverse",
                delay: 1
              }}
            />
          </>
        )}
      </motion.div>
      
      {/* Background decorative elements - only render if not using reduced motion */}
      {!isReducedMotion && (
        <motion.div 
          className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] pointer-events-none"
          style={{
            x: mousePosition.x * -15, // Reduced from -30 for better performance
            y: mousePosition.y * -15, // Reduced from -30 for better performance
          }}
        >
          <div className="absolute inset-0 bg-grid-gray-900/[0.02] dark:bg-grid-white/[0.02] transform rotate-12 opacity-70"></div>
        </motion.div>
      )}
      
      {/* Animated gradient background - only render if not using reduced motion */}
      {!isReducedMotion && (
        <div className="absolute inset-0 -z-20 overflow-hidden">
          <motion.div
            className="absolute -inset-[100px] bg-gradient-radial from-blue-500/10 via-transparent to-transparent dark:from-blue-400/10"
            animate={{
              scale: [1, 1.1, 1], // Reduced animation range for better performance
              opacity: [0.5, 0.6, 0.5], // Reduced animation range for better performance
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              repeatType: "reverse"
            }}
            style={{
              top: '30%',
              left: '20%',
            }}
          />
          
          <motion.div
            className="absolute -inset-[100px] bg-gradient-radial from-purple-500/10 via-transparent to-transparent dark:from-purple-400/10"
            animate={{
              scale: [1.1, 1, 1.1], // Reduced animation range for better performance
              opacity: [0.5, 0.6, 0.5], // Reduced animation range for better performance
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              repeatType: "reverse",
              delay: 2
            }}
            style={{
              top: '60%',
              left: '70%',
            }}
          />
        </div>
      )}
    </HeroGrid>
  );
} 