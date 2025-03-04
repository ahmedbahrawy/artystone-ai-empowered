'use client'

import * as React from 'react'
import { useTheme } from 'next-themes'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

const themes = [
  {
    name: 'light',
    icon: '☀️',
    label: 'Light',
  },
  {
    name: 'semi-light',
    icon: '🌤️',
    label: 'Semi Light',
  },
  {
    name: 'dark',
    icon: '🌙',
    label: 'Dark',
  },
] as const

interface ThemeSwitcherProps {
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
  className?: string
}

export function ThemeSwitcher({ 
  position = 'bottom-right',
  className
}: ThemeSwitcherProps) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const positionClasses = {
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-right': 'top-20 right-4',
    'top-left': 'top-20 left-4',
  }

  return (
    <div className={cn(`fixed z-50 ${positionClasses[position]}`, className)}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex overflow-hidden rounded-full bg-white/80 p-1 shadow-lg backdrop-blur-sm dark:bg-neutral-900/80"
      >
        {themes.map((t) => (
          <button
            key={t.name}
            onClick={() => setTheme(t.name)}
            className={`relative rounded-full p-2 text-lg transition-all hover:bg-neutral-100 dark:hover:bg-neutral-800 ${
              theme === t.name
                ? 'bg-indigo-100 text-indigo-900 dark:bg-fuchsia-900/20 dark:text-fuchsia-300'
                : 'text-neutral-600 dark:text-neutral-400'
            }`}
          >
            <span className="sr-only">Switch to {t.label} theme</span>
            {t.icon}
            {theme === t.name && (
              <motion.div
                layoutId="theme-indicator"
                className="absolute inset-0 rounded-full bg-current opacity-10"
              />
            )}
          </button>
        ))}
      </motion.div>
    </div>
  )
} 