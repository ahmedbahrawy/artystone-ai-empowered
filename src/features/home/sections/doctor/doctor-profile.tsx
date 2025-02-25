'use client';

import React from 'react';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function DoctorProfile() {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-[400px] lg:h-[500px]">
        <Image
          src="/images/doctor-profile.jpg"
          alt="Dr. Farzaneh"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary">Family Medicine</Badge>
              <Badge variant="secondary">Women's Health</Badge>
              <Badge variant="secondary">Preventive Care</Badge>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-2xl font-bold">Dr. Farzaneh</h3>
              <p className="text-sm text-gray-200">
                MBBS, FRACGP
              </p>
              <p className="text-sm text-gray-200">
                Member of the Royal Australian College of General Practitioners
              </p>
            </div>

            <div className="pt-4 flex items-center gap-4">
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-sm">15+ Years Experience</span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
                <span className="text-sm">Frankston Clinic</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
} 