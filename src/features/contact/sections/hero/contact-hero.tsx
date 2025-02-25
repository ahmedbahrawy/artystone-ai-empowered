'use client';

import React from 'react';
import { Typography } from '@/components/ui/typography';

export function ContactHero() {
  return (
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto text-center">
        <Typography variant="h1" className="mb-6">
          Contact Us
        </Typography>
        <Typography variant="lead" className="text-muted-foreground">
          We&apos;re here to help and answer any questions you might have.
          Feel free to reach out to us.
        </Typography>
      </div>
    </div>
  );
} 