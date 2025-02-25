'use client';

import React from 'react';
import { Typography } from '@/components/ui/typography';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function ContactCTA() {
  return (
    <div className="container mx-auto px-4">
      <div className="max-w-3xl mx-auto text-center">
        <Typography variant="h2" className="mb-4">
          Ready to Book Your Appointment?
        </Typography>
        <Typography className="text-muted-foreground mb-8">
          Take the first step towards better health. Schedule your consultation today
          and let us help you achieve your wellness goals.
        </Typography>
        <Button size="lg" className="gap-2">
          Book Appointment <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
} 