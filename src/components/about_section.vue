<template>
  <section
    id="About"
    ref="sectionRef"
    class="about-cast relative min-h-screen bg-[#0a0a0a] text-white overflow-hidden"
    aria-label="About section"
  >
    <!-- Loading skeleton -->
    <div v-if="isLoading" class="absolute inset-0 flex items-center justify-center">
      <div class="flex gap-3">
        <div v-for="i in 3" :key="i" class="w-16 md:w-24 h-64 md:h-96 bg-white/5 animate-pulse rounded-sm" :style="{ height: `${220 + i * 40}px` }"></div>
      </div>
    </div>

    <!-- Error -->
    <div v-else-if="hasError && !aboutData" class="absolute inset-0 flex flex-col items-center justify-center text-white/50 px-6">
      <p class="text-lg">Failed to load about section</p>
    </div>

    <!-- Main content -->
    <template v-else-if="aboutData">
      <!-- Top-right labels -->
      <div
        v-if="!isHidden('about', 'sectionLabel') && aboutData.sectionLabel"
        class="absolute top-8 md:top-12 right-6 md:right-12 z-30 flex gap-6 md:gap-10"
        :style="cornerStyle(0.15)"
      >
        <span class="text-[10px] md:text-xs tracking-[0.35em] uppercase text-white/45 font-medium">
          {{ aboutData.sectionLabel }}
        </span>
      </div>

      <!-- Top-left paragraph -->
      <p
        v-if="!isHidden('about', 'paragraph1') && aboutData.paragraph1"
        class="absolute top-24 md:top-32 left-6 md:left-12 z-30 max-w-[200px] md:max-w-[260px] text-[11px] md:text-xs leading-relaxed text-white/55 font-light tracking-wide"
        :style="cornerStyle(-0.12)"
      >
        {{ aboutData.paragraph1 }}
      </p>

      <!-- Bottom-right paragraph -->
      <p
        v-if="!isHidden('about', 'paragraph2') && aboutData.paragraph2"
        class="absolute bottom-16 md:bottom-24 right-6 md:right-12 z-30 max-w-[200px] md:max-w-[280px] text-[11px] md:text-xs leading-relaxed text-white/55 font-light tracking-wide text-right"
        :style="cornerStyle(0.1)"
      >
        {{ aboutData.paragraph2 }}
      </p>

      <!-- CV link -->
      <button
        v-if="aboutData.cvLink && !isHidden('about', 'cvButton')"
        type="button"
        class="absolute bottom-16 md:bottom-24 left-6 md:left-12 z-30 text-[10px] md:text-xs tracking-[0.3em] uppercase text-white/40 hover:text-white/80 transition-colors duration-300 disabled:opacity-40"
        :style="cornerStyle(-0.08)"
        :disabled="cvDownloading"
        @click="downloadCv"
      >
        {{ cvDownloading ? 'Preparing…' : 'Download CV' }}
      </button>

      <!-- Three-panel image stage -->
      <div class="relative flex items-end justify-center gap-2 md:gap-3 px-4 md:px-8 pt-32 pb-24 md:pb-32 min-h-[85vh]">
        <div
          v-for="(panel, index) in panels"
          :key="panel.id"
          class="panel relative overflow-hidden bg-[#111]"
          :class="panel.class"
          :style="panelFrameStyle(index)"
        >
          <div
            class="panel-image absolute inset-0 will-change-transform"
            :style="panelImageStyle(index)"
          >
            <img
              v-if="aboutData.image"
              :src="aboutData.image"
              :alt="aboutData.name || 'About'"
              class="absolute top-0 h-full max-w-none object-cover"
              :style="imagePositionStyle(index)"
              @error="onImageError"
            />
            <div v-else class="absolute inset-0 bg-gradient-to-b from-white/10 to-white/5"></div>
          </div>
        </div>
      </div>

      <!-- Large typography overlay -->
      <div
        class="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-20 px-4"
        :style="titleOverlayStyle"
      >
        <h2
          v-if="!isHidden('about', 'mainHeading')"
          class="about-title-line text-[clamp(3.5rem,12vw,9rem)] font-light tracking-[0.08em] leading-none text-white select-none"
        >
          {{ aboutData.mainHeading || 'ABOUT' }}
        </h2>
        <div class="flex items-center gap-4 md:gap-6 mt-2 md:mt-4">
          <span class="title-rule h-px bg-white/70" :style="ruleStyle"></span>
          <h2
            v-if="!isHidden('about', 'name') && displayBrand"
            class="about-title-line text-[clamp(2.5rem,9vw,7rem)] font-light tracking-[0.06em] leading-none text-white select-none"
          >
            {{ displayBrand }}
          </h2>
        </div>
      </div>
    </template>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { supabase } from '../supabase'
