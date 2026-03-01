<template>
  <div class="p-6">
    <!-- Success Message -->
    <div v-if="showSuccess" class="mb-6 flex items-center gap-3 p-4 bg-[var(--admin-primary-light)] border border-[var(--admin-primary)] rounded-lg">
      <svg class="w-5 h-5 text-[var(--admin-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
      </svg>
      <p class="text-sm font-medium text-[var(--admin-secondary)]">Changes saved successfully!</p>
    </div>

    <!-- Database Warning -->
    <div v-if="!isSupabaseConfigured()" class="mb-6 flex items-center gap-3 p-4 bg-[#fff3cd] border border-[#ffc107] rounded-lg">
      <svg class="w-5 h-5 text-[#856404]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
      <p class="text-sm font-medium text-[#856404]">Database not configured. Data will be saved locally only.</p>
    </div>

    <!-- Tabs -->
    <div class="border-b border-[#c9cccf] mb-6">
      <nav class="flex space-x-8" aria-label="Tabs">
        <button
          v-for="tab in tabs"
          :key="tab.name"
          @click="activeTab = tab.name"
          :class="[
            'py-2 px-1 border-b-2 font-medium text-sm transition-colors',
            activeTab === tab.name
              ? 'border-[var(--admin-primary)] text-[var(--admin-primary)]'
              : 'border-transparent text-[#6d7175] hover:text-[#1a1b1c] hover:border-[#b5babf]'
          ]"
        >
          {{ tab.label }}
        </button>
      </nav>
    </div>

    <form @submit.prevent="handleSave">
      <!-- About Me Tab -->
      <div v-if="activeTab === 'about'" class="space-y-6">
        <!-- Description Paragraphs -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label for="paragraph1" class="block text-sm font-medium text-[#1a1b1c] mb-2">
              First Paragraph
            </label>
            <textarea
              id="paragraph1"
              v-model="aboutData.paragraph1"
              rows="4"
              class="w-full px-4 py-2.5 text-sm text-[#1a1b1c] bg-white border border-[#c9cccf] rounded-md focus:outline-none focus:border-[var(--admin-primary)] focus:ring-2 focus:ring-[var(--admin-primary)]/20 transition-all placeholder:text-[#6d7175] resize-y"
              placeholder="As a passionate designer and full stack developer..."
            ></textarea>
          </div>
          <div>
            <label for="paragraph2" class="block text-sm font-medium text-[#1a1b1c] mb-2">
              Second Paragraph
            </label>
            <textarea
              id="paragraph2"
              v-model="aboutData.paragraph2"
              rows="4"
              class="w-full px-4 py-2.5 text-sm text-[#1a1b1c] bg-white border border-[#c9cccf] rounded-md focus:outline-none focus:border-[var(--admin-primary)] focus:ring-2 focus:ring-[var(--admin-primary)]/20 transition-all placeholder:text-[#6d7175] resize-y"
              placeholder="My approach focuses on logical problem-solving..."
            ></textarea>
          </div>
        </div>
      </div>

      <!-- Personal Information Tab -->
      <div v-if="activeTab === 'personal'" class="space-y-6">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label for="name" class="block text-sm font-medium text-[#1a1b1c] mb-2">
              Name
            </label>
            <input
              id="name"
              v-model="aboutData.name"
              type="text"
              class="w-full px-4 py-2.5 text-sm text-[#1a1b1c] bg-white border border-[#c9cccf] rounded-md focus:outline-none focus:border-[var(--admin-primary)] focus:ring-2 focus:ring-[var(--admin-primary)]/20 transition-all placeholder:text-[#6d7175]"
              placeholder="Brian Perez"
            />
          </div>
          <div>
            <label for="email" class="block text-sm font-medium text-[#1a1b1c] mb-2">
              Email
            </label>
            <input
              id="email"
              v-model="aboutData.email"
              type="email"
              class="w-full px-4 py-2.5 text-sm text-[#1a1b1c] bg-white border border-[#c9cccf] rounded-md focus:outline-none focus:border-[var(--admin-primary)] focus:ring-2 focus:ring-[var(--admin-primary)]/20 transition-all placeholder:text-[#6d7175]"
              placeholder="perezbrian091598@gmail.com"
            />
          </div>
          <div>
            <label for="location" class="block text-sm font-medium text-[#1a1b1c] mb-2">
              Location
            </label>
            <input
              id="location"
              v-model="aboutData.location"
              type="text"
              class="w-full px-4 py-2.5 text-sm text-[#1a1b1c] bg-white border border-[#c9cccf] rounded-md focus:outline-none focus:border-[var(--admin-primary)] focus:ring-2 focus:ring-[var(--admin-primary)]/20 transition-all placeholder:text-[#6d7175]"
              placeholder="Quezon Province, Philippines"
            />
          </div>
          <div>
            <label for="status" class="block text-sm font-medium text-[#1a1b1c] mb-2">
              Status
            </label>
            <select
              id="status"
              v-model="aboutData.status"
              class="w-full px-4 py-2.5 text-sm text-[#1a1b1c] bg-white border border-[#c9cccf] rounded-md focus:outline-none focus:border-[var(--admin-primary)] focus:ring-2 focus:ring-[var(--admin-primary)]/20 transition-all cursor-pointer"
            >
              <option value="On-site">On-site</option>
              <option value="Remote">Remote</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Available for Remote Work">Available for Remote Work</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Files Tab -->
      <div v-if="activeTab === 'files'" class="space-y-8">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Image Box -->
          <div class="bg-white p-8 rounded-2xl border border-[#e3e5e7] shadow-sm flex flex-col items-center">
            <h4 class="text-sm font-bold text-[#1a1b1c] mb-6 self-start">Profile Image</h4>
            <div 
              class="relative group cursor-pointer w-48 h-48 rounded-2xl overflow-hidden border-2 border-[#c9cccf] bg-[#f6f6f7] transition-all hover:border-[var(--admin-primary)]"
              @click="triggerFileInput"
            >
              <img 
                :src="aboutData.image || '/me.png'" 
                :alt="aboutData.name || 'About'"
                class="w-full h-full object-cover"
                @error="handleImageError"
              />
              <div class="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div class="p-3 bg-white rounded-full text-[var(--admin-primary)] shadow-lg">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
              </div>
            </div>
            <input
              ref="fileInput"
              type="file"
              accept="image/*"
              class="hidden"
              @change="handleFileSelect"
            />
            <p class="mt-4 text-xs text-[#6d7175] text-center">Click image to re-upload<br>Recommended: Square, max 5MB</p>
          </div>

          <!-- CV Box -->
          <div class="bg-white p-8 rounded-2xl border border-[#e3e5e7] shadow-sm flex flex-col">
            <h4 class="text-sm font-bold text-[#1a1b1c] mb-6">CV / Resume</h4>
            <div 
              class="flex-1 border-2 border-dashed border-[#c9cccf] rounded-2xl flex flex-col items-center justify-center p-6 transition-all hover:border-[var(--admin-primary)] hover:bg-[var(--admin-primary)]/5 group cursor-pointer"
              @click="handleCvBoxClick"
            >
              <div class="w-16 h-16 rounded-full bg-[#f6f6f7] flex items-center justify-center text-[#6d7175] group-hover:bg-[var(--admin-primary)]/10 group-hover:text-[var(--admin-primary)] mb-4 transition-colors">
                <svg v-if="!aboutData.cvLink" class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <svg v-else class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p class="text-sm font-medium text-[#1a1b1c] text-center">
                {{ aboutData.cvLink ? (aboutData.cvLink.startsWith('data:') ? 'Custom CV Uploaded' : aboutData.cvLink.split('/').pop()) : 'No CV uploaded' }}
              </p>
              <p class="text-xs text-[#6d7175] mt-2 text-center">
                {{ aboutData.cvLink ? 'Click to view or re-upload' : 'Click to upload your CV (PDF)' }}
              </p>
            </div>
            
            <div class="mt-4 flex gap-3">
              <button 
                type="button"
                @click.stop="triggerCvFileInput"
                class="flex-1 px-4 py-2 text-xs font-bold text-[var(--admin-primary)] bg-[var(--admin-primary)]/10 rounded-lg hover:bg-[var(--admin-primary)]/20 transition-colors"
                title="Update File"
              >
                {{ aboutData.cvLink ? 'Change File' : 'Upload CV' }}
              </button>
            </div>

            <input
              ref="cvFileInput"
              type="file"
              accept=".pdf"
              class="hidden"
              @change="handleCvFileSelect"
            />
          </div>
        </div>

        <!-- PDF Modal -->
        <div v-if="showPdfModal" class="fixed inset-0 z-[60] flex flex-col bg-white">
          <div class="p-4 border-b border-[#e3e5e7] flex items-center justify-between bg-white shadow-sm shrink-0">
            <div class="flex items-center gap-4">
              <button 
                @click="showPdfModal = false"
                class="p-2 hover:bg-[#f6f6f7] rounded-full transition-colors text-[#1a1b1c]"
              >
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
              <h3 class="text-lg font-bold text-[#1a1b1c]">CV Preview</h3>
            </div>
            <button 
              @click="showPdfModal = false"
              class="px-6 py-2 bg-[var(--admin-primary)] text-white rounded-lg hover:bg-[var(--admin-secondary)] transition-all text-sm font-bold shadow-sm"
            >
              Close Preview
            </button>
          </div>
          <div class="flex-1 bg-[#f6f6f7]">
            <iframe 
              v-if="aboutData.cvLink" 
              :src="aboutData.cvLink" 
              class="w-full h-full border-none"
              title="CV Preview"
            ></iframe>
            <div v-else class="h-full flex flex-col items-center justify-center text-[#6d7175]">
              <svg class="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p class="text-lg font-medium">No document uploaded to preview</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Save Button -->
      <div class="mt-8 pt-6 border-t border-[#c9cccf] flex items-center justify-end gap-3">
        <button
          type="button"
          @click="resetData"
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
</template>

