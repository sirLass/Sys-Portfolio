<template>
  <section id="Experience" class="py-24 bg-gray-50 dark:bg-[#0f1117] transition-colors duration-300">
    <div class="max-w-7xl mx-auto px-6">
      <!-- Loading State -->
      <div v-if="isLoading">
        <div class="text-center mb-16">
          <div class="h-6 w-36 bg-gray-200 dark:bg-white/10 rounded animate-pulse mx-auto mb-4"></div>
          <div class="h-12 w-48 bg-gray-200 dark:bg-white/10 rounded animate-pulse mx-auto mb-6"></div>
          <div class="space-y-3 max-w-2xl mx-auto">
            <div class="h-4 w-full bg-gray-200 dark:bg-white/10 rounded animate-pulse"></div>
            <div class="h-4 w-5/6 bg-gray-200 dark:bg-white/10 rounded animate-pulse mx-auto"></div>
          </div>
          <div class="w-24 h-1 bg-gray-200 dark:bg-white/10 mx-auto rounded-full mt-6 animate-pulse"></div>
        </div>

        <!-- Skeleton Collapsed Rows (thin bars) -->
        <div class="max-w-3xl mx-auto space-y-3">
          <div
            v-for="i in 4"
            :key="i"
            class="rounded-xl border border-gray-100 dark:border-white/5 bg-white/70 dark:bg-[#141721]/70 p-4"
          >
            <div class="flex items-center gap-3 sm:gap-5">
              <!-- Dot skeleton -->
              <div class="w-3 h-3 rounded-full bg-gray-200 dark:bg-white/10 animate-pulse flex-shrink-0"></div>
              <!-- Date pill skeleton -->
              <div class="w-24 sm:w-28 h-6 rounded-full bg-gray-200 dark:bg-white/10 animate-pulse flex-shrink-0"></div>
              <!-- Title & subtitle skeleton -->
              <div class="flex-1 space-y-2 min-w-0">
                <div class="h-4 w-44 bg-gray-200 dark:bg-white/10 rounded animate-pulse"></div>
                <div class="h-3 w-32 bg-gray-100 dark:bg-white/5 rounded animate-pulse"></div>
              </div>
              <!-- Chevron skeleton -->
              <div class="w-5 h-5 rounded bg-gray-200 dark:bg-white/10 animate-pulse flex-shrink-0"></div>
            </div>
            <!-- First row preview of expanded skeleton -->
            <div v-if="i === 1" class="pl-8 sm:pl-[9.5rem] pt-4 mt-3 border-t border-gray-100 dark:border-white/5 space-y-2.5">
              <div class="h-3.5 w-full bg-gray-200 dark:bg-white/10 rounded animate-pulse"></div>
              <div class="h-3.5 w-4/5 bg-gray-200 dark:bg-white/10 rounded animate-pulse"></div>
              <div class="h-3 w-3/5 bg-gray-100 dark:bg-white/5 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="hasError || !experienceData" class="text-center py-16">
        <div class="text-gray-400 dark:text-gray-500 mb-4">
          <svg class="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h3 class="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">Failed to load experience</h3>
        <p class="text-gray-400 dark:text-gray-500">Please check your database connection.</p>
      </div>

      <!-- Loaded Data -->
      <div v-else>
        <!-- Section Header -->
        <div v-if="!isHidden('experience', 'sectionLabel') || !isHidden('experience', 'mainHeading')" class="text-center mb-16">
          <p v-if="!isHidden('experience', 'sectionLabel')" class="text-primary-600 dark:text-primary-400 font-semibold text-lg mb-4">{{ experienceData.sectionLabel }}</p>
          <h2 v-if="!isHidden('experience', 'mainHeading')" class="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">{{ experienceData.mainHeading }}</h2>
          <p v-if="!isHidden('experience', 'timeline')" class="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed mb-8">
            {{ experienceData.description }}
          </p>

          <!-- Filter Toggle Buttons -->
          <div class="flex items-center justify-center">
            <div class="inline-flex bg-gray-100 dark:bg-[#1a1d27] rounded-full p-1 border border-transparent dark:border-white/5">
              <button
                type="button"
                @click="activeFilter = 'all'"
                :class="[
                  'px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer',
                  activeFilter === 'all'
                    ? 'bg-white dark:bg-[#151821] text-primary-600 dark:text-primary-400 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                ]"
              >
                All
              </button>
              <button
                type="button"
                @click="activeFilter = 'educational'"
                :class="[
                  'px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer',
                  activeFilter === 'educational'
                    ? 'bg-white dark:bg-[#151821] text-primary-600 dark:text-primary-400 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                ]"
              >
                Educational
              </button>
              <button
                type="button"
                @click="activeFilter = 'professional'"
                :class="[
                  'px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer',
                  activeFilter === 'professional'
                    ? 'bg-white dark:bg-[#151821] text-primary-600 dark:text-primary-400 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
                ]"
              >
                Professional
              </button>
            </div>
          </div>

          <div class="w-24 h-1 bg-primary-600 mx-auto rounded-full mt-6"></div>
        </div>

        <!-- Single-Open Accordion Timeline -->
        <div v-if="filteredExperiences.length > 0" class="max-w-3xl mx-auto">
          <div class="space-y-2">
            <div
              v-for="(exp, index) in filteredExperiences"
              :key="exp.id || index"
              class="accordion-item rounded-2xl transition-all duration-200"
              :class="openIndex === index
                ? 'bg-white dark:bg-[#141721] shadow-md border border-gray-100 dark:border-white/10'
                : 'border border-transparent hover:bg-gray-100/60 dark:hover:bg-white/[0.02]'"
            >
              <!-- Collapsed / Open Row Header Button -->
              <button
                type="button"
                :id="`exp-header-${index}`"
                :aria-expanded="openIndex === index"
                :aria-controls="`exp-panel-${index}`"
                @click="toggleEntry(index)"
                class="w-full text-left flex items-center gap-3 sm:gap-5 py-3.5 px-3 sm:px-5 rounded-2xl transition-all duration-200 group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
              >
                <!-- Connector Dot & Line Segment (constrained to row header height) -->
                <div class="relative flex items-center justify-center w-7 flex-shrink-0 self-stretch min-h-[2.5rem]">
                  <!-- Vertical connector line segment -->
                  <div
                    class="absolute w-0.5 bg-gray-200 dark:bg-white/10 left-1/2 -translate-x-1/2"
                    :class="[
                      filteredExperiences.length === 1 ? 'hidden' : '',
                      index === 0 ? 'top-1/2 -bottom-3' : '',
                      index === filteredExperiences.length - 1 ? '-top-3 bottom-1/2' : '',
                      index > 0 && index < filteredExperiences.length - 1 ? '-top-3 -bottom-3' : ''
                    ]"
                  ></div>

                  <!-- Dot Marker -->
                  <div
                    class="relative z-10 rounded-full transition-all duration-300"
                    :class="openIndex === index
                      ? 'w-3.5 h-3.5 bg-primary-600 ring-4 ring-primary-100 dark:ring-primary-950/70 border-2 border-white dark:border-[#141721]'
                      : 'w-2.5 h-2.5 bg-gray-300 dark:bg-gray-600 group-hover:bg-primary-400'"
                  ></div>
                </div>

                <!-- Date (left pill) — month & year only, day hidden -->
                <div class="hidden sm:block w-36 flex-shrink-0">
                  <span
                    class="inline-block px-3 py-1 rounded-full text-xs transition-colors duration-200"
                    :class="openIndex === index
                      ? 'bg-primary-50 dark:bg-primary-950/50 text-primary-700 dark:text-primary-300 font-semibold'
                      : 'text-gray-500 dark:text-gray-400 bg-gray-100/80 dark:bg-white/5 font-medium'"
                  >
                    {{ formatMonthYear(exp.dateRange) || exp.duration }}
                  </span>
                  <p
                    v-if="exp.type === 'professional' && monthsWorkedLabel(exp.dateRange)"
                    class="mt-1 text-[10px] font-medium text-gray-400 dark:text-gray-500"
                  >
                    {{ monthsWorkedLabel(exp.dateRange) }}
                  </p>
                </div>

                <!-- Title & Company / Subtitle (stacked) -->
                <div class="flex-1 min-w-0 pr-2">
                  <!-- Mobile date (month & year) + type badge if screen is small -->
                  <div class="sm:hidden mb-1 flex items-center gap-2 flex-wrap">
                    <span
                      class="inline-block px-2 py-0.5 rounded-full text-[11px] font-medium"
                      :class="openIndex === index
                        ? 'bg-primary-50 dark:bg-primary-950/50 text-primary-700 dark:text-primary-300 font-semibold'
                        : 'text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-white/5'"
                    >
                      {{ formatMonthYear(exp.dateRange) || exp.duration }}
                    </span>
                    <span
                      v-if="exp.type"
                      class="text-[10px] font-medium px-2 py-0.2 rounded-full uppercase tracking-wider"
                      :class="exp.type === 'educational'
                        ? 'bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400'
                        : 'bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400'"
                    >
                      {{ exp.type }}
                    </span>
                    <span
                      v-if="exp.type === 'professional' && monthsWorkedLabel(exp.dateRange)"
                      class="text-[10px] font-medium px-2 py-0.2 rounded-full bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400"
                    >
                      {{ monthsWorkedLabel(exp.dateRange) }}
                    </span>
                  </div>

                  <div class="flex items-center gap-2 flex-wrap">
                    <h3
                      class="text-sm sm:text-base transition-colors duration-200 truncate"
                      :class="openIndex === index
                        ? 'font-bold text-gray-900 dark:text-white'
                        : 'font-medium text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white'"
                    >
                      {{ exp.title }}
                    </h3>

                    <!-- Desktop Type Badge -->
                    <span
                      v-if="exp.type"
                      class="hidden sm:inline-block text-[10px] font-medium px-2 py-0.5 rounded-full uppercase tracking-wider transition-colors"
                      :class="exp.type === 'educational'
                        ? 'bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 border border-amber-200/50 dark:border-amber-900/40'
                        : 'bg-blue-50 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400 border border-blue-200/50 dark:border-blue-900/40'"
                    >
                      {{ exp.type }}
                    </span>
                  </div>

                  <p
                    class="text-xs sm:text-sm transition-colors duration-200 truncate mt-0.5"
                    :class="openIndex === index
                      ? 'text-primary-600 dark:text-primary-400 font-medium'
                      : 'text-gray-400 dark:text-gray-500'"
                  >
                    {{ exp.subtitle || exp.company }}
                  </p>
                </div>

                <!-- Chevron Indicator -->
                <div class="flex-shrink-0 ml-2">
                  <svg
                    class="w-5 h-5 transform transition-transform duration-300"
                    :class="openIndex === index
                      ? 'rotate-180 text-primary-600 dark:text-primary-400'
                      : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300'"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>

              <!-- Expandable Accordion Panel with Smooth Grid Animation -->
              <div
                :id="`exp-panel-${index}`"
                role="region"
                :aria-labelledby="`exp-header-${index}`"
                class="accordion-panel"
                :class="{ 'is-open': openIndex === index }"
              >
                <div class="accordion-content">
                  <!-- Indented to align with title text, NOT marker or date column -->
                  <div class="pl-12 sm:pl-[13.5rem] pr-4 sm:pr-6 pb-5 pt-1">
                    <div class="border-l-2 border-primary-600 dark:border-primary-500 pl-4 sm:pl-5 py-1 space-y-4">
                      <!-- Description -->
                      <p v-if="exp.description" class="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                        {{ exp.description }}
                      </p>

                      <!-- Bullet Points -->
                      <ul v-if="exp.bulletPoints && exp.bulletPoints.length > 0" class="space-y-2.5 pt-1">
                        <li
                          v-for="(point, pIndex) in exp.bulletPoints"
                          :key="pIndex"
                          class="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-300"
                        >
                          <svg
                            class="w-4 h-4 text-primary-500 mt-1 flex-shrink-0"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                          </svg>
                          <span class="leading-relaxed">{{ point }}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-16">
          <div class="text-gray-400 dark:text-gray-500 mb-4">
            <svg class="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">No experience entries yet</h3>
          <p class="text-gray-400 dark:text-gray-500">Experience data will appear here once added.</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { supabase } from '../supabase'
