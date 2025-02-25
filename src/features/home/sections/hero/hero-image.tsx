'use client';

import React, { useRef, useState, useEffect, memo } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { useThemeContext } from '@/providers/theme-provider';
import { useThemeVideo } from '@/lib/hooks/use-theme-video';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, Award } from 'lucide-react';
import { AnimatedElement } from '@/components/ui/animated-element';
import Image from 'next/image';

// Lazy load the stats card component
const StatsCard = memo(function StatsCard() {
  const { isReducedMotion } = useThemeContext();
  
  return (
    <Card className="p-4 backdrop-blur-md bg-background/70 dark:bg-background/50 border-primary/20 shadow-lg">
      <Badge className="mb-2" variant="outline">Clinic Stats</Badge>
      <h3 className="text-lg font-semibold mb-3">Why patients choose us</h3>
      
      <div className="space-y-3">
        <AnimatedElement
          animation="fade-right"
          delay={0.1}
          className="flex items-center gap-3"
          skipAnimation={isReducedMotion}
        >
          <motion.div 
            className="flex items-center gap-3 w-full"
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="p-2 rounded-full bg-primary/10">
              <Clock className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium">Extended Hours</p>
              <p className="text-xs text-muted-foreground">Open 7 days a week</p>
            </div>
          </motion.div>
        </AnimatedElement>
        
        <AnimatedElement
          animation="fade-right"
          delay={0.2}
          className="flex items-center gap-3"
          skipAnimation={isReducedMotion}
        >
          <motion.div 
            className="flex items-center gap-3 w-full"
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="p-2 rounded-full bg-primary/10">
              <Users className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium">10,000+ Patients</p>
              <p className="text-xs text-muted-foreground">Trusted by the community</p>
            </div>
          </motion.div>
        </AnimatedElement>
        
        <AnimatedElement
          animation="fade-right"
          delay={0.3}
          className="flex items-center gap-3"
          skipAnimation={isReducedMotion}
        >
          <motion.div 
            className="flex items-center gap-3 w-full"
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="p-2 rounded-full bg-primary/10">
              <Award className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium">Award Winning</p>
              <p className="text-xs text-muted-foreground">Excellence in healthcare</p>
            </div>
          </motion.div>
        </AnimatedElement>
      </div>
    </Card>
  );
});

export function HeroImage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.1 });
  const controls = useAnimation();
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isVideoError, setIsVideoError] = useState(false);
  const [showStatsCard, setShowStatsCard] = useState(false);
  const { resolvedTheme, isReducedMotion } = useThemeContext();
  
  const { 
    videoSrc, 
    fallbackImage, 
    handleVideoLoad, 
    handleVideoError 
  } = useThemeVideo({
    lightVideo: '/home-hero.mp4',
    semiLightVideo: '/home-hero.mp4',
    darkVideo: '/home-hero.mp4',
    fallbackImage: '/images/clinic-welcome.webp',
  });

  const handleVideoMetadataLoaded = () => {
    if (videoRef.current) {
      setIsVideoLoaded(true);
      handleVideoLoad();
      // Enhanced video playback with better error handling
      videoRef.current.play().catch(error => {
        console.warn('Video autoplay failed:', error);
        setIsVideoError(true);
        handleVideoError();
      });
    }
  };

  // Reset video error state when video source changes
  useEffect(() => {
    setIsVideoError(false);
  }, [videoSrc]);

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
      const timer = setTimeout(() => setShowStatsCard(true), 800);
      return () => clearTimeout(timer);
    }
  }, [controls, isInView]);

  // Enhanced video loading state
  const showVideo = videoSrc && !isVideoError && !isReducedMotion;
  
  const themeEmoji = resolvedTheme === 'dark' ? '🌙' : resolvedTheme === 'semi-light' ? '🌤️' : '☀️';

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl transform-gpu"
    >
      {/* Theme indicator with enhanced styling */}
      <AnimatedElement
        animation="fade-down"
        delay={0.5}
        duration={0.4}
        className="absolute top-4 right-4 z-20 bg-background/90 backdrop-blur-md rounded-full p-2.5 shadow-lg ring-1 ring-neutral-200/10 dark:ring-neutral-800/10"
        skipAnimation={isReducedMotion}
      >
        <motion.span 
          className="text-xl" 
          aria-label={`Current theme: ${resolvedTheme}`}
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          {themeEmoji}
        </motion.span>
      </AnimatedElement>
      
      {/* Enhanced video/image container with better loading states */}
      <div className="absolute inset-0 w-full h-full">
        {showVideo ? (
          <motion.video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            onLoadedMetadata={handleVideoMetadataLoaded}
            onError={() => {
              setIsVideoError(true);
              handleVideoError();
            }}
            initial={{ filter: 'blur(10px)', scale: 1.1, opacity: 0 }}
            animate={{ 
              filter: isVideoLoaded ? 'blur(0px)' : 'blur(10px)',
              scale: isVideoLoaded ? 1 : 1.1,
              opacity: isVideoLoaded ? 1 : 0
            }}
            transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
            preload="auto"
            poster={fallbackImage}
          >
            <source src={videoSrc} type="video/mp4" />
            <Image 
              src={fallbackImage} 
              alt="Arty Stone Clinic Welcome"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              quality={90}
            />
          </motion.video>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Image 
              src={fallbackImage} 
              alt="Arty Stone Clinic Welcome"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              quality={90}
              onLoadingComplete={() => setIsVideoLoaded(true)}
            />
          </motion.div>
        )}
      </div>

      {/* Enhanced gradient overlay with better theme adaptation */}
      <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/50 to-transparent dark:from-background/98 dark:via-background/80 dark:to-transparent/40 transition-colors duration-300" />
      
      {/* Enhanced floating stats card */}
      {showStatsCard && isInView && (
        <AnimatedElement
          animation="fade-up"
          delay={0.3}
          duration={0.6}
          className="absolute bottom-8 left-8 z-10 max-w-[300px] sm:max-w-[340px]"
        >
          <motion.div
            whileHover={{ scale: 1.02, y: -4 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <StatsCard />
          </motion.div>
        </AnimatedElement>
      )}
      
      {/* Enhanced decorative elements with better theme adaptation */}
      {!isReducedMotion && (
        <motion.div 
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 0.8 : 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="absolute top-[10%] right-[10%] w-32 h-32 rounded-full bg-primary/5 dark:bg-primary/10 blur-3xl animate-pulse" />
          <div className="absolute bottom-[20%] left-[20%] w-48 h-48 rounded-full bg-secondary/5 dark:bg-secondary/10 blur-3xl animate-pulse" />
        </motion.div>
      )}
    </div>
  );
} 