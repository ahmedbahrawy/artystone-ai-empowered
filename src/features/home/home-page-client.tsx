'use client';

import React, { useEffect, useState, lazy, Suspense } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { HeroSection, StatsSection } from '@/features/home';
import { Container } from '@/components/ui/container';
import { ThemeSwitcher } from '@/components/theme-switcher';
import { ChevronUp, Menu, X } from 'lucide-react';

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
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [visibleSections, setVisibleSections] = useState<string[]>(['hero']);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);
    
    const handleChange = () => setIsReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

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
        className="fixed top-0 left-0 right-0 h-1 bg-blue-500 dark:bg-blue-400 origin-left z-50"
        style={{ scaleX }}
      />

      {/* Theme Switcher */}
      <ThemeSwitcher position="bottom-left" />

      {/* Mobile Navigation Toggle */}
      <button
        onClick={() => setMobileNavOpen(!mobileNavOpen)}
        className="fixed top-20 right-4 z-50 p-3 rounded-full bg-white/90 dark:bg-gray-800/90 shadow-lg hover:shadow-xl transition-shadow lg:hidden"
        aria-label={mobileNavOpen ? "Close navigation menu" : "Open navigation menu"}
      >
        {mobileNavOpen ? (
          <X className="w-6 h-6 text-gray-600 dark:text-gray-300" />
        ) : (
          <Menu className="w-6 h-6 text-gray-600 dark:text-gray-300" />
        )}
      </button>

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
                            ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
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
                  ? 'bg-blue-500 dark:bg-blue-400' 
                  : 'bg-gray-300 dark:bg-gray-600 group-hover:bg-blue-300 dark:group-hover:bg-blue-600'
              }`}
              whileHover={isReducedMotion ? {} : { scale: 1.3 }}
              animate={isReducedMotion ? {} : { scale: activeSection === id ? 1.3 : 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            />
          </button>
        ))}
      </nav>

      {/* Hero Section with Stats - Always render immediately */}
      <section 
        id="hero"
        className="relative bg-gradient-to-b from-blue-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800/50 pt-8 lg:pt-12"
      >
        <Container className="py-12 md:py-20">
          <HeroSection />
          <div className="mt-12 md:mt-16">
            <StatsSection />
          </div>
        </Container>
        <div className="absolute inset-0 bg-grid-gray-900/[0.02] dark:bg-grid-white/[0.02]" />
      </section>

      {/* Doctor Profile Section - Lazy loaded */}
      <section 
        id="doctor"
        className="relative bg-white dark:bg-gray-900 py-16 md:py-24"
      >
        <Container>
          <Suspense fallback={<SectionLoading />}>
            {visibleSections.includes('doctor') && <DoctorMessage />}
          </Suspense>
        </Container>
        <div className="absolute inset-0 bg-dot-gray-900/[0.02] dark:bg-dot-white/[0.02]" />
      </section>

      {/* Features Section - Lazy loaded */}
      <section 
        id="features"
        className="relative bg-gray-50 dark:bg-gray-800/50 py-16 md:py-24"
      >
        <Container>
          <Suspense fallback={<SectionLoading />}>
            {visibleSections.includes('features') && <FeaturesSection />}
          </Suspense>
        </Container>
        <div className="absolute inset-0 bg-grid-gray-900/[0.02] dark:bg-grid-white/[0.02]" />
      </section>

      {/* Services Section - Lazy loaded */}
      <section 
        id="services"
        className="relative bg-white dark:bg-gray-900 py-16 md:py-24"
      >
        <Container>
          <Suspense fallback={<SectionLoading />}>
            {visibleSections.includes('services') && <ServicesSection />}
          </Suspense>
        </Container>
        <div className="absolute inset-0 bg-dot-gray-900/[0.02] dark:bg-dot-white/[0.02]" />
      </section>

      {/* Gallery Section - Lazy loaded */}
      <section 
        id="gallery"
        className="relative bg-gray-50 dark:bg-gray-800/50 py-16 md:py-24"
      >
        <Container>
          <Suspense fallback={<SectionLoading />}>
            {visibleSections.includes('gallery') && <ClinicGallery />}
          </Suspense>
        </Container>
        <div className="absolute inset-0 bg-grid-gray-900/[0.02] dark:bg-grid-white/[0.02]" />
      </section>

      {/* CTA Section - Lazy loaded */}
      <section 
        id="cta"
        className="relative"
      >
        <Suspense fallback={<SectionLoading />}>
          {visibleSections.includes('cta') && <CTASection />}
        </Suspense>
        <div className="absolute inset-0 bg-grid-white/[0.02]" />
      </section>

      {/* Decorative Elements - Only render if not using reduced motion */}
      {!isReducedMotion && (
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 dark:from-blue-400/5 dark:to-purple-400/5" />
        </div>
      )}

      {/* Scroll to Top Button */}
      <motion.button
        onClick={() => scrollToSection('hero')}
        className="fixed bottom-4 right-4 z-40 p-3 rounded-full bg-white/90 dark:bg-gray-800/90 shadow-lg hover:shadow-xl transition-shadow"
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
    </main>
  );
} 