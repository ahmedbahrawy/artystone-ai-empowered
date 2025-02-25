'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { X } from 'lucide-react';

interface LocationConsentBannerProps {
  onAccept: () => void;
  onDecline: () => void;
}

export function LocationConsentBanner({ onAccept, onDecline }: LocationConsentBannerProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasConsent = localStorage.getItem('locationConsent');
    if (!hasConsent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('locationConsent', 'true');
    setIsVisible(false);
    onAccept();
  };

  const handleDecline = () => {
    localStorage.setItem('locationConsent', 'false');
    setIsVisible(false);
    onDecline();
  };

  if (!isVisible) return null;

  return (
    <Alert className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-[400px] z-50 bg-white dark:bg-gray-900 shadow-lg">
      <AlertTitle className="text-lg font-semibold flex items-center justify-between">
        Enhance Your Healthcare Experience
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6"
          onClick={handleDecline}
        >
          <X className="h-4 w-4" />
        </Button>
      </AlertTitle>
      <AlertDescription className="mt-2">
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          Allow location access to find nearby healthcare services, get personalized recommendations, and access location-specific Medicare benefits.
        </p>
        <div className="flex gap-2">
          <Button
            variant="default"
            className="flex-1"
            onClick={handleAccept}
          >
            Enable Location
          </Button>
          <Button
            variant="outline"
            className="flex-1"
            onClick={handleDecline}
          >
            Not Now
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  );
} 