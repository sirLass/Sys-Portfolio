import { inject } from 'vue'

/**
 * Composable wrapping the toast system provided by admin_panel.vue.
 * Usage:
 *   const toast = useToast()
 *   toast.success('Saved!')
 *   toast.error('Failed')
 *   toast.info('Refreshing...')
 */
export function useToast() {
  const addToast = inject('addToast', null)

  if (!addToast) {
    // Fallback: no-op if used outside admin panel context
    const noop = () => {}
    return { show: noop, success: noop, error: noop, info: noop, warning: noop }
  }

  return {
    show: (message, type = 'success') => addToast(message, type),
    success: (message) => addToast(message, 'success'),
    error: (message) => addToast(message, 'error'),
    info: (message) => addToast(message, 'info'),
    warning: (message) => addToast(message, 'warning')
  }
}
