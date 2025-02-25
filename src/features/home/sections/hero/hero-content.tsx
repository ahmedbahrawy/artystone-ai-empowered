'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, Star } from 'lucide-react';
import Link from 'next/link';

export function HeroContent() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      <motion.div variants={item} className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium">
        <span className="flex h-2 w-2 rounded-full bg-emerald-500 mr-2" />
        <span className="text-muted-foreground">Trusted by 10,000+ patients</span>
      </motion.div>
      
      <motion.h1 
        variants={item} 
        className="text-4xl font-bold tracking-tight sm:text-5xl xl:text-6xl"
      >
        <span className="block">Modern Healthcare</span>
        <span className="block text-primary">For Your Family</span>
      </motion.h1>
      
      <motion.p 
        variants={item}
        className="max-w-lg text-muted-foreground text-lg sm:text-xl"
      >
        Experience exceptional care with our team of specialists dedicated to your well-being. We combine cutting-edge technology with compassionate service.
      </motion.p>
      
      <motion.div 
        variants={item}
        className="flex flex-col sm:flex-row gap-4 pt-4"
      >
        <Button asChild size="lg" className="group">
          <Link href="/appointment">
            Book Appointment
            <motion.span 
              className="ml-2 inline-block"
              initial={{ x: 0 }}
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Calendar className="h-4 w-4" />
            </motion.span>
          </Link>
        </Button>
        
        <Button asChild variant="outline" size="lg" className="group">
          <Link href="/services">
            Our Services
            <motion.span 
              className="ml-2 inline-block"
              initial={{ x: 0 }}
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <ArrowRight className="h-4 w-4" />
            </motion.span>
          </Link>
        </Button>
      </motion.div>
      
      <motion.div 
        variants={item}
        className="flex items-center gap-4 pt-6"
      >
        <div className="flex -space-x-2">
          {[1, 2, 3, 4].map((i) => (
            <motion.div 
              key={i}
              className="h-10 w-10 rounded-full border-2 border-background bg-muted overflow-hidden"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + (i * 0.1) }}
              whileHover={{ y: -3, scale: 1.05 }}
            >
              <div className="h-full w-full bg-gradient-to-br from-primary/70 to-primary-foreground/70" />
            </motion.div>
          ))}
        </div>
        
        <div>
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((i) => (
              <motion.span 
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2 + (i * 0.1) }}
              >
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              </motion.span>
            ))}
          </div>
          <motion.p 
            className="text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.7 }}
          >
            From 500+ patient reviews
          </motion.p>
        </div>
      </motion.div>
    </motion.div>
  );
} 