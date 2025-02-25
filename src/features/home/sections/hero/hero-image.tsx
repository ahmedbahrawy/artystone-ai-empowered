'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useThemeVideo } from '@/lib/hooks/use-theme-video';

export function HeroImage(): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoError, setVideoError] = useState(false);
  const [aspectRatio, setAspectRatio] = useState('16/9');
  const [containerHeight, setContainerHeight] = useState(0);
  const [videoDimensions, setVideoDimensions] = useState<{width: number, height: number} | null>(null);
  
  const {
    videoSrc,
    isLoading,
    poster,
    handleVideoLoad,
    handleVideoError,
    fallbackUsed,
    currentTheme
  } = useThemeVideo({
    lightVideo: '/videos/clinic-light.mp4',
    semiLightVideo: '/videos/clinic-semi-light.mp4',
    darkVideo: '/videos/clinic-dark.mp4',
    poster: '/images/clinic-welcome.webp',
    fallbackVideo: '/home-hero.mp4'
  });

  const onVideoError = () => {
    handleVideoError();
    if (fallbackUsed) {
      setVideoError(true);
    }
  };

  // Detect video aspect ratio on load
  const handleVideoMetadataLoaded = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget;
    if (video.videoWidth && video.videoHeight) {
      const ratio = `${video.videoWidth}/${video.videoHeight}`;
      setAspectRatio(ratio);
      
      // Store video dimensions for calculations
      setVideoDimensions({
        width: video.videoWidth,
        height: video.videoHeight
      });
      
      // Calculate container height based on video dimensions
      updateContainerSize(video.videoWidth, video.videoHeight);
    }
    handleVideoLoad();
  };

  // Adjust container size based on window size and video dimensions
  const updateContainerSize = (videoWidth?: number, videoHeight?: number) => {
    if (containerRef.current) {
      const width = containerRef.current.offsetWidth;
      let height;
      
      // If we have video dimensions, use them for precise ratio
      if (videoWidth && videoHeight) {
        const videoRatio = videoHeight / videoWidth;
        height = width * videoRatio;
      } else if (videoDimensions) {
        // Use stored dimensions if available
        const videoRatio = videoDimensions.height / videoDimensions.width;
        height = width * videoRatio;
      } else {
        // Default to 9/16 ratio if video dimensions aren't available
        height = width * (9/16);
      }
      
      setContainerHeight(height);
      containerRef.current.style.height = `${height}px`;
    }
  };

  // Update container size on window resize and component mount
  useEffect(() => {
    const handleResize = () => {
      updateContainerSize();
    };
    
    updateContainerSize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [videoDimensions]);

  // Get overlay gradient based on theme
  const getOverlayGradient = () => {
    switch(currentTheme) {
      case 'dark':
        return {
          primary: "from-blue-600/30 via-transparent to-purple-600/30",
          secondary: "from-gray-900/60 to-transparent"
        };
      case 'semi-light':
        return {
          primary: "from-blue-500/25 via-transparent to-purple-500/25",
          secondary: "from-gray-800/50 to-transparent"
        };
      default: // light
        return {
          primary: "from-blue-400/20 via-transparent to-purple-400/20",
          secondary: "from-gray-700/40 to-transparent"
        };
    }
  };

  const overlayGradient = getOverlayGradient();

  return (
    <div className="relative w-full h-full min-h-[500px] lg:min-h-[600px] flex items-center justify-center">
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.2,
          ease: [0, 0.71, 0.2, 1.01]
        }}
        className="relative w-full rounded-2xl overflow-hidden shadow-2xl"
        style={{ 
          aspectRatio,
          height: containerHeight > 0 ? `${containerHeight}px` : undefined
        }}
      >
        {/* Overlay gradients - enhanced for better visibility and theme-aware */}
        <div className={`absolute inset-0 bg-gradient-to-br ${overlayGradient.primary} mix-blend-overlay z-10`} />
        <div className={`absolute inset-0 bg-gradient-to-t ${overlayGradient.secondary} z-10`} />
        
        {/* Video container with proper aspect ratio */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          {!videoError && (
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              className={`w-full h-full object-cover transition-opacity duration-500 ${!isLoading ? 'opacity-100' : 'opacity-0'}`}
              poster={poster}
              onLoadedMetadata={handleVideoMetadataLoaded}
              onError={onVideoError}
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

        {/* Theme indicator - subtle visual cue for current theme */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2 bg-white/20 dark:bg-gray-900/20 backdrop-blur-sm rounded-full px-3 py-1.5">
          <span className="text-sm text-white font-medium drop-shadow-md">
            {currentTheme === 'dark' ? '🌙' : currentTheme === 'semi-light' ? '🌤️' : '☀️'}
          </span>
        </div>

        {/* Floating Stats Card - Improved positioning */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="absolute -bottom-6 left-6 md:left-8 bg-white/95 dark:bg-gray-800/95 p-4 md:p-6 rounded-xl shadow-xl backdrop-blur-sm z-20 max-w-[90%] md:max-w-[400px]"
        >
          <div className="flex items-center gap-3 md:gap-6">
            <div className="flex -space-x-3 md:-space-x-4">
              {[1, 2, 3].map((index) => (
                <div
                  key={index}
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 border-2 border-white dark:border-gray-800 flex items-center justify-center shadow-lg"
                >
                  <span className="text-blue-600 dark:text-blue-400 text-sm">★</span>
                </div>
              ))}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 dark:text-white text-base md:text-lg truncate">
                Trusted by 1000+ Patients
              </p>
              <div className="flex items-center gap-1 mt-1">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className="w-3 h-3 md:w-4 md:h-4 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-xs md:text-sm text-gray-500 dark:text-gray-400 truncate">
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