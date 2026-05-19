<template>
  <div class="p-6">
    <!-- Success Message -->
    <div v-if="showSuccess" class="mb-6 flex items-center gap-3 p-4 bg-[var(--admin-primary-light)] border border-[var(--admin-primary)] rounded-lg">
      <svg class="w-5 h-5 text-[var(--admin-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
      </svg>
      <p class="text-sm font-medium text-[var(--admin-secondary)]">Gallery changes saved successfully!</p>
    </div>

    <!-- Database Warning -->
    <div v-if="!isSupabaseConfigured()" class="mb-6 flex items-center gap-3 p-4 bg-[#fff3cd] border border-[#ffc107] rounded-lg">
      <svg class="w-5 h-5 text-[#856404]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
      <p class="text-sm font-medium text-[#856404]">Database not configured. Data will be saved locally only.</p>
    </div>

    <!-- Tabs for visual structure -->
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
      <!-- General Settings Tab -->
      <div v-if="activeTab === 'general'" class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label for="sectionLabel" class="block text-sm font-medium text-[#1a1b1c] mb-2">Section Label</label>
            <input
              id="sectionLabel"
              v-model="galleryData.sectionLabel"
              type="text"
              class="w-full px-4 py-2.5 text-sm text-[#1a1b1c] bg-white border border-[#c9cccf] rounded-md focus:outline-none focus:border-[var(--admin-primary)] focus:ring-2 focus:ring-[var(--admin-primary)]/20 transition-all font-outfit"
              placeholder="e.g. Interactive Gallery"
            />
          </div>
          <div>
            <label for="mainHeading" class="block text-sm font-medium text-[#1a1b1c] mb-2">Main Heading</label>
            <input
              id="mainHeading"
              v-model="galleryData.mainHeading"
              type="text"
              class="w-full px-4 py-2.5 text-sm text-[#1a1b1c] bg-white border border-[#c9cccf] rounded-md focus:outline-none focus:border-[var(--admin-primary)] focus:ring-2 focus:ring-[var(--admin-primary)]/20 transition-all font-outfit"
              placeholder="e.g. Captured Moments & Creations"
            />
          </div>
        </div>
        <div>
          <label for="description" class="block text-sm font-medium text-[#1a1b1c] mb-2">Description</label>
          <textarea
            id="description"
            v-model="galleryData.description"
            rows="4"
            class="w-full px-4 py-2.5 text-sm text-[#1a1b1c] bg-white border border-[#c9cccf] rounded-md focus:outline-none focus:border-[var(--admin-primary)] focus:ring-2 focus:ring-[var(--admin-primary)]/20 transition-all font-outfit resize-y"
            placeholder="Introduce the gallery content..."
          ></textarea>
        </div>
      </div>

      <!-- Manage Photos Tab -->
      <div v-if="activeTab === 'photos'" class="space-y-6">
        <!-- Actions Toolbar -->
        <div class="flex justify-between items-center bg-[#f6f6f7] p-4 rounded-lg border border-[#e3e5e7]">
          <span class="text-xs font-semibold text-[#6d7175]">Total Photos: {{ galleryData.images?.length || 0 }}</span>
          <button
            type="button"
            @click="openAddPhotoModal"
            class="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-[var(--admin-primary)] hover:bg-[var(--admin-secondary)] rounded-md transition-all shadow-sm active:scale-95"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            Add Gallery
          </button>
        </div>

        <!-- Photos Table List -->
        <div class="border border-[#c9cccf] rounded-lg overflow-hidden">
          <table class="w-full">
            <thead class="bg-[#f6f6f7]">
              <tr>
                <th class="px-4 py-3 text-left text-xs font-semibold text-[#6d7175] uppercase tracking-wider">Preview</th>
                <th class="px-4 py-3 text-left text-xs font-semibold text-[#6d7175] uppercase tracking-wider">Title</th>
                <th class="px-4 py-3 text-left text-xs font-semibold text-[#6d7175] uppercase tracking-wider">Linked Project</th>
                <th class="px-4 py-3 text-left text-xs font-semibold text-[#6d7175] uppercase tracking-wider">Caption</th>
                <th class="px-4 py-3 text-right text-xs font-semibold text-[#6d7175] uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-[#e3e5e7]">
              <tr v-for="(img, index) in galleryData.images" :key="index" class="hover:bg-[#f6f6f7] transition-colors">
                <td class="px-4 py-3">
                  <img :src="img.url" :alt="img.title" class="w-12 h-12 object-cover rounded-lg border border-gray-200" />
                </td>
                <td class="px-4 py-3 text-sm font-medium text-[#1a1b1c]">{{ img.title || 'Untitled Photo' }}</td>
                <td class="px-4 py-3 text-xs">
                  <span 
                    v-if="img.linkedProjectTitle"
                    class="inline-flex items-center px-2 py-0.5 rounded bg-primary-50 border border-primary-100 text-primary-700 font-bold"
                  >
                    {{ img.linkedProjectTitle }}
                  </span>
                  <span v-else class="text-gray-400 italic">None</span>
                </td>
                <td class="px-4 py-3 text-xs text-[#6d7175] truncate max-w-[200px]">{{ img.caption || 'No caption' }}</td>
                <td class="px-4 py-3 text-right space-x-2">
                  <button
                    type="button"
                    @click="openEditPhotoModal(index)"
                    class="inline-flex items-center p-1.5 text-gray-500 hover:text-[var(--admin-primary)] transition-colors hover:bg-gray-100 rounded-md"
                    title="Edit Photo Info"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    @click="removePhoto(index)"
                    class="inline-flex items-center p-1.5 text-gray-500 hover:text-red-600 transition-colors hover:bg-red-50 rounded-md"
                    title="Delete Photo"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </td>
              </tr>
              <tr v-if="!galleryData.images || galleryData.images.length === 0">
                <td colspan="5" class="px-4 py-12 text-center text-[#6d7175] text-sm">
                  No photos added to this gallery section yet. Click 'Add Gallery' to begin.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Action Panel Buttons -->
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
          class="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-medium text-white bg-[var(--admin-primary)] rounded-md hover:bg-[var(--admin-secondary)] transition-all shadow-sm disabled:opacity-50"
        >
          <svg v-if="saving" class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>{{ saving ? 'Saving...' : 'Save changes' }}</span>
        </button>
      </div>
    </form>

    <!-- Add / Edit Photo Dialog Modal -->
    <div v-if="isEditingPhoto" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div class="bg-white rounded-2xl shadow-xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in duration-200 border border-gray-200">
        <div class="px-6 py-4 border-b border-[#c9cccf] flex items-center justify-between bg-[#f6f6f7]">
          <h3 class="text-md font-bold text-[#1a1b1c]">
            {{ photoModalMode === 'add' ? 'Add Gallery Item' : 'Edit Gallery Item' }}
          </h3>
          <button @click="closePhotoModal" class="text-[#6d7175] hover:text-[#1a1b1c] focus:outline-none">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div class="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          <!-- Project Link Panel Option -->
          <div class="p-4 bg-primary-50/50 rounded-xl border border-primary-100/50 space-y-3">
            <div class="flex items-center justify-between">
              <label class="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-2 cursor-pointer select-none">
                <input 
                  v-model="tempPhoto.isRelatedToProject" 
                  type="checkbox" 
                  class="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500 cursor-pointer"
                  @change="handleProjectToggle"
                />
                Is this image related to an existing project?
              </label>
            </div>

            <!-- Project Selector Dropdown -->
            <div v-if="tempPhoto.isRelatedToProject" class="space-y-3 pt-2 animate-in fade-in slide-in-from-top-2 duration-300">
              <div>
                <label class="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Select Project</label>
                <select
                  v-model="tempPhoto.linkedProjectTitle"
                  class="w-full px-4 py-2.5 text-sm text-[#1a1b1c] bg-white border border-[#c9cccf] rounded-md focus:outline-none focus:border-[var(--admin-primary)] cursor-pointer"
                  @change="handleProjectLinkChange"
                >
                  <option value="" disabled>-- Choose an existing project --</option>
                  <option v-for="proj in existingProjects" :key="proj.title" :value="proj.title">
                    {{ proj.title }} ({{ proj.projectType === 'mini' ? 'Mini' : 'Major' }})
                  </option>
                </select>
              </div>

              <!-- Display screenshots from project's gallery if available -->
              <div v-if="tempPhoto.linkedProjectTitle">
                <span class="block text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">Project screenshots (Click to Select)</span>
                <div class="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  <div 
                    v-for="(screenshot, sIndex) in (existingProjects.find(p => p.title === tempPhoto.linkedProjectTitle)?.gallery || [])" 
                    :key="sIndex"
                    @click="selectProjectImage(screenshot)"
                    class="w-20 h-14 rounded-md border overflow-hidden cursor-pointer flex-shrink-0 transition-transform hover:scale-105"
                    :class="tempPhoto.url === screenshot ? 'border-primary-500 ring-2 ring-primary-500/50' : 'border-gray-200'"
                  >
                    <img :src="screenshot" class="w-full h-full object-cover" />
                  </div>
                  <div 
                    v-if="!(existingProjects.find(p => p.title === tempPhoto.linkedProjectTitle)?.gallery?.length)"
                    class="text-xs text-gray-400 italic py-1"
                  >
                    No screenshots uploaded for this project yet. Use the local uploader below.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Premium File Uploader Card -->
          <div class="space-y-2">
            <label class="block text-xs font-bold text-[#1a1b1c] uppercase tracking-wider">Photo / Image</label>
            
            <!-- Hidden File Input picker -->
            <input
              ref="fileInputRef"
              type="file"
              accept="image/*"
              class="hidden"
              @change="handleFileChange"
            />

            <!-- Interactive Clickable upload container box -->
            <div 
              @click="triggerFilePicker"
              class="w-full h-44 border-2 border-dashed border-[#c9cccf] hover:border-[var(--admin-primary)] rounded-lg flex flex-col items-center justify-center cursor-pointer transition-all bg-gray-50 hover:bg-gray-100/50 p-4 relative overflow-hidden group"
              title="Click to select file from explorer"
            >
              <!-- Live Preview if image selected/exists -->
              <div v-if="tempPhoto.url" class="absolute inset-0 w-full h-full flex items-center justify-center bg-black">
                <img :src="tempPhoto.url" class="w-full h-full object-contain" />
                <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white gap-2">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                  <span class="text-xs font-bold uppercase tracking-wider">Choose Different File</span>
                </div>
              </div>

              <!-- Upload Prompt when empty -->
              <div v-else class="text-center space-y-2">
                <div class="p-3 bg-white rounded-full inline-block shadow-sm border border-gray-100 text-gray-400 group-hover:text-[var(--admin-primary)] group-hover:scale-110 transition-all">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div class="text-sm font-bold text-gray-700">Click to Browse Photos</div>
                <div class="text-xs text-gray-400">Opens File Explorer (JPG, PNG, GIF, WebP)</div>
              </div>
            </div>

            <!-- Manual URL input fallback -->
            <div class="mt-2 flex items-center justify-between">
              <span class="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Or enter image web URL manually:</span>
            </div>
            <input
              v-model="tempPhoto.url"
              type="text"
              class="mt-1 w-full px-4 py-2 text-xs text-[#1a1b1c] bg-white border border-[#c9cccf] rounded-md focus:outline-none focus:border-[var(--admin-primary)] transition-all font-outfit"
              placeholder="https://images.unsplash.com/... or paste base64 data"
            />
          </div>

          <div>
            <label class="block text-xs font-bold text-[#1a1b1c] uppercase tracking-wider mb-2">Title</label>
            <input
              v-model="tempPhoto.title"
              type="text"
              class="w-full px-4 py-2.5 text-sm text-[#1a1b1c] bg-white border border-[#c9cccf] rounded-md focus:outline-none focus:border-[var(--admin-primary)] transition-all font-outfit"
              placeholder="Image title/name"
            />
          </div>

          <div>
            <label class="block text-xs font-bold text-[#1a1b1c] uppercase tracking-wider mb-2">Caption / Story</label>
            <textarea
              v-model="tempPhoto.caption"
              rows="3"
              class="w-full px-4 py-2.5 text-sm text-[#1a1b1c] bg-white border border-[#c9cccf] rounded-md focus:outline-none focus:border-[var(--admin-primary)] transition-all font-outfit resize-none"
              placeholder="Short description/caption..."
            ></textarea>
          </div>
        </div>

        <div class="px-6 py-4 bg-[#f6f6f7] border-t border-[#c9cccf] flex justify-end gap-3">
          <button
            type="button"
            @click="closePhotoModal"
            class="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            type="button"
            @click="savePhotoItem"
            class="px-6 py-2 text-sm font-medium text-white bg-[var(--admin-primary)] hover:bg-[var(--admin-secondary)] rounded-md transition-colors"
          >
            Save Photo
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, inject } from 'vue'
import { supabase, isSupabaseConfigured } from '../../supabase'

