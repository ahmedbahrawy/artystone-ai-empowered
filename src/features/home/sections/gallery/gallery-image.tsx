'use client';

import React from 'react';
import Image from 'next/image';
import { Card } from '@/components/ui/card';

interface GalleryImageProps {
  src: string;
  alt: string;
  caption: string;
}

export function GalleryImage({ src, alt, caption }: GalleryImageProps) {
  return (
    <Card className="overflow-hidden group cursor-pointer">
      <div className="relative aspect-[4/3]">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute inset-0 flex items-end p-6">
          <p className="text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {caption}
          </p>
        </div>
      </div>
    </Card>
  );
} 