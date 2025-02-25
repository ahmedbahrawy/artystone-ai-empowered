'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { ThemeSwitcher } from './theme-switcher'

type Theme = 'light' | 'dark' | 'system'

interface ThemeProviderProps {
  children: React.ReactNode;
  attribute?: 'class' | 'data-theme' | 'data-mode';
  defaultTheme?: Theme;
  enableSystem?: boolean;
  disableTransitionOnChange?: boolean;
  themes?: Theme[];
  storageKey?: string;
}

const defaultThemes: Theme[] = ['light', 'dark', 'system']

export function ThemeProvider({
  children,
  attribute = 'class',
  defaultTheme = 'system',
  enableSystem = true,
  disableTransitionOnChange = false,
  themes = defaultThemes,
  storageKey = 'theme',
  ...props
}: ThemeProviderProps) {
  const [mounted, setMounted] = React.useState(false)

  // Ensure theme changes don't cause hydration mismatch
  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <>{children}</>
  }

  return (
    <NextThemesProvider
      attribute={attribute}
      defaultTheme={defaultTheme}
      enableSystem={enableSystem}
      disableTransitionOnChange={disableTransitionOnChange}
      themes={themes}
      storageKey={storageKey}
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
} 