export const videos = {
  hero: '/artystone-hero.mp4',
} as const

export const images = {
  clinicWelcome: '/images/clinic-welcome.webp',
  mainSignage: '/images/main-signage.webp',
  team: {
    drChen: '/images/team/dr-chen.webp',
    drPatel: '/images/team/dr-patel.webp',
    emmaThompson: '/images/team/emma-thompson.webp',
  },
} as const

export const teamMembers = [
  {
    name: 'Dr. Sarah Chen',
    role: 'Lead Physiotherapist',
    bio: 'With over 15 years of experience, Dr. Chen specializes in sports rehabilitation and chronic pain management.',
    image: images.mainSignage, // TODO: Update with actual team member image
  },
  {
    name: 'Dr. Michael Patel',
    role: 'Senior Therapist',
    bio: 'Dr. Patel brings expertise in manual therapy and movement analysis to help patients achieve optimal function.',
    image: images.clinicWelcome, // TODO: Update with actual team member image
  },
  {
    name: 'Emma Thompson',
    role: 'Wellness Coordinator',
    bio: 'Emma ensures our patients receive comprehensive care by coordinating their treatment plans and wellness programs.',
    image: images.mainSignage, // TODO: Update with actual team member image
  },
] as const 