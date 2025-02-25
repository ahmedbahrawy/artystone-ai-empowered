'use client';

import { useEffect, useState, useCallback } from 'react';
import { useTheme } from 'next-themes';

interface ThemeVideoOptions {
  lightVideo: string;
  semiLightVideo?: string;
  darkVideo: string;
  fallbackImage: string;
  fallbackVideo?: string;
  poster?: string;
}

export function useThemeVideo({ 
  lightVideo, 
  semiLightVideo,
  darkVideo, 
  fallbackImage,
  fallbackVideo,
  poster
}: ThemeVideoOptions) {
  const { theme, systemTheme, resolvedTheme } = useTheme();
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [fallbackUsed, setFallbackUsed] = useState(false);
  const currentTheme = theme === 'system' ? systemTheme : theme;

  // Memoize video selection to prevent unnecessary re-renders
  const selectVideoForTheme = useCallback(() => {
    if (currentTheme === 'dark') {
      return darkVideo;
    } else if (currentTheme === 'semi-light' && semiLightVideo) {
      return semiLightVideo;
    } else {
      return lightVideo;
    }
  }, [currentTheme, lightVideo, semiLightVideo, darkVideo]);

  // Preload videos for better performance
  useEffect(() => {
    const preloadVideos = () => {
      const videos = [lightVideo, darkVideo];
      if (semiLightVideo) videos.push(semiLightVideo);
      if (fallbackVideo) videos.push(fallbackVideo);
      
      videos.forEach(videoUrl => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = videoUrl;
        link.as = 'video';
        link.type = 'video/mp4';
        document.head.appendChild(link);
      });
    };
    
    // Preload videos - removed connection check that was causing issues
    preloadVideos();
  }, [lightVideo, semiLightVideo, darkVideo, fallbackVideo]);

  useEffect(() => {
    let selectedVideo = selectVideoForTheme();
    
    // Check if we need to use fallback
    if (fallbackUsed && fallbackVideo) {
      selectedVideo = fallbackVideo;
    }
    
    // Only update if the source has changed to prevent unnecessary re-renders
    if (selectedVideo !== videoSrc) {
      setVideoSrc(selectedVideo);
      setIsLoading(true);
    }
  }, [currentTheme, selectVideoForTheme, fallbackVideo, fallbackUsed, videoSrc]);

  const handleVideoLoad = useCallback(() => {
    setIsLoading(false);
  }, []);

  const handleVideoError = useCallback(() => {
    if (!fallbackUsed && fallbackVideo) {
      console.warn('Primary video failed to load, using fallback');
      setFallbackUsed(true);
      setVideoSrc(fallbackVideo);
    } else if (!fallbackVideo || (fallbackUsed && fallbackVideo)) {
      // If no fallback video or fallback also failed, set videoSrc to null
      // to trigger fallback image display
      console.warn('Video failed to load, using fallback image');
      setVideoSrc(null);
    }
  }, [fallbackUsed, fallbackVideo]);

  return {
    videoSrc,
    isLoading,
    poster: poster || fallbackImage,
    fallbackImage,
    handleVideoLoad,
    handleVideoError,
    fallbackUsed,
    currentTheme: resolvedTheme
  };
} 