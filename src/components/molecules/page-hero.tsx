'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { Container } from '@/components/ui/container';
import { fadeIn, slideInFromBottom, stagger } from '@/lib/animations';
import { cn } from '@/lib/utils';
import dynamic from 'next/dynamic';
import Image from 'next/image';

const HeroVideo = dynamic(
  () => import('@/features/home/components/hero-video').then((mod) => mod.HeroVideo),
  {
    ssr: false,
    loading: () => (
      <div className="relative aspect-video w-full animate-pulse rounded-2xl bg-neutral-100 dark:bg-neutral-800">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-16 w-16 rounded-full border-4 border-primary-500/20 border-t-primary-500 animate-spin" />
        </div>
      </div>
    ),
  }
);

interface PageHeroProps {
  title: string;
  highlightedText?: string;
  description: string;
  image?: {
    src: string;
    alt: string;
  };
  showVideo?: boolean;
  className?: string;
  children?: React.ReactNode;
  actions?: React.ReactNode;
  overlay?: boolean;
}

export function PageHero({
  title,
  highlightedText,
  description,
  image,
  showVideo = false,
  className,
  children,
  actions,
  overlay = true,
}: PageHeroProps) {
  return (
    <section className={cn(
      "relative min-h-[70vh] pt-24 md:pt-28 lg:min-h-[80vh] lg:pt-32",
      className
    )}>
      {/* Background */}
      <div className="absolute inset-0 z-0">
        {showVideo ? (
          <HeroVideo />
        ) : image ? (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        ) : null}
        {overlay && <div className="absolute inset-0 bg-black/50" />}
      </div>

      {/* Content */}
      <Container className="relative z-10">
        <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={slideInFromBottom}
            className="flex flex-col justify-center md:min-h-[500px]"
          >
            <div className="relative rounded-2xl border border-neutral-200 bg-white/80 p-8 shadow-lg backdrop-blur-sm dark:border-neutral-800 dark:bg-neutral-900/80 md:p-10 lg:p-12">
              <div className="absolute -left-2 top-0 h-20 w-1.5 bg-gradient-to-b from-indigo-500 via-primary-500 to-secondary-500" />
              <h1 className="font-serif text-4xl font-bold leading-tight text-neutral-900 dark:text-neutral-50 md:text-5xl lg:text-6xl">
                {title}{' '}
                {highlightedText && (
                  <span className="bg-gradient-to-r from-indigo-600 via-primary-500 to-secondary-500 bg-clip-text text-transparent">
                    {highlightedText}
                  </span>
                )}
              </h1>
              <p className="mt-6 text-lg text-neutral-700 dark:text-neutral-300">
                {description}
              </p>
              {actions && (
                <motion.div
                  variants={stagger}
                  initial="hidden"
                  animate="visible"
                  className="mt-8 flex flex-wrap gap-4"
                >
                  {actions}
                </motion.div>
              )}
            </div>
          </motion.div>
          
          {/* Optional right column content */}
          {children && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="relative z-10"
            >
              {children}
            </motion.div>
          )}
        </div>
      </Container>
    </section>
  );
} 