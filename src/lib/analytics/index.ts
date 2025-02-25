import { type ServiceItem } from '../content/services'

declare global {
  interface Window {
    gtag: (...args: any[]) => void
  }
}

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID

interface EventParams {
  action: string
  category: string
  label: string
  value?: number
}

interface PerformanceMetric {
  metric: string
  value: number
  id: string
}

export const pageview = (url: string) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('config', GA_TRACKING_ID!, {
      page_path: url,
    })
  }
}

export const trackEvent = ({ action, category, label, value }: EventParams) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

// Custom events for key user interactions
export const analyticsEvents = {
  bookAppointment: (service?: string) =>
    trackEvent({
      action: 'book_appointment',
      category: 'Conversion',
      label: service || 'general',
    }),

  viewService: (service: ServiceItem) =>
    trackEvent({
      action: 'view_service',
      category: 'Engagement',
      label: service.title,
    }),

  contactForm: (type: 'submit' | 'start') =>
    trackEvent({
      action: type === 'submit' ? 'contact_submit' : 'contact_start',
      category: 'Conversion',
      label: 'contact_form',
    }),

  searchServices: (query: string) =>
    trackEvent({
      action: 'search_services',
      category: 'Engagement',
      label: query,
    }),

  performanceMetric: ({ metric, value, id }: PerformanceMetric) =>
    trackEvent({
      action: 'web_vital',
      category: 'Web Vitals',
      label: `${metric}_${id}`,
      value,
    }),

  errorTracking: (error: Error, componentStack?: string) =>
    trackEvent({
      action: 'error',
      category: 'Error',
      label: `${error.name}: ${error.message}${componentStack ? `\n${componentStack}` : ''}`,
    }),
} 