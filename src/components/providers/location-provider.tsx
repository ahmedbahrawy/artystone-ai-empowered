'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { LocationConsentBanner } from '@/components/molecules/location-consent-banner';
import { isRuralLocation, getStateFromCoordinates, getMMMClassification } from '@/lib/utils/geolocation';

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface LocationContextType {
  coordinates: Coordinates | null;
  isRural: boolean;
  state: string;
  mmmClassification: number;
  isLoading: boolean;
  error: string | null;
}

const LocationContext = createContext<LocationContextType>({
  coordinates: null,
  isRural: false,
  state: '',
  mmmClassification: 0,
  isLoading: true,
  error: null,
});

export function useLocation() {
  return useContext(LocationContext);
}

interface LocationProviderProps {
  children: React.ReactNode;
}

export function LocationProvider({ children }: LocationProviderProps) {
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [isRural, setIsRural] = useState(false);
  const [state, setState] = useState('');
  const [mmmClassification, setMMMClassification] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleLocationSuccess = async (position: GeolocationPosition) => {
    const coords = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    };

    setCoordinates(coords);
    setIsRural(isRuralLocation(coords));
    setMMMClassification(getMMMClassification(coords));

    try {
      const detectedState = await getStateFromCoordinates(coords);
      setState(detectedState);
    } catch (err) {
      console.error('Error getting state:', err);
    }

    setIsLoading(false);
  };

  const handleLocationError = (error: GeolocationPositionError) => {
    setError(error.message);
    setIsLoading(false);
  };

  const requestLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      setIsLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      handleLocationSuccess,
      handleLocationError,
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  };

  const handleLocationConsent = (accepted: boolean) => {
    if (accepted) {
      requestLocation();
    } else {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const hasConsent = localStorage.getItem('locationConsent');
    if (hasConsent === 'true') {
      requestLocation();
    } else if (hasConsent === 'false') {
      setIsLoading(false);
    }
  }, []);

  return (
    <LocationContext.Provider
      value={{
        coordinates,
        isRural,
        state,
        mmmClassification,
        isLoading,
        error,
      }}
    >
      {children}
      <LocationConsentBanner
        onAccept={() => handleLocationConsent(true)}
        onDecline={() => handleLocationConsent(false)}
      />
    </LocationContext.Provider>
  );
} 