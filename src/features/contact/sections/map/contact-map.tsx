'use client';

import React from 'react';
import { Map } from '@/components/ui/map';
import { Card } from '@/components/ui/card';
import { Typography } from '@/components/ui/typography';

export function ContactMap() {
  const clinicLocation = {
    lat: -38.1433,  // Frankston, Victoria coordinates
    lng: 145.1233,
  };

  return (
    <div className="container mx-auto px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <Typography variant="h2" className="text-3xl md:text-4xl font-bold">
            Find Us
          </Typography>
          <Typography variant="body" className="text-muted-foreground">
            Visit our clinic in Frankston, Victoria
          </Typography>
        </div>
        
        <Card className="p-0 overflow-hidden">
          <Map
            center={clinicLocation}
            zoom={15}
            markerTitle="Artystone Clinic"
            className="w-full"
          />
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center md:text-left">
          <div>
            <Typography variant="h3" className="text-xl font-semibold mb-2">
              Address
            </Typography>
            <Typography variant="body" className="text-muted-foreground">
              123 Beach Street<br />
              Frankston, VIC 3199<br />
              Australia
            </Typography>
          </div>
          
          <div>
            <Typography variant="h3" className="text-xl font-semibold mb-2">
              Public Transport
            </Typography>
            <Typography variant="body" className="text-muted-foreground">
              5 minutes walk from Frankston Station<br />
              Bus routes: 901, 789, 770
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
} 