import { useVisibility } from '../composables/useVisibility'

const { isHidden } = useVisibility()
const experienceData = ref(null)
const isLoading = ref(true)
const hasError = ref(false)
const activeFilter = ref('all') // 'all', 'educational', 'professional'
const openIndex = ref(0)
const lastOpenedExp = ref(null)

// Display helper: drop the day, keep month + year
// ("Jan 15, 2023 - Jun 20, 2025" -> "Jan 2023 - Jun 2025", "2024 - 2025" unchanged, "Present" kept)
const formatMonthYearPart = (part) => {
  const p = part.trim()
  if (!p) return p
  if (/^(present|now|ongoing|current)$/i.test(p)) return p
  if (/^\d{4}$/.test(p)) return p
  const d = new Date(p)
  if (isNaN(d.getTime())) return p
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

const formatMonthYear = (range) => {
  if (!range) return ''
  return String(range).split(/\s+[–-]\s+/).map(formatMonthYearPart).join(' - ')
}

// Loose parse of a single date piece ("Jun 20, 2025", "2024", "2024-06-01", "Present" -> now)
const parseDateLoose = (part) => {
  const p = String(part).trim()
  if (!p) return null
  if (/^(present|now|ongoing|current)$/i.test(p)) return new Date()
  let d = new Date(p)
  if (isNaN(d.getTime())) {
    const y = p.match(/\d{4}/)
    if (y) d = new Date(y[0])
  }
  return isNaN(d.getTime()) ? null : d
}

// Full months worked from dateRange (start -> end, or -> today when ongoing).
// Shown for professional entries only: "Jan 15, 2023 - Jun 20, 2025" -> "29 months"
const monthsWorkedLabel = (range) => {
  if (!range) return null
  const parts = String(range).split(/\s+[–-]\s+/)
  const start = parseDateLoose(parts[0])
  if (!start) return null
  const end = parts[1] ? parseDateLoose(parts[1]) : new Date()
  if (!end || end < start) return null
  let months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth())
  if (end.getDate() < start.getDate()) months--
  if (months < 1) return null
  return months === 1 ? '1 month' : `${months} months`
}