import { useVisibility } from '../composables/useVisibility'

const { isHidden } = useVisibility()

const aboutData = ref(null)
const isLoading = ref(true)
const hasError = ref(false)
const cvDownloading = ref(false)
const sectionRef = ref(null)
const scrollProgress = ref(0)
const isInView = ref(false)

const panels = [
  { id: 'left', class: 'w-[18vw] md:w-[14vw] max-w-[120px] md:max-w-[160px] h-[42vh] md:h-[48vh]' },
  { id: 'center', class: 'w-[28vw] md:w-[22vw] max-w-[200px] md:max-w-[280px] h-[58vh] md:h-[68vh]' },
  { id: 'right', class: 'w-[20vw] md:w-[16vw] max-w-[140px] md:max-w-[180px] h-[46vh] md:h-[52vh]' },
]

const displayBrand = computed(() => {
  const brand = aboutData.value?.subheading || aboutData.value?.name || ''
  return brand ? `— ${brand}` : ''
})

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

function updateScrollProgress() {
  const el = sectionRef.value
  if (!el) return

  const rect = el.getBoundingClientRect()
  const vh = window.innerHeight
  const sectionHeight = rect.height

  isInView.value = rect.bottom > 0 && rect.top < vh

  const raw = 1 - (rect.top + sectionHeight * 0.35) / (vh + sectionHeight * 0.35)
  scrollProgress.value = clamp(raw, 0, 1)
}

function panelFrameStyle(index) {
  const offsets = [-28, 0, -18]
  const scales = [0.94, 1, 0.96]
  const p = scrollProgress.value
  const enter = isInView.value ? 1 : 0

  return {
    transform: `translateY(${offsets[index] * (1 - p) + (1 - enter) * 60}px) scale(${scales[index] + p * 0.04})`,
    opacity: 0.35 + p * 0.65,
    transition: 'transform 0.08s linear, opacity 0.08s linear',
  }
}

function panelImageStyle(index) {
  const parallax = [-40, -70, -50]
  const p = scrollProgress.value

  return {
    transform: `translateY(${parallax[index] * p}px) scale(${1.08 + p * 0.06})`,
    transition: 'transform 0.08s linear',
  }
}

function imagePositionStyle(index) {
  const positions = ['0%', '-100%', '-200%']
  return {
    width: '300%',
    left: positions[index],
  }
}

function cornerStyle(parallaxFactor) {
  const p = scrollProgress.value
  const enter = isInView.value ? 1 : 0

  return {
    transform: `translateY(${parallaxFactor * p * 40 + (1 - enter) * 24}px)`,
    opacity: enter * (0.4 + p * 0.6),
    transition: 'transform 0.08s linear, opacity 0.08s linear',
  }
}

const titleOverlayStyle = computed(() => {
  const p = scrollProgress.value
  const enter = isInView.value ? 1 : 0

  return {
    transform: `translateY(${(1 - p) * 40 + (1 - enter) * 30}px) scale(${0.92 + p * 0.08})`,
    opacity: enter * (0.5 + p * 0.5),
    transition: 'transform 0.08s linear, opacity 0.08s linear',
  }
})

const ruleStyle = computed(() => {
  const p = scrollProgress.value
  return {
    width: `${clamp(p * 120, 0, 120)}px`,
    opacity: p,
    transition: 'width 0.08s linear, opacity 0.08s linear',
  }
})

