'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { HeroContent } from './hero-content';
import { HeroImage } from './hero-image';

export function HeroSection() {
  return (
    <div className="relative grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16 items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="z-10"
      >
        <HeroContent />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative w-full h-full lg:min-h-[600px] rounded-2xl overflow-hidden"
      >
        <HeroImage />
      </motion.div>
      
      {/* Background decorative elements */}
      <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] pointer-events-none">
        <div className="absolute inset-0 bg-grid-gray-900/[0.02] dark:bg-grid-white/[0.02] transform rotate-12 opacity-70"></div>
      </div>
    </div>
  );
} 