// Start date parsed from the dateRange string ("Jan 15, 2023 - ...", "2024 - 2025", "2025 - Present", ISO)
const startDateFromRange = (range) => {
  if (!range) return null
  const startPart = String(range).split(/\s+[–-]\s+/)[0].trim()
  let d = new Date(startPart)
  if (isNaN(d.getTime())) {
    const year = startPart.match(/\d{4}/)
    if (year) d = new Date(year[0])
  }
  return isNaN(d.getTime()) ? null : d
}

// Current -> past (newest first); entries without a parseable date still go last
const sortByDateDesc = (a, b) => {
  const da = startDateFromRange(a.dateRange)
  const db = startDateFromRange(b.dateRange)
  if (!da && !db) return 0
  if (!da) return 1
  if (!db) return -1
  return db - da
}

const filteredExperiences = computed(() => {
  if (!experienceData.value?.experiences) return []
  const list = activeFilter.value === 'all'
    ? [...experienceData.value.experiences]
    : experienceData.value.experiences.filter(exp => exp.type === activeFilter.value)
  return list.sort(sortByDateDesc)
})

const toggleEntry = (index) => {
  if (openIndex.value === index) {
    openIndex.value = null
    lastOpenedExp.value = null
  } else {
    openIndex.value = index
    lastOpenedExp.value = filteredExperiences.value[index] || null
  }
}

