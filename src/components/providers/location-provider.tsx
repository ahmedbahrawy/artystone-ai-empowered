'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
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
  const [state, setState] = useState<LocationState>({
    coordinates: null,
    isRural: false,
    state: '',
    mmmClassification: 0,
    isLoading: true,
    error: null,
    hasConsent: null,
  });

  const resetLocation = useCallback(() => {
    setState(prev => ({
      ...prev,
      coordinates: null,
      isRural: false,
      state: '',
      mmmClassification: 0,
      isLoading: false,
      error: null,
    }));
  }, []);

  const handleLocationSuccess = useCallback(async (position: GeolocationPosition) => {
    const { latitude, longitude } = position.coords;
    const coordinates = { latitude, longitude };
    
    try {
      const isRuralArea = await isRuralLocation(coordinates);
      const stateFromCoords = await getStateFromCoordinates(coordinates);
      const mmmClass = await getMMMClassification(coordinates);
      
      setState(prev => ({
        ...prev,
        coordinates,
        isRural: isRuralArea,
        state: stateFromCoords,
        mmmClassification: mmmClass,
        isLoading: false,
        error: null,
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Failed to process location data',
      }));
    }
  }, []);

  const handleLocationError = useCallback((error: GeolocationPositionError) => {
    setState(prev => ({
      ...prev,
      isLoading: false,
      error: error.message,
    }));
  }, []);

  const requestLocation = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true }));
    
    if (!navigator.geolocation) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Geolocation is not supported by your browser',
      }));
      return;
    }
    
    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
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
  }, [handleLocationSuccess, handleLocationError]);

  const handleLocationConsent = useCallback(async (accepted: boolean) => {
    if (accepted) {
      localStorage.setItem(LOCATION_CONSENT_KEY, 'true');
      await requestLocation();
    } else {
      localStorage.setItem(LOCATION_CONSENT_KEY, 'false');
      setState(prev => ({ 
        ...prev, 
        hasConsent: false,
        isLoading: false 
      }));
    }
  }, [requestLocation]);

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
  }, [handleLocationConsent]);

  return (
    <LocationContext.Provider
      value={{
        ...state,
        requestLocation,
        resetLocation,
      }}
    >
      {children}
      {state.hasConsent === null && (
        <LocationConsentBanner 
          onAccept={() => handleLocationConsent(true)}
          onDecline={() => handleLocationConsent(false)}
          isVisible={true}
        />
      )}
    </LocationContext.Provider>
  );
} 