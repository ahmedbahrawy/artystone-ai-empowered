import type { Metadata } from 'next'
import { ServicesPageClient } from '@/features/services/services-page-client'

export const metadata: Metadata = {
  title: "Medical Services & Family Healthcare",
  description: "Comprehensive medical services including family medicine, women's health, preventive care, and general wellness. Expert healthcare services provided by experienced family doctors.",
  keywords: ['medical services', 'family healthcare', 'women\'s health', 'preventive care', 'wellness', 'family medicine'],
  openGraph: {
    title: "Medical Services & Family Healthcare | Arty Stone Clinic",
    description: "Comprehensive medical services including family medicine, women's health, preventive care, and general wellness.",
    type: 'website',
    url: 'https://artystoneclinic.com.au/services',
    images: [
      {
        url: '/images/services-og.webp',
        width: 1200,
        height: 630,
        alt: 'Arty Stone Medical Clinic Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Medical Services & Family Healthcare | Arty Stone Clinic",
    description: "Comprehensive medical services including family medicine, women's health, preventive care, and general wellness.",
    images: ['/images/services-og.webp'],
  },
}

export default function ServicesPage() {
  return <ServicesPageClient />;
} 