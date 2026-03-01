<template>
  <div class="p-6">
    <!-- Success Message -->
    <div v-if="showSuccess" class="mb-6 flex items-center gap-3 p-4 bg-[var(--admin-primary-light)] border border-[var(--admin-primary)] rounded-lg">
      <svg class="w-5 h-5 text-[var(--admin-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
      </svg>
      <p class="text-sm font-medium text-[var(--admin-secondary)]">Changes saved successfully!</p>
    </div>

    <form @submit.prevent="handleSave">
      <!-- Tabs Navigation -->
      <div class="flex items-center gap-1 mb-8 border-b border-[#c9cccf]">
        <button
          type="button"
          @click="activeTab = 'header'"
          :class="[
            'px-4 py-2 text-sm font-medium transition-all relative',
            activeTab === 'header' 
              ? 'text-[var(--admin-primary)] border-b-2 border-[var(--admin-primary)]' 
              : 'text-[#6d7175] hover:text-[#1a1b1c] hover:bg-[#f6f6f7]'
          ]"
        >
          Experience Header
        </button>
        <button
          type="button"
          @click="activeTab = 'timeline'"
          :class="[
            'px-4 py-2 text-sm font-medium transition-all relative',
            activeTab === 'timeline' 
              ? 'text-[var(--admin-primary)] border-b-2 border-[var(--admin-primary)]' 
              : 'text-[#6d7175] hover:text-[#1a1b1c] hover:bg-[#f6f6f7]'
          ]"
        >
          Experience Timeline
        </button>
      </div>

      <div class="space-y-8">
        <!-- Experience Header Tab -->
        <div v-show="activeTab === 'header'">
          <label for="description" class="block text-sm font-medium text-[#1a1b1c] mb-2">
            Experience Header
          </label>
          <textarea
            id="description"
            v-model="experienceData.description"
            rows="3"
            class="w-full px-4 py-2.5 text-sm text-[#1a1b1c] bg-white border border-[#c9cccf] rounded-md focus:outline-none focus:border-[var(--admin-primary)] focus:ring-2 focus:ring-[var(--admin-primary)]/20 transition-all placeholder:text-[#6d7175] resize-y"
            placeholder="Describe your experience section..."
          ></textarea>
        </div>

        <!-- Experience Timeline Tab -->
        <div v-show="activeTab === 'timeline'" class="pt-2">
          <div class="flex items-center justify-between mb-6">
            <div>
              <h3 class="text-base font-semibold text-[#1a1b1c]">Experience Timeline</h3>
              <p class="text-sm text-[#6d7175]">Manage your education and professional journey</p>
            </div>
            <button
              type="button"
              @click="openModal()"
              class="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-[var(--admin-primary)] rounded-md hover:bg-[var(--admin-secondary)] transition-all shadow-sm"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              Add Timeline Item
            </button>
          </div>

          <!-- Table Container -->
          <div class="bg-white border border-[#c9cccf] rounded-lg overflow-hidden">
            <table class="w-full text-left border-collapse">
              <thead>
                <tr class="bg-[#f6f6f7] border-b border-[#c9cccf]">
                  <th class="px-6 py-4 text-xs font-semibold text-[#6d7175] uppercase tracking-wider w-1/4">Date Range</th>
                  <th class="px-6 py-4 text-xs font-semibold text-[#6d7175] uppercase tracking-wider w-1/4">Title / Subtitle</th>
                  <th class="px-6 py-4 text-xs font-semibold text-[#6d7175] uppercase tracking-wider w-1/4">Category</th>
                  <th class="px-6 py-4 text-xs font-semibold text-[#6d7175] uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#c9cccf]">
                <tr v-if="experienceData.experiences.length === 0">
                  <td colspan="4" class="px-6 py-10 text-center text-[#6d7175] italic">
                    No timeline items added yet. Click "Add Timeline Item" to get started.
                  </td>
                </tr>
                <tr 
                  v-for="(experience, index) in experienceData.experiences" 
                  :key="index"
                  class="hover:bg-[#f9f9f9] transition-colors"
                >
                  <td class="px-6 py-4">
                    <span class="text-sm font-medium text-[#1a1b1c]">{{ experience.dateRange || 'N/A' }}</span>
                  </td>
                  <td class="px-6 py-4">
                    <div class="flex flex-col">
                      <span class="text-sm font-semibold text-[#1a1b1c]">{{ experience.title || 'Untitled' }}</span>
                      <span class="text-xs text-[#6d7175]">{{ experience.subtitle || 'No subtitle' }}</span>
                    </div>
                  </td>
                  <td class="px-6 py-4">
                    <span 
                      :class="[
                        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                        experience.category === 'Degree' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-purple-100 text-purple-800'
                      ]"
                    >
                      {{ experience.category || 'Professional' }}
                    </span>
                  </td>
                  <td class="px-6 py-4 text-right space-x-2">
                    <button
                      type="button"
                      @click="openModal(index)"
                      class="p-2 text-[#2c6ecb] hover:bg-[#ebf5fe] rounded-md transition-all"
                      title="Edit"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      @click="removeExperience(index)"
                      class="p-2 text-[#d72c0d] hover:bg-[#fff4f4] rounded-md transition-all"
                      title="Remove"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Save Button (Only for Header) -->
      <div v-if="activeTab === 'header'" class="mt-8 pt-6 border-t border-[#c9cccf] flex items-center justify-end gap-3">
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

    <!-- Experience Modal -->
    <div v-show="showModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div class="bg-white rounded-xl shadow-2xl w-full max-w-4xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <!-- Modal Header -->
        <div class="px-6 py-4 border-b border-[#c9cccf] bg-[#f6f6f7] flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-[var(--admin-primary)] text-white flex items-center justify-center font-semibold text-lg">
              {{ editingIndex !== null ? editingIndex + 1 : experienceData.experiences.length + 1 }}
            </div>
            <h3 class="text-lg font-semibold text-[#1a1b1c]">
              {{ editingIndex !== null ? 'Experience ' + (editingIndex + 1) : 'Experience ' + (experienceData.experiences.length + 1) }}
            </h3>
          </div>
          <button @click="closeModal" class="text-[#6d7175] hover:text-[#1a1b1c] transition-colors">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <!-- Modal Body -->
        <div class="p-8 space-y-8 max-h-[75vh] overflow-y-auto">
          <!-- Category & Date Range & Title Layer -->
          <div class="space-y-6">
            <div class="text-center mb-6">
              <label class="block text-sm font-medium text-[#1a1b1c] mb-2">Category</label>
              <div class="flex justify-center">
                <select 
                  v-model="currentExperience.category"
                  class="w-full max-w-xs px-4 py-2.5 text-center text-sm bg-white border border-[#c9cccf] rounded-md focus:outline-none focus:border-[var(--admin-primary)] focus:ring-2 focus:ring-[var(--admin-primary)]/20 transition-all"
                >
                  <option value="Degree">Degree</option>
                  <option value="Professional">Professional</option>
                </select>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div class="space-y-4">
                <label class="block text-sm font-medium text-[#1a1b1c] text-center">Date Range</label>
                <input
                  v-model="currentExperience.dateRange"
                  type="text"
                  class="w-full px-4 py-2.5 text-sm bg-white border border-[#c9cccf] rounded-md focus:outline-none focus:border-[var(--admin-primary)] focus:ring-2 focus:ring-[var(--admin-primary)]/20 transition-all"
                  placeholder="e.g., 2025 - Present"
                />
              </div>
              <div class="space-y-4">
                <label class="block text-sm font-medium text-[#1a1b1c] text-center">Title</label>
                <input
                  v-model="currentExperience.title"
                  type="text"
                  class="w-full px-4 py-2.5 text-sm bg-white border border-[#c9cccf] rounded-md focus:outline-none focus:border-[var(--admin-primary)] focus:ring-2 focus:ring-[var(--admin-primary)]/20 transition-all"
                  placeholder="e.g., Senior Developer"
                />
              </div>
            </div>

            <div class="space-y-4">
              <label class="block text-sm font-medium text-[#1a1b1c] text-center">Subtitle</label>
              <input
                v-model="currentExperience.subtitle"
                type="text"
                class="w-full px-4 py-2.5 text-sm bg-white border border-[#c9cccf] rounded-md focus:outline-none focus:border-[var(--admin-primary)] focus:ring-2 focus:ring-[var(--admin-primary)]/20 transition-all"
                placeholder="e.g., Company Name"
              />
            </div>

            <div class="space-y-4">
              <label class="block text-sm font-medium text-[#1a1b1c] text-center">Description</label>
              <textarea
                v-model="currentExperience.description"
                rows="3"
                class="w-full px-4 py-2.5 text-sm bg-white border border-[#c9cccf] rounded-md focus:outline-none focus:border-[var(--admin-primary)] focus:ring-2 focus:ring-[var(--admin-primary)]/20 transition-all resize-y"
                placeholder="Brief description of your role or studies..."
              ></textarea>
            </div>

            <div class="space-y-4">
              <label class="block text-sm font-medium text-[#1a1b1c] text-center">Bullet Points</label>
              <div class="space-y-3">
                <div v-for="(point, pIdx) in currentExperience.bulletPoints" :key="pIdx" class="flex items-center gap-4">
                  <div class="w-2 h-2 rounded-full bg-[var(--admin-primary)] flex-shrink-0"></div>
                  <input
                    v-model="currentExperience.bulletPoints[pIdx]"
                    type="text"
                    class="flex-1 px-4 py-2 text-sm bg-white border border-[#c9cccf] rounded-md focus:outline-none focus:border-[var(--admin-primary)] focus:ring-2 focus:ring-[var(--admin-primary)]/20 transition-all"
                    :placeholder="`Point ${pIdx + 1}`"
                  />
                  <button 
                    v-if="currentExperience.bulletPoints.length > 1"
                    @click="removeModalBulletPoint(pIdx)"
                    class="p-2 text-[#6d7175] hover:text-[#d72c0d] transition-colors"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <div class="pt-2 flex justify-center">
                  <button 
                    type="button" 
                    @click="addModalBulletPoint"
                    class="inline-flex items-center gap-2 text-sm font-medium text-[var(--admin-primary)] hover:text-[var(--admin-secondary)] transition-colors p-2"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                    </svg>
                    Add Bullet Point
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Modal Footer -->
        <div class="px-8 py-5 border-t border-[#c9cccf] bg-[#f6f6f7] flex items-center justify-end gap-3">
          <button
            @click="closeModal"
            class="px-5 py-2.5 text-sm font-medium text-[#1a1b1c] hover:bg-white rounded-md border border-[#c9cccf] transition-all"
          >
            Cancel
          </button>
          <button
            @click="saveTimelineItem"
            class="px-8 py-2.5 text-sm font-medium text-white bg-[var(--admin-primary)] rounded-md hover:bg-[var(--admin-secondary)] transition-all shadow-sm"
          >
            {{ editingIndex !== null ? 'Update Timeline' : 'Add to Timeline' }}
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
const experienceId = ref(null)
const activeTab = ref('header')

