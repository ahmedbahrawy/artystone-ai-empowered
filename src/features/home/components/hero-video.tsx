'use client'

import * as React from 'react'

export function HeroVideo() {
  const videoRef = React.useRef<HTMLVideoElement>(null)
  const [isLoaded, setIsLoaded] = React.useState(false)
  const [hasPlayError, setHasPlayError] = React.useState(false)

  React.useEffect(() => {
    const video = videoRef.current
    if (!video || !isLoaded) return

    let mounted = true

    const playVideo = async () => {
      try {
        await video.play()
        if (mounted) {
          setHasPlayError(false)
        }
      } catch (error) {
        console.warn('Autoplay failed:', error)
        if (mounted) {
          setHasPlayError(true)
        }
      }
    }

    playVideo()

    // Add click handler for manual play on autoplay failure
    const handleClick = () => {
      if (hasPlayError) {
        playVideo()
      }
    }

    video.addEventListener('click', handleClick)

    return () => {
      mounted = false
      if (video) {
        video.pause()
        video.removeEventListener('click', handleClick)
      }
    }
  }, [isLoaded, hasPlayError])

  return (
    <div className="relative overflow-hidden rounded-2xl aspect-video">
      <video
        ref={videoRef}
        className={`w-full h-full object-cover ${hasPlayError ? 'cursor-pointer' : ''}`}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        onLoadedData={() => setIsLoaded(true)}
        aria-label="Welcome to Arty Stone Clinic"
      >
        <source src="/home-hero.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {hasPlayError && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <button
            className="rounded-full bg-white/90 p-4 text-neutral-900 shadow-lg hover:bg-white"
            onClick={() => videoRef.current?.play()}
            aria-label="Play video"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-8 w-8"
            >
              <path
                fillRule="evenodd"
                d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286l-11.54 6.347c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  )
} 