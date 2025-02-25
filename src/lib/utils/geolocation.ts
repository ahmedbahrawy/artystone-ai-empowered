interface Coordinates {
  latitude: number;
  longitude: number;
}

interface Clinic {
  name: string;
  coordinates: Coordinates;
  address: string;
  state: string;
  acceptingPatients: boolean;
  nextAvailable?: string;
}

// Capital cities coordinates for rural area calculation
const CAPITAL_CITIES = {
  SYDNEY: { latitude: -33.8688, longitude: 151.2093 },
  MELBOURNE: { latitude: -37.8136, longitude: 144.9631 },
  BRISBANE: { latitude: -27.4698, longitude: 153.0251 },
  PERTH: { latitude: -31.9505, longitude: 115.8605 },
  ADELAIDE: { latitude: -34.9285, longitude: 138.6007 },
  HOBART: { latitude: -42.8821, longitude: 147.3272 },
  DARWIN: { latitude: -12.4634, longitude: 130.8456 },
  CANBERRA: { latitude: -35.2809, longitude: 149.1300 },
};

// Calculate distance between two points using Haversine formula
function calculateDistance(point1: Coordinates, point2: Coordinates): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRad(point2.latitude - point1.latitude);
  const dLon = toRad(point2.longitude - point1.longitude);
  
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(toRad(point1.latitude)) * Math.cos(toRad(point2.latitude)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

function toRad(degrees: number): number {
  return degrees * (Math.PI/180);
}

// Check if location is considered rural (more than 50km from any capital city)
export function isRuralLocation(coordinates: Coordinates): boolean {
  const RURAL_THRESHOLD = 50; // 50km from nearest capital city
  
  return Object.values(CAPITAL_CITIES).every(
    city => calculateDistance(coordinates, city) > RURAL_THRESHOLD
  );
}

// Find nearest clinics within maxDistance
export function findNearestClinics(
  userLocation: Coordinates,
  clinics: Clinic[],
  maxDistance: number
): Clinic[] {
  return clinics
    .map(clinic => ({
      ...clinic,
      distance: calculateDistance(userLocation, clinic.coordinates)
    }))
    .filter(clinic => clinic.distance <= maxDistance)
    .sort((a, b) => a.distance - b.distance);
}

// Get state from coordinates using reverse geocoding
export async function getStateFromCoordinates(coordinates: Coordinates): Promise<string> {
  try {
    const response = await fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${coordinates.latitude}+${coordinates.longitude}&key=YOUR_API_KEY&countrycode=au`
    );
    const data = await response.json();
    
    if (data.results && data.results[0]?.components?.state) {
      return data.results[0].components.state;
    }
    
    throw new Error('State not found');
  } catch (error) {
    console.error('Error getting state from coordinates:', error);
    return '';
  }
}

// Generate location-specific metadata
export function generateLocationMetadata(state: string, isRural: boolean) {
  const baseTitle = `Dr. Darzaneh's Arty Stone Clinic`;
  const locationPrefix = isRural ? 'Rural' : '';
  const stateAbbr = state.substring(0, 3).toUpperCase();
  
  return {
    title: `${baseTitle} | ${locationPrefix} Healthcare Services in ${state}`,
    description: `Expert ${locationPrefix.toLowerCase()} healthcare services by Dr. Darzaneh in ${state}. Specializing in family medicine, telehealth consultations, and comprehensive medical care. Medicare bulk billing available.`,
    keywords: [
      `doctor ${state}`,
      `medical clinic ${state}`,
      `family doctor ${state}`,
      'telehealth consultations',
      'bulk billing doctor',
      isRural ? 'rural healthcare' : 'local doctor',
      'online doctor consultation',
      'Indigenous healthcare',
      'women\'s health specialist',
    ]
  };
}

// Modified Monash Model (MMM) classification
export function getMMMClassification(coordinates: Coordinates): number {
  const distanceToCapital = Math.min(
    ...Object.values(CAPITAL_CITIES).map(
      city => calculateDistance(coordinates, city)
    )
  );

  // Simplified MMM classification
  if (distanceToCapital <= 20) return 1; // Major cities
  if (distanceToCapital <= 50) return 2; // Inner regional
  if (distanceToCapital <= 150) return 3; // Outer regional
  if (distanceToCapital <= 600) return 4; // Remote
  return 5; // Very remote
} 