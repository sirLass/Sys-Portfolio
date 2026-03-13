<template>
    <section id="Projects" class="py-24 bg-white">
        <div class="max-w-7xl mx-auto px-6">
            <!-- Loading State -->
            <div v-if="isLoading">
                <div class="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                    <div class="text-left max-w-2xl w-full">
                        <div class="h-6 w-32 bg-gray-200 rounded animate-pulse mb-4"></div>
                        <div class="h-12 w-64 bg-gray-200 rounded animate-pulse mb-6"></div>
                        <div class="space-y-3">
                            <div class="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                            <div class="h-4 w-4/5 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                    </div>
                    <div class="flex items-center gap-3">
                        <div class="w-14 h-14 bg-gray-200 rounded-2xl animate-pulse"></div>
                        <div class="w-14 h-14 bg-gray-200 rounded-2xl animate-pulse"></div>
                        <div class="h-10 w-px bg-gray-200 mx-2"></div>
                        <div class="w-28 h-12 bg-gray-200 rounded-2xl animate-pulse"></div>
                    </div>
                </div>
                <div class="flex gap-8 pb-8">
                    <div v-for="i in 3" :key="i" class="min-w-[320px] md:min-w-[400px] lg:min-w-[450px] flex-shrink-0 bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 h-[400px]">
                        <div class="h-64 bg-gray-200 animate-pulse"></div>
                        <div class="p-6 space-y-3">
                            <div class="h-6 w-40 bg-gray-200 rounded animate-pulse"></div>
                            <div class="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                            <div class="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                            <div class="flex gap-2 pt-2">
                                <div v-for="j in 3" :key="j" class="h-6 w-16 bg-gray-200 rounded-full animate-pulse"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Error State -->
            <div v-else-if="hasError || !projectsData" class="text-center py-16">
                <div class="text-gray-400 mb-4">
                    <svg class="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </div>
                <h3 class="text-xl font-semibold text-gray-600 mb-2">Failed to load projects</h3>
                <p class="text-gray-400">Please check your database connection.</p>
            </div>

            <!-- Loaded Data -->
            <div v-else>
                <!-- Section Header -->
                <div class="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                    <div class="text-left max-w-2xl">
                        <p class="text-primary-600 font-semibold text-lg mb-4">{{ projectsData.sectionLabel }}</p>
                        <h2 class="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">{{ projectsData.mainHeading }}</h2>
                        <p class="text-xl text-gray-600 leading-relaxed">
                            {{ projectsData.description }}
                        </p>
                    </div>
                    
                    <div class="flex items-center gap-3" v-if="projectsData.projects?.length > 0">
                        <button 
                            @click="scrollPrev"
                            class="p-4 rounded-2xl bg-white border border-gray-200 text-gray-400 hover:text-primary-600 hover:bg-primary-50 hover:border-primary-100 transition-all shadow-sm active:scale-95"
                            title="Previous Project"
                        >
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button 
                            @click="scrollNext"
                            class="p-4 rounded-2xl bg-white border border-gray-200 text-gray-400 hover:text-primary-600 hover:bg-primary-50 hover:border-primary-100 transition-all shadow-sm active:scale-95"
                            title="Next Project"
                        >
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                        <div class="h-10 w-px bg-gray-200 mx-2"></div>
                        <button 
                            @click="toggleAutoSlide"
                            :class="[
                                'flex items-center gap-2 px-6 py-3 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all shadow-sm active:scale-95',
                                isAutoSlide 
                                    ? 'bg-primary-600 text-white shadow-lg shadow-primary-200' 
                                    : 'bg-white text-gray-500 border border-gray-200'
                            ]"
                        >
                            <div v-if="isAutoSlide" class="w-1.5 h-1.5 bg-white rounded-full animate-ping"></div>
                            {{ isAutoSlide ? 'Auto: ON' : 'Auto: OFF' }}
                        </button>
                    </div>
                </div>
                
                <div 
                    ref="projectsScrollRef"
                    class="flex items-start gap-8 overflow-x-auto scrollbar-hide snap-x snap-mandatory px-4 -mx-4 pb-4"
                    style="scrollbar-width: none; -ms-overflow-style: none;"
                    @mouseenter="stopAutoSlide"
                    @mouseleave="resumeAutoSlideIfOn"
                    v-if="projectsData.projects?.length > 0"
                >
                    <div
                        v-for="(project, index) in projectsData.projects"
                        :key="index"
                        class="min-w-[280px] sm:min-w-[320px] md:min-w-[400px] lg:min-w-[450px] h-[420px] sm:h-[480px] flex-shrink-0 snap-center group bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100"
                    >
                        <div
                            class="relative h-48 sm:h-64 max-h-48 sm:max-h-64 flex-shrink-0 overflow-hidden"
                            :style="getGradientStyle(project.gradientFrom, project.gradientTo)"
                        >
                            <div class="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300"></div>
                            <div class="absolute inset-0 flex items-center justify-center">
                                <svg class="w-24 h-24 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                </svg>
                            </div>
                            <div class="absolute top-4 right-4">
                                <span class="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">{{ project.category }}</span>
                            </div>
                        </div>
                        <div class="p-6">
                            <h3 class="text-xl font-bold text-gray-900 mb-3">{{ project.title }}</h3>
                            <p class="text-gray-600 mb-4 leading-relaxed">{{ project.description?.slice(0, 60) }}{{ project.description?.length > 60 ? '...' : '' }}</p>
                            <div class="flex flex-wrap gap-2 mb-6">
                                <span
                                    v-for="(tech, techIndex) in project.technologies"
                                    :key="techIndex"
                                    class="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium"
                                >
                                    {{ tech }}
                                </span>
                            </div>
                            <a
                                v-if="project.link"
                                :href="project.link"
                                class="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium group"
                            >
                                View Project
                                <svg class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                                </svg>
                            </a>
                            <span v-else class="inline-flex items-center text-gray-400 font-medium">
                                In Development
                                <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </span>
                        </div>
                    </div>
                </div>

                <!-- Empty State -->
                <div v-else class="text-center py-16">
                    <div class="text-gray-400 mb-4">
                        <svg class="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                    </div>
                    <h3 class="text-xl font-semibold text-gray-600 mb-2">No projects yet</h3>
                    <p class="text-gray-400">Check back soon for updates!</p>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { supabase } from '../supabase'

