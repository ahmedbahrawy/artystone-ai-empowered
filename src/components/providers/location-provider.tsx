'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { LocationConsentBanner } from '@/components/molecules/location-consent-banner';
import { isRuralLocation, getStateFromCoordinates, getMMMClassification } from '@/lib/utils/geolocation';

interface Coordinates {
  latitude: number;
  longitude: number;
}

interface LocationState {
  coordinates: Coordinates | null;
  isRural: boolean;
  state: string;
  mmmClassification: number;
  isLoading: boolean;
  error: string | null;
  hasConsent: boolean | null;
}

interface LocationContextValue extends LocationState {
  requestLocation: () => Promise<void>;
  resetLocation: () => void;
}

const initialState: LocationState = {
  coordinates: null,
  isRural: false,
  state: '',
  mmmClassification: 0,
  isLoading: true,
  error: null,
  hasConsent: null,
};

const LocationContext = createContext<LocationContextValue>({
  ...initialState,
  requestLocation: async () => {},
  resetLocation: () => {},
});

export function useLocation() {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
}

interface LocationProviderProps {
  children: React.ReactNode;
}

const LOCATION_CONSENT_KEY = 'locationConsent';
const LOCATION_OPTIONS: PositionOptions = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

export function LocationProvider({ children }: LocationProviderProps) {
  const [state, setState] = useState<LocationState>(initialState);

  const resetLocation = () => {
    setState(initialState);
  };

  const handleLocationSuccess = async (position: GeolocationPosition) => {
    try {
      const coords = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };

      const [detectedState, rural, mmm] = await Promise.all([
        getStateFromCoordinates(coords),
        Promise.resolve(isRuralLocation(coords)),
        Promise.resolve(getMMMClassification(coords)),
      ]);

      setState(prev => ({
        ...prev,
        coordinates: coords,
        isRural: rural,
        state: detectedState,
        mmmClassification: mmm,
        isLoading: false,
        error: null,
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to process location',
      }));
    }
  };

  const handleLocationError = (error: GeolocationPositionError) => {
    setState(prev => ({
      ...prev,
      isLoading: false,
      error: error.message,
    }));
  };

  const requestLocation = async () => {
    if (!navigator.geolocation) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Geolocation is not supported by your browser',
      }));
      return;
    }

    setState(prev => ({ ...prev, isLoading: true }));

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, LOCATION_OPTIONS);
      });
      await handleLocationSuccess(position);
    } catch (error) {
      if (error instanceof GeolocationPositionError) {
        handleLocationError(error);
      } else {
        setState(prev => ({
          ...prev,
          isLoading: false,
          error: 'Failed to get location',
        }));
      }
    }
  };

  const handleLocationConsent = async (accepted: boolean) => {
    localStorage.setItem(LOCATION_CONSENT_KEY, String(accepted));
    setState(prev => ({ ...prev, hasConsent: accepted }));
    
    if (accepted) {
      await requestLocation();
    } else {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  };

  useEffect(() => {
    const storedConsent = localStorage.getItem(LOCATION_CONSENT_KEY);
    if (storedConsent === 'true') {
      handleLocationConsent(true);
    } else if (storedConsent === 'false') {
      setState(prev => ({ 
        ...prev, 
        hasConsent: false,
        isLoading: false 
      }));
    } else {
      setState(prev => ({ ...prev, hasConsent: null }));
    }
  }, []);

  return (
    <LocationContext.Provider
      value={{
        ...state,
        requestLocation,
        resetLocation,
      }}
    >
      {children}
      <LocationConsentBanner
        onAccept={() => handleLocationConsent(true)}
        onDecline={() => handleLocationConsent(false)}
        isVisible={state.hasConsent === null}
      />
    </LocationContext.Provider>
  );
} 