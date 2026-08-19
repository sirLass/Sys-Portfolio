<template>
  <div>
    <div class="flex items-center justify-between mb-1.5">
      <label :for="forId" class="text-sm font-medium text-[#1a1b1c]">
        {{ label }}
        <span v-if="required" class="text-[#d72c0d] ml-0.5">*</span>
      </label>
      <slot name="label-right" />
    </div>
    <slot />
    <p v-if="helpText" class="mt-1.5 text-xs text-[#6d7175]">{{ helpText }}</p>
    <slot name="after" />
  </div>
</template>

<script setup>
defineProps({
  label: { type: String, required: true },
  forId: { type: String, default: '' },
  required: { type: Boolean, default: false },
  helpText: { type: String, default: '' }
})
</script>
