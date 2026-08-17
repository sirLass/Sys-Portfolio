<template>
  <div class="p-6">
    <!-- Success/Error Messages -->
    <div v-if="showSuccess" class="mb-6 flex items-center gap-3 p-4 bg-[var(--admin-primary-light)] border-[var(--admin-primary)] border rounded-lg">
      <svg class="w-5 h-5 text-[var(--admin-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
      </svg>
      <p class="text-sm font-medium text-[var(--admin-secondary)]">Changes saved successfully!</p>
    </div>
    
    <div v-if="showError" class="mb-6 flex items-center gap-3 p-4 bg-[#fff4f4] border border-[#d72c0d] rounded-lg">
      <svg class="w-5 h-5 text-[#d72c0d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <p class="text-sm font-medium text-[#d72c0d]">{{ errorMessage }}</p>
    </div>

    <!-- Tab Navigation -->
    <div class="mb-6 border-b border-[#c9cccf]">
      <nav class="flex gap-1">
        <button
          @click="activeTab = 'Overview'"
          :class="[
            'px-4 py-3 text-sm font-medium border-b-2 transition-colors',
            activeTab === 'Overview'
              ? 'border-[var(--admin-primary)] text-[var(--admin-primary)]'
              : 'border-transparent text-[#6d7175] hover:text-[#1a1b1c]'
          ]"
        >
          <span class="flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Overview
          </span>
        </button>
        <button
          @click="activeTab = 'Details'"
          :class="[
            'px-4 py-3 text-sm font-medium border-b-2 transition-colors',
            activeTab === 'Details'
              ? 'border-[var(--admin-primary)] text-[var(--admin-primary)]'
              : 'border-transparent text-[#6d7175] hover:text-[#1a1b1c]'
          ]"
        >
          <span class="flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Details
          </span>
        </button>
        <button
          @click="activeTab = 'Theme'"
          :class="[
            'px-4 py-3 text-sm font-medium border-b-2 transition-colors',
            activeTab === 'Theme'
              ? 'border-[var(--admin-primary)] text-[var(--admin-primary)]'
              : 'border-transparent text-[#6d7175] hover:text-[#1a1b1c]'
          ]"
        >
          <span class="flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17l.343-.343" />
            </svg>
            Portfolio Theme
          </span>
        </button>
        <button
          @click="activeTab = 'Image'"
          :class="[
            'px-4 py-3 text-sm font-medium border-b-2 transition-colors',
            activeTab === 'Image'
              ? 'border-[var(--admin-primary)] text-[var(--admin-primary)]'
              : 'border-transparent text-[#6d7175] hover:text-[#1a1b1c]'
          ]"
        >
          <span class="flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Profile Image
          </span>
        </button>
      </nav>
    </div>

    <form @submit.prevent="handleSave">
      <!-- Overview Tab -->
      <div v-if="activeTab === 'Overview'" class="space-y-8">
        <!-- Stats Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <!-- Total Projects -->
          <div class="bg-white p-6 rounded-2xl border border-[#e3e5e7] shadow-sm hover:shadow-md transition-shadow">
            <div class="flex items-center justify-between mb-4">
              <div class="p-2 bg-[var(--admin-primary)]/10 rounded-lg text-[var(--admin-primary)]">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <span class="text-xs font-semibold text-[var(--admin-primary)] bg-[var(--admin-primary)]/10 px-2 py-1 rounded-full">+12%</span>
            </div>
            <p class="text-sm font-medium text-[#6d7175]">Total Projects</p>
            <h3 class="text-3xl font-bold text-[#1a1b1c] mt-1">{{ stats.totalProjects }}</h3>
          </div>

          <!-- Total Views -->
          <div class="bg-white p-6 rounded-2xl border border-[#e3e5e7] shadow-sm hover:shadow-md transition-shadow">
            <div class="flex items-center justify-between mb-4">
              <div class="p-2 bg-[#2563eb]/10 rounded-lg text-[#2563eb]">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <span class="text-xs font-semibold text-[#2563eb] bg-[#dbeafe] px-2 py-1 rounded-full">+1.2k</span>
            </div>
            <p class="text-sm font-medium text-[#6d7175]">Total Views</p>
            <h3 class="text-3xl font-bold text-[#1a1b1c] mt-1">{{ stats.totalViews }}</h3>
          </div>

          <!-- Web Applications -->
          <div class="bg-white p-6 rounded-2xl border border-[#e3e5e7] shadow-sm hover:shadow-md transition-shadow">
            <div class="flex items-center justify-between mb-4">
              <div class="p-2 bg-[#7c3aed]/10 rounded-lg text-[#7c3aed]">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 21h6l-.75-4M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <p class="text-sm font-medium text-[#6d7175]">Web Apps</p>
            <h3 class="text-3xl font-bold text-[#1a1b1c] mt-1">{{ stats.webApps }}</h3>
          </div>

          <!-- Systems -->
          <div class="bg-white p-6 rounded-2xl border border-[#e3e5e7] shadow-sm hover:shadow-md transition-shadow">
            <div class="flex items-center justify-between mb-4">
              <div class="p-2 bg-[#f97316]/10 rounded-lg text-[#f97316]">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
            </div>
            <p class="text-sm font-medium text-[#6d7175]">Systems</p>
            <h3 class="text-3xl font-bold text-[#1a1b1c] mt-1">{{ stats.systems }}</h3>
          </div>
        </div>

        <!-- Quick Actions / Helpful Hint -->
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

      <!-- Details Tab -->
      <div v-if="activeTab === 'Details'" class="max-w-3xl mx-auto">
        <div class="space-y-6 bg-[#f6f6f7]/30 p-8 rounded-xl border border-[#c9cccf]">
          <h3 class="text-base font-semibold text-[#1a1b1c] mb-4">Hero Information</h3>
          
          <!-- Name Field -->
          <div>
            <label for="name" class="block text-sm font-medium text-[#1a1b1c] mb-2">
              Name <span class="text-[#d72c0d]">*</span>
            </label>
            <input
              id="name"
              v-model="heroData.name"
              type="text"
              class="w-full px-4 py-2.5 text-sm text-[#1a1b1c] bg-white border border-[#c9cccf] rounded-md focus:outline-none focus:border-[var(--admin-primary)] focus:ring-2 focus:ring-[var(--admin-primary)]/20 transition-all placeholder:text-[#6d7175]"
              placeholder="Enter your name"
              required
            />
          </div>

          <!-- Title Field -->
          <div>
            <label for="title" class="block text-sm font-medium text-[#1a1b1c] mb-2">
              Title / Subtitle
            </label>
            <input
              id="title"
              v-model="heroData.title"
              type="text"
              class="w-full px-4 py-2.5 text-sm text-[#1a1b1c] bg-white border border-[#c9cccf] rounded-md focus:outline-none focus:border-[var(--admin-primary)] focus:ring-2 focus:ring-[var(--admin-primary)]/20 transition-all placeholder:text-[#6d7175]"
              placeholder="e.g., Aspiring Full Stack Developer"
            />
          </div>

          <!-- Description Field -->
          <div>
            <label for="description" class="block text-sm font-medium text-[#1a1b1c] mb-2">
              Description
            </label>
            <textarea
              id="description"
              v-model="heroData.description"
              rows="8"
              class="w-full px-4 py-2.5 text-sm text-[#1a1b1c] bg-white border border-[#c9cccf] rounded-md focus:outline-none focus:border-[var(--admin-primary)] focus:ring-2 focus:ring-[var(--admin-primary)]/20 transition-all placeholder:text-[#6d7175] resize-y"
              placeholder="Write a brief description about yourself..."
            ></textarea>
            <p class="mt-1 text-xs text-[#6d7175]">{{ heroData.description.length }}/500 characters</p>
          </div>
        </div>
      </div>

      <!-- Portfolio Theme Tab -->
      <div v-if="activeTab === 'Theme'" class="max-w-5xl">
        <div class="space-y-6">
          <div class="flex items-center justify-between">
            <h3 class="text-base font-semibold text-[#1a1b1c]">Portfolio Color Palette</h3>
            <div :style="{ backgroundColor: heroData.palette?.primary }" class="px-3 py-1 rounded-full text-white text-xs font-bold shadow-sm">
              Current: {{ heroData.palette?.name }}
            </div>
          </div>
          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <button
              v-for="(palette, index) in PRESET_PALETTES"
              :key="index"
              type="button"
              @click="heroData.palette = palette"
              :class="[
                'group p-3 rounded-xl border-2 transition-all text-left shadow-sm',
                heroData.palette?.id === palette.id
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
                  <div v-if="heroData.palette?.id === palette.id" class="w-4 h-4 text-[var(--admin-primary)]">
                    <svg fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                  </div>
                </div>
              </div>
            </button>
          </div>
          <div class="bg-white p-6 rounded-xl border border-[#c9cccf] mt-8">
            <h4 class="text-sm font-semibold text-[#1a1b1c] mb-2">Theme Preview</h4>
            <div class="flex items-center gap-12">
              <div class="flex-1 space-y-4">
                <div class="flex items-center gap-4">
                  <div class="w-8 h-8 rounded" :style="{ backgroundColor: heroData.palette?.primary }"></div>
                  <span class="text-sm text-[#6d7175]">Primary: {{ heroData.palette?.primary }}</span>
                </div>
                <div class="flex items-center gap-4">
                  <div class="w-8 h-8 rounded" :style="{ backgroundColor: heroData.palette?.secondary }"></div>
                  <span class="text-sm text-[#6d7175]">Secondary: {{ heroData.palette?.secondary }}</span>
                </div>
                <div class="flex items-center gap-4">
                  <div class="w-8 h-8 rounded" :style="{ backgroundColor: heroData.palette?.accent }"></div>
                  <span class="text-sm text-[#6d7175]">Accent: {{ heroData.palette?.accent }}</span>
                </div>
              </div>
              <div class="flex-[2] p-4 rounded-lg bg-[#f6f6f7] border border-[#c9cccf]">
                <p class="text-xs font-mono text-[#6d7175] mb-2">// Sample Button Preview</p>
                <button 
                  type="button"
                  class="px-6 py-2 rounded-lg text-white font-bold transition-all"
                  :style="{ backgroundColor: heroData.palette?.primary }"
                >
                  Action Button
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Image Tab -->
      <div v-else-if="activeTab === 'Image'">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          <!-- Profile Image Section -->
          <div class="flex flex-col bg-[#f6f6f7]/30 p-8 rounded-xl border border-[#c9cccf]">
            <label class="block text-sm font-semibold text-[#1a1b1c] mb-6">Profile Image</label>
            
            <div class="flex-1 flex flex-col items-center justify-center gap-6">
              <!-- Preview with Edit Overlay -->
              <div class="relative group w-full h-full max-w-sm">
                <div class="w-64 h-64 rounded-2xl overflow-hidden border-2 border-[#c9cccf] bg-white shadow-md transition-all group-hover:border-[var(--admin-primary)]/50 relative">
                  <!-- Loading Animation -->
                  <div v-if="isLoadingInfo" class="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                    <svg class="w-10 h-10 text-gray-400 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  </div>
                  <!-- Image -->
                  <img 
                    v-else-if="heroData.image"
                    :src="heroData.image" 
                    :alt="heroData.name || 'Profile'"
                    class="w-full h-full object-cover"
                    @error="handleImageError"
                  />
                  <!-- Icon indicator when empty -->
                  <div v-else class="absolute inset-0 flex items-center justify-center text-[#c9cccf]">
                    <svg class="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                </div>
                <!-- Edit Button Overlay -->
                <div class="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl cursor-pointer" @click="triggerProfileUpload">
                  <div class="p-3 bg-white rounded-full shadow-xl text-[var(--admin-primary)] transform scale-90 group-hover:scale-100 transition-transform">
                    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </div>
                </div>
              </div>
              <input type="file" ref="profileInput" class="hidden" accept="image/*" @change="(e) => handleImageUpload(e, 'image')" />
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
              <!-- Preview with Edit Overlay -->
              <div class="relative group w-full max-w-lg">
                <!-- Guaranteed Aspect Ratio Container -->
                <div class="w-full relative rounded-2xl overflow-hidden border-2 border-[#c9cccf] bg-white shadow-md transition-all group-hover:border-[var(--admin-primary)]/50" style="padding-bottom: 56.25%;">
                  <!-- Loading Animation -->
                  <div v-if="isLoadingInfo" class="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
                    <svg class="w-10 h-10 text-gray-400 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  </div>
                  <!-- Image -->
                  <img 
                    v-else-if="heroData.coverImage"
                    :src="heroData.coverImage" 
                    alt="Cover Photo"
                    class="absolute inset-0 w-full h-full object-cover"
                  />
                  <!-- Placeholder Content -->
                  <div v-else class="absolute inset-0 flex flex-col items-center justify-center bg-[#f6f6f7] text-[#c9cccf]">
                    <svg class="w-16 h-16 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span class="text-xs font-medium">No cover image selected</span>
                  </div>
                </div>
                <!-- Edit Button Overlay -->
                <div class="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl cursor-pointer" @click="triggerCoverUpload">
                  <div class="p-3 bg-white rounded-full shadow-xl text-[var(--admin-primary)] transform scale-90 group-hover:scale-100 transition-transform">
                    <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </div>
                </div>
              </div>
              <input type="file" ref="coverInput" class="hidden" accept="image/*" @change="(e) => handleImageUpload(e, 'coverImage')" />
              <div class="text-center">
                <p class="text-sm font-medium text-[#1a1b1c]">Landing Page Header</p>
                <p class="text-xs text-[#6d7175] mt-1">Recommended: 16:9 ratio, min 1920x1080px</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="mt-8 pt-6 border-t border-[#c9cccf] flex items-center justify-end gap-3">
        <button
          type="button"
          @click="loadFromDb"
          class="px-4 py-2 text-sm font-medium text-[#1a1b1c] hover:text-[var(--admin-primary)] transition-colors"
        >
          Reset
        </button>
        <button
          type="submit"
          :disabled="saving"
          class="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-medium text-white bg-[var(--admin-primary)] rounded-md hover:bg-[var(--admin-secondary)] transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg v-if="saving" class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>{{ saving ? 'Saving...' : 'Save changes' }}</span>
        </button>
      </div>
    </form>
  </div>

  <!-- Crop Modal -->
  <div v-if="cropModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
    <div class="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-[fadeIn_0.2s_ease-out]">
      <!-- Header -->
      <div class="px-6 py-4 border-b border-[#e3e5e7] flex items-center justify-between bg-white sticky top-0 z-10">
        <h3 class="text-lg font-bold text-[#1a1b1c]">
          {{ cropperTargetField === 'image' ? 'Crop Profile Image' : 'Crop Cover Photo' }}
        </h3>
        <button type="button" @click="cancelCrop" class="text-[#6d7175] hover:text-[#1a1b1c] transition-colors p-1 rounded-md hover:bg-[#f6f6f7]">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </div>

      <!-- Cropper Container -->
      <div class="flex-1 bg-[#1a1b1c] p-4 sm:p-6 overflow-hidden flex items-center justify-center min-h-[400px]">
        <div class="w-full h-full max-h-[60vh] flex items-center justify-center">
          <img ref="imageElement" :src="imageToCrop" alt="Image to crop" class="max-w-full max-h-full block">
        </div>
      </div>

      <!-- Footer/Actions -->
      <div class="px-6 py-4 border-t border-[#e3e5e7] bg-white flex flex-col sm:flex-row items-center justify-between gap-4 sticky bottom-0 z-10">
        <p class="text-xs text-[#6d7175] hidden sm:block">
          Drag the corners or move the box to adjust the crop area.
        </p>
        <div class="flex items-center gap-3 w-full sm:w-auto">
          <button
            type="button"
            @click="cancelCrop"
            class="flex-1 sm:flex-none px-4 py-2 text-sm font-medium text-[#1a1b1c] bg-white border border-[#c9cccf] rounded-md hover:bg-[#f6f6f7] transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            @click="confirmCrop"
            class="flex-1 sm:flex-none px-6 py-2 text-sm font-medium text-white bg-[var(--admin-primary)] rounded-md hover:bg-[var(--admin-secondary)] transition-colors shadow-sm inline-flex items-center justify-center gap-2"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
            Apply Crop
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, inject, nextTick } from 'vue'
import { supabase } from '../../supabase'
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'

