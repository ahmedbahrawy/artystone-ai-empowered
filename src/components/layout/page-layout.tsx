import React from 'react';
import { motion } from 'framer-motion';
import { Container } from '@/components/ui/container';
import { SectionContainer } from '@/components/ui/section-container';
import { useThemeContext } from '@/providers/theme-provider';

interface PageLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  backgroundGradient?: 'primary' | 'secondary' | 'none';
  backgroundPattern?: 'dots' | 'grid' | 'none';
  fullHeight?: boolean;
  className?: string;
  containerClassName?: string;
  headerClassName?: string;
}

export function PageLayout({
  children,
  title,
  subtitle,
  backgroundGradient = 'none',
  backgroundPattern = 'none',
  fullHeight = false,
  className = '',
  containerClassName = '',
  headerClassName = '',
}: PageLayoutProps) {
  const { isReducedMotion } = useThemeContext();

  return (
    <SectionContainer
      backgroundGradient={backgroundGradient}
      backgroundPattern={backgroundPattern}
      fullHeight={fullHeight}
      paddingY={12}
      className={`relative overflow-hidden ${className}`}
    >
      <Container className={`relative z-10 ${containerClassName}`}>
        {(title || subtitle) && (
          <motion.header
            className={`mb-12 text-center ${headerClassName}`}
            initial={isReducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={isReducedMotion ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {title && (
              <motion.h1
                className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-neutral-900 dark:text-neutral-50"
                initial={isReducedMotion ? {} : { opacity: 0, y: 20 }}
                animate={isReducedMotion ? {} : { opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {title}
              </motion.h1>
            )}
            {subtitle && (
              <motion.p
                className="mt-4 text-lg md:text-xl text-neutral-600 dark:text-neutral-400"
                initial={isReducedMotion ? {} : { opacity: 0, y: 20 }}
                animate={isReducedMotion ? {} : { opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {subtitle}
              </motion.p>
            )}
          </motion.header>
        )}

        <motion.div
          initial={isReducedMotion ? {} : { opacity: 0, y: 20 }}
          animate={isReducedMotion ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: title || subtitle ? 0.6 : 0 }}
        >
          {children}
        </motion.div>
      </Container>

      {/* Decorative elements */}
      {!isReducedMotion && (
        <motion.div 
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="absolute top-[10%] right-[10%] w-32 h-32 rounded-full bg-primary/5 dark:bg-primary/10 blur-3xl animate-pulse" />
          <div className="absolute bottom-[20%] left-[20%] w-48 h-48 rounded-full bg-secondary/5 dark:bg-secondary/10 blur-3xl animate-pulse" />
        </motion.div>
      )}
    </SectionContainer>
  );
} 