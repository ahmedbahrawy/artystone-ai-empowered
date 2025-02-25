import type { Metadata, Viewport } from "next";
import { inter, playfairDisplay, jetbrainsMono } from "@/lib/fonts";
import { ThemeProvider } from "@/providers/theme-provider";
import { LocationProvider } from "@/components/providers/location-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { generateLocationSchema, generateFAQSchema } from "@/lib/schema/location-schema";
import { ErrorBoundary } from "@/components/error-boundary";
import { PerformanceMonitor } from "@/components/performance-monitor";
import Script from "next/script";
import "./globals.css";
import React from "react";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' }
  ],
  colorScheme: "light dark",
  viewportFit: "cover",
};

const CLINIC_NAME = "Dr. Farzaneh's Arty Stone Medical Clinic";
const CLINIC_LOCATION = "Frankston, Victoria";
const CLINIC_DESCRIPTION = "Expert family healthcare services specializing in family medicine, women's health, and comprehensive medical care. Medicare bulk billing available.";

export const metadata: Metadata = {
  metadataBase: new URL('https://artystoneclinic.com.au'),
  title: {
    default: `${CLINIC_NAME} | Family Healthcare ${CLINIC_LOCATION}`,
    template: `%s | ${CLINIC_NAME} ${CLINIC_LOCATION}`
  },
  description: `Experience expert healthcare with Dr. Farzaneh at ${CLINIC_NAME} in ${CLINIC_LOCATION}. ${CLINIC_DESCRIPTION} Book your appointment today.`,
  keywords: [
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
  ],
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: 'https://artystoneclinic.com.au',
    siteName: CLINIC_NAME,
    title: `Expert Family Healthcare in ${CLINIC_LOCATION} | ${CLINIC_NAME}`,
    description: `Your trusted local medical clinic in ${CLINIC_LOCATION}. ${CLINIC_DESCRIPTION}`,
    images: [
      {
        url: 'https://artystoneclinic.com.au/images/clinic-exterior.jpg',
        width: 1200,
        height: 630,
        alt: `${CLINIC_NAME} ${CLINIC_LOCATION}`,
        secureUrl: 'https://artystoneclinic.com.au/images/clinic-exterior.jpg',
        type: 'image/jpeg'
      },
      {
        url: 'https://artystoneclinic.com.au/images/clinic-logo.png',
        width: 500,
        height: 500,
        alt: `${CLINIC_NAME} Logo`,
        secureUrl: 'https://artystoneclinic.com.au/images/clinic-logo.png',
        type: 'image/png'
      }
    ],
    countryName: 'Australia',
    emails: ['contact@artystoneclinic.com.au'],
    phoneNumbers: ['+61 3 9781 5190'],
    streetAddress: '1/55 Cranbourne Road',
    locality: 'Frankston',
    region: 'Victoria',
    postalCode: '3199',
    availability: '24/7'
  },
  twitter: {
    card: 'summary_large_image',
    title: `${CLINIC_NAME} | ${CLINIC_LOCATION}`,
    description: `Expert healthcare services in ${CLINIC_LOCATION}. Family medicine, women's health, and bulk billing available.`,
    images: [
      {
        url: 'https://artystoneclinic.com.au/images/clinic-exterior.jpg',
        alt: `${CLINIC_NAME} - Expert Healthcare in ${CLINIC_LOCATION}`,
        width: 1200,
        height: 630
      }
    ],
    site: '@Web',
    creator: '@ArtystoneC5190',
  },
  alternates: {
    canonical: 'https://artystoneclinic.com.au'
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locationSchema = generateLocationSchema();
  const faqSchema = generateFAQSchema();

  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfairDisplay.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
      </head>
      <body className="font-sans antialiased min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 transition-colors duration-300">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [locationSchema, faqSchema]
            }, null, process.env.NODE_ENV === 'development' ? 2 : 0)
          }}
        />
        
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
        
        <ErrorBoundary>
          <ThemeProvider
            defaultTheme="system"
            enableSystem
            attribute="class"
            themes={['light', 'dark', 'semi-light', 'system']}
            storageKey="theme-preference"
          >
            <LocationProvider>
              <a 
                href="#main-content" 
                className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-white focus:text-primary-600 dark:focus:bg-gray-900 dark:focus:text-primary-400"
              >
                Skip to main content
              </a>
              <Header />
              <main id="main-content" className="flex-1">
                {children}
              </main>
              <Footer />
            </LocationProvider>
          </ThemeProvider>
        </ErrorBoundary>
        <PerformanceMonitor />
      </body>
    </html>
  );
}