const addToast = inject('addToast')
const updateTheme = inject('updateTheme')
const updateGlobalTheme = inject('updateGlobalTheme')

const PRESET_PALETTES = [
  { id: 'shopify-green', name: 'Shopify Green', primary: '#008060', secondary: '#004c3f', accent: '#95bf47' },
  { id: 'modern-blue', name: 'Modern Blue', primary: '#2563eb', secondary: '#1e40af', accent: '#60a5fa' },
  { id: 'deep-purple', name: 'Deep Purple', primary: '#7c3aed', secondary: '#5b21b6', accent: '#a78bfa' },
  { id: 'sunset-orange', name: 'Sunset Orange', primary: '#f97316', secondary: '#c2410c', accent: '#fdba74' },
  { id: 'rose-pink', name: 'Rose Pink', primary: '#e11d48', secondary: '#9f1239', accent: '#fb7185' },
  { id: 'emerald-city', name: 'Emerald', primary: '#059669', secondary: '#065f46', accent: '#34d399' },
  { id: 'midnight-navy', name: 'Midnight', primary: '#1e293b', secondary: '#0f172a', accent: '#64748b' },
  { id: 'cyber-cyan', name: 'Cyber Cyan', primary: '#0891b2', secondary: '#155e75', accent: '#22d3ee' },
  { id: 'royal-indigo', name: 'Royal Indigo', primary: '#4f46e5', secondary: '#3730a3', accent: '#818cf8' },
  { id: 'crimson-red', name: 'Crimson', primary: '#dc2626', secondary: '#991b1b', accent: '#f87171' },
  { id: 'forest-leaf', name: 'Forest', primary: '#166534', secondary: '#14532d', accent: '#4ade80' },
  { id: 'slate-stone', name: 'Slate', primary: '#475569', secondary: '#334155', accent: '#94a3b8' },
  { id: 'amber-glow', name: 'Amber', primary: '#d97706', secondary: '#92400e', accent: '#fbbf24' },
  { id: 'teal-ocean', name: 'Teal', primary: '#0d9488', secondary: '#115e59', accent: '#2dd4bf' },
  { id: 'fuchsia-pop', name: 'Fuchsia', primary: '#c026d3', secondary: '#86198f', accent: '#e879f9' },
  { id: 'sky-light', name: 'Sky', primary: '#0ea5e9', secondary: '#075985', accent: '#7dd3fc' },
  { id: 'coffee-bean', name: 'Coffee', primary: '#78350f', secondary: '#451a03', accent: '#b45309' },
  { id: 'mint-fresh', name: 'Mint', primary: '#10b981', secondary: '#065f46', accent: '#6ee7b7' },
  { id: 'violet-night', name: 'Violet', primary: '#8b5cf6', secondary: '#6d28d9', accent: '#c4b5fd' },
  { id: 'gold-lux', name: 'Gold', primary: '#ca8a04', secondary: '#854d0e', accent: '#facc15' },
  { id: 'earth-brown', name: 'Earth', primary: '#b45309', secondary: '#78350f', accent: '#d97706' },
  { id: 'lime-zest', name: 'Lime', primary: '#65a30d', secondary: '#3f6212', accent: '#a3e635' },
  { id: 'zinc-cool', name: 'Zinc', primary: '#52525b', secondary: '#27272a', accent: '#a1a1aa' },
  { id: 'cherry-blossom', name: 'Cherry', primary: '#db2777', secondary: '#9d174d', accent: '#f472b6' }
]