// When activeFilter changes, keep the opened entry if still visible, otherwise auto-expand the first item
watch(activeFilter, () => {
  if (lastOpenedExp.value) {
    const foundIndex = filteredExperiences.value.findIndex(exp =>
      (exp.id != null && exp.id === lastOpenedExp.value.id) ||
      (exp.title === lastOpenedExp.value.title &&
        (exp.dateRange || exp.duration) === (lastOpenedExp.value.dateRange || lastOpenedExp.value.duration))
    )
    if (foundIndex !== -1) {
      openIndex.value = foundIndex
      return
    }
  }

  // Currently open entry is filtered out or nothing was selected: default to first item in new list
  if (filteredExperiences.value.length > 0) {
    openIndex.value = 0
    lastOpenedExp.value = filteredExperiences.value[0]
  } else {
    openIndex.value = null
    lastOpenedExp.value = null
  }
})

onMounted(async () => {
  let loaded = false
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
        activeFilter.value = data.active_filter || 'all'
        loaded = true
      }
    } catch (e) {
      console.warn('Error fetching experience from Supabase, trying cache:', e)
    }
  }

  if (!loaded) {
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
        activeFilter.value = parsed.activeFilter || 'all'
        loaded = true
      } catch (e) {
        console.warn('Error loading experience data from localStorage:', e)
      }
    }
  }

  // Graceful out-of-the-box fallback profile instead of error screen
  if (!loaded) {
    experienceData.value = {
      sectionLabel: 'My journey so far',
      mainHeading: 'Experience & Milestones',
      description: 'A timeline showcasing my progression from academic study to active full-stack engineering.',
      experiences: [
        {
          id: 1,
          type: 'professional',
          title: 'Full Stack Web Developer',
          company: 'Self-Employed / Freelance',
          subtitle: 'Self-Employed / Freelance',
          duration: '2023 - Present',
          dateRange: '2023 - Present',
          description: 'Architecting dynamic modern web applications using Vue.js, Node.js, and Supabase. Designing highly interactive client dashboards and performance-optimized database structures.',
          bulletPoints: [
            'Built custom responsive web applications with Vue 3 and modern CSS frameworks',
            'Implemented secure database models and authentication with Supabase',
            'Optimized page performance and cross-device responsiveness'
          ]
        },
        {
          id: 2,
          type: 'educational',
          title: 'BS in Information Technology',
          company: 'State University',
          subtitle: 'State University',
          duration: '2020 - 2024',
          dateRange: '2020 - 2024',
          description: 'Specialized in application development, database management systems, and algorithms. Graduated with honors, acquiring high proficiency in modern system designs.',
          bulletPoints: [
            'Graduated with academic honors in Information Technology',
            'Led capstone project engineering team building full-stack platforms'
          ]
        }
      ]
    }
    activeFilter.value = 'all'
    hasError.value = false
  }

  // Auto-expand first item on load
  if (filteredExperiences.value.length > 0) {
    openIndex.value = 0
    lastOpenedExp.value = filteredExperiences.value[0]
  } else {
    openIndex.value = null
    lastOpenedExp.value = null
  }

  isLoading.value = false
})
</script>

<style scoped>
/* CSS Grid expand/collapse height animation */
.accordion-panel {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 300ms cubic-bezier(0.4, 0, 0.2, 1);
}

.accordion-panel.is-open {
  grid-template-rows: 1fr;
}

.accordion-content {
  overflow: hidden;
  min-height: 0;
  opacity: 0;
  transform: translateY(-4px);
  transition: opacity 250ms ease, transform 250ms ease;
}

.accordion-panel.is-open .accordion-content {
  opacity: 1;
  transform: translateY(0);
}

/* Instant toggling for reduced-motion */
@media (prefers-reduced-motion: reduce) {
  .accordion-panel {
    transition: none !important;
  }
  .accordion-content {
    transition: none !important;
    transform: none !important;
  }
}
</style>