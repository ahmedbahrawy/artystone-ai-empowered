import { Metadata } from 'next';

export const CLINIC_NAME = "Dr. Farzaneh's Arty Stone Medical Clinic";
export const CLINIC_LOCATION = "Frankston, Victoria";
export const CLINIC_DESCRIPTION = "Expert family healthcare services specializing in family medicine, women's health, and comprehensive medical care. Medicare bulk billing available.";
export const CLINIC_URL = 'https://artystoneclinic.com.au';

export interface GenerateMetadataOptions {
  title?: string;
  description?: string;
  path?: string;
  images?: {
    url: string;
    width: number;
    height: number;
    alt: string;
  }[];
  keywords?: string[];
}

export function generateMetadata({
  title,
  description,
  path = '',
  images = [],
  keywords = [],
}: GenerateMetadataOptions = {}): Metadata {
  const fullTitle = title 
    ? `${title} | ${CLINIC_NAME} ${CLINIC_LOCATION}`
    : `${CLINIC_NAME} | Family Healthcare ${CLINIC_LOCATION}`;

  const fullDescription = description || `Experience expert healthcare with Dr. Farzaneh at ${CLINIC_NAME} in ${CLINIC_LOCATION}. ${CLINIC_DESCRIPTION} Book your appointment today.`;

  const defaultImage = {
    url: `${CLINIC_URL}/images/clinic-exterior.jpg`,
    width: 1200,
    height: 630,
    alt: `${CLINIC_NAME} ${CLINIC_LOCATION}`
  };

  const defaultKeywords = [
    'medical clinic frankston',
    'doctor frankston victoria',
    'dr farzaneh frankston',
    'bulk billing doctor frankston',
    'family doctor frankston',
    'womens health clinic frankston',
    'medical centre frankston',
    'gp clinic frankston',
    'after hours doctor frankston',
    'bulk billing medical centre frankston',
    'healthcare services victoria',
    'medical appointments frankston',
    'family healthcare victoria',
    'arty stone clinic',
    'telehealth consultations victoria'
  ];

  return {
    metadataBase: new URL(CLINIC_URL),
    title: {
      absolute: fullTitle,
    },
    description: fullDescription,
    keywords: [...defaultKeywords, ...keywords],
    openGraph: {
      type: 'website',
      locale: 'en_AU',
      url: `${CLINIC_URL}${path}`,
      siteName: CLINIC_NAME,
      title: fullTitle,
      description: fullDescription,
      images: images.length > 0 ? images : [defaultImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: fullDescription,
      images: images.length > 0 ? images.map(img => img.url) : [defaultImage.url],
      site: '@Web',
      creator: '@ArtystoneC5190',
    },
    alternates: {
      canonical: `${CLINIC_URL}${path}`
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
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
    },
    authors: [{ name: 'Dr. Farzaneh' }],
    generator: 'Next.js',
    applicationName: CLINIC_NAME,
    referrer: 'origin-when-cross-origin',
    creator: 'Dr. Farzaneh',
    publisher: CLINIC_NAME,
    category: 'Healthcare',
    formatDetection: {
      email: true,
      address: true,
      telephone: true,
    }
  };
} 