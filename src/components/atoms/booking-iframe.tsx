'use client'

import * as React from 'react'

export function BookingIframe() {
  const iframeSrcDoc = `
    <script>
      window.onmessage = function(event) {
        event.source.postMessage({
          iframeId: event.data, 
          scrollHeight: document.body.getBoundingClientRect().height || document.body.scrollHeight
        }, event.origin);
      };
    </script>
    <body style='margin: 0'>
      <iframe 
        src="https://www.hotdoc.com.au/medical-centres/frankston-VIC-3199/artystone-medical-and-specialist-clinic/doctors?wp=w_iframe" 
        data-hotdoc-widget="iframe" 
        width="100%" 
        height="800" 
        frameBorder="0"
      ></iframe>
      <script 
        async 
        src="https://cdn.hotdoc.com.au/static/assets/js/hotdoc-widgets.min.js" 
        charset="utf-8"
      ></script>
    </body>
  `

  return (
    <iframe
      id="iframe-01"
      frameBorder="0"
      sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-presentation allow-top-navigation"
      src="javascript: window.frameElement.getAttribute('srcdoc');"
      srcDoc={iframeSrcDoc}
      className="w-full block transition-height duration-1500"
      style={{ height: '556px', overflow: 'visible' }}
    />
  )
} 