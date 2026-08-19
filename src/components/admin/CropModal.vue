<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
    <div class="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-[fadeIn_0.2s_ease-out]">
      <!-- Header -->
      <div class="px-6 py-4 border-b border-[#e3e5e7] flex items-center justify-between bg-white sticky top-0 z-10">
        <h3 class="text-lg font-bold text-[#1a1b1c]">Crop Image</h3>
        <button type="button" @click="$emit('cancel')" class="text-[#6d7175] hover:text-[#1a1b1c] transition-colors p-1 rounded-md hover:bg-[#f6f6f7]">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      <!-- Cropper Container -->
      <div class="flex-1 bg-[#1a1b1c] p-4 sm:p-6 overflow-hidden flex items-center justify-center min-h-[400px]">
        <div class="w-full h-full max-h-[60vh] flex items-center justify-center">
          <img ref="imageEl" :src="image" alt="Image to crop" class="max-w-full max-h-full block" />
        </div>
      </div>

      <!-- Footer -->
      <div class="px-6 py-4 border-t border-[#e3e5e7] bg-white flex flex-col sm:flex-row items-center justify-between gap-4 sticky bottom-0 z-10">
        <p class="text-xs text-[#6d7175] hidden sm:block">
          Drag the corners or move the box to adjust the crop area.
        </p>
        <div class="flex items-center gap-3 w-full sm:w-auto">
          <button
            type="button"
            @click="$emit('cancel')"
            class="flex-1 sm:flex-none px-4 py-2 text-sm font-medium text-[#1a1b1c] bg-white border border-[#c9cccf] rounded-md hover:bg-[#f6f6f7] transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            @click="applyCrop"
            class="flex-1 sm:flex-none px-6 py-2 text-sm font-medium text-white bg-[var(--admin-primary)] rounded-md hover:bg-[var(--admin-secondary)] transition-colors shadow-sm inline-flex items-center justify-center gap-2"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
            </svg>
            Apply Crop
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'

const props = defineProps({
  image: { type: String, required: true },
  aspectRatio: { type: Number, default: 1 }
})

const emit = defineEmits(['confirm', 'cancel'])

const imageEl = ref(null)
let cropper = null

onMounted(() => {
  nextTick(() => {
    setTimeout(() => {
      if (!imageEl.value) return
      const initCropper = () => {
        if (cropper) cropper.destroy()
        cropper = new Cropper(imageEl.value, {
          aspectRatio: props.aspectRatio,
          viewMode: 2,
          autoCropArea: 1,
          background: false
        })
      }
      if (imageEl.value.complete && imageEl.value.naturalWidth > 0) {
        initCropper()
      } else {
        imageEl.value.onload = initCropper
      }
    }, 50)
  })
})

onUnmounted(() => {
  if (cropper) {
    cropper.destroy()
    cropper = null
  }
})

function applyCrop() {
  if (!cropper) return
  const canvas = cropper.getCroppedCanvas({ maxWidth: 1920, maxHeight: 1080 })
  emit('confirm', canvas)
}
</script>