const experienceData = ref({
  description: '',
  experiences: []
})

const currentExperience = ref({
  dateRange: '',
  title: '',
  subtitle: '',
  description: '',
  category: 'Professional',
  bulletPoints: ['']
})

const showModal = ref(false)
const editingIndex = ref(null)
const saving = ref(false)
const showSuccess = ref(false)

// Load data from localStorage on mount
onMounted(() => {
  loadFromDatabase()
})

const loadFromDatabase = async () => {
  if (!isSupabaseConfigured()) {
    console.warn('Supabase not configured, falling back to localStorage')
    loadFromStorage()
    return
  }

  try {
    const { data, error } = await supabase
      .from('experience_section')
      .select('*')
      .limit(1)
      .single()

    if (error && error.code !== 'PGRST116') {
      console.error('Error loading experience data:', error)
      loadFromStorage()
      return
    }

    if (data) {
      experienceId.value = data.id
      experienceData.value = {
        description: data.description || '',
        experiences: data.experiences || []
      }
    } else {
      loadFromStorage()
    }
  } catch (err) {
    console.error('Database fetch error:', err)
    loadFromStorage()
  }
}

const loadFromStorage = () => {
  const savedData = localStorage.getItem('experienceSectionData')
  if (savedData) {
    try {
      experienceData.value = { ...experienceData.value, ...JSON.parse(savedData) }
    } catch (e) {
      console.error('Error loading experience data:', e)
    }
  } else {
    // Set default values if nothing is saved
    experienceData.value = {
      description: "I'm currently a 4th-year college student with a strong foundation in both frontend and backend development. While I don't have formal industry experience yet, I have built a solid skill set through academic projects and personal learning.",
      experiences: [
        {
          dateRange: '2025 - Present',
          title: '4th Year College Student',
          subtitle: 'Capstone Project 2',
          category: 'Degree',
          description: 'Introduction of developing a web app with enrollment system, building the enrollment portal through web.',
          bulletPoints: [
            'Managed online enrollment for 20+ applicants through the LMSTC Web Application',
            'Implemented a design system that improved enrollment efficiency'
          ]
        },
        {
          dateRange: '2024 - 2025',
          title: '3rd Year College Student',
          subtitle: 'Frontend Development',
          category: 'Degree',
          description: 'Developed frontend logic while applying user interface (UI) design concepts and principles to create visually appealing, user-friendly, and responsive interfaces.',
          bulletPoints: [
            'Built responsive user interfaces using React.js',
            'Integrated frontend with Django backend through REST APIs',
            'Applied key UI/UX principles to improve user experience'
          ]
        }
      ]
    }
  }
}

