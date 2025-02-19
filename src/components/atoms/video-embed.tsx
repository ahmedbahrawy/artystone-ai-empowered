'use client'

import { cn } from '@/lib/utils'

interface VideoEmbedProps {
  className?: string
  src: string
  autoPlay?: boolean
  loop?: boolean
  muted?: boolean
  playsInline?: boolean
}

export function VideoEmbed({
  className,
  src,
  autoPlay = true,
  loop = true,
  muted = true,
  playsInline = true,
}: VideoEmbedProps) {
  return (
    <div
      className={cn(
        "relative h-0 w-full overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-100 shadow-xl dark:border-neutral-800 dark:bg-neutral-900",
        "pb-[75%]", // 4:3 aspect ratio for better alignment
        className
      )}
    >
      <div className="absolute inset-0 z-10 bg-gradient-to-br from-indigo-500/5 via-primary-500/5 to-secondary-500/5" />
      <video
        className="absolute left-0 top-0 h-full w-full object-cover"
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        playsInline={playsInline}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  )
} 