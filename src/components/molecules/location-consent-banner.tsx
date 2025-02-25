'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { X } from 'lucide-react';

interface LocationConsentBannerProps {
  onAccept: () => void;
  onDecline: () => void;
  isVisible?: boolean;
  className?: string;
}

export function LocationConsentBanner({
  onAccept,
  onDecline,
  isVisible = false,
  className = '',
}: LocationConsentBannerProps) {
  if (!isVisible) return null;

  return (
    <Alert
      className={`fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-[400px] z-50 bg-white dark:bg-gray-900 shadow-lg ${className}`}
      role="alertdialog"
      aria-labelledby="location-consent-title"
      aria-describedby="location-consent-description"
    >
      <AlertTitle
        id="location-consent-title"
        className="text-lg font-semibold flex items-center justify-between"
      >
        Enhance Your Healthcare Experience
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6"
          onClick={onDecline}
          aria-label="Decline location access"
        >
          <X className="h-4 w-4" />
        </Button>
      </AlertTitle>
      <AlertDescription id="location-consent-description" className="mt-2">
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          Allow location access to find nearby healthcare services, get personalized recommendations, and access location-specific Medicare benefits.
        </p>
        <div className="flex gap-2">
          <Button
            variant="default"
            className="flex-1"
            onClick={onAccept}
            aria-label="Enable location access"
          >
            Enable Location
          </Button>
          <Button
            variant="outline"
            className="flex-1"
            onClick={onDecline}
            aria-label="Decline location access"
          >
            Not Now
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  );
} 