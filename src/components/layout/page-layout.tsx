import React from 'react';
import { Header } from './header';
import { Footer } from './footer';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useThemeContext } from '@/providers/theme-provider';

interface PageLayoutProps {
  children: React.ReactNode;
  variant?: 'default' | 'transparent';
  showProgressBar?: boolean;
  showThemeSwitcher?: boolean;
}

export function PageLayout({
  children,
  variant = 'default',
  showProgressBar = true,
  showThemeSwitcher = true,
}: PageLayoutProps) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <>
      {showProgressBar && (
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-50"
          style={{ scaleX }}
        />
      )}

      <Header variant={variant} />

      {showThemeSwitcher && <ThemeSwitcher position="bottom-left" />}

      <main className="min-h-screen">
        {children}
      </main>

      <Footer />
    </>
  );
} 