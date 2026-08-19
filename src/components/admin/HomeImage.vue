<template>
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
    <!-- Profile Image Section -->
    <div class="flex flex-col bg-[#f6f6f7]/30 p-8 rounded-xl border border-[#c9cccf]">
      <label class="block text-sm font-semibold text-[#1a1b1c] mb-6">Profile Image</label>

      <div class="flex-1 flex flex-col items-center justify-center gap-6">
        <div class="relative group w-full h-full max-w-sm">
          <div class="w-64 h-64 rounded-2xl overflow-hidden border-2 border-[#c9cccf] bg-white shadow-md transition-all group-hover:border-[var(--admin-primary)]/50 relative">
            <!-- Loading -->
            <div v-if="isLoading" class="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
              <svg class="w-10 h-10 text-gray-400 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
            <!-- Image -->
            <img
              v-else-if="modelValue.image"
              :src="modelValue.image"
              :alt="modelValue.name || 'Profile'"
              class="w-full h-full object-cover"
              @error="handleImageError"
            />
            <!-- Empty state -->
            <div v-else class="absolute inset-0 flex items-center justify-center text-[#c9cccf]">
              <svg class="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>
          <!-- Edit overlay -->
          <div
            class="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl cursor-pointer"
            @click="$emit('upload', { field: 'image' })"
          >
            <div class="p-3 bg-white rounded-full shadow-xl text-[var(--admin-primary)] transform scale-90 group-hover:scale-100 transition-transform">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </div>
          </div>
        </div>
        <input type="file" ref="profileInput" class="hidden" accept="image/*" @change="(e) => $emit('upload', { field: 'image', event: e })" />
        <div class="text-center">
          <p class="text-sm font-medium text-[#1a1b1c]">Representative Avatar</p>
          <p class="text-xs text-[#6d7175] mt-1">Recommended: Square, min 400x400px</p>
        </div>
      </div>
    </div>

    <!-- Cover Photo Section -->
    <div class="flex flex-col bg-[#f6f6f7]/30 p-8 rounded-xl border border-[#c9cccf]">
      <label class="block text-sm font-semibold text-[#1a1b1c] mb-6">Cover Photo</label>

      <div class="flex-1 flex flex-col items-center justify-center gap-6">
        <div class="relative group w-full max-w-lg">
          <div class="w-full relative rounded-2xl overflow-hidden border-2 border-[#c9cccf] bg-white shadow-md transition-all group-hover:border-[var(--admin-primary)]/50" style="padding-bottom: 56.25%;">
            <!-- Loading -->
            <div v-if="isLoading" class="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
              <svg class="w-10 h-10 text-gray-400 animate-spin" fill="none" viewBox="0 0 24 24">
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
              <svg class="w-16 h-16 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span class="text-xs font-medium">No cover image selected</span>
            </div>
          </div>
          <!-- Edit overlay -->
          <div
            class="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl cursor-pointer"
            @click="$emit('upload', { field: 'coverImage' })"
          >
            <div class="p-3 bg-white rounded-full shadow-xl text-[var(--admin-primary)] transform scale-90 group-hover:scale-100 transition-transform">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </div>
          </div>
        </div>
        <input type="file" ref="coverInput" class="hidden" accept="image/*" @change="(e) => $emit('upload', { field: 'coverImage', event: e })" />
        <div class="text-center">
          <p class="text-sm font-medium text-[#1a1b1c]">Landing Page Header</p>
          <p class="text-xs text-[#6d7175] mt-1">Recommended: 16:9 ratio, min 1920x1080px</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  modelValue: { type: Object, required: true },
  isLoading: { type: Boolean, default: false }
})

defineEmits(['upload'])

function handleImageError(event) {
  event.target.src = '/me.png'
}
</script>
