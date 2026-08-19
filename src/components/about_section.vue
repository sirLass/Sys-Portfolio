<template>
  <section id="About" class="py-24 bg-white">
    <div class="max-w-7xl mx-auto px-6">
      <!-- Loading State - Skeleton UI -->
      <div v-if="isLoading">
        <div class="text-center mb-16">
          <div class="h-6 w-32 bg-gray-200 rounded animate-pulse mx-auto mb-4"></div>
          <div class="h-12 w-64 bg-gray-200 rounded animate-pulse mx-auto mb-6"></div>
          <div class="w-24 h-1 bg-gray-200 rounded-full mx-auto"></div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div class="order-2 lg:order-1 flex justify-center">
            <div class="w-80 h-80 lg:w-96 lg:h-96 bg-gray-200 rounded-3xl animate-pulse"></div>
          </div>

          <div class="order-1 lg:order-2 space-y-4">
            <div class="h-10 w-56 bg-gray-200 rounded animate-pulse mb-6"></div>
            <div class="space-y-4">
              <div class="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
              <div class="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
              <div class="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div class="space-y-4 mt-8">
              <div class="h-4 w-48 bg-gray-200 rounded animate-pulse"></div>
              <div class="h-4 w-48 bg-gray-200 rounded animate-pulse"></div>
              <div class="h-4 w-48 bg-gray-200 rounded animate-pulse"></div>
              <div class="h-4 w-48 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div class="h-12 w-32 bg-gray-200 rounded-lg animate-pulse mt-8"></div>
          </div>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="hasError || !aboutData" class="text-center py-16">
        <div class="text-gray-400 mb-4">
          <svg class="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h3 class="text-xl font-semibold text-gray-600 mb-2">Failed to load data</h3>
        <p class="text-gray-400">Please check your database connection or try again later.</p>
      </div>

      <!-- Loaded Data -->
      <div v-else>
        <!-- Heading: fade in -->
        <div ref="headingRef" class="text-center mb-16 opacity-0 translate-y-8 transition-all duration-700 ease-out" :class="{ 'opacity-100 translate-y-0': headingVisible }">
          <p class="text-primary-600 font-semibold text-lg mb-4">{{ aboutData.sectionLabel }}</p>
          <h2 class="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">{{ aboutData.mainHeading }}</h2>
          <div class="w-24 h-1 bg-primary-600 mx-auto rounded-full"></div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <!-- Image: slide from left -->
          <div ref="imageRef" class="order-2 lg:order-1 flex justify-center opacity-0 -translate-x-16 transition-all duration-800 ease-out" :class="{ 'opacity-100 translate-x-0': imageVisible }">
            <div class="relative">
              <div class="w-80 h-80 lg:w-96 lg:h-96 bg-gradient-to-br from-primary-100 to-blue-100 rounded-3xl shadow-2xl flex items-center justify-center">
                <img :src="aboutData.image || '/me.png'" :alt="aboutData.name || 'Your Photo'" class="w-full h-full object-cover transform translate-y-2" />
              </div>
              <div class="absolute -top-6 -right-6 w-24 h-24 bg-primary-200 rounded-full opacity-60"></div>
              <div class="absolute -bottom-6 -left-6 w-32 h-32 bg-blue-200 rounded-full opacity-40"></div>
            </div>
          </div>

          <!-- Text + button: slide from right -->
          <div ref="contentRef" class="order-1 lg:order-2 text-left opacity-0 translate-x-16 transition-all duration-800 ease-out delay-200" :class="{ 'opacity-100 translate-x-0': contentVisible }">
            <h3 v-if="!isHidden('about', 'mainHeading')" class="text-3xl font-bold text-gray-900 mb-6">{{ aboutData.subheading }}</h3>
            <div v-if="!isHidden('about', 'paragraph1') || !isHidden('about', 'paragraph2')" class="space-y-6 text-lg text-gray-700 leading-relaxed max-w-xl">
              <p v-if="!isHidden('about', 'paragraph1')">{{ aboutData.paragraph1 }}</p>
              <p v-if="!isHidden('about', 'paragraph2')">{{ aboutData.paragraph2 }}</p>
            </div>

            <button
              v-if="aboutData.cvLink && !isHidden('about', 'cvButton')"
              type="button"
              class="inline-flex items-center bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 group cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none mt-8"
              :disabled="cvDownloading"
              @click="downloadCv"
            >
              <svg class="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              {{ cvDownloading ? 'Preparing…' : 'Download CV' }}
            </button>
            <p v-else class="text-sm text-gray-500 mt-8">Add a CV in the admin panel (About → Files) to enable download.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { supabase } from '../supabase'
