<template>
  <div class="max-w-5xl">
    <div class="space-y-6">
      <div class="flex items-center justify-between">
        <h3 class="text-base font-semibold text-[#1a1b1c]">Portfolio Color Palette</h3>
        <div
          :style="{ backgroundColor: modelValue.palette?.primary }"
          class="px-3 py-1 rounded-full text-white text-xs font-bold shadow-sm"
        >
          Current: {{ modelValue.palette?.name }}
        </div>
      </div>

      <!-- Palette Grid -->
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <button
          v-for="(palette, index) in palettes"
          :key="index"
          type="button"
          @click="updatePalette(palette)"
          :class="[
            'group p-3 rounded-xl border-2 transition-all text-left shadow-sm',
            modelValue.palette?.id === palette.id
              ? 'border-[var(--admin-primary)] bg-[var(--admin-primary)]/10 ring-4 ring-[var(--admin-primary)]/10'
              : 'border-[#e3e5e7] bg-white hover:border-[#c9cccf] hover:translate-y-[-2px]'
          ]"
        >
          <div class="flex flex-col gap-3">
            <div class="flex h-8 w-full rounded-md overflow-hidden shadow-inner">
              <div :style="{ backgroundColor: palette.primary }" class="flex-1 h-full"></div>
              <div :style="{ backgroundColor: palette.secondary }" class="flex-1 h-full"></div>
              <div :style="{ backgroundColor: palette.accent }" class="flex-1 h-full"></div>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-[11px] font-bold text-[#1a1b1c] truncate">{{ palette.name }}</span>
              <div v-if="modelValue.palette?.id === palette.id" class="w-4 h-4 text-[var(--admin-primary)]">
                <svg fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                </svg>
              </div>
            </div>
          </div>
        </button>
      </div>

      <!-- Theme Preview -->
      <div class="bg-white p-6 rounded-xl border border-[#c9cccf] mt-8">
        <h4 class="text-sm font-semibold text-[#1a1b1c] mb-2">Theme Preview</h4>
        <div class="flex items-center gap-12">
          <div class="flex-1 space-y-4">
            <div class="flex items-center gap-4">
              <div class="w-8 h-8 rounded" :style="{ backgroundColor: modelValue.palette?.primary }"></div>
              <span class="text-sm text-[#6d7175]">Primary: {{ modelValue.palette?.primary }}</span>
            </div>
            <div class="flex items-center gap-4">
              <div class="w-8 h-8 rounded" :style="{ backgroundColor: modelValue.palette?.secondary }"></div>
              <span class="text-sm text-[#6d7175]">Secondary: {{ modelValue.palette?.secondary }}</span>
            </div>
            <div class="flex items-center gap-4">
              <div class="w-8 h-8 rounded" :style="{ backgroundColor: modelValue.palette?.accent }"></div>
              <span class="text-sm text-[#6d7175]">Accent: {{ modelValue.palette?.accent }}</span>
            </div>
          </div>
          <div class="flex-[2] p-4 rounded-lg bg-[#f6f6f7] border border-[#c9cccf]">
            <p class="text-xs font-mono text-[#6d7175] mb-2">// Sample Button Preview</p>
            <button
              type="button"
              class="px-6 py-2 rounded-lg text-white font-bold transition-all"
              :style="{ backgroundColor: modelValue.palette?.primary }"
            >
              Action Button
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: { type: Object, required: true },
  palettes: { type: Array, required: true }
})

const emit = defineEmits(['update:modelValue'])

function updatePalette(palette) {
  emit('update:modelValue', { ...props.modelValue, palette })
}
</script>
