'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';

interface StatCardProps {
  title: string;
  value: string;
  description: string;
}

export function StatCard({ title, value, description }: StatCardProps) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  // Animation for counting up numbers
  const numericValue = parseInt(value.replace(/[^0-9]/g, ''));
  const suffix = value.replace(/[0-9]/g, '');
  const [displayValue, setDisplayValue] = React.useState(0);

  React.useEffect(() => {
    if (isInView && !isNaN(numericValue)) {
      let start = 0;
      const duration = 1500; // ms
      const increment = Math.ceil(numericValue / (duration / 16)); // 16ms per frame
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= numericValue) {
          setDisplayValue(numericValue);
          clearInterval(timer);
        } else {
          setDisplayValue(start);
        }
      }, 16);
      
      return () => clearInterval(timer);
    }
  }, [isInView, numericValue]);

  return (
    <motion.div
      ref={ref}
      whileHover={{ 
        y: -5,
        transition: { duration: 0.2 }
      }}
    >
      <Card className="p-6 bg-white dark:bg-gray-800 hover:shadow-xl transition-all duration-300 h-full border-2 border-transparent hover:border-blue-200 dark:hover:border-blue-900">
        <div className="space-y-3">
          <motion.h3 
            className="text-sm font-medium text-gray-500 dark:text-gray-400"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {title}
          </motion.h3>
          
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p className="text-3xl font-bold tracking-tight text-blue-600 dark:text-blue-400">
              {isNaN(numericValue) ? value : displayValue}{suffix}
            </p>
            <div className="absolute -bottom-2 left-0 w-12 h-1 bg-blue-500 dark:bg-blue-400 rounded-full" />
          </motion.div>
          
          <motion.p 
            className="text-sm text-gray-600 dark:text-gray-300 pt-2"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {description}
          </motion.p>
        </div>
      </Card>
    </motion.div>
  );
} 