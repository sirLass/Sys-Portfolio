<template>
  <div class="space-y-6 bg-[#f6f6f7]/50 p-6 rounded-xl border border-[#e3e5e7]">
      <div class="flex items-center justify-between mb-2">
        <h3 class="text-base font-semibold text-[#1a1b1c]">Hero Information</h3>
        <p class="text-xs text-[#6d7175]">Toggle visibility on public site</p>
      </div>

      <!-- Name Field -->
      <FormField label="Name" for-id="name" :required="true">
        <template #label-right>
          <VisibilityToggle :visible="vis.hero.name" @toggle="$emit('toggleVis', 'hero', 'name')" />
        </template>
        <input
          id="name"
          :value="modelValue.name"
          @input="update('name', $event.target.value)"
          type="text"
          class="w-full px-4 py-2.5 text-sm text-[#1a1b1c] bg-white border border-[#c9cccf] rounded-md focus:outline-none focus:border-[var(--admin-primary)] focus:ring-2 focus:ring-[var(--admin-primary)]/20 transition-all placeholder:text-[#6d7175]"
          placeholder="Enter your name"
          required
        />
      </FormField>

      <!-- Title Field -->
      <FormField label="Title / Subtitle" for-id="title">
        <template #label-right>
          <VisibilityToggle :visible="vis.hero.title" @toggle="$emit('toggleVis', 'hero', 'title')" />
        </template>
        <input
          id="title"
          :value="modelValue.title"
          @input="update('title', $event.target.value)"
          type="text"
          class="w-full px-4 py-2.5 text-sm text-[#1a1b1c] bg-white border border-[#c9cccf] rounded-md focus:outline-none focus:border-[var(--admin-primary)] focus:ring-2 focus:ring-[var(--admin-primary)]/20 transition-all placeholder:text-[#6d7175]"
          placeholder="e.g., Aspiring Full Stack Developer"
        />
      </FormField>

      <!-- Description Field -->
      <FormField label="Description" for-id="description">
        <template #label-right>
          <VisibilityToggle :visible="vis.hero.description" @toggle="$emit('toggleVis', 'hero', 'description')" />
        </template>
        <textarea
          id="description"
          :value="modelValue.description"
          @input="update('description', $event.target.value)"
          rows="8"
          class="w-full px-4 py-2.5 text-sm text-[#1a1b1c] bg-white border border-[#c9cccf] rounded-md focus:outline-none focus:border-[var(--admin-primary)] focus:ring-2 focus:ring-[var(--admin-primary)]/20 transition-all placeholder:text-[#6d7175] resize-y"
          placeholder="Write a brief description about yourself..."
        ></textarea>
        <p class="mt-1 text-xs text-[#6d7175]">{{ (modelValue.description || '').length }}/500 characters</p>
      </FormField>

      <!-- Gradient Position Slider -->
      <FormField label="Gradient Position" for-id="gradientPosition">
        <div class="flex items-center justify-between mb-2">
          <span class="text-xs text-[#6d7175]">Top: transparent to bottom: gradient</span>
          <span class="text-xs font-mono text-[var(--admin-primary)] font-bold">{{ modelValue.gradientPosition ?? 85 }}%</span>
        </div>
        <div class="relative">
          <input
            id="gradientPosition"
            type="range"
            :value="modelValue.gradientPosition ?? 85"
            @input="update('gradientPosition', Number($event.target.value))"
            min="0"
            max="100"
            step="1"
            class="w-full h-2 bg-[#e3e5e7] rounded-lg appearance-none cursor-pointer accent-[var(--admin-primary)]"
          />
          <div class="flex justify-between mt-1">
            <span class="text-[10px] text-[#6d7175]">0% (full)</span>
            <span class="text-[10px] text-[#6d7175]">50%</span>
            <span class="text-[10px] text-[#6d7175]">100% (none)</span>
          </div>
        </div>
        <p class="mt-2 text-xs text-[#6d7175]">Controls where the gradient starts. Lower values push the gradient further down the page.</p>
      </FormField>

      <!-- Gradient Opacity Slider -->
      <FormField label="Gradient Intensity" for-id="gradientOpacity">
        <div class="flex items-center justify-between mb-2">
          <span class="text-xs text-[#6d7175]">Opacity of the gradient color</span>
          <span class="text-xs font-mono text-[var(--admin-primary)] font-bold">{{ modelValue.gradientOpacity ?? 80 }}%</span>
        </div>
        <div class="relative">
          <input
            id="gradientOpacity"
            type="range"
            :value="modelValue.gradientOpacity ?? 80"
            @input="update('gradientOpacity', Number($event.target.value))"
            min="0"
            max="100"
            step="1"
            class="w-full h-2 bg-[#e3e5e7] rounded-lg appearance-none cursor-pointer accent-[var(--admin-primary)]"
          />
          <div class="flex justify-between mt-1">
            <span class="text-[10px] text-[#6d7175]">0% (invisible)</span>
            <span class="text-[10px] text-[#6d7175]">50%</span>
            <span class="text-[10px] text-[#6d7175]">100% (solid)</span>
          </div>
        </div>
        <p class="mt-2 text-xs text-[#6d7175]">Higher values make the gradient more opaque and prominent.</p>
      </FormField>

      <!-- Live Preview Strip -->
      <div class="bg-white p-4 rounded-lg border border-[#e3e5e7]">
        <p class="text-xs font-semibold text-[#1a1b1c] mb-3">Live Preview</p>
        <div class="relative h-20 rounded-lg overflow-hidden bg-gradient-to-br from-primary-100 via-[#FAF9F6] to-blue-100">
          <img src="https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=400&auto=format&fit=crop" class="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay" alt="" />
          <div
            class="absolute inset-0 transition-all duration-300"
            :style="previewGradientStyle"
          ></div>
          <div class="absolute bottom-2 left-3 text-[10px] font-bold text-[#1a1b1c] bg-white/80 px-2 py-0.5 rounded">Cover Gradient Preview</div>
        </div>
      </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import FormField from './ui/FormField.vue'
import VisibilityToggle from './ui/VisibilityToggle.vue'

const props = defineProps({
  modelValue: { type: Object, required: true },
  vis: { type: Object, required: true }
})

const emit = defineEmits(['update:modelValue', 'toggleVis'])

const previewGradientStyle = computed(() => {
  const pos = props.modelValue.gradientPosition ?? 85
  const opacity = (props.modelValue.gradientOpacity ?? 80) / 100
  return {
    background: `linear-gradient(to bottom, transparent 0%, transparent ${pos}%, rgba(250, 249, 246, ${opacity}) 100%)`
  }
})

function update(field, value) {
  emit('update:modelValue', { ...props.modelValue, [field]: value })
}
</script>
