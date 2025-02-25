import Image from 'next/image'
import { type CSSProperties } from 'react'

interface HeroImageProps {
  src: string
  alt: string
  priority?: boolean
  overlay?: boolean
  className?: string
  style?: CSSProperties
}

export function HeroImage({
  src,
  alt,
  priority = true,
  overlay = true,
  className = '',
  style,
}: HeroImageProps) {
  return (
    <div className={`absolute inset-0 ${className}`} style={style}>
      {overlay && (
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-neutral-900/70 to-neutral-900/50" />
      )}
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        quality={90}
        className="object-cover object-center"
        sizes="100vw"
      />
    </div>
  )
} 