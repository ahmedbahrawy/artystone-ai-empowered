'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
}

export function FeatureCard({ title, description, icon: Icon }: FeatureCardProps) {
  return (
    <Card className="p-6 bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow">
      <div className="flex flex-col items-start gap-4">
        <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20">
          <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            {title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            {description}
          </p>
        </div>
      </div>
    </Card>
  );
} 