const isAutoSlide = ref(false)
const projectsScrollRef = ref(null)
let autoSlideInterval = null

const projectsData = ref(null)
const isLoading = ref(true)
const hasError = ref(false)

const toggleAutoSlide = () => {
    isAutoSlide.value = !isAutoSlide.value
    if (isAutoSlide.value) {
        startAutoSlide()
    } else {
        stopAutoSlide()
    }
}

const startAutoSlide = () => {
    stopAutoSlide()
    autoSlideInterval = setInterval(() => {
        scrollNext()
    }, 5000)
}

const stopAutoSlide = () => {
    if (autoSlideInterval) {
        clearInterval(autoSlideInterval)
        autoSlideInterval = null
    }
}

const resumeAutoSlideIfOn = () => {
    if (isAutoSlide.value) {
        startAutoSlide()
    }
}

const scrollNext = () => {
    if (!projectsScrollRef.value) return
    const container = projectsScrollRef.value
    const itemWidth = container.querySelector('.snap-center').clientWidth + 32 // item width + gap
    const maxScroll = container.scrollWidth - container.clientWidth
    
    if (container.scrollLeft >= maxScroll - 10) {
        container.scrollTo({ left: 0, behavior: 'smooth' })
    } else {
        container.scrollBy({ left: itemWidth, behavior: 'smooth' })
    }
}

const scrollPrev = () => {
    if (!projectsScrollRef.value) return
    const container = projectsScrollRef.value
    const itemWidth = container.querySelector('.snap-center').clientWidth + 32
    
    if (container.scrollLeft <= 10) {
        container.scrollTo({ left: container.scrollWidth, behavior: 'smooth' })
    } else {
        container.scrollBy({ left: -itemWidth, behavior: 'smooth' })
    }
}

const colorMap = {
  'primary-400': 'var(--primary-400)',
  'primary-600': 'var(--primary-600)',
  'green-400': '#4ade80',
  'blue-500': '#3b82f6',
  'purple-400': '#a78bfa',
  'pink-500': '#ec4899'
}

const getGradientStyle = (from, to) => {
  const fromColor = colorMap[from] || '#60a5fa'
  const toColor = colorMap[to] || '#2563eb'
  return {
    background: `linear-gradient(to bottom right, ${fromColor}, ${toColor})`
  }
}

onMounted(async () => {
  if (!supabase) {
    hasError.value = true
    isLoading.value = false
    return
  }

  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .limit(1)
      .maybeSingle()

    if (!error && data) {
      projectsData.value = {
        sectionLabel: data.section_label || 'My recent work',
        mainHeading: data.main_heading || 'Featured Projects',
        description: data.description || '',
        projects: data.projects || []
      }
      isLoading.value = false
      if (isAutoSlide.value && projectsData.value?.projects?.length > 0) {
        startAutoSlide()
      }
      return
    }
  } catch (e) {
    console.error('Error fetching projects from Supabase:', e)
  }

  const savedData = localStorage.getItem('projectsSectionData')
  if (savedData) {
    try {
      const parsed = JSON.parse(savedData)
      projectsData.value = {
        sectionLabel: parsed.sectionLabel || 'My recent work',
        mainHeading: parsed.mainHeading || 'Featured Projects',
        description: parsed.description || '',
        projects: parsed.projects || []
      }
    } catch (e) {
      console.error('Error loading projects data from localStorage:', e)
      hasError.value = true
    }
  } else {
    hasError.value = true
  }

  isLoading.value = false
  if (isAutoSlide.value && projectsData.value?.projects?.length > 0) {
    startAutoSlide()
  }
})

onUnmounted(() => {
    stopAutoSlide()
})
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.snap-center {
  scroll-snap-align: center;
}

@media (min-width: 768px) {
    .snap-center {
        scroll-snap-align: start;
    }
}
</style>
