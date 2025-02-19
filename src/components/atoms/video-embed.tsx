'use client'

import { cn } from '@/lib/utils'

interface VideoEmbedProps {
  className?: string
}

export function VideoEmbed({ className }: VideoEmbedProps) {
  return (
    <div
      className={cn(
        "relative h-0 w-full overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-100 shadow-xl dark:border-neutral-800 dark:bg-neutral-900",
        "pb-[56.25%]", // 16:9 aspect ratio
        className
      )}
    >
      <iframe
        src="https://www.canva.com/design/DAGfdjqqaS0/LjhE9TDOmIIQrapuhmZXtw/watch?embed"
        className="absolute left-0 top-0 h-full w-full border-0"
        loading="lazy"
        allow="fullscreen"
        allowFullScreen
      />
    </div>
  )
} 