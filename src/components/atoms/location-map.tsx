'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

interface LocationMapProps {
  className?: string
}

export function LocationMap({ className }: LocationMapProps) {
  const mapRef = React.useRef<HTMLDivElement>(null)
  const [map, setMap] = React.useState<google.maps.Map | null>(null)

  React.useEffect(() => {
    if (!mapRef.current) return

    const initMap = async () => {
      const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary
      const position = { lat: -38.14559797969379, lng: 145.12183091531897 }

      const mapInstance = new Map(mapRef.current, {
        zoom: 15,
        center: position,
        mapId: 'YOUR_MAP_ID', // Replace with your actual map ID
        disableDefaultUI: true,
      })

      const marker = new google.maps.Marker({
        position,
        map: mapInstance,
        title: "Artystone Medical Clinic"
      })

      setMap(mapInstance)
    }

    initMap()
  }, [])

  return (
    <div className={cn("relative w-full h-full overflow-hidden rounded-2xl bg-white/50 dark:bg-neutral-800/50 p-6 shadow-lg", className)}>
      <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-50 mb-4">
        Find Us
      </h3>
      <div className="relative w-full h-[calc(100%-3rem)] min-h-[400px] rounded-xl overflow-hidden">
        <div 
          ref={mapRef}
          className="absolute top-0 left-0 w-full h-full"
          style={{
            cursor: 'url("https://maps.gstatic.com/mapfiles/openhand_8_8.cur"), default',
            touchAction: 'pan-x pan-y'
          }}
          role="region"
          aria-label="Map showing Artystone Medical Clinic location"
        />
      </div>
    </div>
  )
} 