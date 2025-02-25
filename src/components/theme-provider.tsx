'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { ThemeSwitcher } from './theme-switcher'
import type { ThemeProviderProps } from 'next-themes/dist/types'

type Attribute = 'class' | 'data-theme' | 'data-mode'

interface ThemeProviderProps {
  children: React.ReactNode
  attribute?: Attribute | Attribute[]
  defaultTheme?: string
  enableSystem?: boolean
  storageKey?: string
  themes?: string[]
  disableTransitionOnChange?: boolean
}

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="data-theme"
      defaultTheme="semi-light"
      themes={['light', 'semi-light', 'dark']}
      enableSystem
      disableTransitionOnChange
      {...props}
    >
      {children}
      <ThemeSwitcher />
    </NextThemesProvider>
  )
} 