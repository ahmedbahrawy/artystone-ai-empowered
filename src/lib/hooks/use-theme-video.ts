'use client';

import { useThemeContext } from '@/providers/theme-provider'
import { useCallback, useEffect, useMemo, useState } from 'react'

interface UseThemeVideoOptions {
  video?: string;
  poster?: string;
}

export function useThemeVideo({
  video = '/videos/home-hero.mp4',
  poster = '/images/clinic-welcome.webp',
}: UseThemeVideoOptions = {}) {
  const { isReducedMotion } = useThemeContext()
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [isPreloading, setIsPreloading] = useState(true)

  // If reduced motion is enabled, don't show video
  const shouldShowVideo = !isReducedMotion

  const videoSrc = useMemo(() => {
    if (!shouldShowVideo) return null
    return video
  }, [video, shouldShowVideo])

  // Reset states when video source changes
  useEffect(() => {
    setIsLoaded(false)
    setHasError(false)
    setIsPreloading(true)
  }, [videoSrc])

  // Preload video
  useEffect(() => {
    if (typeof window === 'undefined' || !videoSrc) {
      setIsPreloading(false)
      return
    }

    const preloadVideo = document.createElement('video')
    preloadVideo.src = videoSrc
    preloadVideo.preload = 'auto'
    
    const handleCanPlayThrough = () => {
      setIsPreloading(false)
    }

    const handleError = () => {
      setIsPreloading(false)
      setHasError(true)
      console.warn('Video preloading failed:', videoSrc)
    }

    preloadVideo.addEventListener('canplaythrough', handleCanPlayThrough)
    preloadVideo.addEventListener('error', handleError)

    // Start loading
    preloadVideo.load()

    return () => {
      preloadVideo.removeEventListener('canplaythrough', handleCanPlayThrough)
      preloadVideo.removeEventListener('error', handleError)
      preloadVideo.src = ''
    }
  }, [videoSrc])

  const handleLoadedData = useCallback(() => {
    setIsLoaded(true)
    setHasError(false)
  }, [])

  const handleError = useCallback(() => {
    setHasError(true)
    setIsPreloading(false)
    console.warn('Video failed to load:', videoSrc)
  }, [videoSrc])

  return {
    videoSrc,
    poster,
    isLoaded,
    hasError,
    isPreloading,
    handleLoadedData,
    handleError,
    shouldShowVideo,
  }
} 