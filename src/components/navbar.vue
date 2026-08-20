<template>
  <header
    ref="headerRef"
    :class="[
      'sticky top-0 z-50 bg-[#FAF9F6]/95 dark:bg-[#0f1117]/95 backdrop-blur-sm border-b border-gray-100 dark:border-white/10 transition-transform duration-300 ease-in-out',
      isHidden ? '-translate-y-full' : 'translate-y-0'
    ]"
  >
    <div class="max-w-7xl mx-auto px-6 h-20 grid grid-cols-[auto_1fr_auto] items-center relative">
      <div class="flex items-center">
        <div 
          @click="handleLogoClick"
          class="flex items-center cursor-pointer transition-all duration-300 group"
        >
          <img :src="logoUrl" alt="Logo" class="max-h-12 w-auto transform transition-transform duration-300 group-hover:scale-105" />
        </div>
      </div>

      <!-- Secret Message Tooltip (Outside overflow container) -->
      <transition name="fade">
        <div 
          v-if="showMessage" 
          class="absolute top-full left-6 mt-2 bg-gray-900 text-white text-xs py-1 px-3 rounded-full shadow-lg whitespace-nowrap z-50 font-medium border border-white/10"
        >
          {{ currentMessage }}
        </div>
      </transition>

      <!-- Desktop Nav -->
      <nav class="hidden lg:flex items-center justify-center">
        <div class="flex items-center gap-1">
          <a @click.prevent="smoothScrollTo('#hero')" href="#hero" class="px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary-600 rounded-lg hover:bg-primary-50 dark:hover:bg-white/10 whitespace-nowrap cursor-pointer">
            Home
          </a>
          <a @click.prevent="smoothScrollTo('#About')" href="#About" class="px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary-600 rounded-lg hover:bg-primary-50 dark:hover:bg-white/10 whitespace-nowrap cursor-pointer">
            About
          </a>
          <a @click.prevent="smoothScrollTo('#Skills')" href="#Skills" class="px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary-600 rounded-lg hover:bg-primary-50 dark:hover:bg-white/10 whitespace-nowrap cursor-pointer">
            Skills
          </a>
          <a @click.prevent="smoothScrollTo('#Projects')" href="#Projects" class="px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary-600 rounded-lg hover:bg-primary-50 dark:hover:bg-white/10 whitespace-nowrap cursor-pointer">
            Projects
          </a>
          <a @click.prevent="smoothScrollTo('#Experience')" href="#Experience" class="px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary-600 rounded-lg hover:bg-primary-50 dark:hover:bg-white/10 whitespace-nowrap cursor-pointer">
            Experience
          </a>
          <a @click.prevent="smoothScrollTo('#Gallery')" href="#Gallery" class="px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-primary-600 rounded-lg hover:bg-primary-50 dark:hover:bg-white/10 whitespace-nowrap cursor-pointer">
            Gallery
          </a>
        </div>
      </nav>

      <div class="flex items-center justify-end gap-2">
        <button
          type="button"
          class="p-2 rounded-full text-gray-600 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors duration-300"
          :title="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
          :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
          @click.stop="toggleTheme"
        >
          <i :class="['bi text-lg leading-none', isDark ? 'bi-sun' : 'bi-moon']"></i>
        </button>
        <a
          @click.prevent="smoothScrollTo('#Contact')"
          href="#Contact"
          class="hidden lg:inline-flex bg-primary-600 text-white px-5 py-2 rounded-full hover:bg-primary-700 hover:shadow-lg hover:shadow-primary-600/30 active:scale-95 transition-all duration-300 text-sm font-medium whitespace-nowrap cursor-pointer"
        >
          Contact Me
        </a>
        <button
          id="mobile-menu-btn"
          class="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 transition-colors duration-300"
        >
          <i class="bi bi-list text-2xl leading-none text-gray-700 dark:text-gray-200"></i>
        </button>
      </div>
    </div>

    <div id="mobile-menu" class="lg:hidden hidden bg-[#FAF9F6] dark:bg-[#0f1117] border-t border-gray-100 dark:border-white/10">
      <div class="px-6 py-4 space-y-4">
        <a @click.prevent="smoothScrollTo('#hero')" href="#hero" class="block text-gray-700 dark:text-gray-200 hover:text-primary-600 font-medium transition-colors duration-300 cursor-pointer">Home</a>
        <a @click.prevent="smoothScrollTo('#About')" href="#About" class="block text-gray-700 dark:text-gray-200 hover:text-primary-600 font-medium transition-colors duration-300 cursor-pointer">About</a>
        <a @click.prevent="smoothScrollTo('#Skills')" href="#Skills" class="block text-gray-700 dark:text-gray-200 hover:text-primary-600 font-medium transition-colors duration-300 cursor-pointer">Skills</a>
        <a @click.prevent="smoothScrollTo('#Projects')" href="#Projects" class="block text-gray-700 dark:text-gray-200 hover:text-primary-600 font-medium transition-colors duration-300 cursor-pointer">Projects</a>
        <a @click.prevent="smoothScrollTo('#Experience')" href="#Experience" class="block text-gray-700 dark:text-gray-200 hover:text-primary-600 font-medium transition-colors duration-300 cursor-pointer">Experience</a>
        <a @click.prevent="smoothScrollTo('#Gallery')" href="#Gallery" class="block text-gray-700 dark:text-gray-200 hover:text-primary-600 font-medium transition-colors duration-300 cursor-pointer">Gallery</a>
        <a @click.prevent="smoothScrollTo('#Contact')" href="#Contact" class="block bg-primary-600 text-white px-6 py-2 rounded-full hover:bg-primary-700 transition-colors duration-300 text-center cursor-pointer">Contact Me</a>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import logoUrl from '../assets/sirlass_logo.png'
