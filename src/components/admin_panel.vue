<template>
  <div class="h-screen flex overflow-hidden bg-[#f6f6f7] theme-container" :style="adminThemeVariables">
    <!-- Shopify-style Dark Navy Sidebar -->
    <aside
      :class="[
        'transition-all duration-300 ease-in-out h-screen flex-shrink-0 flex flex-col',
        isCollapsed ? 'w-[60px]' : 'w-[240px]'
      ]"
      style="background-color: var(--admin-sidebar-bg)"
      role="navigation"
      aria-label="Sidebar"
    >
      <!-- Sidebar Header -->
      <div class="h-[60px] flex items-center px-4 border-b border-white/10">
        <div class="flex items-center gap-3 min-w-0">
          <div class="flex items-center justify-center w-8 h-8 rounded-lg bg-[var(--admin-primary)] text-white font-semibold flex-shrink-0 overflow-hidden">
            <img src="../assets/sirlass_logo.png" class="w-5 h-5 object-contain" alt="Logo" />
          </div>
          <h1 v-if="!isCollapsed" class="text-lg font-semibold text-white truncate">Portfolio Admin</h1>
        </div>
      </div>

      <!-- Navigation Menu -->
      <nav class="flex-1 overflow-y-auto py-2">
        <ul class="space-y-0.5 px-2">
          <li v-for="item in menuItems" :key="item.name">
            <button
              @click="activeSection = item.name"
              :class="[
                'w-full flex items-center px-3 py-2.5 rounded-md transition-all duration-200 text-sm font-medium',
                activeSection === item.name
                  ? 'bg-[var(--admin-nav-active)] text-white'
                  : 'text-gray-400 hover:text-white hover:bg-[var(--admin-nav-hover)]'
              ]"
              :title="isCollapsed ? item.label : ''"
            >
              <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" :d="item.iconPath" />
              </svg>
              <span v-if="!isCollapsed" class="ml-3">{{ item.label }}</span>
              <span v-if="activeSection === item.name && !isCollapsed" class="ml-auto w-1.5 h-1.5 rounded-full bg-[var(--admin-primary)]"></span>
            </button>
          </li>
        </ul>
      </nav>

      <!-- Sidebar Footer -->
      <div class="p-2 border-t border-white/10">
        <button
          @click="toggleSidebar"
          class="w-full flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-[var(--admin-nav-hover)] transition-all duration-200"
          :title="isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'"
        >
          <svg
            v-if="!isCollapsed"
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          </svg>
          <svg
            v-else
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
          </svg>
        </button>
        
        <button
          @click="openLogoutConfirm"
          class="w-full flex items-center px-3 py-2.5 mt-2 rounded-md text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-200 text-sm font-medium"
          :title="isCollapsed ? 'Logout' : ''"
        >
          <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span v-if="!isCollapsed" class="ml-3">Logout</span>
        </button>
      </div>
    </aside>

    <!-- Main Content Area -->
    <main class="flex-1 min-w-0 flex flex-col overflow-hidden">
      <!-- Shopify-style Top Bar -->
      <header class="h-[60px] bg-white border-b border-[#c9cccf] flex items-center justify-between px-6 flex-shrink-0">
        <div class="flex items-center gap-4">
          <!-- Breadcrumb -->
          <nav class="flex items-center text-sm text-[#6d7175]" aria-label="Breadcrumb">
            <span class="hover:text-[#1a1b1c] cursor-pointer transition-colors">Admin</span>
            <svg class="w-4 h-4 mx-2 text-[#c9cccf]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
            <span class="font-medium text-[#1a1b1c]">{{ currentItem.label }}</span>
          </nav>
        </div>

        <div class="flex items-center gap-3">
          <!-- Search -->
          <div class="relative">
            <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6d7175]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              v-model="searchQuery"
              type="search"
              :placeholder="`Search ${currentItem.label.toLowerCase()}...`"
              class="w-64 pl-9 pr-4 py-2 text-sm bg-[#f6f6f7] border border-[#c9cccf] rounded-md focus:outline-none focus:border-[var(--admin-primary)] focus:ring-2 focus:ring-[var(--admin-primary)]/20 transition-all placeholder:text-[#6d7175]"
              aria-label="Search"
            />
          </div>

          <!-- Notifications -->
          <button
            type="button"
            class="relative p-2 text-[#6d7175] hover:text-[#1a1b1c] hover:bg-[#f6f6f7] rounded-md transition-all"
            title="Notifications"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span class="absolute top-1.5 right-1.5 w-2 h-2 bg-[#d72c0d] rounded-full"></span>
          </button>

          <!-- User Menu -->
          <div class="relative" ref="userMenuRef">
            <button
              @click="showUserMenu = !showUserMenu"
              class="flex items-center gap-2 p-1.5 rounded-md hover:bg-[#f6f6f7] transition-all"
            >
              <div class="w-8 h-8 rounded-full bg-[var(--admin-primary)] text-white flex items-center justify-center text-sm font-medium">
                {{ userInitials }}
              </div>
              <span v-if="!isCollapsed" class="text-sm font-medium text-[#1a1b1c] hidden sm:block">{{ username }}</span>
              <svg class="w-4 h-4 text-[#6d7175] hidden sm:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <!-- User Dropdown -->
            <div
              v-if="showUserMenu"
              class="absolute right-0 top-full mt-1 w-48 bg-white rounded-md shadow-lg border border-[#c9cccf] py-1 z-50"
            >
              <div class="px-4 py-2 border-b border-[#e3e5e7]">
                <p class="text-sm font-medium text-[#1a1b1c]">{{ username }}</p>
                <p class="text-xs text-[#6d7175]">Administrator</p>
              </div>
              <button
                type="button"
                @click.stop="openLogoutConfirm"
                class="w-full text-left px-4 py-2 text-sm text-[#d72c0d] hover:bg-[#fff4f4] transition-colors"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </header>

      <!-- Content Area -->
      <section ref="sectionRef" class="flex-1 overflow-y-auto p-6">
        <!-- Page Header -->
        <div class="mb-6 flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-semibold text-[#1a1b1c]">{{ currentItem.label }}</h1>
            <p class="text-sm text-[#6d7175] mt-1">Manage your {{ currentItem.label.toLowerCase() }} content</p>
          </div>
          <div class="flex items-center gap-2">
            <button
              type="button"
              @click="handleRefresh"
              class="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#1a1b1c] bg-white border border-[#c9cccf] rounded-md hover:bg-[#f6f6f7] hover:border-[#b5babf] transition-all shadow-sm"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh
            </button>
          </div>
        </div>

        <!-- Component Content -->
        <div class="bg-white rounded-lg border border-[#c9cccf] shadow-sm">
          <component :is="currentComponent" :key="activeSection" ref="contentRef" />
        </div>
      </section>
    </main>

    <!-- Sign out confirmation -->
    <Teleport to="body">
      <div
        v-if="showLogoutConfirm"
        class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40"
        role="dialog"
        aria-modal="true"
        aria-labelledby="logout-confirm-title"
        @click.self="cancelLogout"
      >
        <div class="bg-white rounded-lg shadow-xl border border-[#c9cccf] max-w-md w-full p-6">
          <h2 id="logout-confirm-title" class="text-lg font-semibold text-[#1a1b1c]">Sign out?</h2>
          <p class="mt-2 text-sm text-[#6d7175] leading-relaxed">
            You will need to sign in again to access the admin dashboard.
          </p>
          <div class="mt-6 flex justify-end gap-3">
            <button
              type="button"
              class="px-4 py-2 text-sm font-medium text-[#1a1b1c] bg-white border border-[#c9cccf] rounded-md hover:bg-[#f6f6f7] transition-colors"
              @click="cancelLogout"
            >
              Cancel
            </button>
            <button
              type="button"
              class="px-4 py-2 text-sm font-medium text-white bg-[#d72c0d] rounded-md hover:bg-[#b82508] transition-colors"
              @click="confirmLogout"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Toast Notifications -->
    <TransitionGroup name="toast" tag="div" class="fixed top-4 right-4 z-50 space-y-2">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        class="flex items-center gap-3 px-4 py-3 bg-white rounded-lg shadow-lg border-l-4 min-w-[300px]"
        :class="{
          'border-[var(--admin-primary)]': toast.type === 'success',
          'border-[#d72c0d]': toast.type === 'error',
          'border-[#2c6ecb]': toast.type === 'info'
        }"
      >
        <svg v-if="toast.type === 'success'" class="w-5 h-5 text-[var(--admin-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
        <svg v-else-if="toast.type === 'error'" class="w-5 h-5 text-[#d72c0d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
        <svg v-else class="w-5 h-5 text-[#2c6ecb]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p class="text-sm font-medium text-[#1a1b1c]">{{ toast.message }}</p>
      </div>
    </TransitionGroup>
  </div>
</template>


<script setup>
import { ref, computed, watch, onMounted, onUnmounted, provide } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../supabase'
import AdminHome from './admin/Home.vue'
import AdminAbout from './admin/About.vue'
import AdminSkills from './admin/Skills.vue'
import AdminProjects from './admin/Projects.vue'
import AdminExperience from './admin/Experience.vue'
import AdminContact from './admin/Contact.vue'

const router = useRouter()
const isCollapsed = ref(false)
const activeSection = ref('Home')
const searchQuery = ref('')
const contentRef = ref(null)
const sectionRef = ref(null)
const showUserMenu = ref(false)
const showLogoutConfirm = ref(false)
const userMenuRef = ref(null)
const toasts = ref([])
const currentPalette = ref({
  primary: '#008060',
  secondary: '#004c3f',
  accent: '#95bf47'
})
const hexToRgb = (hex) => {
  if (!hex) return '0 0 0'
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? `${parseInt(result[1], 16)} ${parseInt(result[2], 16)} ${parseInt(result[3], 16)}` : '0 0 0'
}

const adminThemeVariables = computed(() => {
  const p = currentPalette.value.primary
  const s = currentPalette.value.secondary
  const a = currentPalette.value.accent
  
  return {
    '--admin-primary': p,
    '--admin-secondary': s,
    '--admin-accent': a,
    '--admin-primary-rgb': hexToRgb(p),
    '--admin-secondary-rgb': hexToRgb(s),
    '--admin-accent-rgb': hexToRgb(a),
    '--admin-primary-light': `color-mix(in srgb, ${p}, transparent 90%)`,
    '--admin-secondary-light': `color-mix(in srgb, ${s}, transparent 90%)`,
    '--admin-accent-light': `color-mix(in srgb, ${a}, transparent 90%)`,
    '--admin-sidebar-bg': `color-mix(in srgb, ${s}, black 60%)`,
    '--admin-nav-hover': `color-mix(in srgb, white, transparent 94%)`,
    '--admin-nav-active': `color-mix(in srgb, white, transparent 90%)`
  }
})

const fetchTheme = async () => {
  if (!supabase) return
  try {
    const { data, error } = await supabase
      .from('personal_info')
      .select('palette')
      .order('updated_at', { ascending: false })
      .limit(1)
      .maybeSingle()
    
    if (data && data.palette) {
      const p = typeof data.palette === 'string' ? JSON.parse(data.palette) : data.palette
      currentPalette.value = p
    }
  } catch (e) {
    console.error('Error fetching theme:', e)
  }
}

const updateTheme = (newPalette) => {
  if (newPalette) {
    currentPalette.value = newPalette
  }
}

provide('updateTheme', updateTheme)

// Get user info from Supabase session
const username = ref('Admin')

const fetchUser = async () => {
  const { data: { user } } = await supabase.auth.getUser()
  if (user) {
    username.value = user.email.split('@')[0] || 'Admin'
  }
}

const userInitials = computed(() => {
  return username.value
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
})

const menuItems = [
  { name:'Home',label:'Home',iconPath:'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',component:AdminHome},
  { name:'About',label:'About',iconPath:'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',component:AdminAbout},
  { name:'Skills',label:'Skills',iconPath:'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',component:AdminSkills},
  { name:'Projects',label:'Projects',iconPath:'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10',component:AdminProjects},
  { name:'Experience',label:'Experience',iconPath:'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',component:AdminExperience},
  { name:'Contact',label:'Contact',iconPath:'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',component:AdminContact}
]

const currentComponent = computed(()=>{
  const item = menuItems.find(i=>i.name===activeSection.value)
  return item ? item.component : AdminHome
})

const currentItem = computed(()=>{
  return menuItems.find(i=>i.name===activeSection.value) || menuItems[0]
})

const toggleSidebar = ()=> isCollapsed.value=!isCollapsed.value

const openLogoutConfirm = () => {
  showUserMenu.value = false
  showLogoutConfirm.value = true
}

const cancelLogout = () => {
  showLogoutConfirm.value = false
}

const confirmLogout = async () => {
  showLogoutConfirm.value = false
  const { error } = await supabase.auth.signOut()
  if (error) {
    addToast(error.message, 'error')
  } else {
    router.push('/login')
    addToast('Signed out successfully', 'info')
  }
}

const handleRefresh=()=>{
  if(contentRef.value?.refresh){
    contentRef.value.refresh()
    addToast('Data refreshed','success')
  }
}

const handleNew=()=>{
  if(contentRef.value?.createNew){
    contentRef.value.createNew()
  }
}

// Toast system
const addToast=(message,type='success')=>{
  const id=Date.now()
  toasts.value.push({id,message,type})
  setTimeout(()=>{
    toasts.value=toasts.value.filter(t=>t.id!==id)
  },3000)
}

// ⭐ THIS NOW WORKS (because provide is imported)
provide('addToast',addToast)

const handleClickOutside=(event)=>{
  if(userMenuRef.value && !userMenuRef.value.contains(event.target)){
    showUserMenu.value=false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  fetchTheme()
  fetchUser()
})
onUnmounted(()=>document.removeEventListener('click',handleClickOutside))

watch(searchQuery,(q)=>{
  if(contentRef.value?.onSearch){
    contentRef.value.onSearch(q)
  }
})

watch(activeSection,(val)=>{
  searchQuery.value=''
  if(contentRef.value){
    contentRef.value.onSectionChange?.(val)
    contentRef.value.refresh?.()
  }
  sectionRef.value?.scrollTo({top:0,behavior:'smooth'})
})
</script>
