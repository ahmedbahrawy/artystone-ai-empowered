'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  color: 'pink' | 'blue' | 'green' | 'red' | 'purple' | 'indigo';
}

const colorVariants = {
  pink: 'bg-pink-50 text-pink-600 dark:bg-pink-900/20 dark:text-pink-400',
  blue: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
  green: 'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400',
  red: 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400',
  purple: 'bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400',
  indigo: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400',
};

export function ServiceCard({ title, description, icon: Icon, color }: ServiceCardProps) {
  return (
    <Card className="p-6 bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow">
      <div className="flex flex-col items-start gap-4">
        <div className={cn('p-3 rounded-lg', colorVariants[color])}>
          <Icon className="w-6 h-6" />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            {title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            {description}
          </p>
        </div>
        <Button
          variant="ghost"
          className="mt-2 hover:text-blue-600 dark:hover:text-blue-400"
          onClick={() => window.location.href = '/services'}
        >
          Learn More →
        </Button>
      </div>
    </Card>
  );
} 