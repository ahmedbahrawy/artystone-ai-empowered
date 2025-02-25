'use client';

import { useThemeContext } from '@/providers/theme-provider'
import { useCallback, useEffect, useMemo, useState } from 'react'

interface UseThemeVideoOptions {
  darkVideo?: string
  lightVideo?: string
  semiLightVideo?: string
  poster?: string
}

export function useThemeVideo({
  darkVideo = '/videos/clinic-dark.mp4',
  lightVideo = '/videos/clinic-light.mp4',
  semiLightVideo = '/videos/clinic-semi-light.mp4',
  poster = '/images/clinic-welcome.webp',
}: UseThemeVideoOptions = {}) {
  const { resolvedTheme } = useThemeContext()
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)

  const videoSrc = useMemo(() => {
    switch (resolvedTheme) {
      case 'dark':
        return darkVideo
      case 'semi-light':
        return semiLightVideo
      default:
        return lightVideo
    }
  }, [resolvedTheme, darkVideo, lightVideo, semiLightVideo])

  const handleLoadedData = useCallback(() => {
    setIsLoaded(true)
    setHasError(false)
  }, [])

  const handleError = useCallback(() => {
    setHasError(true)
    console.warn('Video failed to load:', videoSrc)
  }, [videoSrc])

  useEffect(() => {
    setIsLoaded(false)
  }, [videoSrc])

  return {
    videoSrc,
    poster,
    isLoaded,
    hasError,
    handleLoadedData,
    handleError,
  }
} 