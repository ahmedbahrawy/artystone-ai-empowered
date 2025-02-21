# Arty Stone Clinic Website

Modern, SEO-optimized website for Arty Stone Medical Clinic built with Next.js 14.

## Features

- 🏥 Comprehensive medical services showcase
- 📱 Fully responsive design
- 🔍 SEO optimized with structured data
- 📊 Google Analytics integration
- 🌙 Dark mode support
- 🚀 Performance optimized
- ♿ Accessibility compliant

## Tech Stack

- Next.js 14
- TypeScript
- Tailwind CSS
- Framer Motion
- Google Analytics 4

## Getting Started

1. Clone the repository:
```bash
git clone https://github.com/your-username/au-arty-stone-clinic-v-1-b.git
cd au-arty-stone-clinic-v-1-b
```

2. Install dependencies:
```bash
npm install
```

3. Copy environment variables:
```bash
cp .env.example .env
```

4. Update the `.env` file with your values

5. Run the development server:
```bash
npm run dev
```

## Deployment

### Vercel Deployment (Recommended)

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel --prod
```

### Environment Variables

Make sure to set these environment variables in your Vercel project settings:

- `NEXT_PUBLIC_GA_ID`: Google Analytics 4 Measurement ID
- `NEXT_PUBLIC_SITE_URL`: Production site URL
- `NEXT_PUBLIC_HOTDOC_URL`: HotDoc booking URL
- `NODE_ENV`: Set to 'production' for production deployment

### Manual Deployment

1. Build the project:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

## Analytics

The site uses Google Analytics 4 for tracking key metrics:
- Page views
- Service views
- Booking conversions
- Contact form submissions

## SEO

The site is optimized for these high-volume keywords:
- "health care" (673,000 searches)
- "women's health" (165,000 searches)
- "family doctors" (110,000 searches)

## License

Copyright © 2024 Arty Stone Clinic. All rights reserved.