const addToast = inject('addToast')

const tabs = [
  { name: 'general', label: 'General Information' },
  { name: 'photos', label: 'Manage Gallery Photos' }
]
const activeTab = ref('general')

const galleryData = ref({
  sectionLabel: '',
  mainHeading: '',
  description: '',
  images: []
})

const galleryRowId = ref(null)
const saving = ref(false)
const showSuccess = ref(false)

// File Input reference
const fileInputRef = ref(null)

// Linked projects reference list
const existingProjects = ref([])

// Photo Edit state variables
const isEditingPhoto = ref(false)
const photoModalMode = ref('add') // 'add' or 'edit'
const editingPhotoIndex = ref(-1)
const tempPhoto = ref({
  url: '',
  title: '',
  caption: '',
  alt: '',
  isRelatedToProject: false,
  linkedProjectTitle: ''
})

const triggerFilePicker = () => {
  fileInputRef.value?.click()
}

const handleFileChange = (e) => {
  const file = e.target.files?.[0]
  if (!file) return

  if (!file.type.startsWith('image/')) {
    if (addToast) addToast('Please select an image file', 'error')
    return
  }

  // Max size ~5MB to protect database storing Base64 directly
  if (file.size > 5 * 1024 * 1024) {
    if (addToast) addToast('Image file exceeds 5MB size limit', 'error')
    return
  }

  const reader = new FileReader()
  reader.onload = (event) => {
    tempPhoto.value.url = event.target.result
    if (addToast) addToast('Image loaded successfully from explorer', 'success')
  }
  reader.onerror = () => {
    if (addToast) addToast('Failed to read image file data', 'error')
  }
  reader.readAsDataURL(file)
}

