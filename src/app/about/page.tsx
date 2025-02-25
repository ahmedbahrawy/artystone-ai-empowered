import { Metadata } from 'next';
import { PageWrapper, getMetadata } from '@/components/layout/page-wrapper';
import { AboutContent } from '@/features/about/about-content';

export const metadata: Metadata = getMetadata({
  title: 'About Us | Artystone Clinic',
  description: 'Learn about Artystone Clinic\'s history, mission, and our dedicated team of healthcare professionals.',
  path: '/about',
  keywords: ['about us', 'medical clinic', 'healthcare team', 'clinic history', 'medical professionals'],
});

export default function AboutPage() {
  return (
    <PageWrapper
      title="About Artystone Clinic"
      subtitle="Learn about our history, mission, and dedicated team"
      layoutProps={{
        backgroundGradient: 'primary',
        backgroundPattern: 'dots',
      }}
    >
      <AboutContent />
    </PageWrapper>
  );
} 