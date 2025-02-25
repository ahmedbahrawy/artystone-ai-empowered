'use client';

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { HeroContent } from './hero-content';
import { HeroImage } from './hero-image';

export function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();
  
  // Parallax effect on scroll
  const contentY = useTransform(scrollY, [0, 500], [0, 100]);
  const imageY = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.5]);
  
  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth) - 0.5;
      const y = (clientY / window.innerHeight) - 0.5;
      setMousePosition({ x, y });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16 items-center min-h-[70vh]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="z-10"
        style={{ y: contentY }}
      >
        <HeroContent />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative w-full h-full lg:min-h-[600px] rounded-2xl overflow-hidden"
        style={{ 
          y: imageY,
          x: mousePosition.x * 20,
          rotateX: mousePosition.y * 5,
          rotateY: mousePosition.x * -5,
          opacity
        }}
      >
        <HeroImage />
        
        {/* Floating decorative elements */}
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
      </motion.div>
      
      {/* Background decorative elements */}
      <motion.div 
        className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] pointer-events-none"
        style={{
          x: mousePosition.x * -30,
          y: mousePosition.y * -30,
        }}
      >
        <div className="absolute inset-0 bg-grid-gray-900/[0.02] dark:bg-grid-white/[0.02] transform rotate-12 opacity-70"></div>
      </motion.div>
      
      {/* Animated gradient background */}
      <div className="absolute inset-0 -z-20 overflow-hidden">
        <motion.div
          className="absolute -inset-[100px] bg-gradient-radial from-blue-500/10 via-transparent to-transparent dark:from-blue-400/10"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.7, 0.5],
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
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.7, 0.5],
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
    </div>
  );
} 