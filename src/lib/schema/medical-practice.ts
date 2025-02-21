import { type ServiceItem } from '../content/services'

export interface MedicalPracticeSchema {
  '@context': 'https://schema.org'
  '@type': 'MedicalBusiness' | 'MedicalClinic'
  name: string
  description: string
  url: string
  telephone: string[]
  address: {
    '@type': 'PostalAddress'
    streetAddress: string
    addressLocality: string
    addressRegion: string
    postalCode: string
    addressCountry: string
  }
  geo: {
    '@type': 'GeoCoordinates'
    latitude: number
    longitude: number
  }
  medicalSpecialty: string[]
  availableService: Array<{
    '@type': 'MedicalService'
    name: string
    description: string
  }>
  openingHours: string[]
}

export function generateMedicalPracticeSchema(services: readonly ServiceItem[]): MedicalPracticeSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalClinic',
    name: 'Arty Stone Clinic',
    description: 'Comprehensive family healthcare services at Arty Stone Clinic. Expert medical care from experienced family doctors.',
    url: 'https://artystoneclinic.com.au',
    telephone: ['(03) 9970 0777', '(03) 9789 1666', '(03) 5929 7373'],
    address: {
      '@type': 'PostalAddress',
      streetAddress: '13 Hastings Road',
      addressLocality: 'Frankston',
      addressRegion: 'Victoria',
      postalCode: '3199',
      addressCountry: 'Australia',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -38.1579, // Replace with actual coordinates
      longitude: 145.1354, // Replace with actual coordinates
    },
    medicalSpecialty: [
      'Family Medicine',
      'Primary Care',
      'Women\'s Health',
      'Preventive Medicine',
    ],
    availableService: [...services].map(service => ({
      '@type': 'MedicalService',
      name: service.title,
      description: service.description,
    })),
    openingHours: [
      'Mo-Fr 08:00-18:00',
      'Sa 09:00-13:00',
    ],
  }
} 