const handleProjectLinkChange = () => {
  const proj = existingProjects.value.find(p => p.title === tempPhoto.value.linkedProjectTitle)
  if (proj) {
    // Autofill metadata fields from the selected project
    tempPhoto.value.title = proj.title
    tempPhoto.value.caption = proj.description || ''
    
    // Auto-select the first gallery screenshot if available in that project
    if (proj.gallery && proj.gallery.length > 0) {
      tempPhoto.value.url = proj.gallery[0]
      if (addToast) addToast(`Autofilled from project: "${proj.title}"`, 'success')
    } else {
      if (addToast) addToast(`Autofilled text fields. No project screenshots found.`, 'info')
    }
  }
}

const handleProjectToggle = () => {
  if (!tempPhoto.value.isRelatedToProject) {
    tempPhoto.value.linkedProjectTitle = ''
  }
}

const selectProjectImage = (imgUrl) => {
  tempPhoto.value.url = imgUrl
  if (addToast) addToast('Selected image from project gallery screenshots!', 'success')
}

const setDefaultValues = () => {
  galleryData.value = {
    sectionLabel: 'Interactive Gallery Showcase',
    mainHeading: 'Captured Moments & Creations',
    description: 'A beautiful, horizontal sliding carousel that showcases all custom images in a clean, scrollable layout.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop',
        title: 'Modern Coding Station',
        caption: 'A clean, high-productivity developer workspace with elegant ambient neon glow, custom mechanical keyboards, and crisp screen displays.',
        alt: 'Workspace setup',
        linkedProjectTitle: ''
      },
      {
        url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1000&auto=format&fit=crop',
        title: 'Minimalist Tech Design',
        caption: 'A professional and clean aesthetic illustrating our design process, visual wireframes, and beautiful dark layouts.',
        alt: 'Laptop and design assets',
        linkedProjectTitle: ''
      },
      {
        url: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=1000&auto=format&fit=crop',
        title: 'User Interface Blueprinting',
        caption: 'Detailed vector components, clean spacing systems, and Shopify style frameworks assembled for maximum systematic efficiency.',
        alt: 'Wireframes on display',
        linkedProjectTitle: ''
      }
    ]
  }
}