import { useTheme } from '../composables/useTheme'

const router = useRouter()
const { isDark, toggleTheme } = useTheme()
const clickCount = ref(0)
const showMessage = ref(false)
const currentMessage = ref('')
const headerRef = ref(null)
const isHidden = ref(false)
let messageTimeout = null
let lastScrollY = 0
const SCROLL_THRESHOLD = 10

const handleLogoClick = () => {
  clickCount.value++
  
  if (clickCount.value === 1) {
    const greetings = ['Hello', 'Hi there']
    currentMessage.value = greetings[Math.floor(Math.random() * greetings.length)]
  } else if (clickCount.value === 2) {
    currentMessage.value = 'Stop It'
  } else if (clickCount.value === 3) {
    currentMessage.value = 'Okay, you got me'
    setTimeout(() => {
      router.push('/login')
      // Reset after redirect
      clickCount.value = 0
    }, 1000)
  }

  // Show tooltip message
  showMessage.value = true
  if (messageTimeout) clearTimeout(messageTimeout)
  messageTimeout = setTimeout(() => {
    showMessage.value = false
  }, 2000)
}

const toggleMobileMenu = () => {
  const menu = document.getElementById('mobile-menu')
  menu?.classList.toggle('hidden')
}

const closeMobileMenu = () => {
  const menu = document.getElementById('mobile-menu')
  menu?.classList.add('hidden')
}

const handleScroll = () => {
  const currentScrollY = window.scrollY
  const delta = currentScrollY - lastScrollY

  // Always show navbar at the very top
  if (currentScrollY < 80) {
    isHidden.value = false
    lastScrollY = currentScrollY
    return
  }

  // Only toggle after crossing the threshold to avoid jitter
  if (Math.abs(delta) > SCROLL_THRESHOLD) {
    if (delta > 0) {
      // Scrolling down → hide
      isHidden.value = true
    } else {
      // Scrolling up → show
      isHidden.value = false
    }
    lastScrollY = currentScrollY
  }
}

// Bouncy smooth scroll function
const smoothScrollTo = (target) => {
  const element = document.querySelector(target)
  if (!element) return

  const headerOffset = 80 // Account for sticky header
  const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
  const offsetPosition = elementPosition - headerOffset

  const startPosition = window.pageYOffset
  const distance = offsetPosition - startPosition
  const duration = 1200 // Longer duration for bouncy effect
  let startTime = null

  // Spring bounce easing function
  const easeOutBounce = (t) => {
    const n1 = 7.5625
    const d1 = 2.75
    if (t < 1 / d1) {
      return n1 * t * t
    } else if (t < 2 / d1) {
      return n1 * (t -= 1.5 / d1) * t + 0.75
    } else if (t < 2.5 / d1) {
      return n1 * (t -= 2.25 / d1) * t + 0.9375
    } else {
      return n1 * (t -= 2.625 / d1) * t + 0.984375
    }
  }

  const animation = (currentTime) => {
    if (!startTime) startTime = currentTime
    const timeElapsed = currentTime - startTime
    const progress = Math.min(timeElapsed / duration, 1)
    
    const ease = easeOutBounce(progress)
    window.scrollTo(0, startPosition + distance * ease)

    if (timeElapsed < duration) {
      requestAnimationFrame(animation)
    }
  }

  requestAnimationFrame(animation)
  
  // Close mobile menu if open
  closeMobileMenu()
}

onMounted(() => {
  const btn = document.getElementById('mobile-menu-btn')
  const links = document.querySelectorAll('#mobile-menu a')

  btn?.addEventListener('click', toggleMobileMenu)
  links.forEach((link) => link.addEventListener('click', closeMobileMenu))
  window.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
  const btn = document.getElementById('mobile-menu-btn')
  const links = document.querySelectorAll('#mobile-menu a')

  btn?.removeEventListener('click', toggleMobileMenu)
  links.forEach((link) => link.removeEventListener('click', closeMobileMenu))
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translate(-50%, 10px);
}
</style>