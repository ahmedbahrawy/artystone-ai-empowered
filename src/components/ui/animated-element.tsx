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
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 }
  },
  'fade-right': {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  },
  'zoom-in': {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 }
  },
  'zoom-out': {
    hidden: { opacity: 0, scale: 1.05 },
    visible: { opacity: 1, scale: 1 }
  },
  'slide-up': {
    hidden: { y: 20 },
    visible: { y: 0 }
  },
  'slide-down': {
    hidden: { y: -20 },
    visible: { y: 0 }
  },
  'slide-left': {
    hidden: { x: 20 },
    visible: { x: 0 }
  },
  'slide-right': {
    hidden: { x: -20 },
    visible: { x: 0 }
  },
  'none': {
    hidden: {},
    visible: {}
  }
};

interface AnimatedElementProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  children: React.ReactNode;
  animation?: AnimationType;
  delay?: number;
  duration?: number;
  once?: boolean;
  amount?: number;
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
  amount = 0.1,
  className,
  as: Component = motion.div,
  skipAnimation = false,
  ...props
}: AnimatedElementProps) {
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const controls = useAnimation();
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once, amount });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (isInView && !skipAnimation && !isReducedMotion) {
      controls.start('visible');
    }
  }, [isInView, controls, skipAnimation, isReducedMotion]);

  if (skipAnimation || isReducedMotion) {
    return (
      <Component
        ref={ref}
        className={className}
        {...props}
      >
        {children}
      </Component>
    );
  }

  return (
    <Component
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants[animation]}
      transition={{
        duration,
        delay,
        ease: 'easeOut'
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </Component>
  );
}

interface AnimatedGroupProps extends Omit<AnimatedElementProps, 'delay' | 'duration'> {
  staggerChildren?: number;
  delayChildren?: number;
}

export function AnimatedGroup({
  children,
  animation = 'fade-up',
  staggerChildren = 0.1,
  delayChildren = 0,
  once = true,
  amount = 0.1,
  className,
  skipAnimation = false,
  ...props
}: AnimatedGroupProps) {
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const controls = useAnimation();
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once, amount });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (isInView && !skipAnimation && !isReducedMotion) {
      controls.start('visible');
    }
  }, [isInView, controls, skipAnimation, isReducedMotion]);

  if (skipAnimation || isReducedMotion) {
    return (
      <motion.div
        ref={ref}
        className={className}
        {...props}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren,
            delayChildren
          }
        }
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
} 