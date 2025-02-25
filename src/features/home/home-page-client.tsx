'use client';

import React, { useEffect, useState, lazy, Suspense } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { HeroSection, StatsSection } from '@/features/home';
import { Container } from '@/components/ui/container';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { ChevronUp, Menu, X } from 'lucide-react';
import { SectionContainer } from '@/components/ui/section-container';
import { useThemeContext } from '@/providers/theme-provider';
import { AnimatedElement } from '@/components/ui/animated-element';

// Lazy load non-critical sections
const DoctorMessage = lazy(() => import('@/features/home').then(mod => ({ default: mod.DoctorMessage })));
const FeaturesSection = lazy(() => import('@/features/home').then(mod => ({ default: mod.FeaturesSection })));
const ServicesSection = lazy(() => import('@/features/home').then(mod => ({ default: mod.ServicesSection })));
const ClinicGallery = lazy(() => import('@/features/home').then(mod => ({ default: mod.ClinicGallery })));
const CTASection = lazy(() => import('@/features/home').then(mod => ({ default: mod.CTASection })));

// Loading fallback component
const SectionLoading = () => (
  <div className="w-full py-16 flex items-center justify-center">
    <div className="animate-pulse flex flex-col items-center gap-4">
      <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
      <div className="h-4 w-64 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
      <div className="h-4 w-56 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
    </div>
  </div>
);

// Define section data for navigation
const sections = [
  { id: 'hero', label: 'Top', icon: '🏠' },
  { id: 'doctor', label: 'Doctor', icon: '👨‍⚕️' },
  { id: 'features', label: 'Features', icon: '✨' },
  { id: 'services', label: 'Services', icon: '🏥' },
  { id: 'gallery', label: 'Gallery', icon: '🖼️' },
  { id: 'cta', label: 'Contact', icon: '📞' },
];

