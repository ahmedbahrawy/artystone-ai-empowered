'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useThemeVideo } from '@/lib/hooks/use-theme-video';

export function HeroImage(): JSX.Element {
  const [videoError, setVideoError] = useState(false);
  const {
    videoSrc,
    isLoading,
    poster,
    handleVideoLoad,
  } = useThemeVideo({
    lightVideo: '/videos/clinic-light.mp4',
    darkVideo: '/videos/clinic-dark.mp4',
    poster: '/images/clinic-welcome.webp',
  });

  const handleVideoError = () => {
    console.warn('Video failed to load:', videoSrc);
    setVideoError(true);
  };

  return (
    <div className="relative w-full h-full min-h-[500px] lg:min-h-[600px]">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.2,
          ease: [0, 0.71, 0.2, 1.01]
        }}
        className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl"
      >
        {/* Overlay gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-transparent to-purple-600/20 mix-blend-overlay z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent z-10" />
        
        {/* Video with aspect ratio container */}
        <div className="relative w-full h-full">
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
            {!videoError && (
              <video
                autoPlay
                muted
                loop
                playsInline
                className={`w-full h-full object-cover transition-opacity duration-500 ${!isLoading ? 'opacity-100' : 'opacity-0'}`}
                poster={poster}
                onLoadedData={handleVideoLoad}
                onError={handleVideoError}
                src={videoSrc}
              />
            )}
            <Image
              src={poster}
              alt="Welcome to Arty Stone Medical Clinic"
              fill
              className={`object-cover transition-opacity duration-500 ${isLoading || videoError ? 'opacity-100' : 'opacity-0'}`}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
              quality={95}
            />
          </div>
        </div>

        {/* Floating Stats Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="absolute -bottom-6 left-6 bg-white dark:bg-gray-800/90 p-6 rounded-xl shadow-xl backdrop-blur-sm z-20"
        >
          <div className="flex items-center gap-6">
            <div className="flex -space-x-4">
              {[1, 2, 3].map((index) => (
                <div
                  key={index}
                  className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 border-2 border-white dark:border-gray-800 flex items-center justify-center shadow-lg"
                >
                  <span className="text-blue-600 dark:text-blue-400 text-sm">★</span>
                </div>
              ))}
            </div>
            <div>
              <p className="font-semibold text-gray-900 dark:text-white text-lg">
                Trusted by 1000+ Patients
              </p>
              <div className="flex items-center gap-1 mt-1">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className="w-4 h-4 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  5.0 Average Rating
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
} 