<template>
  <section id="hero" class="relative min-h-screen flex items-center justify-center overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-br from-primary-50 via-[#FAF9F6] to-blue-50 dark:from-[#0f1117] dark:via-[#12141c] dark:to-[#0b1220]"></div>
    
    <!-- Cover Image Banner -->
    <div class="absolute top-0 left-0 w-full h-64 md:h-96 z-0 overflow-hidden">
      <div v-if="isLoading" class="w-full h-full bg-gray-200 animate-pulse"></div>
      <img v-else-if="heroData?.coverImage" :src="heroData.coverImage" @error="$event.target.style.display='none'" alt="Cover Image" class="w-full h-full object-cover opacity-40 mix-blend-overlay" />
      <div class="absolute inset-0" :style="coverGradientStyle"></div>
    </div>

    <div class="absolute inset-0 opacity-30 mt-48 md:mt-72">
      <div
        class="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse"
      ></div>
      <div
        class="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"
      ></div>
    </div>

    <div class="relative z-10 max-w-7xl mx-auto px-6 py-20">
      <!-- Loading State - Skeleton UI -->
      <div v-if="isLoading" class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div class="text-center lg:text-left space-y-6">
          <div class="h-6 w-32 bg-gray-200 rounded animate-pulse mx-auto lg:mx-0"></div>
          <div class="h-16 w-64 bg-gray-200 rounded animate-pulse mx-auto lg:mx-0"></div>
          <div class="h-8 w-48 bg-gray-200 rounded animate-pulse mx-auto lg:mx-0"></div>
          <div class="space-y-3">
            <div class="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
            <div class="h-4 w-5/6 bg-gray-200 rounded animate-pulse"></div>
            <div class="h-4 w-4/6 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div class="flex gap-4 justify-center lg:justify-start pt-4">
            <div class="h-14 w-40 bg-gray-200 rounded-full animate-pulse"></div>
            <div class="h-14 w-40 bg-gray-200 rounded-full animate-pulse"></div>
          </div>
          <div class="flex items-center justify-center lg:justify-start gap-8 pt-8 border-t border-gray-200">
            <div class="h-12 w-20 bg-gray-200 rounded animate-pulse"></div>
            <div class="h-12 w-20 bg-gray-200 rounded animate-pulse"></div>
            <div class="h-8 w-32 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
        <div class="flex justify-center lg:justify-end">
          <div class="w-80 h-80 lg:w-96 lg:h-96 bg-gray-200 rounded-full animate-pulse"></div>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="hasError || !heroData" class="text-center py-16">
        <div class="text-gray-400 mb-4">
          <svg class="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h3 class="text-xl font-semibold text-gray-600 mb-2">Failed to load data</h3>
        <p class="text-gray-400">Please check your database connection or try again later.</p>
      </div>

      <!-- Loaded Data -->
      <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div :class="containerAlignmentClass" :style="[textStyle, fontFamilyStyle]">
          <div class="mb-8">
            <p
              v-if="!isHidden('hero', 'greeting')"
              class="text-primary-600 font-semibold text-lg mb-4 flex items-center"
              :class="greetingClasses"
            >
              <span v-if="(heroData.textAlign ?? 'left') !== 'right'" class="w-8 h-px bg-primary-600 mr-3"></span>
              {{ heroData.greeting || "Hello, I'm" }}
              <span v-if="(heroData.textAlign ?? 'left') === 'right'" class="w-8 h-px bg-primary-600 ml-3"></span>
            </p>
            <h1
              v-if="!isHidden('hero', 'name')"
              class="text-gray-900 mb-6 leading-tight transition-all"
              :class="[nameSizeClass, nameWeightClass]"
            >
              <template v-if="(heroData.name || '').includes(' ')">
                {{ heroData.name.split(' ')[0] }} <span class="gradient-text">{{ heroData.name.split(' ').slice(1).join(' ') }}</span>
              </template>
              <template v-else>
                <span class="gradient-text">{{ heroData.name }}</span>
              </template>
            </h1>
            <h2
              v-if="!isHidden('hero', 'title')"
              class="text-gray-600 mb-8 font-light leading-snug"
              :class="titleSizeClass"
            >
              {{ heroData.title }}
            </h2>
          </div>

          <p
            v-if="!isHidden('hero', 'description')"
            class="text-gray-700 mb-10 leading-relaxed"
            :class="[descSizeClass, descWidthClass]"
          >
            {{ heroData.description }}
          </p>

          <div class="flex flex-col sm:flex-row gap-4" :class="buttonContainerClasses">
            <a
              href="#Projects"
              class="inline-flex items-center bg-primary-600 text-white px-8 py-4 rounded-full hover:bg-primary-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 group"
            >
              <span class="mr-2">View My Work</span>
              <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="#Contact"
              class="inline-flex items-center border-2 border-primary-600 text-primary-600 px-8 py-4 rounded-full hover:bg-primary-600 hover:text-white transition-all duration-300 transform hover:-translate-y-1"
            >
              Get In Touch
            </a>
          </div>

          <div class="mt-12 flex flex-col sm:flex-row items-center gap-8 border-t border-gray-200 pt-8" :class="statsContainerClasses">
            <div class="flex items-center gap-8">
              <div class="text-center lg:text-left">
                <p class="text-3xl font-bold text-gray-900">{{ heroData.projectsCount }}<span class="text-primary-600 text-xl align-top">+</span></p>
                <p class="text-sm text-gray-500 font-medium tracking-wide uppercase mt-1">Projects</p>
              </div>
              <div class="w-px h-12 bg-gray-200"></div>
              <div class="text-center lg:text-left">
                <p class="text-3xl font-bold text-gray-900">{{ heroData.githubReposCount }}<span class="text-primary-600 text-xl align-top">+</span></p>
                <p class="text-sm text-gray-500 font-medium tracking-wide uppercase mt-1">Github Repos</p>
              </div>
            </div>

            <div class="hidden sm:block w-px h-12 bg-gray-200"></div>
            <div class="sm:hidden w-full h-px bg-gray-200"></div>

            <div class="flex items-center gap-5">
              <a :href="heroData.socials.facebook" target="_blank" class="text-gray-400 hover:text-primary-600 transition-colors transform hover:scale-110">
                <span class="sr-only">Facebook</span>
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd" /></svg>
              </a>
              <a :href="heroData.socials.twitter" target="_blank" class="text-gray-400 hover:text-primary-600 transition-colors transform hover:scale-110">
                <span class="sr-only">Twitter</span>
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
              </a>
              <a :href="heroData.socials.instagram" target="_blank" class="text-gray-400 hover:text-primary-600 transition-colors transform hover:scale-110">
                <span class="sr-only">Instagram</span>
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clip-rule="evenodd" /></svg>
              </a>
            </div>
          </div>
        </div>

        <div class="flex justify-center lg:justify-end items-center relative" :style="imageStyle">
          <div class="relative flex items-center justify-center -translate-y-6 lg:-translate-y-10">
            <!-- Ambient Glow Backdrop -->
            <div class="absolute w-72 h-72 lg:w-96 lg:h-96 rounded-full bg-gradient-to-tr from-primary-400/25 via-primary-300/35 to-blue-400/25 filter blur-3xl -z-0 transform translate-y-6"></div>
            
            <!-- Modern Arch Backdrop Layer -->
            <div class="absolute bottom-0 w-64 lg:w-80 h-72 lg:h-[380px] bg-gradient-to-t from-primary-100/60 via-white/40 to-transparent dark:from-primary-900/40 dark:via-white/5 dark:to-transparent rounded-t-[3.5rem] border-t border-x border-white/60 dark:border-white/10 shadow-xl backdrop-blur-sm -z-0"></div>

            <!-- Transparent Cutout Portrait Image with Hover Lens -->
            <div
              class="relative z-10 flex justify-center items-end select-none"
              ref="portraitContainerRef"
              @mouseenter="onPortraitMouseEnter"
              @mousemove="onPortraitMouseMove"
              @mouseleave="onPortraitMouseLeave"
              @contextmenu.prevent
            >
              <div v-if="isLoading" class="w-72 h-96 lg:w-80 lg:h-[480px] bg-gray-200 rounded-3xl animate-pulse"></div>
              <img
                v-else-if="portraitSrc"
                :src="portraitSrc"
                draggable="false"
                @dragstart.prevent
                @error="$event.target.style.display='none'"
                :alt="heroData.name || 'Your Photo'"
                class="relative z-10 w-auto max-w-[280px] sm:max-w-[340px] lg:max-w-[400px] max-h-[460px] lg:max-h-[530px] object-contain drop-shadow-[0_20px_35px_rgba(0,0,0,0.18)] transition-all duration-500 hover:scale-[1.02] select-none"
                :style="{ cursor: !isDark && heroData?.hoverImage ? 'none' : 'default', userSelect: 'none', WebkitUserDrag: 'none' }"
              />
              <!-- Cursor Lens Circle -->
              <div
                v-if="lensVisible && !isDark && heroData?.hoverImage"
                class="pointer-events-none fixed z-50 rounded-full border-2 border-white/70 shadow-2xl overflow-hidden"
                :style="lensStyle"
              >
                <img
                  :src="heroData.hoverImage"
                  alt="Hover Reveal"
                  draggable="false"
                  class="absolute inset-0 w-full h-full object-cover pointer-events-none"
                  :style="lensImageStyle"
                />
              </div>
            </div>

            <!-- Floating Badge: Specialized in -->
            <div class="absolute top-10 -right-2 lg:-right-6 z-20 bg-white/95 dark:bg-[#1a1d27]/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-xl border border-white/80 dark:border-white/10 flex items-center gap-3 transform hover:-translate-y-1 transition-transform">
              <div class="w-9 h-9 rounded-xl bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center text-primary-600 dark:text-primary-300 shadow-inner">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <div class="text-left">
                <p class="text-[11px] text-gray-500 dark:text-gray-400 font-medium leading-none">Specialized in</p>
                <p class="text-xs font-bold text-gray-900 dark:text-gray-100 leading-tight mt-0.5">Full-Stack & UI</p>
              </div>
            </div>

            <!-- Floating Badge: Status -->
            <div class="absolute bottom-10 -left-2 lg:-left-6 z-20 bg-white/95 dark:bg-[#1a1d27]/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-xl border border-white/80 dark:border-white/10 flex items-center gap-3 transform hover:-translate-y-1 transition-transform">
              <div class="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-300 shadow-inner">
                <span class="relative flex h-3 w-3">
                  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span class="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
              </div>
              <div class="text-left">
                <p class="text-[11px] text-gray-500 dark:text-gray-400 font-medium leading-none">Status</p>
                <p class="text-xs font-bold text-gray-900 dark:text-gray-100 leading-tight mt-0.5">Available for Work</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { supabase } from '../supabase'
