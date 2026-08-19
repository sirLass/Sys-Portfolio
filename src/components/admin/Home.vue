<template>
  <div class="p-6">
    <!-- Banners -->
    <Banner :show="showSuccess" type="success" message="Changes saved successfully!" />
    <Banner :show="showError" type="error" :message="errorMessage" />

    <!-- Tab Navigation -->
    <div class="mb-6 border-b border-[#c9cccf]">
      <nav class="flex gap-1">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="activeTab = tab.id"
          :class="[
            'px-4 py-3 text-sm font-medium border-b-2 transition-colors flex items-center gap-2',
            activeTab === tab.id
              ? 'border-[var(--admin-primary)] text-[var(--admin-primary)]'
              : 'border-transparent text-[#6d7175] hover:text-[#1a1b1c]'
          ]"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="tab.icon" />
          </svg>
          {{ tab.label }}
        </button>
      </nav>
    </div>

    <form @submit.prevent="handleSave">
      <!-- Overview Tab -->
      <HomeOverview v-if="activeTab === 'Overview'" :stats="stats" />

      <!-- Details Tab -->
      <HomeDetails
        v-else-if="activeTab === 'Details'"
        v-model="heroData"
        :vis="vis"
        @toggle-vis="toggleVis"
      />

      <!-- Theme Tab -->
      <HomeTheme
        v-else-if="activeTab === 'Theme'"
        v-model="heroData"
        :palettes="PRESET_PALETTES"
      />

      <!-- Image Tab -->
      <HomeImage
        v-else-if="activeTab === 'Image'"
        v-model="heroData"
        :is-loading="isLoadingInfo"
        @upload="handleImageUpload"
        @crop="handleCropRequest"
      />

      <!-- Action Buttons -->
      <div class="mt-8 pt-6 border-t border-[#e3e5e7] flex items-center justify-end gap-3">
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

    <!-- Crop Modal -->
    <CropModal
      v-if="cropModalOpen"
      :image="imageToCrop"
      :aspect-ratio="cropperTargetField === 'image' ? 1 : 16 / 9"
      @confirm="confirmCrop"
      @cancel="cancelCrop"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, inject, nextTick } from 'vue'
import { supabase } from '../../supabase'
import { useVisibility } from '../../composables/useVisibility'
import Banner from './ui/Banner.vue'
import HomeOverview from './HomeOverview.vue'
import HomeDetails from './HomeDetails.vue'
import HomeTheme from './HomeTheme.vue'
import HomeImage from './HomeImage.vue'
import CropModal from './CropModal.vue'
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'

const addToast = inject('addToast')
const updateTheme = inject('updateTheme')
const updateGlobalTheme = inject('updateGlobalTheme')
const { vis, toggle: toggleVis } = useVisibility()

const tabs = [
  { id: 'Overview', label: 'Overview', icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
  { id: 'Details', label: 'Details', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
  { id: 'Theme', label: 'Portfolio Theme', icon: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17l.343-.343' },
  { id: 'Image', label: 'Profile Image', icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' }
]

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
const activeTab = ref('Overview')
const showSuccess = ref(false)
const showError = ref(false)
const errorMessage = ref('')
const saving = ref(false)
const currentId = ref(null)

const heroData = ref({
  name: '',
  title: '',
  description: '',
  image: '',
  coverImage: '',
  gradientPosition: 85,
  gradientOpacity: 80,
  palette: PRESET_PALETTES[0]
})

const stats = ref({
  totalProjects: 12,
  totalViews: '2.4k',
  webApps: 8,
  systems: 4
})

// Image / Crop state
const profileInput = ref(null)
const coverInput = ref(null)
const cropModalOpen = ref(false)
const cropperInstance = ref(null)
const imageToCrop = ref('')
const cropperTargetField = ref('')
const imageElement = ref(null)

// ─── Data Loading ──────────────────────────────────────────
async function loadFromDb() {
  isLoadingInfo.value = true

  // Always load gradient settings from dedicated localStorage key
  let gradientPos = 85
  let gradientOpa = 80
  try {
    const savedGradient = localStorage.getItem('heroGradientSettings')
    if (savedGradient) {
      const g = JSON.parse(savedGradient)
      gradientPos = g.position ?? 85
      gradientOpa = g.opacity ?? 80
    }
  } catch (e) {
    console.warn('Error loading gradient settings:', e)
  }

  if (!supabase) {
    heroData.value = {
      name: 'Brian Perez',
      title: 'Aspiring Full Stack Developer',
      description: 'As a Aspiring Developer and UI/UX Designer, I craft solutions that are not only visually appealing but also intuitive and efficient — combining thoughtful design with clean, scalable code.',
      image: '/me.png',
      coverImage: 'https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2000&auto=format&fit=crop',
      gradientPosition: gradientPos,
      gradientOpacity: gradientOpa,
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
        gradientPosition: gradientPos,
        gradientOpacity: gradientOpa,
        palette: data.palette
          ? (typeof data.palette === 'string' ? JSON.parse(data.palette) : data.palette)
          : PRESET_PALETTES[0]
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
    coverImage: 'https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2000&auto=format&fit=crop',
    gradientPosition: gradientPos,
    gradientOpacity: gradientOpa
  }
}

onMounted(loadFromDb)

// ─── Image Handling ────────────────────────────────────────
function handleImageUpload(event, field) {
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
    imageToCrop.value = e.target.result
    cropperTargetField.value = field
    cropModalOpen.value = true

    nextTick(() => {
      setTimeout(() => {
        const imgEl = imageElement.value
        if (!imgEl) return

        const initCropper = () => {
          if (cropperInstance.value) cropperInstance.value.destroy()
          cropperInstance.value = new Cropper(imgEl, {
            aspectRatio: field === 'image' ? 1 : 16 / 9,
            viewMode: 2,
            autoCropArea: 1,
            background: false
          })
        }

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

function handleCropRequest({ field, dataUrl }) {
  imageToCrop.value = dataUrl
  cropperTargetField.value = field
  cropModalOpen.value = true
}

function confirmCrop(canvas) {
  if (canvas) {
    heroData.value[cropperTargetField.value] = canvas.toDataURL('image/jpeg', 0.8)
    const photoType = cropperTargetField.value === 'image' ? 'Profile' : 'Cover'
    if (addToast) addToast(`${photoType} photo updated locally. Remember to save changes.`, 'success')
  }
  cropModalOpen.value = false
}

function cancelCrop() {
  cropModalOpen.value = false
}

// ─── Save ──────────────────────────────────────────────────
async function handleSave() {
  saving.value = true
  showSuccess.value = false
  showError.value = false

  // Save gradient settings to dedicated localStorage key
  localStorage.setItem('heroGradientSettings', JSON.stringify({
    position: heroData.value.gradientPosition ?? 85,
    opacity: heroData.value.gradientOpacity ?? 80
  }))

  const payload = {
    name: heroData.value.name,
    title: heroData.value.title,
    description: heroData.value.description,
    image: heroData.value.image || '/me.png',
    cover_image: heroData.value.coverImage,
    palette: heroData.value.palette,
    updated_at: new Date().toISOString()
  }

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
      const { error } = await supabase.from('personal_info').update(payload).eq('id', currentId.value)
      if (error) throw error
    } else {
      const { data, error } = await supabase.from('personal_info').insert(payload).select('id').single()
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

defineExpose({
  refresh: loadFromDb,
  onSearch: () => {}
})
</script>