// Dialog management
const openAddPhotoModal = () => {
  tempPhoto.value = { 
    url: '', 
    title: '', 
    caption: '', 
    alt: '',
    isRelatedToProject: false,
    linkedProjectTitle: ''
  }
  photoModalMode.value = 'add'
  isEditingPhoto.value = true
}

const openEditPhotoModal = (idx) => {
  const item = galleryData.value.images[idx]
  tempPhoto.value = { 
    isRelatedToProject: !!item.linkedProjectTitle,
    linkedProjectTitle: item.linkedProjectTitle || '',
    ...item 
  }
  editingPhotoIndex.value = idx
  photoModalMode.value = 'edit'
  isEditingPhoto.value = true
}

const closePhotoModal = () => {
  isEditingPhoto.value = false
  editingPhotoIndex.value = -1
}

const savePhotoItem = () => {
  if (!tempPhoto.value.url.trim()) {
    if (addToast) addToast('Please select a file or enter a photo URL', 'error')
    return
  }
  
  if (!tempPhoto.value.title.trim()) {
    tempPhoto.value.title = 'Untitled Photo'
  }
  
  tempPhoto.value.alt = tempPhoto.value.title

  // Nullify linked title if checkbox is unchecked
  if (!tempPhoto.value.isRelatedToProject) {
    tempPhoto.value.linkedProjectTitle = ''
  }

  if (!galleryData.value.images) {
    galleryData.value.images = []
  }

  const itemToSave = {
    url: tempPhoto.value.url,
    title: tempPhoto.value.title,
    caption: tempPhoto.value.caption,
    alt: tempPhoto.value.alt,
    linkedProjectTitle: tempPhoto.value.linkedProjectTitle || ''
  }

  if (photoModalMode.value === 'add') {
    galleryData.value.images.push(itemToSave)
    if (addToast) addToast('Photo added locally. Remember to save changes.', 'success')
  } else {
    galleryData.value.images[editingPhotoIndex.value] = itemToSave
    if (addToast) addToast('Photo info updated locally. Remember to save changes.', 'success')
  }

  closePhotoModal()
}

