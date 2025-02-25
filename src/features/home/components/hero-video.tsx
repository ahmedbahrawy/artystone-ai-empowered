'use client'

import * as React from 'react'
import { useThemeContext } from '@/providers/theme-provider'
import Image from 'next/image'

export function HeroVideo() {
  const videoRef = React.useRef<HTMLVideoElement>(null)
  const [isLoaded, setIsLoaded] = React.useState(false)
  const { resolvedTheme } = useThemeContext()

  const videoSrc = React.useMemo(() => {
    switch (resolvedTheme) {
      case 'dark':
        return '/videos/clinic-dark.mp4'
      case 'semi-light':
        return '/videos/clinic-semi-light.mp4'
      default:
        return '/videos/clinic-light.mp4'
    }
  }, [resolvedTheme])

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
        onLoadedData={() => setIsLoaded(true)}
        poster="/images/clinic-welcome.webp"
        aria-label="Welcome to Arty Stone Clinic"
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
      {!isLoaded && (
        <Image
          src="/images/clinic-welcome.webp"
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