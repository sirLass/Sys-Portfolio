<template>
  <header
    class="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 transition-all duration-300"
  >
    <div class="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center relative">
      <div class="flex items-center h-20 overflow-hidden">
        <div 
          @click="handleLogoClick"
          class="flex items-center h-full cursor-pointer transition-all duration-300 group"
        >
          <img :src="logoUrl" alt="Logo" class="h-full w-auto object-contain py-2 transform transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1" />
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

      <nav class="hidden lg:flex items-center space-x-8">
        <a href="#hero" class="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-300">Home</a>
        <a href="#About" class="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-300">About</a>
        <a href="#Skills" class="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-300">Skills</a>
        <a href="#Projects" class="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-300">Projects</a>
        <a href="#Experience" class="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-300">Experience</a>
        <a href="#Contact" class="bg-primary-600 text-white px-6 py-2 rounded-full hover:bg-primary-700 transition-colors duration-300">Contact</a>
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

    <div id="mobile-menu" class="lg:hidden hidden bg-white border-t border-gray-200">
      <div class="px-6 py-4 space-y-4">
        <a href="#hero" class="block text-gray-700 hover:text-primary-600 font-medium transition-colors duration-300">Home</a>
        <a href="#About" class="block text-gray-700 hover:text-primary-600 font-medium transition-colors duration-300">About</a>
        <a href="#Skills" class="block text-gray-700 hover:text-primary-600 font-medium transition-colors duration-300">Skills</a>
        <a href="#Projects" class="block text-gray-700 hover:text-primary-600 font-medium transition-colors duration-300">Projects</a>
        <a href="#Experience" class="block text-gray-700 hover:text-primary-600 font-medium transition-colors duration-300">Experience</a>
        <a href="#Contact" class="block bg-primary-600 text-white px-6 py-2 rounded-full hover:bg-primary-700 transition-colors duration-300 text-center">Contact</a>
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