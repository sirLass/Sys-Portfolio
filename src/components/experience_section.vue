<template>
  <section id="Experience" class="py-24 bg-gray-50">
    <div class="max-w-7xl mx-auto px-6">
      <!-- Loading State -->
      <div v-if="isLoading">
        <div class="text-center mb-16">
          <div class="h-6 w-36 bg-gray-200 rounded animate-pulse mx-auto mb-4"></div>
          <div class="h-12 w-48 bg-gray-200 rounded animate-pulse mx-auto mb-6"></div>
          <div class="space-y-3 max-w-2xl mx-auto">
            <div class="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
            <div class="h-4 w-5/6 bg-gray-200 rounded animate-pulse mx-auto"></div>
          </div>
          <div class="w-24 h-1 bg-gray-200 mx-auto rounded-full mt-6 animate-pulse"></div>
        </div>
        
        <div class="relative max-w-4xl mx-auto">
          <div class="absolute left-4 lg:left-1/2 transform lg:-translate-x-px top-0 bottom-0 w-0.5 bg-gray-200"></div>
          <div class="space-y-12">
            <div v-for="i in 3" :key="i" class="relative flex items-center">
              <div class="absolute left-4 lg:left-1/2 transform -translate-x-1/2 w-3 h-3 bg-gray-200 rounded-full animate-pulse"></div>
              <div class="ml-12 lg:ml-0 lg:w-1/2 w-full">
                <div class="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                  <div class="h-6 w-32 bg-gray-200 rounded-full animate-pulse mb-4"></div>
                  <div class="h-8 w-48 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div class="h-6 w-40 bg-gray-200 rounded animate-pulse mb-4"></div>
                  <div class="space-y-3">
                    <div class="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                    <div class="h-4 w-4/5 bg-gray-200 rounded animate-pulse"></div>
                    <div class="space-y-2 mt-4">
                      <div v-for="j in 2" :key="j" class="flex items-start gap-3">
                        <div class="w-5 h-5 bg-gray-200 rounded-full animate-pulse flex-shrink-0 mt-0.5"></div>
                        <div class="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="hasError || !experienceData" class="text-center py-16">
        <div class="text-gray-400 mb-4">
          <svg class="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h3 class="text-xl font-semibold text-gray-600 mb-2">Failed to load experience</h3>
        <p class="text-gray-400">Please check your database connection.</p>
      </div>

      <!-- Loaded Data -->
      <div v-else>
        <!-- Section Header -->
        <div class="text-center mb-16">
          <p class="text-primary-600 font-semibold text-lg mb-4">{{ experienceData.sectionLabel }}</p>
          <h2 class="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">{{ experienceData.mainHeading }}</h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {{ experienceData.description }}
          </p>
          <div class="w-24 h-1 bg-primary-600 mx-auto rounded-full mt-6"></div>
        </div>
        
        <div v-if="experienceData.experiences?.length > 0" class="relative max-w-4xl mx-auto">
          <!-- Timeline line -->
          <div class="absolute left-4 lg:left-1/2 transform lg:-translate-x-px top-0 bottom-0 w-0.5 bg-primary-200"></div>
          
          <!-- Experience Items -->
          <div class="space-y-12">
            <div
              v-for="(exp, index) in experienceData.experiences"
              :key="index"
              class="relative flex items-center"
              :class="{ 'lg:flex-row-reverse': index % 2 !== 0 }"
            >
              <div class="absolute left-4 lg:left-1/2 transform -translate-x-1/2 timeline-dot"></div>
              <div
                class="ml-12 lg:ml-0 lg:w-1/2"
                :class="index % 2 === 0 ? 'lg:pr-12 lg:text-right' : 'lg:pl-12 lg:text-left'"
              >
                <div class="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 card-hover">
                  <div class="flex items-center justify-between mb-4" :class="{ 'lg:flex-row-reverse': index % 2 === 0 }">
                    <span class="bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-semibold">{{ exp.dateRange }}</span>
                  </div>
                  <h3 class="text-2xl font-bold text-gray-900 mb-2">{{ exp.title }}</h3>
                  <h4 class="text-lg font-semibold text-primary-600 mb-4">{{ exp.subtitle }}</h4>
                  <p class="text-gray-600 mb-6 leading-relaxed">{{ exp.description }}</p>
                  <ul class="text-gray-600 space-y-3">
                    <li
                      v-for="(point, pIndex) in exp.bulletPoints"
                      :key="pIndex"
                      class="flex items-start"
                      :class="{ 'lg:flex-row-reverse': index % 2 === 0 }"
                    >
                      <svg
                        class="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0"
                        :class="index % 2 === 0 ? 'lg:ml-3' : 'lg:mr-3 mr-3'"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                      </svg>
                      <span>{{ point }}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-16">
          <div class="text-gray-400 mb-4">
            <svg class="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-600 mb-2">No experience entries yet</h3>
          <p class="text-gray-400">Experience data will appear here once added.</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../supabase'

const experienceData = ref(null)
const isLoading = ref(true)
const hasError = ref(false)

onMounted(async () => {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('experience_section')
        .select('*')
        .limit(1)
        .maybeSingle()

      if (!error && data) {
        experienceData.value = {
          sectionLabel: data.section_label || 'My journey so far',
          mainHeading: data.main_heading || 'Experience',
          description: data.description || '',
          experiences: data.experiences || []
        }
        isLoading.value = false
        return
      }
    } catch (e) {
      console.error('Error fetching experience from Supabase:', e)
    }
  }

  const savedData = localStorage.getItem('experienceSectionData')
  if (savedData) {
    try {
      const parsed = JSON.parse(savedData)
      experienceData.value = {
        sectionLabel: parsed.sectionLabel || 'My journey so far',
        mainHeading: parsed.mainHeading || 'Experience',
        description: parsed.description || '',
        experiences: parsed.experiences || []
      }
    } catch (e) {
      console.error('Error loading experience data from localStorage:', e)
      hasError.value = true
    }
  } else {
    hasError.value = true
  }
  isLoading.value = false
})
</script>