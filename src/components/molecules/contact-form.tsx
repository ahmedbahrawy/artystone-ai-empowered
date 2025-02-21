'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { fadeIn } from '@/lib/animations'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import Script from 'next/script'

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

type FormData = z.infer<typeof formSchema>

export function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = async (data: FormData) => {
    try {
      // Here you would typically send the data to your backend
      console.log(data)
      reset()
    } catch (error) {
      console.error('Error submitting form:', error)
    }
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="space-y-6"
    >
      <div>
        <h3 className="text-xl font-semibold text-neutral-900 dark:text-neutral-50">
          Drop us a line!
        </h3>
        <p className="mt-2 text-neutral-700 dark:text-neutral-300">
          Better yet, see us in person!
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Input
            {...register('name')}
            placeholder="Name"
            className="bg-white dark:bg-neutral-800"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
          )}
        </div>

        <div>
          <Input
            {...register('email')}
            type="email"
            placeholder="Email*"
            className="bg-white dark:bg-neutral-800"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div>
          <Textarea
            {...register('message')}
            placeholder="Message"
            className="min-h-[120px] bg-white dark:bg-neutral-800"
          />
          {errors.message && (
            <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
          )}
        </div>

        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          This site is protected by reCAPTCHA and the Google{' '}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-500 hover:text-primary-600"
          >
            Privacy Policy
          </a>{' '}
          and{' '}
          <a
            href="https://policies.google.com/terms"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-500 hover:text-primary-600"
          >
            Terms of Service
          </a>{' '}
          apply.
        </p>

        <div className="flex space-x-3">
          <Button type="submit" disabled={isSubmitting}>
            Send
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => reset()}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
        </div>
      </form>

      <Script src="https://www.google.com/recaptcha/api.js" async defer />
    </motion.div>
  )
} 