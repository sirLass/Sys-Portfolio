<template>
  <div :class="['animate-pulse', wrapperClass]">
    <div v-if="type === 'stats'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div v-for="i in count" :key="i" class="bg-white p-6 rounded-2xl border border-[#e3e5e7]">
        <div class="flex items-center justify-between mb-4">
          <div class="w-10 h-10 bg-gray-200 rounded-lg"></div>
          <div class="w-16 h-5 bg-gray-200 rounded-full"></div>
        </div>
        <div class="h-4 w-24 bg-gray-200 rounded mb-2"></div>
        <div class="h-8 w-16 bg-gray-200 rounded"></div>
      </div>
    </div>

    <div v-else-if="type === 'form'" class="space-y-6">
      <div v-for="i in count" :key="i">
        <div class="h-4 w-24 bg-gray-200 rounded mb-2"></div>
        <div class="h-10 w-full bg-gray-200 rounded-md"></div>
      </div>
    </div>

    <div v-else-if="type === 'table'" class="space-y-4">
      <div v-for="i in count" :key="i" class="h-16 bg-gray-100 rounded-lg"></div>
    </div>

    <div v-else class="space-y-4">
      <div class="h-6 w-48 bg-gray-200 rounded"></div>
      <div class="h-4 w-full bg-gray-200 rounded"></div>
      <div class="h-4 w-3/4 bg-gray-200 rounded"></div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  type: { type: String, default: 'default', validator: v => ['stats', 'form', 'table', 'default'].includes(v) },
  count: { type: Number, default: 4 },
  wrapperClass: { type: String, default: '' }
})
</script>