<script setup>
import { ref, onMounted, inject } from 'vue'
import { supabase, isSupabaseConfigured } from '../../supabase'

const addToast = inject('addToast')

// Tabs
const activeTab = ref('about')
const tabs = [
  { name: 'about', label: 'About Me' },
  { name: 'personal', label: 'Personal Information' },
  { name: 'files', label: 'Files' }
]

// About section data
const aboutData = ref({
  paragraph1: '',
  paragraph2: '',
  name: '',
  email: '',
  location: '',
  status: '',
  cvLink: '',
  image: ''
})

const saving = ref(false)
const showSuccess = ref(false)
const showPdfModal = ref(false)
const fileInput = ref(null)
const cvFileInput = ref(null)
const aboutId = ref(null)

// --- Lifecycle ---
onMounted(() => {
  loadFromDatabase()
})

// --- Helpers ---
const setDefaultValues = () => {
  aboutData.value = {
    paragraph1: "As a passionate designer and full stack developer, I've developed the skills to build web apps, internal tools, and full web systems—even as an undergraduate.",
    paragraph2: "My approach focuses on logical problem-solving, choosing solutions that suit each functionality while avoiding unnecessary complexity. With a background in both visual design and development, I bridge the gap between creativity and engineering to deliver polished, user-friendly digital experiences.",
    name: 'Brian Perez',
    email: 'perezbrian091598@gmail.com',
    location: 'Quezon Province, Philippines',
    status: 'Available for Remote Work',
    cvLink: '/myCv.pdf',
    image: '/me.png'
  }
}

