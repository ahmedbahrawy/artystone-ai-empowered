'use client'

import React from 'react'
import { analyticsEvents } from '@/lib/analytics'

interface Props {
  children: React.ReactNode
  fallback?: React.ReactNode
}

interface State {
  hasError: boolean
  error?: Error
  errorInfo?: React.ErrorInfo
}

export class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false,
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    analyticsEvents.errorTracking(error, errorInfo.componentStack || '')
  }

  public render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="flex min-h-[400px] items-center justify-center">
            <div className="text-center">
              <h2 className="mb-4 text-2xl font-bold text-neutral-900 dark:text-neutral-50">
                Something went wrong
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400">
                We apologize for the inconvenience. Please try refreshing the page.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="mt-6 rounded-lg bg-primary-500 px-6 py-2 text-white hover:bg-primary-600"
              >
                Refresh Page
              </button>
            </div>
          </div>
        )
      )
    }

    return this.props.children
  }
} 