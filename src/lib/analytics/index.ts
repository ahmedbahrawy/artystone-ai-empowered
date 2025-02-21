import { type ServiceItem } from '../content/services'

declare global {
  interface Window {
    gtag: (...args: any[]) => void
  }
}

export const GA_TRACKING_ID = 'G-XXXXXXXXXX' // Replace with actual GA4 tracking ID

interface EventParams {
  action: string
  category: string
  label: string
  value?: number
}

export const pageview = (url: string) => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  })
}

export const trackEvent = ({ action, category, label, value }: EventParams) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  })
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
} 