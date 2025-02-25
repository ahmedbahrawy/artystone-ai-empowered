import React from 'react';
import { PageLayout } from './page-layout';
import { generateMetadata, GenerateMetadataOptions } from '@/lib/metadata';

interface PageWrapperProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  metadataOptions?: Partial<GenerateMetadataOptions>;
  layoutProps?: Omit<React.ComponentProps<typeof PageLayout>, 'children'>;
}

export function PageWrapper({
  children,
  title,
  subtitle,
  metadataOptions,
  layoutProps,
}: PageWrapperProps) {
  // Generate metadata with provided options
  const metadata = generateMetadata({
    title,
    ...metadataOptions,
  });

  return (
    <PageLayout
      title={title}
      subtitle={subtitle}
      {...layoutProps}
    >
      {children}
    </PageLayout>
  );
}

// Export metadata for Next.js pages
export const getMetadata = generateMetadata; 