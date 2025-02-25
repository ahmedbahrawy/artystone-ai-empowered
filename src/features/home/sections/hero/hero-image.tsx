'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useThemeVideo } from '@/lib/hooks/use-theme-video';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, Award } from 'lucide-react';

export function HeroImage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.3 });
  const controls = useAnimation();
  const [aspectRatio, setAspectRatio] = useState('16/9');
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const { resolvedTheme } = useTheme();
  
  const { videoSrc, fallbackImage } = useThemeVideo({
    lightVideo: '/videos/hero-light.mp4',
    semiLightVideo: '/videos/hero-semi-light.mp4',
    darkVideo: '/videos/hero-dark.mp4',
    fallbackImage: '/images/hero-fallback.jpg',
  });

  const handleVideoMetadataLoaded = () => {
    if (videoRef.current) {
      const { videoWidth, videoHeight } = videoRef.current;
      setAspectRatio(`${videoWidth}/${videoHeight}`);
      setIsVideoLoaded(true);
    }
  };

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        const height = width * (9 / 16); // Default 16:9 ratio
        containerRef.current.style.height = `${height}px`;
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const themeEmoji = resolvedTheme === 'dark' ? '🌙' : resolvedTheme === 'semi-light' ? '🌤️' : '☀️';

  return (
    <motion.div
      ref={containerRef}
      className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl"
      style={{ aspectRatio }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: isVideoLoaded ? 1 : 0.7, scale: isVideoLoaded ? 1 : 0.98 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Theme indicator */}
      <motion.div
        className="absolute top-4 right-4 z-20 bg-background/80 backdrop-blur-sm rounded-full p-2 shadow-md"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        whileHover={{ scale: 1.1 }}
      >
        <span className="text-xl" aria-label={`Current theme: ${resolvedTheme}`}>{themeEmoji}</span>
      </motion.div>
      
      {/* Video element */}
      {videoSrc ? (
        <motion.video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          onLoadedMetadata={handleVideoMetadataLoaded}
          initial={{ filter: 'blur(10px)' }}
          animate={{ filter: isVideoLoaded ? 'blur(0px)' : 'blur(10px)' }}
          transition={{ duration: 0.8 }}
        >
          <source src={videoSrc} type="video/mp4" />
          <img src={fallbackImage} alt="Hero" className="w-full h-full object-cover" />
        </motion.video>
      ) : (
        <img src={fallbackImage} alt="Hero" className="w-full h-full object-cover" />
      )}

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/40 to-transparent dark:from-background/90 dark:via-background/60 dark:to-transparent" />
      
      {/* Floating stats card */}
      <motion.div
        className="absolute bottom-6 left-6 z-10 max-w-[280px] sm:max-w-[320px]"
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 },
        }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <Card className="p-4 backdrop-blur-md bg-background/70 dark:bg-background/50 border-primary/20 shadow-lg">
          <Badge className="mb-2" variant="outline">Clinic Stats</Badge>
          <h3 className="text-lg font-semibold mb-3">Why patients choose us</h3>
          
          <div className="space-y-3">
            <motion.div 
              className="flex items-center gap-3"
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
            
            <motion.div 
              className="flex items-center gap-3"
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
            
            <motion.div 
              className="flex items-center gap-3"
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
          </div>
        </Card>
      </motion.div>
      
      {/* Decorative elements */}
      <motion.div 
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <div className="absolute top-10 right-10 w-20 h-20 rounded-full bg-blue-500/10 blur-xl" />
        <div className="absolute bottom-20 left-20 w-32 h-32 rounded-full bg-purple-500/10 blur-xl" />
      </motion.div>
    </motion.div>
  );
} 