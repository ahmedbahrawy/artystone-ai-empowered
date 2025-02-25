'use client'

import * as React from 'react'

export function BookingIframe() {
  return (
    <div className="w-full min-h-[800px] bg-neutral-50 dark:bg-neutral-900">
      <iframe
        title="Book Appointment"
        src="https://www.hotdoc.com.au/medical-centres/frankston-VIC-3199/artystone-medical-and-specialist-clinic/doctors?wp=w_iframe"
        className="w-full h-[800px]"
        style={{ border: 'none' }}
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-presentation allow-top-navigation"
        loading="lazy"
      />
    </div>
  )
} 