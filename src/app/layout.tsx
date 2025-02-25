import type { Metadata, Viewport } from "next";
import { inter, playfairDisplay, jetbrainsMono } from "@/lib/fonts";
import { ThemeProvider } from "@/components/theme-provider";
import { LocationProvider } from "@/components/providers/location-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { getAllServices } from "@/lib/content/services";
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
  themeColor: "#2E90FF",
  colorScheme: "light dark",
};

export const metadata: Metadata = {
  metadataBase: new URL('https://artystoneclinic.com.au'),
  title: {
    default: "Dr. Farzaneh's Arty Stone Medical Clinic | Family Healthcare Frankston Victoria",
    template: "%s | Dr. Farzaneh's Arty Stone Medical Clinic Frankston"
  },
  description: "Experience expert healthcare with Dr. Farzaneh at Arty Stone Medical Clinic in Frankston, Victoria. Specializing in family medicine, women's health, and comprehensive medical services. Medicare bulk billing available. Book your appointment today.",
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
    siteName: "Dr. Farzaneh's Arty Stone Medical Clinic",
    title: "Expert Family Healthcare in Frankston Victoria | Dr. Farzaneh's Arty Stone Medical Clinic",
    description: "Your trusted local medical clinic in Frankston, Victoria. Dr. Farzaneh provides comprehensive healthcare services including family medicine, women's health, and bulk billing options.",
    images: [
      {
        url: 'https://artystoneclinic.com.au/images/clinic-exterior.jpg',
        width: 1200,
        height: 630,
        alt: "Arty Stone Medical Clinic Frankston"
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: "Dr. Farzaneh's Arty Stone Medical Clinic | Frankston Victoria",
    description: "Expert healthcare services in Frankston. Family medicine, women's health, and bulk billing available.",
    images: ['https://artystoneclinic.com.au/images/clinic-exterior.jpg'],
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
    google: 'your-google-verification-code',
  },
  authors: [{ name: 'Dr. Farzaneh' }],
  generator: 'Next.js',
  applicationName: "Arty Stone Medical Clinic",
  referrer: 'origin-when-cross-origin',
  creator: 'Dr. Farzaneh',
  publisher: 'Arty Stone Medical Clinic',
  category: 'Healthcare',
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  }
};

const mainLocation = {
  latitude: -27.4698,
  longitude: 153.0251,
  state: "Queensland",
  city: "Brisbane",
  postalCode: "4000",
  streetAddress: "123 Example Street",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
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
        {/* Google Fonts Preconnect - Must be first */}
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
          crossOrigin="anonymous"
        />

        {/* Resource Hints */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        
        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
      </head>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [locationSchema, faqSchema]
            })
          }}
        />
        
        {/* Analytics Scripts */}
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
              gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
            `,
          }}
        />
        
        <ErrorBoundary>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <LocationProvider>
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </LocationProvider>
          </ThemeProvider>
        </ErrorBoundary>
        <PerformanceMonitor />
      </body>
    </html>
  );
}
