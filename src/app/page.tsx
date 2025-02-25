import type { Metadata } from 'next';
import { HomePageClient } from '@/features/home/home-page-client';
import metadata from './metadata';

export const metadata: Metadata = metadata;

export default function HomePage() {
  return <HomePageClient />;
}