export function HomePageClient() {
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [visibleSections, setVisibleSections] = useState<string[]>(['hero']);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  // Get theme context
  const { isReducedMotion } = useThemeContext();

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: isReducedMotion ? 'auto' : 'smooth' });
      setActiveSection(sectionId);
      setMobileNavOpen(false);
    }
  };

  // Add scroll-behavior: smooth to html element
  useEffect(() => {
    if (!isReducedMotion) {
      document.documentElement.style.scrollBehavior = 'smooth';
    }
    
    // Add intersection observer to detect active section and lazy load
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
            setVisibleSections(prev => 
              prev.includes(entry.target.id) ? prev : [...prev, entry.target.id]
            );
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px 200px 0px' }
    );

    // Observe all sections
    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => {
      if (!isReducedMotion) {
        document.documentElement.style.scrollBehavior = '';
      }
      // Cleanup observer
      sections.forEach(({ id }) => {
        const element = document.getElementById(id);
        if (element) observer.unobserve(element);
      });
    };
  }, [isReducedMotion]);

  return (
    <main className="relative">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-50"
        style={{ scaleX }}
      />

      {/* Theme Switcher */}
      <ThemeSwitcher position="bottom-left" />

      {/* Mobile Navigation Toggle */}
      <AnimatedElement
        animation="fade-left"
        delay={0.5}
        className="fixed top-20 right-4 z-50 lg:hidden"
      >
        <button
          onClick={() => setMobileNavOpen(!mobileNavOpen)}
          className="p-3 rounded-full bg-white/90 dark:bg-gray-800/90 shadow-lg hover:shadow-xl transition-shadow"
          aria-label={mobileNavOpen ? "Close navigation menu" : "Open navigation menu"}
        >
          {mobileNavOpen ? (
            <X className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          ) : (
            <Menu className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          )}
        </button>
      </AnimatedElement>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {mobileNavOpen && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 z-40 w-64 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-xl lg:hidden"
          >
            <div className="flex flex-col h-full pt-24 pb-8 px-6">
              <nav className="flex-1">
                <ul className="space-y-4">
                  {sections.map(({ id, label, icon }) => (
                    <li key={id}>
                      <button
                        onClick={() => scrollToSection(id)}
                        className={`flex items-center w-full px-4 py-3 rounded-lg transition-colors ${
                          activeSection === id
                            ? 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary-foreground'
                            : 'hover:bg-gray-100 dark:hover:bg-gray-800/50'
                        }`}
                      >
                        <span className="mr-3 text-xl" role="img" aria-hidden="true">{icon}</span>
                        <span className="font-medium">{label}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Navigation Dots */}
      <nav className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-4">
        {sections.map(({ id, label, icon }) => (
          <button
            key={id}
            onClick={() => scrollToSection(id)}
            className="group relative flex items-center"
            aria-label={`Scroll to ${label} section`}
          >
            {!isReducedMotion && (
              <motion.span 
                className="absolute right-full mr-4 rounded bg-white/90 dark:bg-gray-800/90 px-3 py-2 text-sm font-medium text-gray-900 dark:text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2"
                initial={{ opacity: 0, x: 10 }}
                whileHover={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-lg" role="img" aria-hidden="true">{icon}</span>
                {label}
              </motion.span>
            )}
            {isReducedMotion && (
              <span className="absolute right-full mr-4 rounded bg-white/90 dark:bg-gray-800/90 px-3 py-2 text-sm font-medium text-gray-900 dark:text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
                <span className="text-lg" role="img" aria-hidden="true">{icon}</span>
                {label}
              </span>
            )}
            <motion.div 
              className={`h-3 w-3 rounded-full transition-colors ${
                activeSection === id 
                  ? 'bg-primary dark:bg-primary' 
                  : 'bg-gray-300 dark:bg-gray-600 group-hover:bg-primary/50 dark:group-hover:bg-primary/50'
              }`}
              whileHover={isReducedMotion ? {} : { scale: 1.3 }}
              animate={isReducedMotion ? {} : { scale: activeSection === id ? 1.3 : 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            />
          </button>
        ))}
      </nav>

      {/* Hero Section with Stats - Always render immediately */}
      <SectionContainer 
        id="hero"
        backgroundGradient="primary"
        backgroundPattern="grid"
        fullHeight
        paddingY={12}
      >
        <HeroSection />
        <div className="mt-12 md:mt-16">
          <StatsSection />
        </div>
      </SectionContainer>

      {/* Doctor Profile Section - Lazy loaded */}
      <SectionContainer 
        id="doctor"
        backgroundPattern="dots"
        paddingY={24}
      >
        <Suspense fallback={<SectionLoading />}>
          {visibleSections.includes('doctor') && <DoctorMessage />}
        </Suspense>
      </SectionContainer>

      {/* Features Section - Lazy loaded */}
      <SectionContainer 
        id="features"
        backgroundGradient="secondary"
        backgroundPattern="grid"
        paddingY={24}
      >
        <Suspense fallback={<SectionLoading />}>
          {visibleSections.includes('features') && <FeaturesSection />}
        </Suspense>
      </SectionContainer>

      {/* Services Section - Lazy loaded */}
      <SectionContainer 
        id="services"
        backgroundPattern="dots"
        paddingY={24}
      >
        <Suspense fallback={<SectionLoading />}>
          {visibleSections.includes('services') && <ServicesSection />}
        </Suspense>
      </SectionContainer>

      {/* Gallery Section - Lazy loaded */}
      <SectionContainer 
        id="gallery"
        backgroundGradient="accent"
        backgroundPattern="grid"
        paddingY={24}
      >
        <Suspense fallback={<SectionLoading />}>
          {visibleSections.includes('gallery') && <ClinicGallery />}
        </Suspense>
      </SectionContainer>

      {/* CTA Section - Lazy loaded */}
      <SectionContainer 
        id="cta"
        backgroundGradient="primary"
        paddingY={24}
      >
        <Suspense fallback={<SectionLoading />}>
          {visibleSections.includes('cta') && <CTASection />}
        </Suspense>
      </SectionContainer>

      {/* Scroll to Top Button */}
      <AnimatedElement
        animation="fade-up"
        delay={0.5}
        className="fixed bottom-4 right-4 z-40"
      >
        <motion.button
          onClick={() => scrollToSection('hero')}
          className="p-3 rounded-full bg-white/90 dark:bg-gray-800/90 shadow-lg hover:shadow-xl transition-shadow"
          aria-label="Scroll to top"
          whileHover={isReducedMotion ? {} : { scale: 1.1 }}
          whileTap={isReducedMotion ? {} : { scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: scrollYProgress.get() > 0.1 ? 1 : 0, 
            y: scrollYProgress.get() > 0.1 ? 0 : 20 
          }}
        >
          <ChevronUp className="h-5 w-5" />
        </motion.button>
      </AnimatedElement>
    </main>
  );
} 