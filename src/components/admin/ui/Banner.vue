<template>
  <Transition
    enter-active-class="transition-all duration-300 ease-out"
    enter-from-class="transform -translate-y-2 opacity-0"
    enter-to-class="transform translate-y-0 opacity-100"
    leave-active-class="transition-all duration-200 ease-in"
    leave-from-class="transform translate-y-0 opacity-100"
    leave-to-class="transform -translate-y-2 opacity-0"
  >
    <div
      v-if="show"
      :class="[
        'mb-6 flex items-center gap-3 p-4 rounded-lg border',
        typeClasses[type]
      ]"
    >
      <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          v-if="type === 'success'"
          stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M5 13l4 4L19 7"
        />
        <path
          v-else-if="type === 'error'"
          stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
        <path
          v-else
          stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <p :class="['text-sm font-medium', textClasses[type]]">
        {{ message }}
      </p>
    </div>
  </Transition>
</template>

<script setup>
const props = defineProps({
  show: { type: Boolean, default: false },
  type: { type: String, default: 'success', validator: v => ['success', 'error', 'info', 'warning'].includes(v) },
  message: { type: String, default: '' }
})

const typeClasses = {
  success: 'bg-[var(--admin-primary-light)] border-[var(--admin-primary)]',
  error: 'bg-[#fff4f4] border-[#d72c0d]',
  info: 'bg-blue-50 border-blue-400',
  warning: 'bg-yellow-50 border-yellow-400'
}

const textClasses = {
  success: 'text-[var(--admin-secondary)]',
  error: 'text-[#d72c0d]',
  info: 'text-blue-700',
  warning: 'text-yellow-700'
}
</script>
