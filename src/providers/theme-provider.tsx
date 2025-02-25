'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

type Theme = 'light' | 'dark' | 'semi-light' | 'system';
type ThemePreference = 'system' | 'light' | 'dark' | 'semi-light';

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: ThemePreference;
  enableSystem?: boolean;
  attribute?: string;
  themes?: string[];
  storageKey?: string;
}

interface ThemeContextType {
  theme: Theme;
  resolvedTheme: Theme;
  setTheme: (theme: Theme) => void;
  isReducedMotion: boolean;
  isHighContrast: boolean;
  prefersDarkScheme: boolean;
  prefersLightScheme: boolean;
  themePreference: ThemePreference;
  setThemePreference: (preference: ThemePreference) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  enableSystem = true,
  attribute = 'class',
  themes = ['light', 'dark', 'semi-light', 'system'],
  storageKey = 'theme-preference',
  ...props
}: ThemeProviderProps) {
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [prefersDarkScheme, setPrefersDarkScheme] = useState(false);
  const [prefersLightScheme, setPrefersLightScheme] = useState(false);
  const [themePreference, setThemePreference] = useState<ThemePreference>(defaultTheme);
  const [theme, setTheme] = useState<Theme>('system');
  const [resolvedTheme, setResolvedTheme] = useState<Theme>('light');

  // Check for user preferences
  useEffect(() => {
    // Check for reduced motion preference
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(motionQuery.matches);
    
    const handleMotionChange = () => setIsReducedMotion(motionQuery.matches);
    motionQuery.addEventListener('change', handleMotionChange);
    
    // Check for high contrast preference
    const contrastQuery = window.matchMedia('(prefers-contrast: more)');
    setIsHighContrast(contrastQuery.matches);
    
    const handleContrastChange = () => setIsHighContrast(contrastQuery.matches);
    contrastQuery.addEventListener('change', handleContrastChange);
    
    // Check for color scheme preference
    const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setPrefersDarkScheme(darkQuery.matches);
    
    const handleDarkChange = () => setPrefersDarkScheme(darkQuery.matches);
    darkQuery.addEventListener('change', handleDarkChange);
    
    // Check for light scheme preference
    const lightQuery = window.matchMedia('(prefers-color-scheme: light)');
    setPrefersLightScheme(lightQuery.matches);
    
    const handleLightChange = () => setPrefersLightScheme(lightQuery.matches);
    lightQuery.addEventListener('change', handleLightChange);
    
    // Cleanup
    return () => {
      motionQuery.removeEventListener('change', handleMotionChange);
      contrastQuery.removeEventListener('change', handleContrastChange);
      darkQuery.removeEventListener('change', handleDarkChange);
      lightQuery.removeEventListener('change', handleLightChange);
    };
  }, []);

  // Handle theme changes
  const handleThemeChange = useCallback((newTheme: Theme) => {
    setTheme(newTheme);
    
    // Determine resolved theme
    if (newTheme === 'system') {
      setResolvedTheme(prefersDarkScheme ? 'dark' : 'light');
    } else {
      setResolvedTheme(newTheme);
    }
    
    // Update theme preference
    setThemePreference(newTheme as ThemePreference);
    
    // Store preference in localStorage
    localStorage.setItem(storageKey, newTheme);
  }, [prefersDarkScheme, storageKey]);

  // Initialize theme from localStorage or default
  useEffect(() => {
    const storedPreference = localStorage.getItem(storageKey) as ThemePreference | null;
    
    if (storedPreference) {
      setThemePreference(storedPreference);
      handleThemeChange(storedPreference as Theme);
    } else {
      handleThemeChange(defaultTheme as Theme);
    }
  }, [defaultTheme, handleThemeChange, storageKey]);

  // Update resolved theme when system preference changes
  useEffect(() => {
    if (theme === 'system') {
      setResolvedTheme(prefersDarkScheme ? 'dark' : 'light');
    }
  }, [prefersDarkScheme, theme]);

  const value = {
    theme,
    resolvedTheme,
    setTheme: handleThemeChange,
    isReducedMotion,
    isHighContrast,
    prefersDarkScheme,
    prefersLightScheme,
    themePreference,
    setThemePreference: (preference: ThemePreference) => handleThemeChange(preference as Theme),
  };

  return (
    <ThemeContext.Provider value={value}>
      <NextThemesProvider
        attribute={attribute}
        defaultTheme={themePreference}
        enableSystem={enableSystem}
        themes={themes}
        storageKey={storageKey}
        {...props}
      >
        {children}
      </NextThemesProvider>
    </ThemeContext.Provider>
  );
}

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  
  return context;
}; 