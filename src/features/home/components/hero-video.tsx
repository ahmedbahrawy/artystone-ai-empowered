'use client'

import * as React from 'react'
import Image from 'next/image'
import { useThemeVideo } from '@/lib/hooks/use-theme-video'

export function HeroVideo() {
  const videoRef = React.useRef<HTMLVideoElement>(null)
  const {
    videoSrc,
    poster,
    isLoaded,
    hasError,
    handleLoadedData,
    handleError,
  } = useThemeVideo()

  React.useEffect(() => {
    const video = videoRef.current
    if (!video || !isLoaded) return

    const playVideo = async () => {
      try {
        await video.play()
      } catch (error) {
        console.warn('Video autoplay failed:', error)
      }
    }

    playVideo()

    return () => {
      video.pause()
    }
  }, [isLoaded])

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-neutral-100 dark:bg-neutral-800">
      <video
        ref={videoRef}
        className={`h-full w-full object-cover transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
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
      </video>
      {(!isLoaded || hasError) && (
        <Image
          src={poster}
          alt="Welcome to Arty Stone Clinic"
          fill
          priority
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          quality={90}
        />
      )}
    </div>
  )
} 