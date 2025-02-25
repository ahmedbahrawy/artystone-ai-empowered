'use client';

import React from 'react';
import { Typography } from '@/components/ui/typography';
import { Card } from '@/components/ui/card';
import { MapPin, Phone, Mail } from 'lucide-react';

export function ContactDetails() {
  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="p-6">
          <div className="flex flex-col items-center text-center">
            <MapPin className="w-10 h-10 mb-4 text-primary" />
            <Typography variant="h3" className="mb-2">Address</Typography>
            <Typography className="text-muted-foreground">
              123 Stone Clinic Way<br />
              Melbourne, VIC 3000
            </Typography>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex flex-col items-center text-center">
            <Phone className="w-10 h-10 mb-4 text-primary" />
            <Typography variant="h3" className="mb-2">Phone</Typography>
            <Typography className="text-muted-foreground">
              (03) 1234 5678
            </Typography>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex flex-col items-center text-center">
            <Mail className="w-10 h-10 mb-4 text-primary" />
            <Typography variant="h3" className="mb-2">Email</Typography>
            <Typography className="text-muted-foreground">
              contact@stoneclinic.com.au
            </Typography>
          </div>
        </Card>
      </div>
    </div>
  );
} 