import { Container, Section } from '@/components/ui/container'
import { AnimatedSection } from '@/components/ui/animated-section'
import { BookButton } from '@/components/atoms/book-button'
import { fadeIn, slideInFromBottom } from '@/lib/animations'

interface CTASectionProps {
  title: string
  description: string
  showBookButton?: boolean
  showContactButton?: boolean
  className?: string
  variant?: 'default' | 'gradient'
}

export function CTASection({
  title,
  description,
  showBookButton = true,
  showContactButton = false,
  className = '',
  variant = 'default',
}: CTASectionProps) {
  const bgClasses = variant === 'gradient'
    ? 'relative overflow-hidden bg-gradient-to-br from-primary-500/20 to-secondary-500/20 dark:from-primary-500/10 dark:to-secondary-500/10'
    : 'relative overflow-hidden bg-white dark:bg-neutral-900'

  return (
    <Section className={`${bgClasses} ${className}`}>
      <Container className="relative">
        <AnimatedSection
          variants={fadeIn}
          className="mx-auto max-w-4xl space-y-8 text-center"
        >
          <AnimatedSection variants={slideInFromBottom} className="space-y-4">
            <h2 className="font-serif text-3xl font-bold text-neutral-900 dark:text-neutral-50 md:text-4xl">
              {title}
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-neutral-700 dark:text-neutral-300">
              {description}
            </p>
          </AnimatedSection>

          <AnimatedSection variants={slideInFromBottom} className="flex flex-wrap justify-center gap-4">
            {showBookButton && (
              <BookButton
                variant="default"
                size="lg"
                className="shadow-lg"
                aria-label="Book an appointment"
              />
            )}
            {showContactButton && (
              <button
                className="rounded-lg border border-neutral-200 bg-white/90 px-8 py-4 text-lg font-semibold text-neutral-700 shadow-lg transition-all hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-900/90 dark:text-neutral-300 dark:hover:bg-neutral-800"
                aria-label="Contact us for more information"
              >
                Contact Us
              </button>
            )}
          </AnimatedSection>
        </AnimatedSection>
      </Container>
    </Section>
  )
} 