'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

export function FeatureCard({ title, description, icon: Icon }: FeatureCardProps) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

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
    >
      <Card className="p-6 bg-white dark:bg-gray-800 hover:shadow-xl transition-all duration-300 h-full border-2 border-transparent hover:border-blue-200 dark:hover:border-blue-900 overflow-hidden relative">
        {/* Decorative background element */}
        <div className="absolute -right-8 -top-8 w-24 h-24 rounded-full bg-blue-100/50 dark:bg-blue-900/20 z-0" />
        
        <div className="flex flex-col items-start gap-4 relative z-10">
          <motion.div 
            className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            whileHover={{ 
              rotate: [0, -10, 10, -10, 0],
              transition: { duration: 0.5 }
            }}
          >
            <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
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
            <div className="h-0.5 w-12 bg-blue-500/30 dark:bg-blue-400/30 rounded-full" />
          </motion.div>
        </div>
      </Card>
    </motion.div>
  );
} 