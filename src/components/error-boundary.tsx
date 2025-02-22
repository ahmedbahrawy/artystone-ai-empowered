'use client'

import React from 'react'
import { analyticsEvents } from '@/lib/analytics'
import * as Sentry from '@sentry/nextjs'

interface Props {
  children: React.ReactNode
}

interface State {
  hasError: boolean
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(_: Error): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log to analytics
    analyticsEvents.errorTracking(error, errorInfo.componentStack || '')

    // Log to analytics in production
    if (process.env.NODE_ENV === 'production') {
      try {
        Sentry.captureException(error, {
          contexts: {
            react: {
              componentStack: errorInfo.componentStack,
            },
          },
        })
      } catch (e) {
        console.error('Failed to send error to Sentry:', e)
      }
    } else {
      console.error('Error caught by boundary:', error, errorInfo)
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
          <h2 className="mb-4 text-2xl font-semibold">Something went wrong</h2>
          <p className="mb-6 text-gray-600">We apologize for the inconvenience.</p>
          <div className="flex gap-4">
            <button
              onClick={() => window.location.reload()}
              className="rounded-md bg-primary px-4 py-2 text-white hover:bg-primary/90"
            >
              Refresh Page
            </button>
            <button
              onClick={this.handleRetry}
              className="rounded-md border border-gray-300 px-4 py-2 hover:bg-gray-50"
            >
              Try Again
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
} 