const handleImageError = (event) => {
  event.target.src = '/me.png'
}

const triggerFileInput = () => {
  fileInput.value?.click()
}

const triggerCvFileInput = () => {
  cvFileInput.value?.click()
}

// --- File handlers ---
const handleFileSelect = (event) => {
  const file = event.target.files?.[0]
  if (!file) return

  if (!file.type.startsWith('image/')) {
    alert('Please select an image file')
    return
  }

  if (file.size > 5 * 1024 * 1024) {
    alert('Image size should be less than 5MB')
    return
  }

  const reader = new FileReader()
  reader.onload = (e) => {
    aboutData.value.image = e.target.result
  }
  reader.onerror = () => {
    alert('Error reading file. Please try again.')
  }
  reader.readAsDataURL(file)
}

const handleCvFileSelect = (event) => {
  const file = event.target.files?.[0]
  if (!file) return

  if (file.type !== 'application/pdf') {
    if (addToast) addToast('Please select a PDF file', 'error')
    return
  }

  if (file.size > 10 * 1024 * 1024) {
    if (addToast) addToast('File size should be less than 10MB', 'error')
    return
  }

  const reader = new FileReader()
  reader.onload = (e) => {
    aboutData.value.cvLink = e.target.result
    if (addToast) addToast('CV file updated locally. Remember to save changes.', 'success')
  }
  reader.onerror = () => {
    if (addToast) addToast('Error reading file. Please try again.', 'error')
  }
  reader.readAsDataURL(file)
}

