'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { Container } from '@/components/ui/container';
import { SectionContainer } from '@/components/ui/section-container';
import { useThemeContext } from '@/providers/theme-provider';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';
import { generateBreadcrumbSchema } from '@/lib/schema/location-schema';

interface PageLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  backgroundGradient?: 'primary' | 'secondary' | 'none';
  backgroundPattern?: 'dots' | 'grid' | 'none';
  fullHeight?: boolean;
  className?: string;
  containerClassName?: string;
  headerClassName?: string;
}

export function PageLayout({
  children,
  title,
  subtitle,
  backgroundGradient = 'none',
  backgroundPattern = 'none',
  fullHeight = false,
  className = '',
  containerClassName = '',
  headerClassName = '',
}: PageLayoutProps) {
  const { isReducedMotion } = useThemeContext();
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter(Boolean);

  // Generate breadcrumb items
  const breadcrumbItems = pathSegments.map((segment, index) => {
    const path = `/${pathSegments.slice(0, index + 1).join('/')}`;
    return {
      name: segment.charAt(0).toUpperCase() + segment.slice(1),
      item: path,
    };
  });

  // Add home page to breadcrumbs
  if (pathname !== '/') {
    breadcrumbItems.unshift({ name: 'Home', item: '/' });
  }

  // Generate schema
  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbItems);

  return (
    <SectionContainer
      backgroundGradient={backgroundGradient}
      backgroundPattern={backgroundPattern}
      fullHeight={fullHeight}
      paddingY={12}
      className={`relative overflow-hidden ${className}`}
    >
      <Container className={`relative z-10 ${containerClassName}`}>
        {(title || subtitle) && (
          <motion.header
            className={`mb-12 text-center ${headerClassName}`}
            initial={isReducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={isReducedMotion ? {} : { opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {title && (
              <motion.h1
                className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-neutral-900 dark:text-neutral-50"
                initial={isReducedMotion ? {} : { opacity: 0, y: 20 }}
                animate={isReducedMotion ? {} : { opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {title}
              </motion.h1>
            )}
            {subtitle && (
              <motion.p
                className="mt-4 text-lg md:text-xl text-neutral-600 dark:text-neutral-400"
                initial={isReducedMotion ? {} : { opacity: 0, y: 20 }}
                animate={isReducedMotion ? {} : { opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {subtitle}
              </motion.p>
            )}
          </motion.header>
        )}

        {pathname !== '/' && (
          <nav aria-label="Breadcrumb" className="py-4 px-4 md:px-6 lg:px-8">
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify(breadcrumbSchema),
              }}
            />
            <ol className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              {breadcrumbItems.map((item, index) => (
                <li key={item.item} className="flex items-center">
                  {index > 0 && (
                    <ChevronRight className="mx-2 h-4 w-4 text-gray-400" />
                  )}
                  <Link
                    href={item.item}
                    className={cn(
                      'hover:text-primary-600 dark:hover:text-primary-400',
                      index === breadcrumbItems.length - 1
                        ? 'font-semibold text-gray-900 dark:text-gray-100'
                        : ''
                    )}
                  >
                    {index === 0 ? (
                      <Home className="h-4 w-4" />
                    ) : (
                      item.name
                    )}
                  </Link>
                </li>
              ))}
            </ol>
          </nav>
        )}

        <motion.div
          initial={isReducedMotion ? {} : { opacity: 0, y: 20 }}
          animate={isReducedMotion ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: title || subtitle ? 0.6 : 0 }}
        >
          {children}
        </motion.div>
      </Container>

      {/* Decorative elements */}
      {!isReducedMotion && (
        <motion.div 
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="absolute top-[10%] right-[10%] w-32 h-32 rounded-full bg-primary/5 dark:bg-primary/10 blur-3xl animate-pulse" />
          <div className="absolute bottom-[20%] left-[20%] w-48 h-48 rounded-full bg-secondary/5 dark:bg-secondary/10 blur-3xl animate-pulse" />
        </motion.div>
      )}
    </SectionContainer>
  );
} 