import { useVisibility } from '../composables/useVisibility'

const { isHidden } = useVisibility()

const aboutData = ref(null)
const isLoading = ref(true)
const hasError = ref(false)
const cvDownloading = ref(false)

// Scroll animation refs
const headingRef = ref(null)
const imageRef = ref(null)
const contentRef = ref(null)
const headingVisible = ref(false)
const imageVisible = ref(false)
const contentVisible = ref(false)
let headingObserver = null
let imageObserver = null
let contentObserver = null

function createObserver(targetRef, visibleRef) {
  return new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        visibleRef.value = true
      }
    },
    { threshold: 0.15 }
  )
}

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
      const blob = dataUrlToBlob(link)
      triggerBlobDownload(blob, filename)
      return
    }

    const res = await fetch(link)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const blob = await res.blob()
    triggerBlobDownload(blob, filename)
  } catch (e) {
    console.error('CV download failed:', e)
    window.open(link, '_blank', 'noopener,noreferrer')
  } finally {
    cvDownloading.value = false
  }
}

onMounted(async () => {
  let loaded = false
  // Try to load from Supabase first
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('about_me')
        .select('*')
        .limit(1)
        .single()

      if (!error && data) {
        aboutData.value = {
          sectionLabel: data.section_label || 'Get to know me',
          mainHeading: data.main_heading || 'About Me',
          subheading: data.subheading || 'My Developer Journey',
          paragraph1: data.Paragraph1 || '',
          paragraph2: data.Paragraph2 || '',
          name: data.name || '',
          email: data.email || '',
          location: data.location || '',
          status: data.status || 'Available for Remote Work',
          cvLink: (data.cv_link && String(data.cv_link).trim()) || '',
          image: data.image_url || '/me.png'
        }
        loaded = true
      }
    } catch (e) {
      console.warn('Error fetching About from Supabase, trying cache:', e)
    }
  }

  if (!loaded) {
    // Fallback to localStorage
    const savedData = localStorage.getItem('aboutSectionData')
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData)
        aboutData.value = {
          sectionLabel: parsed.sectionLabel || 'Get to know me',
          mainHeading: parsed.mainHeading || 'About Me',
          subheading: parsed.subheading || 'My Developer Journey',
          paragraph1: parsed.paragraph1 || '',
          paragraph2: parsed.paragraph2 || '',
          name: parsed.name || '',
          email: parsed.email || '',
          location: parsed.location || '',
          status: parsed.status || 'Available for Remote Work',
          cvLink: (parsed.cvLink && String(parsed.cvLink).trim()) || '',
          image: parsed.image || '/me.png'
        }
        loaded = true
      } catch (e) {
        console.warn('Error loading about data from localStorage:', e)
      }
    }
  }

  // Final resilient visual fallback if database & local cache are empty
  if (!loaded) {
    aboutData.value = {
      sectionLabel: 'Get to know me',
      mainHeading: 'About Me',
      subheading: 'My Developer Journey',
      paragraph1: "I am a passionate Full-Stack Developer with deep expertise in JavaScript, Vue, and modern cloud architectures. I love crafting clean user interfaces and optimizing code performance.",
      paragraph2: "My goal is always to build scalable, maintainable products that offer intuitive and engaging visual experiences for visitors.",
      name: 'Brian Perez',
      email: 'perezbrian091598@gmail.com',
      location: 'Quezon Province, Philippines',
      status: 'Available for Remote Work',
      cvLink: '',
      image: ''
    }
    hasError.value = false
  }

  isLoading.value = false

  // Set up scroll-triggered animations
  await new Promise(r => setTimeout(r, 50)) // wait for DOM render
  if (headingRef.value) {
    headingObserver = createObserver(headingRef, headingVisible)
    headingObserver.observe(headingRef.value)
  }
  if (imageRef.value) {
    imageObserver = createObserver(imageRef, imageVisible)
    imageObserver.observe(imageRef.value)
  }
  if (contentRef.value) {
    contentObserver = createObserver(contentRef, contentVisible)
    contentObserver.observe(contentRef.value)
  }
})

onBeforeUnmount(() => {
  headingObserver?.disconnect()
  imageObserver?.disconnect()
  contentObserver?.disconnect()
})
</script>