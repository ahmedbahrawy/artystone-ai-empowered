import { type Metadata } from 'next'

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

interface BreadcrumbItem {
  name: string
  item: string
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `https://artystoneclinic.com.au${item.item}`,
    })),
  }
}

export function generateLocationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalClinic',
    '@id': 'https://artystoneclinic.com.au/#clinic',
    name: "Dr. Farzaneh's Arty Stone Medical Clinic",
    url: 'https://artystoneclinic.com.au',
    telephone: '+61397810370',
    email: 'info@artystoneclinic.com.au',
    description: 'Expert family healthcare services specializing in family medicine, women\'s health, and comprehensive medical care. Medicare bulk billing available.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '1/55 Beach St',
      addressLocality: 'Frankston',
      addressRegion: 'VIC',
      postalCode: '3199',
      addressCountry: 'AU',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -38.143848,
      longitude: 145.121981,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '17:30',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '09:00',
        closes: '13:00',
      },
    ],
    availableService: [
      {
        '@type': 'MedicalProcedure',
        name: 'Family Medicine',
        description: 'Comprehensive family healthcare services',
      },
      {
        '@type': 'MedicalProcedure',
        name: "Women's Health",
        description: 'Specialized women\'s health services',
      },
      {
        '@type': 'MedicalProcedure',
        name: 'Preventive Care',
        description: 'Preventive healthcare and wellness services',
      },
    ],
    hasMap: 'https://www.google.com/maps?cid=your-google-place-id',
    sameAs: [
      'https://www.facebook.com/artystoneclinic',
      'https://www.linkedin.com/company/artystone-clinic',
    ],
    priceRange: '$$',
    paymentAccepted: ['Credit Card', 'Medicare', 'Private Health Insurance'],
    medicalSpecialty: ['Family Medicine', "Women's Health", 'Preventive Medicine'],
    healthcareService: {
      '@type': 'MedicalTherapy',
      medicineSystem: 'Western Medicine',
      relevantSpecialty: ['Family Practice', 'Primary Care'],
    },
  }
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
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Do you offer bulk billing?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, we offer bulk billing for eligible Medicare card holders including children under 16, pensioners, and healthcare card holders.',
        },
      },
      {
        '@type': 'Question',
        name: 'What are your opening hours?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We are open Monday to Friday from 9:00 AM to 5:30 PM, and Saturday from 9:00 AM to 1:00 PM.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do I need to make an appointment?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'While we accept walk-ins, we recommend booking an appointment to minimize waiting times. You can book online through HotDoc or call us.',
        },
      },
      {
        '@type': 'Question',
        name: 'What services do you offer?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We offer comprehensive family healthcare services including family medicine, women\'s health, preventive care, chronic disease management, and more.',
        },
      },
    ],
  }
}

export function generateArticleSchema(metadata: Metadata) {
  if (!metadata.title || typeof metadata.title === 'object') return null

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: metadata.title,
    description: metadata.description,
    image: metadata.openGraph?.images?.[0]?.url,
    datePublished: new Date().toISOString(),
    dateModified: new Date().toISOString(),
    author: {
      '@type': 'Person',
      name: 'Dr. Farzaneh',
      jobTitle: 'General Practitioner',
    },
    publisher: {
      '@type': 'Organization',
      name: "Dr. Farzaneh's Arty Stone Medical Clinic",
      logo: {
        '@type': 'ImageObject',
        url: 'https://artystoneclinic.com.au/images/artystone-logo.svg',
      },
    },
  }
} 