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
      >
        <HeroContent />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative h-[400px] lg:h-[600px] rounded-2xl overflow-hidden"
      >
        <HeroImage />
      </motion.div>
    </div>
  );
} 