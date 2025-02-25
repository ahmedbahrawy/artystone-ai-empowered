'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

interface LocationMapProps {
  className?: string
}

export function LocationMap({ className }: LocationMapProps) {
  return (
    <div className={cn("relative w-full h-full overflow-hidden rounded-2xl bg-white/50 dark:bg-neutral-800/50 p-6 shadow-lg", className)}>
      <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-50 mb-4">
        Find Us
      </h3>
      <div className="relative w-full h-[calc(100%-3rem)] min-h-[400px] rounded-xl overflow-hidden">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3137.894554057436!2d145.12183091531897!3d-38.14559797969379!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad674b8b8b8b8b9%3A0x1c1c1c1c1c1c1c1c!2s13%20Hastings%20Rd%2C%20Frankston%20VIC%203199!5e0!3m2!1sen!2sau!4v1625123456789!5m2!1sen!2sau"
          className="absolute top-0 left-0 w-full h-full border-0"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Artystone Medical Clinic Location"
          aria-label="Google Maps showing Artystone Medical Clinic location"
        />
      </div>
    </div>
  )
} 