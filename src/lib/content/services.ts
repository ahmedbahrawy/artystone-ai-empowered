export interface ServiceItem {
  title: string
  description: string
  icon: string
  details: string[]
  slug: string
  seoTitle: string
  seoDescription: string
  keywords: string[]
  relatedServices: string[]
}

export const services: readonly ServiceItem[] = [
  {
    title: 'Family Healthcare Services',
    description: 'Comprehensive family healthcare services for all ages. Expert medical care from experienced family doctors.',
    icon: '👨‍👩‍👧‍👦',
    slug: 'family-healthcare',
    seoTitle: 'Family Healthcare Services | Expert Family Doctors & Medical Care',
    seoDescription: 'Expert family healthcare services and medical care for all ages. Experienced family doctors providing comprehensive health services and preventive care.',
    keywords: ['family doctors', 'family medicine', 'healthcare services', 'medical care', 'family practice'],
    details: [
      'Comprehensive family health assessments',
      'Preventive healthcare services',
      'Child and adolescent health',
      'Senior health management',
      'Family health planning',
    ],
    relatedServices: ['womens-health', 'preventive-care', 'health-checkups'],
  },
  {
    title: "Women's Health Services",
    description: "Specialized healthcare services focused on women's health and wellness at every life stage.",
    icon: '👩‍⚕️',
    slug: 'womens-health',
    seoTitle: "Women's Health Services | Comprehensive Women's Healthcare",
    seoDescription: "Expert women's health services providing comprehensive care at every life stage. Specialized medical care for women's unique health needs.",
    keywords: ["women's health", 'women of health', "women's healthcare", "women's medical services"],
    details: [
      "Comprehensive women's health assessments",
      'Reproductive health services',
      'Preventive health screenings',
      'Hormone health management',
      "Women's wellness programs",
    ],
    relatedServices: ['family-healthcare', 'wellness-programs', 'preventive-care'],
  },
  {
    title: 'Health Check-up Services',
    description: 'Comprehensive health assessments and medical check-ups for preventive care and early detection.',
    icon: '🏥',
    slug: 'health-checkups',
    seoTitle: 'Health Check-up Services | Comprehensive Medical Assessments',
    seoDescription: 'Professional health check-up services including comprehensive medical assessments and preventive screenings. Early detection and preventive care.',
    keywords: ['health check up services', 'medical assessment', 'health screening', 'preventive care'],
    details: [
      'Complete health assessments',
      'Diagnostic testing',
      'Preventive screenings',
      'Health risk evaluations',
      'Personalized health reports',
    ],
    relatedServices: ['family-healthcare', 'preventive-care'],
  },
  {
    title: 'Home Healthcare Services',
    description: 'Professional medical care and health services provided in the comfort of your home.',
    icon: '🏠',
    slug: 'home-healthcare',
    seoTitle: 'Home Healthcare Services | Professional In-Home Medical Care',
    seoDescription: 'Expert home healthcare services providing professional medical care in your home. Comprehensive home care services for your health needs.',
    keywords: ['home care services', 'home health care', 'home medical care', 'in-home healthcare'],
    details: [
      'In-home medical assessments',
      'Chronic condition management',
      'Post-hospital care',
      'Home health monitoring',
      'Family caregiver support',
    ],
    relatedServices: ['family-healthcare', 'elderly-care'],
  },
  {
    title: 'Preventive Care Services',
    description: 'Proactive health services focused on prevention and maintaining optimal health.',
    icon: '🛡️',
    slug: 'preventive-care',
    seoTitle: 'Preventive Care Services | Proactive Health Management',
    seoDescription: 'Expert preventive care services for proactive health management. Comprehensive preventive healthcare to maintain optimal health.',
    keywords: ['preventive care', 'preventive health', 'health management', 'wellness services'],
    details: [
      'Health risk assessments',
      'Preventive screenings',
      'Immunizations',
      'Lifestyle counseling',
      'Health education',
    ],
    relatedServices: ['family-healthcare', 'health-checkups', 'wellness-programs'],
  },
  {
    title: 'Medical Consultation Services',
    description: 'Expert medical consultations and healthcare advice from experienced doctors.',
    icon: '👨‍⚕️',
    slug: 'medical-consultation',
    seoTitle: 'Medical Consultation Services | Expert Doctor Consultations',
    seoDescription: 'Professional medical consultation services with experienced doctors. Expert healthcare advice and personalized medical guidance.',
    keywords: ['medical consultation', 'doctor consultation', 'healthcare advice', 'medical services'],
    details: [
      'One-on-one doctor consultations',
      'Specialist referrals',
      'Treatment planning',
      'Health advice',
      'Follow-up care',
    ],
    relatedServices: ['family-healthcare', 'specialist-care'],
  },
] as const

export function getServiceBySlug(slug: string): ServiceItem | undefined {
  return services.find(service => service.slug === slug)
}

export function getAllServices(): readonly ServiceItem[] {
  return services
}

export function getRelatedServices(service: ServiceItem): ServiceItem[] {
  return service.relatedServices
    .map(slug => getServiceBySlug(slug))
    .filter((s): s is ServiceItem => s !== undefined)
} 