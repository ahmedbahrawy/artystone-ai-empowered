import type { Metadata, Viewport } from "next";
import { inter, playfairDisplay, jetbrainsMono } from "@/lib/fonts";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { getAllServices } from "@/lib/content/services";
import { generateMedicalPracticeSchema } from "@/lib/schema/medical-practice";
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
    default: "Arty Stone Clinic | Family Medicine & Healthcare Services",
    template: "%s | Arty Stone Clinic"
  },
  description: "Experience comprehensive family healthcare services at Arty Stone Clinic. Specializing in women's health, preventive care, and general wellness. Book your appointment today.",
  keywords: ["family medicine", "women's health", "healthcare services", "medical clinic", "family doctors", "health checkup", "preventive care", "medical appointments"],
  openGraph: {
    title: "Arty Stone Clinic | Family Medicine & Healthcare Services",
    description: "Experience comprehensive family healthcare services at Arty Stone Clinic. Specializing in women's health, preventive care, and general wellness.",
    url: "https://artystoneclinic.com.au",
    siteName: "Arty Stone Clinic",
    locale: "en_AU",
    type: "website",
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
  alternates: {
    canonical: 'https://artystoneclinic.com.au',
  },
  verification: {
    google: 'your-google-verification-code',
  },
  icons: {
    icon: [
      {
        url: "/favicon/favicon.ico",
        sizes: "any",
      },
      {
        url: "/favicon/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "/favicon/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/favicon/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    other: [
      {
        rel: "android-chrome-192x192",
        url: "/favicon/android-chrome-192x192.png",
      },
      {
        rel: "android-chrome-512x512",
        url: "/favicon/android-chrome-512x512.png",
      },
    ],
  },
  manifest: "/favicon/site.webmanifest",
};

const services = getAllServices();
const schema = generateMedicalPracticeSchema(services);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfairDisplay.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
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

        {/* Analytics Scripts */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          strategy="afterInteractive"
          async
          defer
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
              page_path: window.location.pathname,
              transport_type: 'beacon'
            });
          `}
        </Script>
      </head>
      <body className="font-sans antialiased">
        <ErrorBoundary>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <React.Suspense
              fallback={
                <div className="flex min-h-screen items-center justify-center">
                  <div className="h-16 w-16 rounded-full border-4 border-primary-500/20 border-t-primary-500 animate-spin" />
                </div>
              }
            >
              <div className="flex min-h-screen flex-col">
                <Header />
                <main className="flex-1">{children}</main>
                <Footer />
              </div>
            </React.Suspense>
          </ThemeProvider>
        </ErrorBoundary>
        <PerformanceMonitor />
      </body>
    </html>
  );
}