const removePhoto = (idx) => {
  galleryData.value.images.splice(idx, 1)
  if (addToast) addToast('Photo removed locally. Remember to save changes.', 'info')
}

// Load existing projects list for link mapping dropdown
const loadProjectsList = async () => {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .limit(1)
        .maybeSingle()
      if (!error && data && data.projects) {
        existingProjects.value = data.projects
        return
      }
    } catch (e) {
      console.error('Error fetching projects for linking:', e)
    }
  }

  // Fallback storage loader
  const saved = localStorage.getItem('projectsSectionData')
  if (saved) {
    try {
      const parsed = JSON.parse(saved)
      if (parsed && parsed.projects) {
        existingProjects.value = parsed.projects
      }
    } catch (e) {
      console.error('Error parsing projects locally for linking:', e)
    }
  }
}

// Storage Loaders
const loadFromStorage = () => {
  const saved = localStorage.getItem('gallerySectionData')
  if (saved) {
    try {
      galleryData.value = JSON.parse(saved)
    } catch (e) {
      console.error('Error parsing gallery storage:', e)
      setDefaultValues()
    }
  } else {
    setDefaultValues()
  }
}

const loadFromDatabase = async () => {
  if (!isSupabaseConfigured()) {
    loadFromStorage()
    return
  }

  try {
    const { data, error } = await supabase
      .from('gallery_section')
      .select('*')
      .limit(1)
      .maybeSingle()

    if (error) {
      console.error('Database fetch error in gallery:', error)
      loadFromStorage()
      return
    }

    if (data) {
      galleryRowId.value = data.id
      galleryData.value = {
        sectionLabel: data.section_label || '',
        mainHeading: data.main_heading || '',
        description: data.description || '',
        images: data.images || []
      }
    } else {
      setDefaultValues()
    }
  } catch (err) {
    console.error('Connection failure in gallery:', err)
    loadFromStorage()
  }
}

const saveToDatabase = async () => {
  const payload = {
    section_label: galleryData.value.sectionLabel,
    main_heading: galleryData.value.mainHeading,
    description: galleryData.value.description,
    images: galleryData.value.images
  }

  // Backup locally first
  localStorage.setItem('gallerySectionData', JSON.stringify(galleryData.value))

  if (!isSupabaseConfigured()) {
    return { success: true, fallback: true }
  }

  try {
    let res
    if (galleryRowId.value) {
      res = await supabase
        .from('gallery_section')
        .update(payload)
        .eq('id', galleryRowId.value)
        .select()
        .single()
    } else {
      res = await supabase
        .from('gallery_section')
        .insert(payload)
        .select()
        .single()
        
      if (res.data) {
        galleryRowId.value = res.data.id
      }
    }

    if (res.error) throw res.error
    return { success: true, data: res.data }
  } catch (err) {
    console.error('Supabase update failed, saving locally:', err)
    return { success: true, fallback: true, error: err }
  }
}

const handleSave = async () => {
  saving.value = true
  showSuccess.value = false

  try {
    const res = await saveToDatabase()
    await new Promise(r => setTimeout(r, 600))
    showSuccess.value = true

    if (res.fallback) {
      if (addToast) addToast('Gallery saved locally (database offline)', 'warning')
    } else {
      if (addToast) addToast('Gallery updated successfully', 'success')
    }

    setTimeout(() => { showSuccess.value = false }, 3000)
  } catch (err) {
    console.error(err)
    if (addToast) addToast('Failed to save gallery changes', 'error')
  } finally {
    saving.value = false
  }
}

const resetData = () => {
  localStorage.removeItem('gallerySectionData')
  loadFromDatabase()
  loadProjectsList()
}

onMounted(() => {
  loadFromDatabase()
  loadProjectsList()
})

defineExpose({
  refresh: () => {
    loadFromDatabase()
    loadProjectsList()
  }
})
</script>