import heroDefaults from '../data/hero-defaults.json'
import { useVisibility } from '../composables/useVisibility'
import { useTheme } from '../composables/useTheme'

const { isHidden } = useVisibility()
const { isDark } = useTheme()

const gradientPosition = ref(85)
const gradientOpacity = ref(80)

// ─── Hover Lens State ──────────────────────────────────────
const portraitContainerRef = ref(null)
const lensVisible = ref(false)
const lensX = ref(0)
const lensY = ref(0)
const LENS_SIZE = 140 // px diameter of the cursor lens circle

const lensStyle = computed(() => ({
  width: `${LENS_SIZE}px`,
  height: `${LENS_SIZE}px`,
  left: `${lensX.value - LENS_SIZE / 2}px`,
  top: `${lensY.value - LENS_SIZE / 2}px`,
  transition: lensVisible.value ? 'opacity 0.25s ease-out' : 'opacity 0.2s ease-in',
  opacity: lensVisible.value ? 1 : 0,
  boxShadow: '0 8px 32px rgba(0,0,0,0.25), inset 0 0 12px rgba(255,255,255,0.15)'
}))

const lensImageStyle = computed(() => {
  if (!portraitContainerRef.value) return {}
  const rect = portraitContainerRef.value.getBoundingClientRect()
  // Map cursor position within the container to the hover image position
  const relX = ((lensX.value - rect.left) / rect.width) * 100
  const relY = ((lensY.value - rect.top) / rect.height) * 100
  return {
    objectPosition: `${relX}% ${relY}%`,
    transform: 'scale(1.3)'
  }
})

