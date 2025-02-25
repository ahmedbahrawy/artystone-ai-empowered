'use client'

import { useEffect } from 'react'
import { onCLS, onFID, onLCP, onFCP, onTTFB } from 'web-vitals'
import { analyticsEvents } from '@/lib/analytics'

function sendToAnalytics(metric: any) {
  const { name, value, id } = metric
  analyticsEvents.performanceMetric({
    metric: name,
    value: Math.round(value),
    id,
  })
}

export function PerformanceMonitor() {
  useEffect(() => {
    // Core Web Vitals
    onCLS(sendToAnalytics)
    onFID(sendToAnalytics)
    onLCP(sendToAnalytics)
    // Additional metrics
    onFCP(sendToAnalytics)
    onTTFB(sendToAnalytics)
  }, [])

  return null
} 