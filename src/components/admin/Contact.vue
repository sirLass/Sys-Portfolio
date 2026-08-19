<template>
  <div class="p-6">
    <!-- Banners -->
    <Banner :show="showSuccess" type="success" message="Changes saved successfully!" />

    <form @submit.prevent="handleSave">
      <div class="space-y-6">
        <!-- Contact Information -->
        <div class="bg-[#f6f6f7]/50 p-6 rounded-xl border border-[#e3e5e7]">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-base font-semibold text-[#1a1b1c]">Contact Information</h3>
            <button type="button" @click="toggleVis('contact', 'info')" class="inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium transition-all" :class="vis.contact.info ? 'text-[var(--admin-primary)] bg-[var(--admin-primary)]/10' : 'text-[#6d7175] bg-[#f6f6f7]'" :title="vis.contact.info ? 'Visible on public site' : 'Hidden from public site'">
              <svg v-if="vis.contact.info" class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
              <svg v-else class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
              {{ vis.contact.info ? 'Visible' : 'Hidden' }}
            </button>
          </div>
          
          <!-- Emails Section -->
          <div class="mb-6">
            <div class="flex items-center justify-between mb-3">
              <label class="block text-sm font-medium text-[#1a1b1c]">Email Addresses</label>
              <button
                type="button"
                @click="addEmail"
                class="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-[var(--admin-primary)] bg-[var(--admin-primary-light)] rounded-md hover:bg-[var(--admin-primary)] hover:text-white transition-all"
              >
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
                Add Email
              </button>
            </div>
            <div class="space-y-3">
              <div v-for="(email, index) in contactData.emails" :key="index" class="flex items-center gap-3">
                <div class="relative flex-1">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg class="w-5 h-5 text-[#6d7175]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <input
                    v-model="contactData.emails[index]"
                    type="email"
                    class="w-full pl-10 pr-4 py-2.5 text-sm text-[#1a1b1c] bg-white border border-[#c9cccf] rounded-md focus:outline-none focus:border-[var(--admin-primary)] focus:ring-2 focus:ring-[var(--admin-primary)]/20 transition-all placeholder:text-[#6d7175]"
                    placeholder="perezbrian091598@gmail.com"
                  />
                </div>
                <button
                  v-if="contactData.emails.length > 1"
                  type="button"
                  @click="removeEmail(index)"
                  class="p-2 text-[#6d7175] hover:text-[#d72c0d] hover:bg-[#fff4f4] rounded-md transition-all"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <!-- GitHub URLs Section -->
          <div class="mb-6">
            <div class="flex items-center justify-between mb-3">
              <label class="block text-sm font-medium text-[#1a1b1c]">GitHub URLs</label>
              <button
                type="button"
                @click="addGithub"
                class="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-[var(--admin-primary)] bg-[var(--admin-primary-light)] rounded-md hover:bg-[var(--admin-primary)] hover:text-white transition-all"
              >
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
                Add GitHub
              </button>
            </div>
            <div class="space-y-3">
              <div v-for="(github, index) in contactData.githubs" :key="index" class="flex items-center gap-3">
                <div class="relative flex-1">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg class="w-5 h-5 text-[#6d7175]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </div>
                  <input
                    v-model="contactData.githubs[index]"
                    type="text"
                    class="w-full pl-10 pr-4 py-2.5 text-sm text-[#1a1b1c] bg-white border border-[#c9cccf] rounded-md focus:outline-none focus:border-[var(--admin-primary)] focus:ring-2 focus:ring-[var(--admin-primary)]/20 transition-all placeholder:text-[#6d7175]"
                    placeholder="https://github.com/SirP-rezDev"
                  />
                </div>
                <button
                  v-if="contactData.githubs.length > 1"
                  type="button"
                  @click="removeGithub(index)"
                  class="p-2 text-[#6d7175] hover:text-[#d72c0d] hover:bg-[#fff4f4] rounded-md transition-all"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <!-- Location -->
          <div>
            <label for="location" class="block text-sm font-medium text-[#1a1b1c] mb-2">
              Location
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="w-5 h-5 text-[#6d7175]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <input
                id="location"
                v-model="contactData.location"
                type="text"
                class="w-full pl-10 pr-4 py-2.5 text-sm text-[#1a1b1c] bg-white border border-[#c9cccf] rounded-md focus:outline-none focus:border-[var(--admin-primary)] focus:ring-2 focus:ring-[var(--admin-primary)]/20 transition-all placeholder:text-[#6d7175]"
                placeholder="Quezon Province, Philippines"
              />
            </div>
          </div>
        </div>

        <!-- Social Media Section -->
        <div class="bg-[#f6f6f7]/50 p-6 rounded-xl border border-[#e3e5e7]">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-base font-semibold text-[#1a1b1c]">Social Media</h3>
            <button
              type="button"
              @click="isAddingSocial = true"
              class="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-[var(--admin-primary)] bg-[var(--admin-primary-light)] rounded-md hover:bg-[var(--admin-primary)] hover:text-white transition-all transition-colors duration-200"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              Add Platform
            </button>
          </div>

          <!-- Add Social Modal/Inline -->
          <div v-if="isAddingSocial" class="mb-6 p-4 bg-[#f6f6f7] rounded-lg border border-[#c9cccf] animate-in fade-in slide-in-from-top-2 duration-200">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="relative">
                <label class="block text-sm font-medium text-[#1a1b1c] mb-2">Search Platform</label>
                <div class="relative">
                  <div class="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                    <img 
                      v-if="selectedPlatform" 
                      :src="`https://skillicons.dev/icons?i=${selectedPlatform.icon}`" 
                      class="w-5 h-5 rounded"
                    >
                    <svg v-else class="w-5 h-5 text-[#6d7175]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    v-model="socialSearchQuery"
                    type="text"
                    class="w-full pl-10 pr-4 py-2.5 text-sm text-[#1a1b1c] bg-white border border-[#c9cccf] rounded-md focus:outline-none focus:border-[var(--admin-primary)]"
                    placeholder="e.g. Facebook, Instagram..."
                  />
                  <!-- Suggestions Dropdown -->
                  <div v-if="suggestedSocials.length > 0 && socialSearchQuery && !selectedPlatform" class="absolute z-10 left-0 right-0 mt-1 bg-white border border-[#c9cccf] rounded-md shadow-lg overflow-hidden">
                    <button
                      v-for="platform in suggestedSocials"
                      :key="platform.name"
                      type="button"
                      @click="selectPlatform(platform)"
                      class="w-full px-4 py-2 text-left text-sm hover:bg-[#f6f6f7] flex items-center gap-3"
                    >
                      <img :src="`https://skillicons.dev/icons?i=${platform.icon}`" class="w-5 h-5 rounded">
                      <span>{{ platform.name }}</span>
                    </button>
                  </div>
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-[#1a1b1c] mb-2">Profile URL</label>
                <input
                  v-model="socialUrl"
                  type="text"
                  class="w-full px-4 py-2.5 text-sm text-[#1a1b1c] bg-white border border-[#c9cccf] rounded-md focus:outline-none focus:border-[var(--admin-primary)]"
                  placeholder="https://facebook.com/your-profile"
                />
              </div>
            </div>
            <div class="mt-4 flex justify-end gap-2">
              <button @click="resetSocialInput" class="px-3 py-1.5 text-xs font-medium text-[#6d7175] hover:text-[#1a1b1c]">Cancel</button>
              <button @click="addSocial" class="px-4 py-1.5 text-xs font-medium text-white bg-[var(--admin-primary)] rounded-md hover:bg-[var(--admin-secondary)]">Add to List</button>
            </div>
          </div>

          <!-- Socials Table/Grid -->
          <div v-if="contactData.socials?.length > 0" class="border border-[#c9cccf] rounded-lg overflow-hidden">
            <table class="w-full">
              <thead class="bg-[#f6f6f7]">
                <tr>
                  <th class="px-4 py-3 text-left text-xs font-semibold text-[#6d7175] uppercase tracking-wider">Platform</th>
                  <th class="px-4 py-3 text-left text-xs font-semibold text-[#6d7175] uppercase tracking-wider">URL</th>
                  <th class="px-4 py-3 text-right text-xs font-semibold text-[#6d7175] uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#e3e5e7]">
                <tr v-for="(social, index) in contactData.socials" :key="index" class="hover:bg-[#f6f6f7] transition-colors">
                  <td class="px-4 py-4">
                    <div class="flex items-center gap-3">
                      <img :src="`https://skillicons.dev/icons?i=${social.icon}`" class="w-8 h-8 rounded-lg shadow-sm">
                      <span class="text-sm font-medium text-[#1a1b1c]">{{ social.name }}</span>
                    </div>
                  </td>
                  <td class="px-4 py-4">
                    <span class="text-xs text-[#6d7175] truncate max-w-[250px] block">{{ social.url }}</span>
                  </td>
                  <td class="px-4 py-4 text-right">
                    <button
                      type="button"
                      @click="removeSocial(index)"
                      class="p-1.5 text-[#6d7175] hover:text-[#d72c0d] hover:bg-[#fff4f4] rounded transition-all"
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
          <div v-else-if="!isAddingSocial" class="text-center py-8 bg-[#f6f6f7] rounded-lg border-2 border-dashed border-[#c9cccf]">
            <p class="text-sm text-[#6d7175]">No social media profiles added yet.</p>
          </div>
        </div>
      </div>

      <!-- Save Button -->
      <div class="mt-8 pt-6 border-t border-[#e3e5e7] flex items-center justify-end gap-3">
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
import { ref, onMounted, inject, computed } from 'vue'
import { supabase, isSupabaseConfigured } from '../../supabase'
import { useVisibility } from '../../composables/useVisibility'
import Banner from './ui/Banner.vue'

const { vis, toggle: toggleVis } = useVisibility()
const SOCIAL_PLATFORMS = [
  { name: 'Facebook', icon: 'facebook' },
  { name: 'Instagram', icon: 'instagram' },
  { name: 'LinkedIn', icon: 'linkedin' },
  { name: 'Twitter', icon: 'twitter' },
  { name: 'YouTube', icon: 'youtube' },
  { name: 'TikTok', icon: 'tiktok' },
  { name: 'Discord', icon: 'discord' },
  { name: 'Telegram', icon: 'telegram' },
  { name: 'Twitch', icon: 'twitch' },
  { name: 'Stack Overflow', icon: 'stackoverflow' },
  { name: 'Dribbble', icon: 'dribbble' },
  { name: 'Behance', icon: 'behance' },
  { name: 'Reddit', icon: 'reddit' },
  { name: 'Snapchat', icon: 'snapchat' }
]

const addToast = inject('addToast')
const contactId = ref(null)

const contactData = ref({
  emails: [''],
  githubs: [''],
  location: '',
  socials: [] // Array of { name, icon, url }
})

const saving = ref(false)
const showSuccess = ref(false)

// Social media search state
const socialSearchQuery = ref('')
const isAddingSocial = ref(false)
const selectedPlatform = ref(null)
const socialUrl = ref('')

const suggestedSocials = computed(() => {
  const query = socialSearchQuery.value.toLowerCase().trim()
  if (!query) return []
  return SOCIAL_PLATFORMS.filter(platform => 
    platform.name.toLowerCase().includes(query)
  ).slice(0, 5)
})

const selectPlatform = (platform) => {
  selectedPlatform.value = platform
  socialSearchQuery.value = platform.name
}

const addSocial = () => {
  if (!selectedPlatform.value || !socialUrl.value.trim()) {
    if (addToast) addToast('Please select a platform and provide a URL', 'error')
    return
  }

  // Check if platform already exists
  const exists = contactData.value.socials.find(s => s.name === selectedPlatform.value.name)
  if (exists) {
    if (addToast) addToast('This platform is already added', 'error')
    return
  }

  contactData.value.socials.push({
    ...selectedPlatform.value,
    url: socialUrl.value.trim()
  })

  // Reset adding state
  resetSocialInput()
  if (addToast) addToast('Social platform added', 'success')
}

const resetSocialInput = () => {
  isAddingSocial.value = false
  socialSearchQuery.value = ''
  selectedPlatform.value = null
  socialUrl.value = ''
}

const removeSocial = (index) => {
  contactData.value.socials.splice(index, 1)
}

// Email management functions
const addEmail = () => {
  contactData.value.emails.push('')
}

const removeEmail = (index) => {
  contactData.value.emails.splice(index, 1)
}

// GitHub management functions
const addGithub = () => {
  contactData.value.githubs.push('')
}

const removeGithub = (index) => {
  contactData.value.githubs.splice(index, 1)
}

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
      .from('contact_section')
      .select('*')
      .limit(1)
      .single()

    if (error && error.code !== 'PGRST116') {
      console.error('Error loading contact data:', error)
      loadFromStorage()
      return
    }

    if (data) {
      contactId.value = data.id
      contactData.value = {
        emails: data.emails || [data.email || ''],
        githubs: data.githubs || [data.github || ''],
        location: data.location || '',
        socials: data.socials || [],
        updated_at: data.updated_at
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
  const savedData = localStorage.getItem('contactSectionData')
  if (savedData) {
    try {
      const parsed = JSON.parse(savedData)
      contactData.value = {
        emails: parsed.emails || [parsed.email || ''],
        githubs: parsed.githubs || [parsed.github || ''],
        location: parsed.location || '',
        socials: parsed.socials || []
      }
    } catch (e) {
      console.error('Error loading contact data:', e)
    }
  } else {
    // Set default values if nothing is saved
    contactData.value = {
      emails: ['perezbrian091598@gmail.com'],
      githubs: ['https://github.com/SirP-rezDev'],
      location: 'Quezon Province, Philippines',
      socials: []
    }
  }
}

const resetData = () => {
  localStorage.removeItem('contactSectionData')
  loadFromDatabase()
}

const handleSave = async () => {
  saving.value = true
  showSuccess.value = false

  try {
    const dbData = {
      emails: contactData.value.emails,
      githubs: contactData.value.githubs,
      location: contactData.value.location,
      socials: contactData.value.socials,
      updated_at: new Date().toISOString()
    }

    let success = false
    if (isSupabaseConfigured()) {
      let result
      if (contactId.value) {
        result = await supabase
          .from('contact_section')
          .update(dbData)
          .eq('id', contactId.value)
      } else {
        result = await supabase
          .from('contact_section')
          .insert(dbData)
          .select()
          .single()
        if (result.data) contactId.value = result.data.id
      }
      if (!result.error) success = true
    }

    // Always backup to localStorage
    localStorage.setItem('contactSectionData', JSON.stringify(contactData.value))
    if (!isSupabaseConfigured()) success = true

    await new Promise(resolve => setTimeout(resolve, 500))
    
    if (success) {
      showSuccess.value = true
      if (addToast) addToast('Contact section updated successfully', 'success')
      setTimeout(() => { showSuccess.value = false }, 3000)
    } else {
      if (addToast) addToast('Error saving to database', 'error')
    }
  } catch (error) {
    console.error('Error saving contact data:', error)
    if (addToast) addToast('An error occurred while saving', 'error')
  } finally {
    saving.value = false
  }
}

// Expose methods for parent
defineExpose({
  refresh: loadFromDatabase,
  onSearch: (query) => {
  }
})
</script>
