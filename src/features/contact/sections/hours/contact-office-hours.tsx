'use client';

import React from 'react';
import { Typography } from '@/components/ui/typography';
import { Card } from '@/components/ui/card';
import { Clock } from 'lucide-react';

export function ContactOfficeHours() {
  const hours = [
    { day: 'Monday - Friday', hours: '9:00 AM - 6:00 PM' },
    { day: 'Saturday', hours: '9:00 AM - 2:00 PM' },
    { day: 'Sunday', hours: 'Closed' },
  ];

  return (
    <div className="container mx-auto px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <Clock className="w-12 h-12 mx-auto mb-4 text-primary" />
          <Typography variant="h2" className="mb-4">
            Office Hours
          </Typography>
          <Typography className="text-muted-foreground mb-8">
            Visit us during our business hours for consultations and treatments
          </Typography>
        </div>

        <Card className="p-6">
          <div className="space-y-4">
            {hours.map((schedule) => (
              <div key={schedule.day} className="flex justify-between items-center border-b last:border-0 pb-4 last:pb-0">
                <Typography variant="h4">{schedule.day}</Typography>
                <Typography className="text-muted-foreground">{schedule.hours}</Typography>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
} 