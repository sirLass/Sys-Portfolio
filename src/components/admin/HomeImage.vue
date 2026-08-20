<template>
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
    <!-- 1. Profile / Main Portrait Section -->
    <div class="flex flex-col bg-[#f6f6f7]/30 p-6 rounded-xl border border-[#c9cccf]">
      <div class="flex items-center justify-between mb-4">
        <label class="block text-sm font-semibold text-[#1a1b1c]">Main Portrait</label>
        <span class="text-[11px] text-gray-500 bg-white px-2 py-0.5 rounded border border-gray-200">Default Hero</span>
      </div>

      <div class="flex-1 flex flex-col items-center justify-center gap-4">
        <div class="relative group w-full h-full max-w-xs flex justify-center">
          <div class="w-56 h-64 rounded-2xl overflow-hidden border-2 border-[#c9cccf] bg-gradient-to-br from-gray-50 to-gray-100 shadow-md transition-all group-hover:border-[var(--admin-primary)]/50 relative flex items-center justify-center">
            <!-- Loading -->
            <div v-if="isLoading" class="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
              <svg class="w-8 h-8 text-gray-400 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
            <!-- Image -->
            <img
              v-else-if="modelValue.image"
              :src="modelValue.image"
              :alt="modelValue.name || 'Profile'"
              class="w-full h-full object-contain p-2"
              @error="handleImageError"
            />
            <!-- Empty state -->
            <div v-else class="absolute inset-0 flex items-center justify-center text-[#c9cccf]">
              <svg class="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>
          <!-- Edit overlay -->
          <div
            class="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl cursor-pointer"
            @click="triggerProfileInput"
          >
            <div class="p-3 bg-white rounded-full shadow-xl text-[var(--admin-primary)] transform scale-90 group-hover:scale-100 transition-transform">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </div>
          </div>
        </div>
        <input type="file" ref="profileInput" class="hidden" accept="image/*" @change="onProfileFileChange" />
        <div class="text-center">
          <p class="text-xs font-semibold text-[#1a1b1c]">Primary Cutout Photo</p>
          <p class="text-[11px] text-[#6d7175] mt-0.5">Transparent PNG recommended</p>
        </div>
      </div>
    </div>

    <!-- 2. Hover Reveal Image Section -->
    <div class="flex flex-col bg-[#f6f6f7]/30 p-6 rounded-xl border border-[#c9cccf]">
      <div class="flex items-center justify-between mb-4">
        <label class="block text-sm font-semibold text-[#1a1b1c]">Hover Reveal Image</label>
        <span class="text-[11px] text-primary-700 bg-primary-50 px-2 py-0.5 rounded border border-primary-200 font-medium">Cursor Lens Effect</span>
      </div>

      <div class="flex-1 flex flex-col items-center justify-center gap-4">
        <div class="relative group w-full h-full max-w-xs flex justify-center">
          <div class="w-56 h-64 rounded-2xl overflow-hidden border-2 border-[#c9cccf] bg-gradient-to-br from-gray-50 to-gray-100 shadow-md transition-all group-hover:border-[var(--admin-primary)]/50 relative flex items-center justify-center">
            <!-- Loading -->
            <div v-if="isLoading" class="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
              <svg class="w-8 h-8 text-gray-400 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
            <!-- Image -->
            <img
              v-else-if="modelValue.hoverImage"
              :src="modelValue.hoverImage"
              alt="Hover Reveal"
              class="w-full h-full object-contain p-2"
            />
            <!-- Empty state -->
            <div v-else class="absolute inset-0 flex flex-col items-center justify-center p-4 text-center text-[#6d7175]">
              <div class="w-12 h-12 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center mb-2 text-gray-400">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <p class="text-xs font-semibold text-gray-700">No Hover Image</p>
              <p class="text-[10px] text-gray-400 mt-1">Upload an image to reveal inside the cursor lens on hover</p>
            </div>
          </div>
          <!-- Edit overlay -->
          <div
            class="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl cursor-pointer"
            @click="triggerHoverInput"
          >
            <div class="p-3 bg-white rounded-full shadow-xl text-[var(--admin-primary)] transform scale-90 group-hover:scale-100 transition-transform">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </div>
          </div>
        </div>
        <input type="file" ref="hoverInput" class="hidden" accept="image/*" @change="onHoverFileChange" />
        
        <div class="flex items-center gap-2">
          <button
            type="button"
            @click="triggerHoverInput"
            class="px-3 py-1.5 text-xs font-semibold bg-white border border-[#c9cccf] rounded-lg hover:border-[var(--admin-primary)] text-[#1a1b1c] transition-all"
          >
            {{ modelValue.hoverImage ? 'Change Image' : 'Upload Hover Image' }}
          </button>
          <button
            v-if="modelValue.hoverImage"
            type="button"
            @click="$emit('update:modelValue', { ...modelValue, hoverImage: '' })"
            class="px-2.5 py-1.5 text-xs font-semibold text-red-600 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-all"
            title="Remove hover image"
          >
            Clear
          </button>
        </div>
      </div>
    </div>

    <!-- 3. Cover Photo Section -->
    <div class="flex flex-col bg-[#f6f6f7]/30 p-6 rounded-xl border border-[#c9cccf]">
      <div class="flex items-center justify-between mb-4">
        <label class="block text-sm font-semibold text-[#1a1b1c]">Cover Photo</label>
        <span class="text-[11px] text-gray-500 bg-white px-2 py-0.5 rounded border border-gray-200">16:9 Banner</span>
      </div>

      <div class="flex-1 flex flex-col items-center justify-center gap-4">
        <div class="relative group w-full max-w-xs">
          <div class="w-full relative rounded-2xl overflow-hidden border-2 border-[#c9cccf] bg-white shadow-md transition-all group-hover:border-[var(--admin-primary)]/50" style="padding-bottom: 56.25%;">
            <!-- Loading -->
            <div v-if="isLoading" class="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
              <svg class="w-8 h-8 text-gray-400 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
            <!-- Image -->
            <img
              v-else-if="modelValue.coverImage"
              :src="modelValue.coverImage"
              alt="Cover Photo"
              class="absolute inset-0 w-full h-full object-cover"
            />
            <!-- Empty state -->
            <div v-else class="absolute inset-0 flex flex-col items-center justify-center bg-[#f6f6f7] text-[#c9cccf]">
              <svg class="w-10 h-10 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span class="text-[11px] font-medium">No cover image</span>
            </div>
          </div>
          <!-- Edit overlay -->
          <div
            class="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl cursor-pointer"
            @click="triggerCoverInput"
          >
            <div class="p-3 bg-white rounded-full shadow-xl text-[var(--admin-primary)] transform scale-90 group-hover:scale-100 transition-transform">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </div>
          </div>
        </div>
        <input type="file" ref="coverInput" class="hidden" accept="image/*" @change="onCoverFileChange" />
        <div class="text-center">
          <p class="text-xs font-semibold text-[#1a1b1c]">Banner Header</p>
          <p class="text-[11px] text-[#6d7175] mt-0.5">Recommended: 16:9 ratio, 1920x1080px</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  modelValue: { type: Object, required: true },
  isLoading: { type: Boolean, default: false }
})

const emit = defineEmits(['upload', 'update:modelValue'])

const profileInput = ref(null)
const hoverInput = ref(null)
const coverInput = ref(null)

function triggerProfileInput() {
  profileInput.value?.click()
}

function triggerHoverInput() {
  hoverInput.value?.click()
}

function triggerCoverInput() {
  coverInput.value?.click()
}

function onProfileFileChange(e) {
  emit('upload', { field: 'image', event: e })
  e.target.value = ''
}

function onHoverFileChange(e) {
  emit('upload', { field: 'hoverImage', event: e })
  e.target.value = ''
}

function onCoverFileChange(e) {
  emit('upload', { field: 'coverImage', event: e })
  e.target.value = ''
}

function handleImageError(event) {
  event.target.src = '/me.png'
}
</script>
