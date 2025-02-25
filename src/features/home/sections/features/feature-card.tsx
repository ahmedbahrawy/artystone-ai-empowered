'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { cn } from '@/lib/utils';

export type ColorVariant = 'blue' | 'green' | 'purple' | 'orange' | 'pink' | 'indigo';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  color?: ColorVariant;
}

const colorVariants: Record<ColorVariant, { bg: string; text: string; border: string; hover: string }> = {
  blue: {
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    text: 'text-blue-600 dark:text-blue-400',
    border: 'hover:border-blue-200 dark:hover:border-blue-800',
    hover: 'group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30'
  },
  green: {
    bg: 'bg-green-50 dark:bg-green-900/20',
    text: 'text-green-600 dark:text-green-400',
    border: 'hover:border-green-200 dark:hover:border-green-800',
    hover: 'group-hover:bg-green-100 dark:group-hover:bg-green-900/30'
  },
  purple: {
    bg: 'bg-purple-50 dark:bg-purple-900/20',
    text: 'text-purple-600 dark:text-purple-400',
    border: 'hover:border-purple-200 dark:hover:border-purple-800',
    hover: 'group-hover:bg-purple-100 dark:group-hover:bg-purple-900/30'
  },
  orange: {
    bg: 'bg-orange-50 dark:bg-orange-900/20',
    text: 'text-orange-600 dark:text-orange-400',
    border: 'hover:border-orange-200 dark:hover:border-orange-800',
    hover: 'group-hover:bg-orange-100 dark:group-hover:bg-orange-900/30'
  },
  pink: {
    bg: 'bg-pink-50 dark:bg-pink-900/20',
    text: 'text-pink-600 dark:text-pink-400',
    border: 'hover:border-pink-200 dark:hover:border-pink-800',
    hover: 'group-hover:bg-pink-100 dark:group-hover:bg-pink-900/30'
  },
  indigo: {
    bg: 'bg-indigo-50 dark:bg-indigo-900/20',
    text: 'text-indigo-600 dark:text-indigo-400',
    border: 'hover:border-indigo-200 dark:hover:border-indigo-800',
    hover: 'group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900/30'
  }
};

export function FeatureCard({ title, description, icon: Icon, color = 'blue' }: FeatureCardProps) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const colorClasses = colorVariants[color];

  return (
    <motion.div
      ref={ref}
      whileHover={{ 
        y: -8,
        transition: { duration: 0.2 }
      }}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5 }}
      className="group"
    >
      <Card className={cn(
        "p-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm",
        "transition-all duration-300 h-full",
        "border-2 border-transparent",
        colorClasses.border,
        "hover:shadow-2xl hover:shadow-primary/5",
        "overflow-hidden relative"
      )}>
        {/* Decorative background elements */}
        <div className={cn(
          "absolute -right-8 -top-8 w-32 h-32 rounded-full transition-colors duration-300",
          colorClasses.bg,
          colorClasses.hover,
          "opacity-50"
        )} />
        <div className={cn(
          "absolute -left-8 -bottom-8 w-24 h-24 rounded-full transition-colors duration-300",
          colorClasses.bg,
          colorClasses.hover,
          "opacity-30"
        )} />
        
        <div className="flex flex-col items-start gap-4 relative z-10">
          <motion.div 
            className={cn(
              "p-3 rounded-lg transition-colors duration-300",
              colorClasses.bg,
              colorClasses.hover
            )}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            whileHover={{ 
              rotate: [0, -10, 10, -10, 0],
              transition: { duration: 0.5 }
            }}
          >
            <Icon className={cn("w-6 h-6", colorClasses.text)} />
          </motion.div>
          
          <div className="space-y-2">
            <motion.h3 
              className="text-xl font-semibold text-gray-900 dark:text-white"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              {title}
            </motion.h3>
            
            <motion.p 
              className="text-gray-600 dark:text-gray-300"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              {description}
            </motion.p>
          </div>
          
          <motion.div
            className="w-full pt-2"
            initial={{ scaleX: 0, originX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className={cn(
              "h-0.5 w-12 rounded-full transition-colors duration-300",
              colorClasses.bg,
              colorClasses.hover
            )} />
          </motion.div>
        </div>
      </Card>
    </motion.div>
  );
} 