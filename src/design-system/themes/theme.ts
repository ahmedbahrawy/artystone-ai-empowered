import { tokens } from '../foundations/tokens'

export type Theme = typeof tokens

// Theme context type
export interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
}

// Theme variants
export const themes = {
  light: {
    ...tokens,
    semantic: {
      background: {
        primary: tokens.colors.neutral[50],
        secondary: tokens.colors.neutral[100],
        tertiary: tokens.colors.neutral[200],
      },
      text: {
        primary: tokens.colors.neutral[900],
        secondary: tokens.colors.neutral[700],
        tertiary: tokens.colors.neutral[500],
      },
      border: {
        primary: tokens.colors.neutral[200],
        secondary: tokens.colors.neutral[300],
      },
    },
  },
  dark: {
    ...tokens,
    semantic: {
      background: {
        primary: tokens.colors.neutral[900],
        secondary: tokens.colors.neutral[800],
        tertiary: tokens.colors.neutral[700],
      },
      text: {
        primary: tokens.colors.neutral[50],
        secondary: tokens.colors.neutral[300],
        tertiary: tokens.colors.neutral[500],
      },
      border: {
        primary: tokens.colors.neutral[700],
        secondary: tokens.colors.neutral[600],
      },
    },
  },
} as const

// CSS-in-JS utility functions
export const createStyles = <T extends Record<string, unknown>>(
  stylesFn: (theme: Theme) => T
) => {
  return stylesFn
}

// Example usage:
// const styles = createStyles((theme) => ({
//   container: {
//     backgroundColor: theme.colors.primary[500],
//     padding: theme.spacing[4],
//   }
// }))

// Media query helpers
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
}

export const media = {
  sm: `@media (min-width: ${breakpoints.sm})`,
  md: `@media (min-width: ${breakpoints.md})`,
  lg: `@media (min-width: ${breakpoints.lg})`,
  xl: `@media (min-width: ${breakpoints.xl})`,
  '2xl': `@media (min-width: ${breakpoints['2xl']})`,
}

// Spacing helpers
export const spacing = {
  px: (value: keyof typeof tokens.spacing) => tokens.spacing[value],
  rem: (value: number) => `${value}rem`,
  em: (value: number) => `${value}em`,
}

// Typography helpers
export const typography = {
  fontSize: (size: keyof typeof tokens.typography.sizes) => ({
    fontSize: tokens.typography.sizes[size],
  }),
  fontWeight: (weight: keyof typeof tokens.typography.weights) => ({
    fontWeight: tokens.typography.weights[weight],
  }),
  lineHeight: (height: keyof typeof tokens.typography.lineHeights) => ({
    lineHeight: tokens.typography.lineHeights[height],
  }),
} 