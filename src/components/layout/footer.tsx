'use client'

import * as React from 'react'
import Link from 'next/link'
import { Container } from '@/components/ui/container'
import { ExternalLink } from 'lucide-react'
import { HotDocLogo } from '@/components/atoms/hotdoc-logo'

const navigation = {
  main: [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ],
  social: [
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/ArtyStone.Medical.Clinic',
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/artystine_medical_clinic',
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ],
} as const

export function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900">
      <Container>
        <div className="py-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <h3 className="font-serif text-lg font-semibold text-neutral-900 dark:text-neutral-50">
                Arty Stone Clinic
              </h3>
              <p className="mt-4 text-sm text-neutral-600 dark:text-neutral-400">
                Experience the perfect blend of modern healthcare and timeless elegance.
              </p>
              <a
                href="https://www.hotdoc.com.au/medical-centres/frankston-VIC-3199/artystone-medical-and-specialist-clinic/doctors"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center space-x-2 rounded-lg border border-neutral-200 bg-white px-4 py-2 text-sm text-neutral-600 transition-colors hover:border-primary-500 hover:text-primary-500 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400 dark:hover:border-primary-500 dark:hover:text-primary-400"
              >
                <HotDocLogo className="text-[#00bda5]" />
                <span>Book Online</span>
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
            <div>
              <h3 className="font-serif text-lg font-semibold text-neutral-900 dark:text-neutral-50">
                Quick Links
              </h3>
              <ul className="mt-4 space-y-2">
                {navigation.main.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="text-sm text-neutral-600 transition-colors hover:text-primary-500 dark:text-neutral-400 dark:hover:text-primary-400"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-serif text-lg font-semibold text-neutral-900 dark:text-neutral-50">
                Contact
              </h3>
              <ul className="mt-4 space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                <li>13 Hastings Road</li>
                <li>Frankston Victoria 3199</li>
                <li>Australia</li>
                <li className="pt-2">
                  <a href="tel:+61399700777" className="hover:text-primary-500 dark:hover:text-primary-400">
                    (03) 9970 0777
                  </a>
                </li>
                <li>
                  <a href="tel:+61397891666" className="hover:text-primary-500 dark:hover:text-primary-400">
                    (03) 9789 1666
                  </a>
                </li>
                <li>
                  <a href="tel:+61359297373" className="hover:text-primary-500 dark:hover:text-primary-400">
                    (03) 5929 7373
                  </a>
                </li>
                <li className="pt-2">
                  <a href="mailto:Admin@ArtystoneMedical.com.au" className="hover:text-primary-500 dark:hover:text-primary-400">
                    Admin@ArtystoneMedical.com.au
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-serif text-lg font-semibold text-neutral-900 dark:text-neutral-50">
                Follow Us
              </h3>
              <div className="mt-4 flex space-x-4">
                {navigation.social.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-neutral-600 hover:text-primary-500 dark:text-neutral-400 dark:hover:text-primary-400"
                  >
                    <span className="sr-only">{item.name}</span>
                    <item.icon className="h-6 w-6" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-neutral-200 pt-8 dark:border-neutral-800">
            <p className="text-center text-sm text-neutral-600 dark:text-neutral-400">
              © {new Date().getFullYear()} Arty Stone Clinic. All rights reserved.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  )
} 