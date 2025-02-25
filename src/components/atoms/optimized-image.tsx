'use client'

import Image, { type ImageProps } from 'next/image'
import { type CSSProperties } from 'react'

type OptimizedImageProps = {
  src: ImageProps['src']
  alt: string
  fill?: boolean
  width?: number
  height?: number
  priority?: boolean
  quality?: number
  className?: string
  style?: CSSProperties
  sizes?: string
  loading?: 'lazy' | 'eager'
  placeholder?: 'blur' | 'empty'
  blurDataURL?: string
  onLoad?: () => void
}

const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#f6f7f8" offset="0%" />
      <stop stop-color="#edeef1" offset="20%" />
      <stop stop-color="#f6f7f8" offset="40%" />
      <stop stop-color="#f6f7f8" offset="100%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#f6f7f8" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`

const toBase64 = (str: string) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str)

export function OptimizedImage({
  src,
  alt,
  fill = false,
  width,
  height,
  priority = false,
  quality = 75,
  className = '',
  style,
  sizes = '100vw',
  loading,
  placeholder = 'empty',
  blurDataURL,
  onLoad,
}: OptimizedImageProps) {
  // Default sizes based on common breakpoints
  const defaultSizes = '(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw'
  
  // Generate blur placeholder if not provided
  const generatedBlurDataURL = blurDataURL || 
    (width && height ? `data:image/svg+xml;base64,${toBase64(shimmer(width, height))}` : undefined)

  return (
    <div className={`relative ${fill ? 'h-full w-full' : ''}`}>
      <Image
        src={src}
        alt={alt}
        quality={quality}
        className={`opacity-0 transition-opacity duration-300 ${className}`}
        style={style}
        sizes={sizes || defaultSizes}
        priority={priority}
        loading={loading || (priority ? 'eager' : 'lazy')}
        placeholder={placeholder}
        blurDataURL={generatedBlurDataURL}
        fill={fill}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        onLoad={(event) => {
          const target = event.target as HTMLImageElement
          target.classList.remove('opacity-0')
          if (onLoad) {
            onLoad()
          }
        }}
      />
    </div>
  )
} 