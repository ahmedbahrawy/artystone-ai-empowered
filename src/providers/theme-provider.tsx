'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

type Theme = 'dark' | 'system';
type ThemePreference = 'system' | 'dark';

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
  themePreference: ThemePreference;
  setThemePreference: (preference: ThemePreference) => void;
}

const ThemeContext = React.createContext<ThemeContextType | undefined>(undefined);

export function useThemeContext() {
  const context = React.useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
}

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  enableSystem = true,
  attribute = 'class',
  themes = ['dark', 'system'],
  storageKey = 'theme-preference',
  ...props
}: ThemeProviderProps) {
  const [isReducedMotion, setIsReducedMotion] = React.useState(false);
  const [isHighContrast, setIsHighContrast] = React.useState(false);
  const [prefersDarkScheme, setPrefersDarkScheme] = React.useState(false);
  const [themePreference, setThemePreference] = React.useState<ThemePreference>(defaultTheme);
  const [theme, setTheme] = React.useState<Theme>('system');
  const [resolvedTheme, setResolvedTheme] = React.useState<Theme>('dark');

  // Check for user preferences
  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    
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
    
    // Check for dark scheme preference
    const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setPrefersDarkScheme(darkQuery.matches);
    
    const handleDarkChange = () => setPrefersDarkScheme(darkQuery.matches);
    darkQuery.addEventListener('change', handleDarkChange);
    
    // Cleanup
    return () => {
      motionQuery.removeEventListener('change', handleMotionChange);
      contrastQuery.removeEventListener('change', handleContrastChange);
      darkQuery.removeEventListener('change', handleDarkChange);
    };
  }, []);

  // Handle theme changes
  const handleThemeChange = React.useCallback((newTheme: Theme) => {
    setTheme(newTheme);
    setResolvedTheme('dark'); // Always resolve to dark theme
    setThemePreference(newTheme as ThemePreference);
    localStorage.setItem(storageKey, newTheme);
  }, [storageKey]);

  // Initialize theme from localStorage or default
  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const storedPreference = localStorage.getItem(storageKey) as ThemePreference | null;
    if (storedPreference) {
      setThemePreference(storedPreference);
      handleThemeChange(storedPreference as Theme);
    } else {
      handleThemeChange(defaultTheme as Theme);
    }
  }, [defaultTheme, handleThemeChange, storageKey]);

  const value = React.useMemo(() => ({
    theme,
    resolvedTheme,
    setTheme: handleThemeChange,
    isReducedMotion,
    isHighContrast,
    prefersDarkScheme,
    themePreference,
    setThemePreference: (preference: ThemePreference) => handleThemeChange(preference as Theme),
  }), [
    theme,
    resolvedTheme,
    handleThemeChange,
    isReducedMotion,
    isHighContrast,
    prefersDarkScheme,
    themePreference
  ]);

  return (
    <ThemeContext.Provider value={value}>
      <NextThemesProvider
        attribute={attribute}
        defaultTheme={themePreference}
        enableSystem={enableSystem}
        themes={themes}
        value={{
          dark: 'dark',
          system: 'dark',
        }}
        {...props}
      >
        {children}
      </NextThemesProvider>
    </ThemeContext.Provider>
  );
} 