const isLoadingInfo = ref(true)

const heroData = ref({
  name: '',
  title: '',
  description: '',
  image: '',
  coverImage: '',
  palette: PRESET_PALETTES[0]
})

const activeTab = ref('Overview')
const stats = ref({
  totalProjects: 12,
  totalViews: '2.4k',
  webApps: 8,
  systems: 4
})
const saving = ref(false)
const showSuccess = ref(false)
const showError = ref(false)
const errorMessage = ref('')
const currentId = ref(null)

// Image Upload Refs
const profileInput = ref(null)
const coverInput = ref(null)

// Cropper Refs
const cropModalOpen = ref(false)
const cropperInstance = ref(null)
const imageToCrop = ref('')
const cropperTargetField = ref('')
const imageElement = ref(null)

async function loadFromDb() {
  isLoadingInfo.value = true
  if (!supabase) {
    // If Supabase is not configured, use default values
    heroData.value = {
      name: 'Brian Perez',
      title: 'Aspiring Full Stack Developer',
      description: 'As a Aspiring Developer and UI/UX Designer, I craft solutions that are not only visually appealing but also intuitive and efficient — combining thoughtful design with clean, scalable code.',
      image: '/me.png',
      coverImage: 'https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2000&auto=format&fit=crop',
      palette: PRESET_PALETTES[0]
    }
    isLoadingInfo.value = false
    return
  }

  try {
    const { data, error } = await supabase
      .from('personal_info')
      .select('id, name, title, description, image, cover_image, palette')
      .order('updated_at', { ascending: false })
      .limit(1)
      .maybeSingle()

    if (error) throw error
    if (data) {
      currentId.value = data.id
      heroData.value = {
        name: data.name ?? '',
        title: data.title ?? '',
        description: data.description ?? '',
        image: data.image || '/me.png',
        coverImage: data.cover_image || 'https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2000&auto=format&fit=crop',
        palette: data.palette ? 
          (typeof data.palette === 'string' ? JSON.parse(data.palette) : data.palette) : 
          PRESET_PALETTES[0]
      }
      return
    }
  } catch (e) {
    console.error('Error loading personal_info:', e)
  } finally {
    isLoadingInfo.value = false
  }
  heroData.value = {
    name: 'Brian Perez',
    title: 'Aspiring Full Stack Developer',
    description: 'As a Aspiring Developer and UI/UX Designer, I craft solutions that are not only visually appealing but also intuitive and efficient — combining thoughtful design with clean, scalable code.',
    image: '/me.png',
    coverImage: 'https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2000&auto=format&fit=crop'
  }
}

