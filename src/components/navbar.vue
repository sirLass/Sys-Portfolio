<template>
  <header
    class="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 transition-all duration-300"
  >
    <div class="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
      <div class="flex items-center space-x-3">
        <router-link to="/login" class="flex flex-col cursor-pointer hover:opacity-80 transition-opacity duration-300">
          <img src="/logo.png" alt="Logo" class="w-36 h-auto mt-1" />
        </router-link>
      </div>

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
import { onMounted, onBeforeUnmount } from 'vue'

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