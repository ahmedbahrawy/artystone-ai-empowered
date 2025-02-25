'use client'

import React, { useEffect, useRef, useState } from 'react'
import Image, { ImageProps } from 'next/image'
import { cn } from '@/lib/utils'

interface OptimizedImageProps extends Omit<ImageProps, 'onLoad'> {
  fallbackSrc?: string
  loadingClassName?: string
  onLoadingComplete?: (img: HTMLImageElement) => void
}

export function OptimizedImage({
  src,
  alt,
  fallbackSrc = '/images/placeholder.webp',
  className,
  loadingClassName,
  onLoadingComplete,
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.unobserve(entry.target)
          }
        })
      },
      {
        rootMargin: '50px',
        threshold: 0.1,
      }
    )

    if (imageRef.current) {
      observer.observe(imageRef.current)
    }

    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current)
      }
    }
  }, [])

  const handleLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    setIsLoading(false)
    if (onLoadingComplete) {
      onLoadingComplete(event.currentTarget)
    }
  }

  const handleError = () => {
    setIsError(true)
    setIsLoading(false)
  }

  return (
    <div
      ref={imageRef}
      className={cn(
        'relative overflow-hidden',
        isLoading && loadingClassName,
        className
      )}
    >
      {isVisible && (
        <>
          <Image
            src={isError ? fallbackSrc : src}
            alt={alt}
            className={cn(
              'transition-opacity duration-300',
              isLoading ? 'opacity-0' : 'opacity-100'
            )}
            onLoadingComplete={handleLoad}
            onError={handleError}
            {...props}
          />
          {isLoading && (
            <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 animate-pulse" />
          )}
        </>
      )}
    </div>
  )
} 