<template>
  <header
    class="sticky top-0 z-50 bg-[#FAF9F6]/95 backdrop-blur-sm border-b border-gray-100 transition-all duration-300"
  >
    <div class="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center relative">
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

      <nav class="hidden lg:flex items-center">
        <!-- Single Expandable Contact Navigation -->
        <div class="contact-expandable flex items-center gap-1 group relative">
          <!-- Hidden nav items that appear on hover - positioned before Contact -->
          <div class="flex items-center gap-1 overflow-hidden max-w-0 group-hover:max-w-[600px] transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]">
            <a @click.prevent="smoothScrollTo('#hero')" href="#hero" class="nav-item opacity-0 translate-x-6 scale-95 group-hover:opacity-100 group-hover:translate-x-0 group-hover:scale-100 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] delay-[0ms] px-3 py-2 text-sm font-medium text-gray-600 hover:text-primary-600 rounded-lg hover:bg-primary-50 whitespace-nowrap cursor-pointer">
              Home
            </a>
            <a @click.prevent="smoothScrollTo('#About')" href="#About" class="nav-item opacity-0 translate-x-6 scale-95 group-hover:opacity-100 group-hover:translate-x-0 group-hover:scale-100 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] delay-[60ms] px-3 py-2 text-sm font-medium text-gray-600 hover:text-primary-600 rounded-lg hover:bg-primary-50 whitespace-nowrap cursor-pointer">
              About
            </a>
            <a @click.prevent="smoothScrollTo('#Skills')" href="#Skills" class="nav-item opacity-0 translate-x-6 scale-95 group-hover:opacity-100 group-hover:translate-x-0 group-hover:scale-100 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] delay-[120ms] px-3 py-2 text-sm font-medium text-gray-600 hover:text-primary-600 rounded-lg hover:bg-primary-50 whitespace-nowrap cursor-pointer">
              Skills
            </a>
            <a @click.prevent="smoothScrollTo('#Projects')" href="#Projects" class="nav-item opacity-0 translate-x-6 scale-95 group-hover:opacity-100 group-hover:translate-x-0 group-hover:scale-100 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] delay-[180ms] px-3 py-2 text-sm font-medium text-gray-600 hover:text-primary-600 rounded-lg hover:bg-primary-50 whitespace-nowrap cursor-pointer">
              Projects
            </a>
            <a @click.prevent="smoothScrollTo('#Experience')" href="#Experience" class="nav-item opacity-0 translate-x-6 scale-95 group-hover:opacity-100 group-hover:translate-x-0 group-hover:scale-100 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] delay-[240ms] px-3 py-2 text-sm font-medium text-gray-600 hover:text-primary-600 rounded-lg hover:bg-primary-50 whitespace-nowrap cursor-pointer">
              Experience
            </a>
            <div class="w-px h-6 bg-gray-300 mx-1 transition-opacity duration-300 opacity-0 group-hover:opacity-100"></div>
          </div>
          
          <!-- Chevron that changes direction with smooth spring animation -->
          <span class="chevron-icon text-gray-400 group-hover:text-primary-600 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] mr-1">
            <svg class="w-5 h-5 transform transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:-scale-x-100 group-hover:translate-x-[-2px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </span>
          
          <!-- Contact Button with subtle pulse on hover -->
          <a 
            @click.prevent="smoothScrollTo('#Contact')"
            href="#Contact"
            class="bg-primary-600 text-white px-5 py-2 rounded-full hover:bg-primary-700 hover:shadow-lg hover:shadow-primary-600/30 hover:scale-105 active:scale-95 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] text-sm font-medium whitespace-nowrap cursor-pointer"
          >
            Contact Me
          </a>
        </div>
      </nav>

      <button
        id="mobile-menu-btn"
        class="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-300"
      >
        <svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
      </button>
    </div>

    <div id="mobile-menu" class="lg:hidden hidden bg-[#FAF9F6] border-t border-gray-100">
      <div class="px-6 py-4 space-y-4">
        <a @click.prevent="smoothScrollTo('#hero')" href="#hero" class="block text-gray-700 hover:text-primary-600 font-medium transition-colors duration-300 cursor-pointer">Home</a>
        <a @click.prevent="smoothScrollTo('#About')" href="#About" class="block text-gray-700 hover:text-primary-600 font-medium transition-colors duration-300 cursor-pointer">About</a>
        <a @click.prevent="smoothScrollTo('#Skills')" href="#Skills" class="block text-gray-700 hover:text-primary-600 font-medium transition-colors duration-300 cursor-pointer">Skills</a>
        <a @click.prevent="smoothScrollTo('#Projects')" href="#Projects" class="block text-gray-700 hover:text-primary-600 font-medium transition-colors duration-300 cursor-pointer">Projects</a>
        <a @click.prevent="smoothScrollTo('#Experience')" href="#Experience" class="block text-gray-700 hover:text-primary-600 font-medium transition-colors duration-300 cursor-pointer">Experience</a>
        <a @click.prevent="smoothScrollTo('#Contact')" href="#Contact" class="block bg-primary-600 text-white px-6 py-2 rounded-full hover:bg-primary-700 transition-colors duration-300 text-center cursor-pointer">Contact Me</a>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import logoUrl from '../assets/sirlass_logo.png'

const router = useRouter()
const clickCount = ref(0)
const showMessage = ref(false)
const currentMessage = ref('')
let messageTimeout = null

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
  const header = document.querySelector('header')
  if (!header) return
  if (window.scrollY > 100) {
    header.classList.add('shadow-lg')
    header.classList.remove('shadow-sm')
  } else {
    header.classList.remove('shadow-lg')
    header.classList.add('shadow-sm')
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