const portraitSrc = computed(() => heroData.value?.image || '')

function onPortraitMouseEnter() {
  if (!isDark.value && heroData.value?.hoverImage) {
    lensVisible.value = true
  }
}
function onPortraitMouseMove(e) {
  lensX.value = e.clientX
  lensY.value = e.clientY
}
function onPortraitMouseLeave() {
  lensVisible.value = false
}

watch(isDark, () => {
  lensVisible.value = false
})

const coverGradientStyle = computed(() => {
  const pos = Number(gradientPosition.value ?? 85)
  const opa = Number(gradientOpacity.value ?? 80) / 100
  const fade = isDark.value ? `rgba(15, 17, 23, ${opa})` : `rgba(250, 249, 246, ${opa})`
  return {
    background: `linear-gradient(to bottom, transparent 0%, transparent ${pos}%, ${fade} 100%)`
  }
})

const isLoading = ref(true)
const hasError = ref(false)
const heroData = ref(null)
const scrollProgress = ref(0)

// Scroll-driven slide animation: text slides left, image slides right in sync
const handleHeroScroll = () => {
  const vh = window.innerHeight
  const scrollY = window.scrollY
  const delayThreshold = 0.08
  const rawProgress = Math.max(scrollY / vh, 0)

  if (rawProgress <= delayThreshold) {
    scrollProgress.value = 0
  } else {
    scrollProgress.value = Math.min((rawProgress - delayThreshold) / (1 - delayThreshold), 1)
  }
}