// Modal Actions
const openModal = (index = null) => {
  if (index !== null) {
    editingIndex.value = index
    currentExperience.value = JSON.parse(JSON.stringify(experienceData.value.experiences[index]))
  } else {
    editingIndex.value = null
    currentExperience.value = {
      dateRange: '',
      title: '',
      subtitle: '',
      description: '',
      category: 'Professional',
      bulletPoints: ['']
    }
  }
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  editingIndex.value = null
}

const addModalBulletPoint = () => {
  currentExperience.value.bulletPoints.push('')
}

const removeModalBulletPoint = (index) => {
  currentExperience.value.bulletPoints.splice(index, 1)
}

const saveTimelineItem = () => {
  if (editingIndex.value !== null) {
    experienceData.value.experiences[editingIndex.value] = { ...currentExperience.value }
  } else {
    experienceData.value.experiences.push({ ...currentExperience.value })
  }
  
  // Auto-save to database/localStorage after adding/editing a timeline item
  handleSave()
  closeModal()
}

const removeExperience = (index) => {
  if (confirm('Are you sure you want to remove this timeline item?')) {
    experienceData.value.experiences.splice(index, 1)
    handleSave()
  }
}

const resetData = () => {
  if (confirm('Are you sure you want to reset all data? This will clear all changes.')) {
    localStorage.removeItem('experienceSectionData')
    loadFromDatabase()
  }
}

