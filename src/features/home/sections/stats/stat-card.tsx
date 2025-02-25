'use client';

import React from 'react';
import { Card } from '@/components/ui/card';

interface StatCardProps {
  title: string;
  value: string;
  description: string;
}

export function StatCard({ title, value, description }: StatCardProps) {
  return (
    <Card className="p-6 bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow">
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
          {title}
        </h3>
        <p className="text-3xl font-bold tracking-tight text-blue-600 dark:text-blue-400">
          {value}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {description}
        </p>
      </div>
    </Card>
  );
} 