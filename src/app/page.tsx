import type { Metadata } from 'next';
import { HomePageClient } from '@/features/home/home-page-client';

export const metadata: Metadata = {
  title: 'Welcome to Dr. Farzaneh\'s Arty Stone Medical Clinic',
  description: 'Expert healthcare services in Frankston, Victoria. Family medicine, women\'s health, and comprehensive medical care with Medicare bulk billing available.',
  keywords: [
    'medical clinic frankston',
    'family doctor',
    'bulk billing',
    'women\'s health',
    'healthcare services',
    'medical center',
    'doctor appointment',
    'GP clinic',
    'medical consultation',
    'family medicine'
  ],
  openGraph: {
    title: 'Dr. Farzaneh\'s Arty Stone Medical Clinic',
    description: 'Expert healthcare services in Frankston. Family medicine, women\'s health, and bulk billing available.',
    type: 'website',
    url: 'https://artystoneclinic.com.au',
    images: [
      {
        url: '/images/clinic-welcome.webp',
        width: 1200,
        height: 630,
        alt: 'Arty Stone Medical Clinic',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dr. Farzaneh\'s Arty Stone Medical Clinic',
    description: 'Expert healthcare services in Frankston. Family medicine, women\'s health, and bulk billing available.',
    images: ['/images/clinic-welcome.webp'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function HomePage() {
  return <HomePageClient />;
}
