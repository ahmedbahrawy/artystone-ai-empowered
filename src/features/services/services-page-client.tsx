'use client';

import React, { Suspense, lazy } from 'react';
import { PageLayout } from '@/components/layout/page-layout';
import { SectionContainer } from '@/components/ui/section-container';
import { ServicesHero } from './sections/hero/services-hero';

// Lazy load non-critical sections
const ServicesList = lazy(() => import('./sections/list/services-list').then(mod => ({ default: mod.ServicesList })));
const ServicesCTA = lazy(() => import('./sections/cta/services-cta').then(mod => ({ default: mod.ServicesCTA })));

// Loading fallback component
const SectionLoading = () => (
  <div className="w-full py-16 flex items-center justify-center">
    <div className="animate-pulse flex flex-col items-center gap-4">
      <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded-md" />
      <div className="h-4 w-64 bg-gray-200 dark:bg-gray-700 rounded-md" />
      <div className="h-4 w-56 bg-gray-200 dark:bg-gray-700 rounded-md" />
    </div>
  </div>
);

export function ServicesPageClient() {
  return (
    <PageLayout>
      {/* Hero Section */}
      <SectionContainer
        backgroundGradient="primary"
        backgroundPattern="grid"
        fullHeight
        paddingY={12}
      >
        <ServicesHero />
      </SectionContainer>

      {/* Services List Section */}
      <SectionContainer
        backgroundPattern="dots"
        paddingY={24}
      >
        <Suspense fallback={<SectionLoading />}>
          <ServicesList />
        </Suspense>
      </SectionContainer>

      {/* CTA Section */}
      <SectionContainer
        backgroundGradient="accent"
        paddingY={24}
      >
        <Suspense fallback={<SectionLoading />}>
          <ServicesCTA />
        </Suspense>
      </SectionContainer>
    </PageLayout>
  );
} 