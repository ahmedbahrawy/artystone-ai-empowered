'use client';

import React, { useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import {
  HeroSection,
  StatsSection,
  DoctorMessage,
  FeaturesSection,
  ServicesSection,
  ClinicGallery,
  CTASection,
} from '@/features/home';
import { Container } from '@/components/ui/container';

export function HomePageClient() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Add scroll-behavior: smooth to html element
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  return (
    <main className="relative">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-blue-500 dark:bg-blue-400 origin-left z-50"
        style={{ scaleX }}
      />

      {/* Quick Navigation Dots */}
      <nav className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-4">
        {[
          { id: 'hero', label: 'Top' },
          { id: 'doctor', label: 'Doctor' },
          { id: 'features', label: 'Features' },
          { id: 'services', label: 'Services' },
          { id: 'gallery', label: 'Gallery' },
        ].map(({ id, label }) => (
          <button
            key={id}
            onClick={() => scrollToSection(id)}
            className="group relative flex items-center"
            aria-label={`Scroll to ${label} section`}
          >
            <span className="absolute right-full mr-4 rounded bg-white/90 dark:bg-gray-800/90 px-2 py-1 text-sm font-medium text-gray-900 dark:text-white opacity-0 group-hover:opacity-100 transition-opacity">
              {label}
            </span>
            <div className="h-2 w-2 rounded-full bg-gray-300 dark:bg-gray-600 group-hover:bg-blue-500 dark:group-hover:bg-blue-400 transition-colors" />
          </button>
        ))}
      </nav>

      {/* Hero Section with Stats */}
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

      {/* Doctor Profile Section */}
      <section 
        id="doctor"
        className="relative bg-white dark:bg-gray-900 py-16 md:py-24"
      >
        <Container>
          <DoctorMessage />
        </Container>
        <div className="absolute inset-0 bg-dot-gray-900/[0.02] dark:bg-dot-white/[0.02]" />
      </section>

      {/* Features Section */}
      <section 
        id="features"
        className="relative bg-gray-50 dark:bg-gray-800/50 py-16 md:py-24"
      >
        <Container>
          <FeaturesSection />
        </Container>
        <div className="absolute inset-0 bg-grid-gray-900/[0.02] dark:bg-grid-white/[0.02]" />
      </section>

      {/* Services Section */}
      <section 
        id="services"
        className="relative bg-white dark:bg-gray-900 py-16 md:py-24"
      >
        <Container>
          <ServicesSection />
        </Container>
        <div className="absolute inset-0 bg-dot-gray-900/[0.02] dark:bg-dot-white/[0.02]" />
      </section>

      {/* Gallery Section */}
      <section 
        id="gallery"
        className="relative bg-gray-50 dark:bg-gray-800/50 py-16 md:py-24"
      >
        <Container>
          <ClinicGallery />
        </Container>
        <div className="absolute inset-0 bg-grid-gray-900/[0.02] dark:bg-grid-white/[0.02]" />
      </section>

      {/* CTA Section */}
      <section 
        id="cta"
        className="relative"
      >
        <CTASection />
        <div className="absolute inset-0 bg-grid-white/[0.02]" />
      </section>

      {/* Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 dark:from-blue-400/5 dark:to-purple-400/5" />
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={() => scrollToSection('hero')}
        className="fixed bottom-4 right-4 z-40 p-3 rounded-full bg-white/90 dark:bg-gray-800/90 shadow-lg hover:shadow-xl transition-shadow"
        aria-label="Scroll to top"
      >
        <svg
          className="w-6 h-6 text-gray-600 dark:text-gray-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </button>
    </main>
  );
} 