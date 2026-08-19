<template>
  <div class="bg-white p-6 rounded-2xl border border-[#e3e5e7] shadow-sm hover:shadow-md transition-shadow">
    <div class="flex items-center justify-between mb-4">
      <div :class="['p-2 rounded-lg', iconBgClass]">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="iconPath" />
        </svg>
      </div>
      <span
        v-if="badge"
        :class="['text-xs font-semibold px-2 py-1 rounded-full', badgeClass]"
      >
        {{ badge }}
      </span>
    </div>
    <p class="text-sm font-medium text-[#6d7175]">{{ label }}</p>
    <h3 class="text-3xl font-bold text-[#1a1b1c] mt-1">{{ value }}</h3>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  label: { type: String, required: true },
  value: { type: [String, Number], required: true },
  iconPath: { type: String, default: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
  color: { type: String, default: 'primary' },
  badge: { type: String, default: '' }
})

const colorMap = {
  primary: {
    bg: 'bg-[var(--admin-primary)]/10 text-[var(--admin-primary)]',
    badge: 'text-[var(--admin-primary)] bg-[var(--admin-primary)]/10'
  },
  blue: {
    bg: 'bg-[#2563eb]/10 text-[#2563eb]',
    badge: 'text-[#2563eb] bg-[#dbeafe]'
  },
  purple: {
    bg: 'bg-[#7c3aed]/10 text-[#7c3aed]',
    badge: ''
  },
  orange: {
    bg: 'bg-[#f97316]/10 text-[#f97316]',
    badge: ''
  }
}

const iconBgClass = computed(() => colorMap[props.color]?.bg || colorMap.primary.bg)
const badgeClass = computed(() => colorMap[props.color]?.badge || colorMap.primary.badge)
</script>
