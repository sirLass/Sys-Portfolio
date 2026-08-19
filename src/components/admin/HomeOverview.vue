<template>
  <div class="space-y-8">
    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        label="Total Projects"
        :value="stats.totalProjects"
        color="primary"
        badge="+12%"
        icon-path="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
      />
      <StatCard
        label="Total Views"
        :value="stats.totalViews"
        color="blue"
        badge="+1.2k"
        icon-path="M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
      />
      <StatCard
        label="Web Apps"
        :value="stats.webApps"
        color="purple"
        icon-path="M9.75 17L9 21h6l-.75-4M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
      <StatCard
        label="Systems"
        :value="stats.systems"
        color="orange"
        icon-path="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
      />
    </div>

    <!-- Analytics Hint -->
    <div class="bg-[#f6f6f7] p-6 rounded-2xl border border-[#e3e5e7]">
      <div class="flex items-center gap-4">
        <div class="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[var(--admin-primary)] shadow-sm border border-[#e3e5e7]">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <div>
          <h4 class="text-base font-bold text-[#1a1b1c]">Analytics Overview</h4>
          <p class="text-sm text-[#6d7175]">Statistics are currently in preview mode. Integration with project tracking metadata is in progress.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import StatCard from './ui/StatCard.vue'

defineProps({
  stats: { type: Object, required: true }
})
</script>
