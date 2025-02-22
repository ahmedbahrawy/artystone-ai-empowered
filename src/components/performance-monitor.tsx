'use client'

import { onCLS, onFID, onLCP, onFCP, onTTFB, onINP, type Metric } from 'web-vitals'
import { analyticsEvents } from '@/lib/analytics'
import React from 'react'

interface MemoryInfo {
  usedJSHeapSize: number;
  totalJSHeapSize: number;
  jsHeapSizeLimit: number;
}

interface ExtendedPerformance extends Performance {
  memory?: MemoryInfo;
}

function sendToAnalytics(metric: Metric) {
  analyticsEvents.performanceMetric({
    metric: metric.name,
    value: Math.round(metric.value * 100) / 100,
    id: metric.id,
  });

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.debug('Web Vital:', {
      name: metric.name,
      value: Math.round(metric.value * 100) / 100,
      id: metric.id,
    });
  }
}

export function PerformanceMonitor() {
  React.useEffect(() => {
    try {
      // Report Core Web Vitals
      onCLS(sendToAnalytics)
      onFID(sendToAnalytics)
      onLCP(sendToAnalytics)
      onFCP(sendToAnalytics)
      onTTFB(sendToAnalytics)
      onINP(sendToAnalytics)

      // Track memory usage if available
      if (typeof window !== 'undefined') {
        const performance = window.performance as ExtendedPerformance;
        if (performance?.memory) {
          setInterval(() => {
            const { usedJSHeapSize, totalJSHeapSize } = performance.memory as MemoryInfo;
            console.debug('Memory Usage:', {
              used: Math.round(usedJSHeapSize / 1024 / 1024),
              total: Math.round(totalJSHeapSize / 1024 / 1024),
            });
          }, 10000);
        }
      }
    } catch (error) {
      console.error('Error in performance monitoring:', error)
    }
  }, [])

  return null
} 