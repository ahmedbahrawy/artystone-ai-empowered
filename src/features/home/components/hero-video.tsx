'use client'

import * as React from 'react'
import Image from 'next/image'
import { useThemeVideo } from '@/lib/hooks/use-theme-video'

export function HeroVideo() {
  const videoRef = React.useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = React.useState(false)
  const {
    videoSrc,
    poster,
    isLoaded,
    hasError,
    isPreloading,
    handleLoadedData,
    handleError,
  } = useThemeVideo()

  React.useEffect(() => {
    const video = videoRef.current
    if (!video || !isLoaded) return

    const playVideo = async () => {
      try {
        await video.play()
        setIsPlaying(true)
      } catch (error) {
        console.warn('Video autoplay failed:', error)
        setIsPlaying(false)
      }
    }

    playVideo()

    return () => {
      video.pause()
      setIsPlaying(false)
    }
  }, [isLoaded])

  // Log state changes for debugging
  React.useEffect(() => {
    console.log('Video States:', {
      isLoaded,
      hasError,
      isPreloading,
      isPlaying,
      videoSrc
    })
  }, [isLoaded, hasError, isPreloading, isPlaying, videoSrc])

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-neutral-100 dark:bg-neutral-800">
      {/* Video Element */}
      {videoSrc && (
        <video
          ref={videoRef}
          className={`h-full w-full object-cover transition-opacity duration-300 ${
            isLoaded && isPlaying ? 'opacity-100' : 'opacity-0'
          }`}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          onLoadedData={handleLoadedData}
          onError={handleError}
          poster={poster}
          aria-label="Welcome to Arty Stone Clinic"
        >
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      {/* Loading State */}
      {isPreloading && (
        <div className="absolute inset-0 flex items-center justify-center bg-neutral-100/50 dark:bg-neutral-800/50 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-4">
            <div className="h-12 w-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
            <p className="text-sm text-primary font-medium">Loading video...</p>
          </div>
        </div>
      )}

      {/* Fallback Image */}
      {(!isLoaded || hasError) && !isPreloading && (
        <div className="absolute inset-0">
          <Image
            src={poster}
            alt="Welcome to Arty Stone Clinic"
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            quality={90}
          />
          {hasError && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <p className="text-white text-sm">Video playback unavailable</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
} 