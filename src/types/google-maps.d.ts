declare global {
  interface Window {
    google: {
      maps: {
        Map: typeof google.maps.Map;
        Marker: typeof google.maps.Marker;
        importLibrary: (library: string) => Promise<any>;
      };
    };
  }
}

declare namespace google.maps {
  interface MapsLibrary {
    Map: typeof google.maps.Map;
  }

  class Map {
    constructor(mapDiv: Element | null, opts?: google.maps.MapOptions);
  }

  class Marker {
    constructor(opts?: google.maps.MarkerOptions);
  }

  interface MapOptions {
    center?: google.maps.LatLngLiteral;
    zoom?: number;
    mapId?: string;
    disableDefaultUI?: boolean;
  }

  interface MarkerOptions {
    position?: google.maps.LatLngLiteral;
    map?: google.maps.Map;
    title?: string;
  }

  interface LatLngLiteral {
    lat: number;
    lng: number;
  }
}

export {}; 