onMounted(loadFromDb)

const handleImageError = (event) => {
  event.target.src = '/me.png'
}

const triggerProfileUpload = () => {
  profileInput.value?.click()
}

const triggerCoverUpload = () => {
  coverInput.value?.click()
}

const handleImageUpload = (event, field) => {
  const file = event.target.files?.[0]
  if (!file) return

  if (!file.type.startsWith('image/')) {
    if (addToast) addToast('Please select an image file', 'error')
    return
  }

  if (file.size > 5 * 1024 * 1024) {
    if (addToast) addToast('Image size should be less than 5MB', 'error')
    return
  }

  const reader = new FileReader()
  reader.onload = (e) => {
    // Open crop modal for both images
    imageToCrop.value = e.target.result
    cropperTargetField.value = field
    cropModalOpen.value = true

    nextTick(() => {
      // Small delay to ensure image element is rendered
      setTimeout(() => {
        const imgEl = imageElement.value
        if (!imgEl) return

        const initCropper = () => {
          if (cropperInstance.value) {
            cropperInstance.value.destroy()
          }
          cropperInstance.value = new Cropper(imgEl, {
            aspectRatio: field === 'image' ? 1 : (16 / 9),
            viewMode: 2,
            autoCropArea: 1,
            background: false,
          })
        }

        // If image is already loaded (cached), init immediately; otherwise wait
        if (imgEl.complete && imgEl.naturalWidth > 0) {
          initCropper()
        } else {
          imgEl.onload = initCropper
        }
      }, 50)
    })
  }
  reader.onerror = () => {
    if (addToast) addToast('Error reading file. Please try again.', 'error')
  }
  reader.readAsDataURL(file)
  
  event.target.value = ''
}

