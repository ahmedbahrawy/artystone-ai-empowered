'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { fadeIn } from '@/lib/animations'
import { 
  Phone, 
  Printer, 
  Mail, 
  MapPin, 
  Clock,
  ExternalLink 
} from 'lucide-react'

export function ContactInfo() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="space-y-6"
    >
      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-50">
          Contact Details
        </h3>
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <Phone className="h-5 w-5 text-primary-500 mt-1" />
            <div>
              <p className="text-neutral-700 dark:text-neutral-300">
                (03) 9970 0777
              </p>
              <p className="text-neutral-700 dark:text-neutral-300">
                (03) 9789 1666
              </p>
              <p className="text-neutral-700 dark:text-neutral-300">
                (03) 5929 7373
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Printer className="h-5 w-5 text-primary-500" />
            <p className="text-neutral-700 dark:text-neutral-300">
              Fax: (03) 99 67 0077
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Mail className="h-5 w-5 text-primary-500" />
            <a 
              href="mailto:Admin@ArtystoneMedical.com.au"
              className="text-neutral-700 dark:text-neutral-300 hover:text-primary-500 dark:hover:text-primary-400"
            >
              Admin@ArtystoneMedical.com.au
            </a>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-50">
          Location
        </h3>
        <div className="flex items-start space-x-3">
          <MapPin className="h-5 w-5 text-primary-500 mt-1" />
          <div>
            <p className="text-neutral-700 dark:text-neutral-300">
              Artystone Medical Clinic
            </p>
            <p className="text-neutral-700 dark:text-neutral-300">
              13 Hastings Road, Frankston Victoria 3199, Australia
            </p>
            <a 
              href="https://www.google.com/maps/dir/?api=1&destination=13+Hastings+Road+Frankston+Victoria+3199+Australia"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1 text-primary-500 hover:text-primary-600 mt-1"
            >
              <span>Get directions</span>
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-50">
          Hours
        </h3>
        <div className="flex items-start space-x-3">
          <Clock className="h-5 w-5 text-primary-500 mt-1" />
          <div>
            <p className="text-neutral-700 dark:text-neutral-300">
              Open today
            </p>
            <p className="text-neutral-700 dark:text-neutral-300">
              09:00 am – 05:00 pm
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
} 