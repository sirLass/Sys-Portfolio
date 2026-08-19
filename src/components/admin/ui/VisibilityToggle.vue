<template>
  <button
    type="button"
    @click="$emit('toggle')"
    class="inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium transition-all"
    :class="visible
      ? 'text-[var(--admin-primary)] bg-[var(--admin-primary)]/10'
      : 'text-[#6d7175] bg-[#f6f6f7]'"
    :title="visible ? 'Visible on public site' : 'Hidden from public site'"
  >
    <!-- Eye open (visible) -->
    <svg v-if="visible" class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
    <!-- Eye closed (hidden) -->
    <svg v-else class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
    </svg>
    {{ visible ? 'Visible' : 'Hidden' }}
  </button>
</template>

<script setup>
defineProps({
  visible: { type: Boolean, required: true }
})

defineEmits(['toggle'])
</script>