const handleCvBoxClick = () => {
  if (aboutData.value.cvLink) {
    showPdfModal.value = true
  } else {
    triggerCvFileInput()
  }
}

// --- Storage / Database ---
const loadFromStorage = () => {
  const savedData = localStorage.getItem('aboutSectionData')
  if (savedData) {
    try {
      aboutData.value = { ...aboutData.value, ...JSON.parse(savedData) }
    } catch (e) {
      console.error('Error loading about data:', e)
    }
  } else {
    setDefaultValues()
  }
}

const loadFromDatabase = async () => {
  if (!isSupabaseConfigured()) {
    console.warn('Supabase not configured, falling back to localStorage')
    loadFromStorage()
    return
  }

  try {
    const { data, error } = await supabase
      .from('about_me')
      .select('*')
      .limit(1)
      .single()

    if (error && error.code !== 'PGRST116') {
      console.error('Error loading about data:', error)
      loadFromStorage()
      return
    }

    if (data) {
      aboutId.value = data.id
      aboutData.value = {
        paragraph1: data.Paragraph1 || '',
        paragraph2: data.Paragraph2 || '',
        name: data.name || '',
        email: data.email || '',
        location: data.location || '',
        status: data.status || '',
        cvLink: data.cv_link || '',
        image: data.image_url || ''
      }
    } else {
      setDefaultValues()
    }
  } catch (err) {
    console.error('Database fetch error:', err)
    loadFromStorage()
  }
}

const saveToDatabase = async () => {
  if (!isSupabaseConfigured()) {
    console.warn('Supabase not configured, saving locally only')
    localStorage.setItem('aboutSectionData', JSON.stringify(aboutData.value))
    return { success: true, fallback: true }
  }

  try {
    const dbData = {
      Paragraph1: aboutData.value.paragraph1,
      Paragraph2: aboutData.value.paragraph2,
      name: aboutData.value.name,
      email: aboutData.value.email,
      location: aboutData.value.location,
      status: aboutData.value.status,
      cv_link: aboutData.value.cvLink,
      image_url: aboutData.value.image
    }

    let result
    if (aboutId.value) {
      result = await supabase
        .from('about_me')
        .update(dbData)
        .eq('id', aboutId.value)
        .select()
        .single()
    } else {
      result = await supabase
        .from('about_me')
        .insert(dbData)
        .select()
        .single()

      if (result.data) aboutId.value = result.data.id
    }

    if (result.error) throw result.error

    // Backup to localStorage
    localStorage.setItem('aboutSectionData', JSON.stringify(aboutData.value))

    return { success: true, data: result.data }
  } catch (error) {
    console.error('Database save error:', error)
    localStorage.setItem('aboutSectionData', JSON.stringify(aboutData.value))
    return { success: true, fallback: true, error }
  }
}

// --- Event Handlers ---
const handleSave = async () => {
  saving.value = true
  showSuccess.value = false

  try {
    const result = await saveToDatabase()
    await new Promise(resolve => setTimeout(resolve, 500))
    showSuccess.value = true

    if (result.fallback) {
      if (addToast) addToast('About section saved locally (database unavailable)', 'warning')
    } else {
      if (addToast) addToast('About section updated successfully', 'success')
    }

    setTimeout(() => { showSuccess.value = false }, 3000)
  } catch (error) {
    console.error('Error saving about data:', error)
    if (addToast) addToast('Error saving about section', 'error')
  } finally {
    saving.value = false
  }
}

const resetData = () => {
  localStorage.removeItem('aboutSectionData')
  loadFromDatabase()
}

// --- Expose for parent ---
defineExpose({
  refresh: loadFromDatabase,
  onSearch: (query) => console.log('Searching:', query)
})
</script>