function dataUrlToBlob(dataUrl) {
  const comma = dataUrl.indexOf(',')
  if (comma === -1) throw new Error('Invalid data URL')
  const header = dataUrl.slice(0, comma)
  const b64 = dataUrl.slice(comma + 1)
  const mimeMatch = header.match(/data:([^;]+)/)
  const mime = mimeMatch ? mimeMatch[1] : 'application/octet-stream'
  const binary = atob(b64)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i)
  return new Blob([bytes], { type: mime })
}

function triggerBlobDownload(blob, filename) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.rel = 'noopener'
  document.body.appendChild(a)
  a.click()
  a.remove()
  URL.revokeObjectURL(url)
}

async function downloadCv() {
  const link = aboutData.value?.cvLink?.trim()
  if (!link || cvDownloading.value) return

  const safeName = (aboutData.value.name || 'CV').replace(/[^\w\s-]/g, '').replace(/\s+/g, '_')
  const filename = `${safeName || 'CV'}_resume.pdf`

  cvDownloading.value = true
  try {
    if (link.startsWith('data:')) {
      triggerBlobDownload(dataUrlToBlob(link), filename)
      return
    }
    const res = await fetch(link)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    triggerBlobDownload(await res.blob(), filename)
  } catch (e) {
    console.error('CV download failed:', e)
    window.open(link, '_blank', 'noopener,noreferrer')
  } finally {
    cvDownloading.value = false
  }
}

function onImageError(e) {
  e.target.style.display = 'none'
}

function mapAboutData(data) {
  return {
    sectionLabel: data.section_label || data.sectionLabel || 'Portfolio',
    mainHeading: data.main_heading || data.mainHeading || 'ABOUT',
    subheading: data.subheading || data.name || '',
    paragraph1: data.Paragraph1 || data.paragraph1 || '',
    paragraph2: data.Paragraph2 || data.paragraph2 || '',
    name: data.name || '',
    email: data.email || '',
    location: data.location || '',
    status: data.status || '',
    cvLink: String(data.cv_link || data.cvLink || '').trim(),
    image: data.image_url || data.image || '',
  }
}

onMounted(async () => {
  let loaded = false

  if (supabase) {
    try {
      const { data, error } = await supabase.from('about_me').select('*').limit(1).single()
      if (!error && data) {
        aboutData.value = mapAboutData(data)
        loaded = true
      }
    } catch (e) {
      console.warn('Error fetching About from Supabase:', e)
    }
  }

  if (!loaded) {
    const savedData = localStorage.getItem('aboutSectionData')
    if (savedData) {
      try {
        aboutData.value = mapAboutData(JSON.parse(savedData))
        loaded = true
      } catch (e) {
        console.warn('Error loading about data from localStorage:', e)
      }
    }
  }

  if (!loaded) {
    aboutData.value = {
      sectionLabel: 'Portfolio',
      mainHeading: 'ABOUT',
      subheading: 'sirLass',
      paragraph1: "Our family's dedication to this noble craft reflects a deep respect for its history and potential.",
      paragraph2: "For years, we've been crafting digital experiences — transforming ideas into timeless, functional art.",
      name: 'sirLass',
      email: '',
      location: '',
      status: '',
      cvLink: '',
      image: '',
    }
  }

  isLoading.value = false
  updateScrollProgress()
  window.addEventListener('scroll', updateScrollProgress, { passive: true })
  window.addEventListener('resize', updateScrollProgress, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', updateScrollProgress)
  window.removeEventListener('resize', updateScrollProgress)
})
</script>

<style scoped>
.about-cast {
  font-family: Inter, system-ui, -apple-system, sans-serif;
}

.about-title-line {
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-weight: 300;
  text-transform: uppercase;
}

.panel {
  flex-shrink: 0;
  will-change: transform, opacity;
}

.panel-image {
  filter: grayscale(100%) contrast(1.05);
}

.panel-image img {
  will-change: transform;
}

.title-rule {
  display: block;
  will-change: width, opacity;
}

@media (prefers-reduced-motion: reduce) {
  .panel,
  .panel-image,
  .about-title-line,
  .title-rule {
    transition: none !important;
    animation: none !important;
  }
}
</style>
