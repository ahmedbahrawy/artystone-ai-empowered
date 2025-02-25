import React, { useEffect, useState } from 'react';
import { motion, useAnimation, useInView, Variants } from 'framer-motion';
import { cn } from '@/lib/utils';

export type AnimationType = 
  | 'fade-up'
  | 'fade-down'
  | 'fade-left'
  | 'fade-right'
  | 'zoom-in'
  | 'zoom-out'
  | 'slide-up'
  | 'slide-down'
  | 'slide-left'
  | 'slide-right'
  | 'none';

interface AnimatedElementProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  animation?: AnimationType;
  delay?: number;
  duration?: number;
  once?: boolean;
  threshold?: number;
  className?: string;
  as?: React.ElementType;
  skipAnimation?: boolean;
}

export function AnimatedElement({
  children,
  animation = 'fade-up',
  delay = 0,
  duration = 0.5,
  once = true,
  threshold = 0.1,
  className,
  as: Component = 'div',
  skipAnimation = false,
  ...props
}: AnimatedElementProps) {
  const controls = useAnimation();
  const [ref, setRef] = useState<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once, amount: threshold });
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  
  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    
    const handleChange = () => setIsReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (inView && !isReducedMotion && !skipAnimation) {
      controls.start('visible');
    }
  }, [controls, inView, isReducedMotion, skipAnimation]);

  // Animation variants
  const variants: Record<AnimationType, Variants> = {
    'fade-up': {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 }
    },
    'fade-down': {
      hidden: { opacity: 0, y: -20 },
      visible: { opacity: 1, y: 0 }
    },
    'fade-left': {
      hidden: { opacity: 0, x: -20 },
      visible: { opacity: 1, x: 0 }
    },
    'fade-right': {
      hidden: { opacity: 0, x: 20 },
      visible: { opacity: 1, x: 0 }
    },
    'zoom-in': {
      hidden: { opacity: 0, scale: 0.9 },
      visible: { opacity: 1, scale: 1 }
    },
    'zoom-out': {
      hidden: { opacity: 0, scale: 1.1 },
      visible: { opacity: 1, scale: 1 }
    },
    'slide-up': {
      hidden: { y: 50 },
      visible: { y: 0 }
    },
    'slide-down': {
      hidden: { y: -50 },
      visible: { y: 0 }
    },
    'slide-left': {
      hidden: { x: -50 },
      visible: { x: 0 }
    },
    'slide-right': {
      hidden: { x: 50 },
      visible: { x: 0 }
    },
    'none': {
      hidden: {},
      visible: {}
    }
  };

  // If reduced motion is preferred or animation is skipped, render without animation
  if (isReducedMotion || skipAnimation) {
    return (
      <Component className={className} {...props}>
        {children}
      </Component>
    );
  }

  return (
    <motion.div
      ref={setRef}
      initial="hidden"
      animate={controls}
      variants={variants[animation]}
      transition={{ 
        duration, 
        delay, 
        ease: "easeOut" 
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedGroup({
  children,
  animation = 'fade-up',
  staggerChildren = 0.1,
  delayChildren = 0,
  once = true,
  threshold = 0.1,
  className,
  skipAnimation = false,
  ...props
}: Omit<AnimatedElementProps, 'delay' | 'duration'> & {
  staggerChildren?: number;
  delayChildren?: number;
}) {
  const controls = useAnimation();
  const [ref, setRef] = useState<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once, amount: threshold });
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  
  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    
    const handleChange = () => setIsReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (inView && !isReducedMotion && !skipAnimation) {
      controls.start('visible');
    }
  }, [controls, inView, isReducedMotion, skipAnimation]);

  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren,
        delayChildren
      }
    }
  };

  // Child variants based on animation type
  const childVariants: Record<AnimationType, Variants> = {
    'fade-up': {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 }
    },
    'fade-down': {
      hidden: { opacity: 0, y: -20 },
      visible: { opacity: 1, y: 0 }
    },
    'fade-left': {
      hidden: { opacity: 0, x: -20 },
      visible: { opacity: 1, x: 0 }
    },
    'fade-right': {
      hidden: { opacity: 0, x: 20 },
      visible: { opacity: 1, x: 0 }
    },
    'zoom-in': {
      hidden: { opacity: 0, scale: 0.9 },
      visible: { opacity: 1, scale: 1 }
    },
    'zoom-out': {
      hidden: { opacity: 0, scale: 1.1 },
      visible: { opacity: 1, scale: 1 }
    },
    'slide-up': {
      hidden: { y: 50 },
      visible: { y: 0 }
    },
    'slide-down': {
      hidden: { y: -50 },
      visible: { y: 0 }
    },
    'slide-left': {
      hidden: { x: -50 },
      visible: { x: 0 }
    },
    'slide-right': {
      hidden: { x: 50 },
      visible: { x: 0 }
    },
    'none': {
      hidden: {},
      visible: {}
    }
  };

  // If reduced motion is preferred or animation is skipped, render without animation
  if (isReducedMotion || skipAnimation) {
    return (
      <div className={className} {...props}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={setRef}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
      className={cn(className)}
      {...props}
    >
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;
        
        return React.cloneElement(child as React.ReactElement<any>, {
          variants: childVariants[animation],
          transition: { 
            duration: 0.5, 
            ease: "easeOut" 
          }
        });
      })}
    </motion.div>
  );
} 