const handleSave = async () => {
  saving.value = true
  showSuccess.value = false

  try {
    const dbData = {
      description: experienceData.value.description,
      experiences: experienceData.value.experiences,
      updated_at: new Date().toISOString()
    }

    let success = false
    if (isSupabaseConfigured()) {
      let result
      if (experienceId.value) {
        result = await supabase
          .from('experience_section')
          .update(dbData)
          .eq('id', experienceId.value)
      } else {
        result = await supabase
          .from('experience_section')
          .insert(dbData)
          .select()
          .single()
        if (result.data) experienceId.value = result.data.id
      }
      if (!result.error) success = true
    }

    // Always backup to localStorage
    localStorage.setItem('experienceSectionData', JSON.stringify(experienceData.value))
    if (!isSupabaseConfigured()) success = true

    await new Promise(resolve => setTimeout(resolve, 500))
    
    if (success) {
      showSuccess.value = true
      if (addToast) addToast('Changes saved successfully', 'success')
      setTimeout(() => { showSuccess.value = false }, 3000)
    } else {
      if (addToast) addToast('Error saving to database', 'error')
    }
  } catch (error) {
    console.error('Error saving experience data:', error)
    if (addToast) addToast('An error occurred while saving', 'error')
  } finally {
    saving.value = false
  }
}

// Expose methods for parent
defineExpose({
  refresh: loadFromDatabase,
  onSearch: (query) => {
    console.log('Searching:', query)
  }
})
</script>