const confirmCrop = () => {
  if (cropperInstance.value) {
    const canvas = cropperInstance.value.getCroppedCanvas({
      maxWidth: cropperTargetField.value === 'image' ? 800 : 1920,
      maxHeight: cropperTargetField.value === 'image' ? 800 : 1080
    });
    heroData.value[cropperTargetField.value] = canvas.toDataURL('image/jpeg', 0.8)
    
    cropModalOpen.value = false
    cropperInstance.value.destroy()
    cropperInstance.value = null
    
    const photoType = cropperTargetField.value === 'image' ? 'Profile' : 'Cover'
    if (addToast) addToast(`${photoType} photo updated locally. Remember to save changes.`, 'success')
  }
}

const cancelCrop = () => {
  cropModalOpen.value = false
  if (cropperInstance.value) {
    cropperInstance.value.destroy()
    cropperInstance.value = null
  }
  imageToCrop.value = ''
}

const handleSave = async () => {
  saving.value = true
  showSuccess.value = false
  showError.value = false

  const payload = {
    name: heroData.value.name,
    title: heroData.value.title,
    description: heroData.value.description,
    image: heroData.value.image || '/me.png',
    cover_image: heroData.value.coverImage,
    palette: heroData.value.palette,
    updated_at: new Date().toISOString()
  }

  // Save to localStorage as fallback
  localStorage.setItem('heroSectionData', JSON.stringify({
    greeting: "Hello, I'm",
    name: payload.name,
    title: payload.title,
    description: payload.description,
    image: payload.image,
    coverImage: payload.cover_image,
    projectsCount: 12,
    githubReposCount: 24,
    socials: { facebook: 'https://facebook.com', twitter: 'https://twitter.com', instagram: 'https://instagram.com' }
  }))

  if (!supabase) {
    showSuccess.value = true
    if (addToast) addToast('Home section saved locally (database unavailable)', 'warning')
    setTimeout(() => { showSuccess.value = false }, 3000)
    saving.value = false
    return
  }

  try {
    if (currentId.value != null) {
      const { error } = await supabase
        .from('personal_info')
        .update(payload)
        .eq('id', currentId.value)
      if (error) throw error
    } else {
      const { data, error } = await supabase
        .from('personal_info')
        .insert(payload)
        .select('id')
        .single()
      if (error) throw error
      if (data?.id) currentId.value = data.id
    }

    showSuccess.value = true
    if (updateTheme) updateTheme(heroData.value.palette)
    if (updateGlobalTheme) updateGlobalTheme(heroData.value.palette)
    if (addToast) addToast('Home section updated successfully', 'success')
    setTimeout(() => { showSuccess.value = false }, 3000)
  } catch (error) {
    console.error('Error saving personal_info:', error)
    showSuccess.value = true
    if (addToast) addToast('Home section saved locally (database error)', 'warning')
    setTimeout(() => { showSuccess.value = false }, 3000)
  } finally {
    saving.value = false
  }
}

// Expose methods for parent
defineExpose({
  refresh: loadFromDb,
  onSearch: (query) => {
    // Implement search functionality if needed
  }
})
</script>
