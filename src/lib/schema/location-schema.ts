interface Location {
  latitude: number;
  longitude: number;
  state: string;
  city: string;
  postalCode: string;
  streetAddress: string;
}

interface ServiceArea {
  type: 'GeoCircle' | 'Place';
  geoMidpoint?: {
    latitude: number;
    longitude: number;
  };
  geoRadius?: string;
  address?: {
    addressRegion: string;
    addressCountry: string;
  };
}

export function generateLocationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalClinic',
    'name': "Dr. Farzaneh's Arty Stone Medical Clinic",
    'description': "Expert family healthcare services in Frankston, Victoria. Specializing in family medicine, women's health, and comprehensive medical care.",
    'url': 'https://artystoneclinic.com.au',
    'telephone': '+61-YOUR-PHONE-NUMBER',
    'email': 'info@artystoneclinic.com.au',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': 'YOUR-STREET-ADDRESS',
      'addressLocality': 'Frankston',
      'addressRegion': 'VIC',
      'postalCode': 'YOUR-POSTAL-CODE',
      'addressCountry': 'AU'
    },
    'geo': {
      '@type': 'GeoCoordinates',
      'latitude': 'YOUR-LATITUDE',
      'longitude': 'YOUR-LONGITUDE'
    },
    'openingHoursSpecification': [
      {
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        'opens': '09:00',
        'closes': '17:00'
      },
      {
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': ['Saturday'],
        'opens': '10:00',
        'closes': '14:00'
      }
    ],
    'availableService': [
      {
        '@type': 'MedicalService',
        'name': 'Family Medicine',
        'description': 'Comprehensive family healthcare services'
      },
      {
        '@type': 'MedicalService',
        'name': "Women's Health",
        'description': 'Specialized women\'s healthcare services'
      },
      {
        '@type': 'MedicalService',
        'name': 'Bulk Billing',
        'description': 'Medicare bulk billing available for eligible patients'
      },
      {
        '@type': 'MedicalService',
        'name': 'Telehealth Consultations',
        'description': 'Remote medical consultations available'
      }
    ],
    'medicalSpecialty': ['Family Medicine', "Women's Health", 'General Practice'],
    'priceRange': '$$',
    'paymentAccepted': ['Cash', 'Credit Card', 'EFTPOS', 'Medicare'],
    'areaServed': {
      '@type': 'GeoCircle',
      'geoMidpoint': {
        '@type': 'GeoCoordinates',
        'latitude': 'YOUR-LATITUDE',
        'longitude': 'YOUR-LONGITUDE'
      },
      'geoRadius': '10000'
    }
  };
}

export function generateServiceAreaSchema(areas: ServiceArea[]) {
  return areas.map(area => ({
    '@type': 'ServiceArea',
    ...(area.type === 'GeoCircle' ? {
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: area.geoMidpoint?.latitude,
        longitude: area.geoMidpoint?.longitude
      },
      geoRadius: area.geoRadius
    } : {
      address: {
        '@type': 'PostalAddress',
        addressRegion: area.address?.addressRegion,
        addressCountry: area.address?.addressCountry
      }
    })
  }));
}

export function generateFAQSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': [
      {
        '@type': 'Question',
        'name': 'Does Dr. Farzaneh\'s Arty Stone Medical Clinic offer bulk billing?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Yes, we offer bulk billing for eligible Medicare card holders including children under 16, pensioners, and healthcare card holders.'
        }
      },
      {
        '@type': 'Question',
        'name': 'What services does the clinic provide?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'We provide comprehensive healthcare services including family medicine, women\'s health, preventive care, health assessments, vaccinations, and telehealth consultations.'
        }
      },
      {
        '@type': 'Question',
        'name': 'Where is the clinic located?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Our clinic is conveniently located in Frankston, Victoria. We serve patients from Frankston and surrounding areas.'
        }
      },
      {
        '@type': 'Question',
        'name': 'How can I book an appointment?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'You can book an appointment online through our website, call our clinic directly, or use our online booking system. We also offer telehealth consultations for eligible patients.'
        }
      }
    ]
  };
} 