import Link from 'next/link'
import { Container } from '@/components/ui/container'
import { HeroImage } from '@/components/atoms/hero-image'
import { images } from '@/lib/media-config'

export default function NotFound() {
  return (
    <main className="relative min-h-screen">
      {/* Background Image */}
      <HeroImage
        src={images.notFoundHero}
        alt="404 Not Found"
        overlay
        priority
      />

      <Container className="relative z-10 flex min-h-screen items-center justify-center py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="font-serif text-5xl font-bold text-white md:text-6xl">
            404 - Page Not Found
          </h1>
          <p className="mt-6 text-lg text-neutral-200 md:text-xl">
            We apologize, but the page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              href="/"
              className="rounded-lg bg-white px-6 py-3 text-lg font-semibold text-neutral-900 shadow-lg transition-all hover:bg-neutral-100"
            >
              Return Home
            </Link>
            <Link
              href="/contact"
              className="rounded-lg border border-white/20 bg-white/10 px-6 py-3 text-lg font-semibold text-white shadow-lg backdrop-blur-sm transition-all hover:bg-white/20"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </Container>
    </main>
  )
} 