const slideTransition = 'transform 0.3s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.3s ease-out'

const textStyle = computed(() => {
  const x = scrollProgress.value * -80
  const opacity = 1 - scrollProgress.value * 0.6
  return {
    transform: `translateX(${x}px)`,
    opacity,
    transition: slideTransition
  }
})

const imageStyle = computed(() => {
  const x = scrollProgress.value * 80
  const opacity = 1 - scrollProgress.value * 0.4
  return {
    transform: `translateX(${x}px)`,
    opacity,
    transition: slideTransition
  }
})

// ─── Computed Typography & Placement Styles ───────────────────────
const containerAlignmentClass = computed(() => {
  const align = heroData.value?.textAlign ?? 'left'
  if (align === 'center') return 'text-center'
  if (align === 'right') return 'text-center lg:text-right'
  return 'text-center lg:text-left'
})

const fontFamilyStyle = computed(() => {
  const f = heroData.value?.fontFamily ?? 'sans'
  if (f === 'serif') return { fontFamily: 'Georgia, Cambria, "Times New Roman", serif' }
  if (f === 'mono') return { fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace' }
  if (f === 'display') return { fontFamily: 'Outfit, "Plus Jakarta Sans", system-ui, sans-serif' }
  return { fontFamily: 'system-ui, -apple-system, Inter, BlinkMacSystemFont, sans-serif' }
})

const greetingClasses = computed(() => {
  const align = heroData.value?.textAlign ?? 'left'
  if (align === 'center') return 'justify-center'
  if (align === 'right') return 'justify-center lg:justify-end'
  return 'justify-center lg:justify-start'
})

const nameSizeClass = computed(() => {
  const s = heroData.value?.nameSize ?? 'xl'
  if (s === 'sm') return 'text-4xl lg:text-5xl'
  if (s === 'md') return 'text-5xl lg:text-6xl'
  if (s === 'lg') return 'text-5xl lg:text-6xl xl:text-7xl'
  return 'text-5xl lg:text-7xl xl:text-8xl' // xl
})

const nameWeightClass = computed(() => {
  const w = heroData.value?.fontWeight ?? 'bold'
  if (w === 'normal') return 'font-normal'
  if (w === 'medium') return 'font-medium'
  if (w === 'semibold') return 'font-semibold'
  return 'font-bold'
})

const titleSizeClass = computed(() => {
  const s = heroData.value?.titleSize ?? 'lg'
  if (s === 'sm') return 'text-xl lg:text-2xl'
  if (s === 'md') return 'text-2xl lg:text-3xl'
  return 'text-2xl lg:text-3xl xl:text-4xl'
})

const descSizeClass = computed(() => {
  const s = heroData.value?.descSize ?? 'md'
  if (s === 'sm') return 'text-base lg:text-lg'
  if (s === 'lg') return 'text-xl lg:text-2xl'
  return 'text-lg lg:text-xl'
})

const descWidthClass = computed(() => {
  const align = heroData.value?.textAlign ?? 'left'
  if (align === 'center') return 'max-w-2xl mx-auto'
  if (align === 'right') return 'max-w-2xl mx-auto lg:ml-auto lg:mr-0'
  return 'max-w-2xl mx-auto lg:mx-0'
})

const buttonContainerClasses = computed(() => {
  const align = heroData.value?.textAlign ?? 'left'
  if (align === 'center') return 'justify-center'
  if (align === 'right') return 'justify-center lg:justify-end'
  return 'justify-center lg:justify-start'
})

const statsContainerClasses = computed(() => {
  const align = heroData.value?.textAlign ?? 'left'
  if (align === 'center') return 'justify-center'
  if (align === 'right') return 'justify-center lg:justify-end'
  return 'justify-center lg:justify-start'
})

const applyGradientSettings = (pos, opa) => {
  if (pos != null && !isNaN(Number(pos))) gradientPosition.value = Number(pos)
  if (opa != null && !isNaN(Number(opa))) gradientOpacity.value = Number(opa)
}

const handleStorageEvent = (e) => {
  if (e.key === 'heroGradientSettings' && e.newValue) {
    try {
      const g = JSON.parse(e.newValue)
      applyGradientSettings(g.position, g.opacity)
    } catch (_) {}
  }
  if (e.key === 'heroSectionData' && e.newValue) {
    try {
      const parsed = JSON.parse(e.newValue)
      if (heroData.value) {
        heroData.value = {
          ...heroData.value,
          ...parsed
        }
      }
    } catch (_) {}
  }
}

onMounted(async () => {
  window.addEventListener('scroll', handleHeroScroll, { passive: true })
  window.addEventListener('storage', handleStorageEvent)
  
  // 1. Check dedicated localStorage gradient settings first
  try {
    const savedGradient = localStorage.getItem('heroGradientSettings')
    if (savedGradient) {
      const g = JSON.parse(savedGradient)
      applyGradientSettings(g.position, g.opacity)
    }
  } catch (e) {
    console.warn('Error loading gradient settings from localStorage:', e)
  }

  let loaded = false
  if (supabase) {
    try {
      // Fetch personal info including palette
      const { data: personalData, error: personalError } = await supabase
        .from('personal_info')
        .select('name, title, description, image, cover_image, palette')
        .order('updated_at', { ascending: false })
        .limit(1)
        .maybeSingle()

      if (!personalError && personalData) {
        let pal = null
        if (personalData.palette) {
          try {
            pal = typeof personalData.palette === 'string' ? JSON.parse(personalData.palette) : personalData.palette
            if (!localStorage.getItem('heroGradientSettings')) {
              applyGradientSettings(pal?.gradientPosition, pal?.gradientOpacity)
            }
          } catch (_) {}
        }

        // Fetch project count from the correct table: 'projects'
        let projectsCount = 0
        try {
          const { data: projectData } = await supabase
            .from('projects')
            .select('projects')
            .limit(1)
            .maybeSingle()
          projectsCount = projectData?.projects?.length || 0
        } catch (e) {
          console.warn('Projects count fetch warning:', e)
        }

        heroData.value = {
          greeting: pal?.greeting || heroDefaults.greeting || "Hello, I'm",
          name: personalData.name || 'Brian Perez',
          title: personalData.title || 'Full-Stack Developer & Designer',
          description: personalData.description || 'I build highly performant, responsive web applications with modern design systems.',
          image: personalData.image || '',
          hoverImage: pal?.hoverImage || '',
          coverImage: personalData.cover_image || '',
          fontFamily: pal?.fontFamily || heroDefaults.fontFamily || 'sans',
          nameSize: pal?.nameSize || heroDefaults.nameSize || 'xl',
          fontWeight: pal?.fontWeight || heroDefaults.fontWeight || 'bold',
          textAlign: pal?.textAlign || heroDefaults.textAlign || 'left',
          titleSize: pal?.titleSize || heroDefaults.titleSize || 'lg',
          descSize: pal?.descSize || heroDefaults.descSize || 'md',
          projectsCount: projectsCount || 12,
          githubReposCount: 24,
          socials: { facebook: 'https://facebook.com', twitter: 'https://twitter.com', instagram: 'https://instagram.com' }
        }
        loaded = true
      }
    } catch (e) {
      console.warn('Supabase fetch failed in hero_section, using local fallback:', e)
    }
  }

  // Fallback: try localStorage, then imported JSON defaults
  if (!loaded) {
    const savedData = localStorage.getItem('heroSectionData')
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData)
        if (!localStorage.getItem('heroGradientSettings')) {
          applyGradientSettings(parsed.gradientPosition, parsed.gradientOpacity)
        }

        heroData.value = {
          greeting: parsed.greeting || heroDefaults.greeting || "Hello, I'm",
          name: parsed.name || heroDefaults.name,
          title: parsed.title || heroDefaults.title,
          description: parsed.description || heroDefaults.description,
          image: parsed.image || heroDefaults.image,
          hoverImage: parsed.hoverImage || heroDefaults.hoverImage || '',
          coverImage: parsed.coverImage || heroDefaults.coverImage,
          fontFamily: parsed.fontFamily || heroDefaults.fontFamily || 'sans',
          nameSize: parsed.nameSize || heroDefaults.nameSize || 'xl',
          fontWeight: parsed.fontWeight || heroDefaults.fontWeight || 'bold',
          textAlign: parsed.textAlign || heroDefaults.textAlign || 'left',
          titleSize: parsed.titleSize || heroDefaults.titleSize || 'lg',
          descSize: parsed.descSize || heroDefaults.descSize || 'md',
          projectsCount: parsed.projectsCount || heroDefaults.projectsCount,
          githubReposCount: parsed.githubReposCount || heroDefaults.githubReposCount,
          socials: parsed.socials || heroDefaults.socials
        }
        loaded = true
      } catch (e) {
        console.warn('Error loading hero data from localStorage:', e)
      }
    }
  }

  // Final fallback: imported JSON defaults
  if (!loaded) {
    heroData.value = { ...heroDefaults }
    if (!localStorage.getItem('heroGradientSettings')) {
      applyGradientSettings(heroDefaults.gradientPosition, heroDefaults.gradientOpacity)
    }
    hasError.value = false
  }

  // Fetch real GitHub repo count
  if (heroData.value) {
    try {
      const ghResponse = await fetch('https://api.github.com/users/sirLass')
      if (ghResponse.ok) {
        const ghData = await ghResponse.json()
        heroData.value.githubReposCount = ghData.public_repos || 24
      }
    } catch (ghError) {
      console.warn('Error fetching GitHub repos:', ghError)
    }
  }

  isLoading.value = false
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleHeroScroll)
  window.removeEventListener('storage', handleStorageEvent)
})
</script>
