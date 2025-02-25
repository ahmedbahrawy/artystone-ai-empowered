'use client';

import React, { Suspense, lazy } from 'react';
import { PageLayout } from '@/components/layout/page-layout';
import { SectionContainer } from '@/components/ui/section-container';
import { ContactHero } from './sections/hero/contact-hero';

// Lazy load non-critical sections
const ContactDetails = lazy(() => import('./sections/details/contact-details').then(mod => ({ default: mod.ContactDetails })));
const ContactOfficeHours = lazy(() => import('./sections/hours/contact-office-hours').then(mod => ({ default: mod.ContactOfficeHours })));
const ContactCTA = lazy(() => import('./sections/cta/contact-cta').then(mod => ({ default: mod.ContactCTA })));

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

export function ContactPageClient() {
  return (
    <PageLayout variant="transparent">
      {/* Hero Section */}
      <SectionContainer
        backgroundGradient="primary"
        backgroundPattern="grid"
        fullHeight
        paddingY={12}
      >
        <ContactHero />
      </SectionContainer>

      {/* Contact Details Section */}
      <SectionContainer
        backgroundPattern="dots"
        paddingY={24}
      >
        <Suspense fallback={<SectionLoading />}>
          <ContactDetails />
        </Suspense>
      </SectionContainer>

      {/* Office Hours Section */}
      <SectionContainer
        backgroundGradient="secondary"
        backgroundPattern="grid"
        paddingY={24}
      >
        <Suspense fallback={<SectionLoading />}>
          <ContactOfficeHours />
        </Suspense>
      </SectionContainer>

      {/* CTA Section */}
      <SectionContainer
        backgroundGradient="accent"
        paddingY={24}
      >
        <Suspense fallback={<SectionLoading />}>
          <ContactCTA />
        </Suspense>
      </SectionContainer>
    </PageLayout>
  );
} 