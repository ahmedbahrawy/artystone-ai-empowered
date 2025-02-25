'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { BookButton } from '@/components/atoms/book-button';

export function CTASection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-blue-500 to-indigo-600 dark:from-blue-900 dark:to-indigo-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-8"
      >
        <div className="space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
            Ready to Experience Better Healthcare?
          </h2>
          <p className="text-xl text-blue-100">
            Book your appointment today and take the first step towards better health
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <BookButton
            size="lg"
            variant="secondary"
            className="bg-white text-blue-600 hover:bg-blue-50"
          />
          <Button
            variant="outline"
            size="lg"
            className="text-white border-white hover:bg-white/10"
            onClick={() => window.location.href = '/contact'}
          >
            Contact Us
          </Button>
        </div>

        <p className="text-blue-100 text-sm">
          Medicare bulk billing available for eligible patients
        </p>
      </motion.div>
    </section>
  );
} 