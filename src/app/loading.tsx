export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-neutral-900">
      <div className="flex flex-col items-center space-y-4">
        <div className="h-16 w-16 rounded-full border-4 border-primary-500/20 border-t-primary-500 animate-spin" />
        <div className="text-lg font-medium text-neutral-900 dark:text-neutral-100">
          Loading...
        </div>
      </div>
    </div>
  )
} 