'use client'

import React from 'react'
import { analyticsEvents } from '@/lib/analytics'
import { Alert } from '@/components/ui/alert'

interface Props {
  children: React.ReactNode
  fallback?: React.ReactNode
  onReset?: () => void
}

interface State {
  hasError: boolean
  error?: Error
  errorInfo?: React.ErrorInfo
  errorCount: number
}

const MAX_RETRIES = 3
const RETRY_DELAY = 2000 // 2 seconds

export class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false,
    errorCount: 0
  }

  private retryTimeoutId?: NodeJS.Timeout

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorCount: 0 }
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Track the error
    analyticsEvents.errorTracking(error, errorInfo.componentStack || '')
    
    // Update state with error info
    this.setState(prevState => ({
      errorInfo,
      errorCount: prevState.errorCount + 1
    }))

    // Attempt automatic retry if under max retries
    if (this.state.errorCount < MAX_RETRIES) {
      this.retryTimeoutId = setTimeout(() => {
        this.handleReset()
      }, RETRY_DELAY)
    }
  }

  public componentWillUnmount() {
    if (this.retryTimeoutId) {
      clearTimeout(this.retryTimeoutId)
    }
  }

  private handleReset = () => {
    this.props.onReset?.()
    this.setState({ hasError: false, error: undefined, errorInfo: undefined })
  }

  private getErrorMessage(): string {
    const { error } = this.state
    if (!error) return 'An unknown error occurred'

    // Handle specific error types
    if (error instanceof TypeError) {
      return 'There was a problem with the data type'
    }
    if (error instanceof ReferenceError) {
      return 'There was a problem with the code'
    }
    if (error.name === 'NetworkError') {
      return 'There was a problem connecting to the server'
    }

    return error.message || 'Something went wrong'
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div className="flex min-h-[400px] items-center justify-center p-4">
          <div className="w-full max-w-md">
            <Alert variant="destructive" className="mb-4">
              <h2 className="text-lg font-semibold mb-2">
                {this.getErrorMessage()}
              </h2>
              {this.state.errorCount < MAX_RETRIES ? (
                <p className="text-sm text-muted-foreground">
                  Attempting to recover... ({this.state.errorCount}/{MAX_RETRIES} retries)
                </p>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Maximum retries reached. Please try refreshing the page.
                </p>
              )}
            </Alert>
            
            <div className="flex gap-4 justify-center mt-6">
              <button
                onClick={this.handleReset}
                className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Try Again
              </button>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                Refresh Page
              </button>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
} 