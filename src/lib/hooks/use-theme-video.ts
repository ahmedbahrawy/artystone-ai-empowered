'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

interface ThemeVideoOptions {
  lightVideo: string;
  darkVideo: string;
  poster: string;
  fallbackVideo?: string;
}

export function useThemeVideo({ 
  lightVideo, 
  darkVideo, 
  poster,
  fallbackVideo = '/home-hero.mp4' 
}: ThemeVideoOptions) {
  const { theme, systemTheme } = useTheme();
  const [videoSrc, setVideoSrc] = useState(lightVideo);
  const [isLoading, setIsLoading] = useState(true);
  const [fallbackUsed, setFallbackUsed] = useState(false);

  useEffect(() => {
    const currentTheme = theme === 'system' ? systemTheme : theme;
    const selectedVideo = currentTheme === 'dark' ? darkVideo : lightVideo;
    
    // Check if we need to use fallback
    if (fallbackUsed) {
      setVideoSrc(fallbackVideo);
    } else {
      setVideoSrc(selectedVideo);
    }
    
    setIsLoading(true);
  }, [theme, systemTheme, lightVideo, darkVideo, fallbackVideo, fallbackUsed]);

  const handleVideoLoad = () => {
    setIsLoading(false);
  };

  const handleVideoError = () => {
    if (!fallbackUsed) {
      console.warn('Primary video failed to load, using fallback');
      setFallbackUsed(true);
      setVideoSrc(fallbackVideo);
    }
  };

  return {
    videoSrc,
    isLoading,
    poster,
    handleVideoLoad,
    handleVideoError,
    fallbackUsed
  };
} 