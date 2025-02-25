'use client'

import * as React from 'react'
import Image from 'next/image'
import { useThemeVideo } from '@/lib/hooks/use-theme-video'
import { useInView } from 'react-intersection-observer'

export function HeroVideo() {
  const videoRef = React.useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = React.useState(false)
  const [isVisible, setIsVisible] = React.useState(false)
  
  // Intersection observer for video visibility
  const { ref: containerRef, inView } = useInView({
    threshold: 0.3,
    triggerOnce: false
  })

  const {
    videoSrc,
    poster,
    isLoaded,
    hasError,
    isPreloading,
    handleLoadedData,
    handleError,
  } = useThemeVideo()

  // Handle video playback based on visibility
  React.useEffect(() => {
    const video = videoRef.current
    if (!video || !isLoaded) return

    if (inView && !isPlaying) {
      const playVideo = async () => {
        try {
          await video.play()
          setIsPlaying(true)
          setIsVisible(true)
        } catch (error) {
          console.warn('Video playback failed:', error)
          setIsPlaying(false)
        }
      }
      playVideo()
    } else if (!inView && isPlaying) {
      video.pause()
      setIsPlaying(false)
      setIsVisible(false)
    }

    return () => {
      video.pause()
      setIsPlaying(false)
      setIsVisible(false)
    }
  }, [inView, isLoaded, isPlaying])

  // Memoize video element to prevent unnecessary re-renders
  const videoElement = React.useMemo(() => (
    videoSrc && (
      <video
        ref={videoRef}
        className={`h-full w-full object-cover transition-opacity duration-500 ${
          isLoaded && isPlaying && isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        autoPlay={false} // We'll handle playback manually
        loop
        muted
        playsInline
        preload="metadata" // Only preload metadata initially
        onLoadedData={handleLoadedData}
        onError={handleError}
        poster={poster}
        aria-label="Welcome to Arty Stone Clinic"
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    )
  ), [videoSrc, isLoaded, isPlaying, isVisible, handleLoadedData, handleError, poster])

  // Memoize loading state
  const loadingElement = React.useMemo(() => (
    isPreloading && (
      <div className="absolute inset-0 flex items-center justify-center bg-neutral-100/30 dark:bg-neutral-800/30 backdrop-blur-[2px]">
        <div className="h-10 w-10 rounded-full border-3 border-primary/20 border-t-primary animate-spin" />
      </div>
    )
  ), [isPreloading])

  // Memoize fallback image
  const fallbackElement = React.useMemo(() => (
    (!isLoaded || hasError) && !isPreloading && (
      <div className="absolute inset-0">
        <Image
          src={poster}
          alt="Welcome to Arty Stone Clinic"
          fill
          priority
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          quality={85}
        />
        {hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
            <p className="text-white text-sm font-medium">Video playback unavailable</p>
          </div>
        )}
      </div>
    )
  ), [isLoaded, hasError, isPreloading, poster])

  return (
    <div 
      ref={containerRef}
      className="relative aspect-video w-full overflow-hidden rounded-2xl bg-neutral-100 dark:bg-neutral-800"
    >
      {videoElement}
      {loadingElement}
      {fallbackElement}
    </div>
  )
} 