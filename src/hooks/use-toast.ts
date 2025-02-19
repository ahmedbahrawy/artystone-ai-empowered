"use client"

// Inspired by react-hot-toast library
import * as React from "react"

import type {
  ToastActionElement,
  ToastProps,
} from "@/components/ui/toast"

// Constants
const CONSTANTS = {
  TOAST_LIMIT: 1,
  TOAST_REMOVE_DELAY: 1000000,
} as const

// Types
type ToasterToast = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
}

type Toast = Omit<ToasterToast, "id">

type ToastActionType = "ADD_TOAST" | "UPDATE_TOAST" | "DISMISS_TOAST" | "REMOVE_TOAST"

interface ToastAction {
  type: ToastActionType
  toast?: ToasterToast | Partial<ToasterToast>
  toastId?: string
}

interface ToastState {
  toasts: ToasterToast[]
}

// Utils
class ToastIdGenerator {
  private static count = 0

  static generate(): string {
    this.count = (this.count + 1) % Number.MAX_SAFE_INTEGER
    return this.count.toString()
  }
}

// Toast Manager
class ToastManager {
  private static timeouts = new Map<string, ReturnType<typeof setTimeout>>()
  private static listeners: Array<(state: ToastState) => void> = []
  private static state: ToastState = { toasts: [] }

  static addToRemoveQueue(toastId: string): void {
    if (this.timeouts.has(toastId)) return

    const timeout = setTimeout(() => {
      this.timeouts.delete(toastId)
      this.dispatch({
        type: "REMOVE_TOAST",
        toastId,
      })
    }, CONSTANTS.TOAST_REMOVE_DELAY)

    this.timeouts.set(toastId, timeout)
  }

  static dispatch(action: ToastAction): void {
    this.state = this.reducer(this.state, action)
    this.notifyListeners()
  }

  static addListener(listener: (state: ToastState) => void): void {
    this.listeners.push(listener)
  }

  static removeListener(listener: (state: ToastState) => void): void {
    const index = this.listeners.indexOf(listener)
    if (index > -1) {
      this.listeners.splice(index, 1)
    }
  }

  private static notifyListeners(): void {
    this.listeners.forEach((listener) => listener(this.state))
  }

  private static reducer(state: ToastState, action: ToastAction): ToastState {
    switch (action.type) {
      case "ADD_TOAST":
        return {
          ...state,
          toasts: [action.toast as ToasterToast, ...state.toasts].slice(0, CONSTANTS.TOAST_LIMIT),
        }

      case "UPDATE_TOAST":
        return {
          ...state,
          toasts: state.toasts.map((t) =>
            t.id === (action.toast as Partial<ToasterToast>).id
              ? { ...t, ...action.toast }
              : t
          ),
        }

      case "DISMISS_TOAST": {
        if (action.toastId) {
          this.addToRemoveQueue(action.toastId)
        } else {
          state.toasts.forEach((toast) => {
            this.addToRemoveQueue(toast.id)
          })
        }

        return {
          ...state,
          toasts: state.toasts.map((t) =>
            t.id === action.toastId || action.toastId === undefined
              ? {
                  ...t,
                  open: false,
                }
              : t
          ),
        }
      }

      case "REMOVE_TOAST":
        if (action.toastId === undefined) {
          return { ...state, toasts: [] }
        }
        return {
          ...state,
          toasts: state.toasts.filter((t) => t.id !== action.toastId),
        }

      default:
        return state
    }
  }
}

// Hook
function useToast() {
  const [state, setState] = React.useState<ToastState>({ toasts: [] })

  React.useEffect(() => {
    ToastManager.addListener(setState)
    return () => ToastManager.removeListener(setState)
  }, [])

  const toast = React.useCallback((props: Toast) => {
    const id = ToastIdGenerator.generate()

    const update = (props: ToasterToast) =>
      ToastManager.dispatch({
        type: "UPDATE_TOAST",
        toast: { ...props, id },
      })

    const dismiss = () =>
      ToastManager.dispatch({
        type: "DISMISS_TOAST",
        toastId: id,
      })

    ToastManager.dispatch({
      type: "ADD_TOAST",
      toast: {
        ...props,
        id,
        open: true,
        onOpenChange: (open) => {
          if (!open) dismiss()
        },
      },
    })

    return {
      id,
      dismiss,
      update,
    }
  }, [])

  const dismiss = React.useCallback((toastId?: string) => {
    ToastManager.dispatch({ type: "DISMISS_TOAST", toastId })
  }, [])

  return {
    ...state,
    toast,
    dismiss,
  }
}

export { useToast, type Toast }
