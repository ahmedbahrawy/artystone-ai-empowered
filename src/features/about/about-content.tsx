import React from 'react';
import { motion } from 'framer-motion';
import { useThemeContext } from '@/providers/theme-provider';
import { AboutHero } from './sections/hero';
import { AboutMission } from './sections/mission';
import { AboutValues } from './sections/values';
import { AboutCTA } from './sections/cta';

export function AboutContent() {
  const { isReducedMotion } = useThemeContext();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial={isReducedMotion ? "visible" : "hidden"}
      animate="visible"
      className="space-y-24"
    >
      <motion.div variants={sectionVariants}>
        <AboutHero />
      </motion.div>

      <motion.div variants={sectionVariants}>
        <AboutMission />
      </motion.div>

      <motion.div variants={sectionVariants}>
        <AboutValues />
      </motion.div>

      <motion.div variants={sectionVariants}>
        <AboutCTA />
      </motion.div>
    </motion.div>
  );
} 