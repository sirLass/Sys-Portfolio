<template>
  <section id="hero" class="relative min-h-screen flex items-center justify-center overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-blue-50"></div>
    <div class="absolute inset-0 opacity-30">
      <div
        class="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse"
      ></div>
      <div
        class="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"
      ></div>
    </div>

    <div class="relative z-10 max-w-7xl mx-auto px-6 py-20">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div class="text-center lg:text-left">
          <div class="mb-8">
            <p class="text-primary-600 font-semibold text-lg mb-4 flex items-center justify-center lg:justify-start">
              <span class="w-8 h-px bg-primary-600 mr-3"></span>
              {{ heroData.greeting }}
            </p>
            <h1 class="text-5xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              <template v-if="heroData.name.includes(' ')">
                {{ heroData.name.split(' ')[0] }} <span class="gradient-text">{{ heroData.name.split(' ').slice(1).join(' ') }}</span>
              </template>
              <template v-else>
                <span class="gradient-text">{{ heroData.name }}</span>
              </template>
            </h1>
            <h2 class="text-2xl lg:text-3xl text-gray-600 mb-8 font-light">{{ heroData.title }}</h2>
          </div>

          <p class="text-xl text-gray-700 mb-10 leading-relaxed max-w-2xl mx-auto lg:mx-0">
            {{ heroData.description }}
          </p>

          <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <a
              href="#Projects"
              class="inline-flex items-center bg-primary-600 text-white px-8 py-4 rounded-full hover:bg-primary-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 group"
            >
              <span class="mr-2">View My Work</span>
              <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="#Contact"
              class="inline-flex items-center border-2 border-primary-600 text-primary-600 px-8 py-4 rounded-full hover:bg-primary-600 hover:text-white transition-all duration-300 transform hover:-translate-y-1"
            >
              Get In Touch
            </a>
          </div>
        </div>

        <div class="flex justify-center lg:justify-end">
          <div class="relative">
            <div class="w-80 h-80 lg:w-96 lg:h-96 relative">
              <div class="absolute inset-0 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full shadow-2xl"></div>
              <div class="absolute inset-4 bg-white rounded-full shadow-inner flex items-center justify-center">
                <div
                  class="w-64 h-64 lg:w-80 lg:h-80 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center overflow-hidden"
                >
                  <img :src="heroData.image || '/me.png'" :alt="heroData.name || 'Your Photo'" class="w-full h-full object-cover rounded-full transform translate-y-2" />
                </div>
              </div>
              <div class="absolute -top-4 -right-4 w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center shadow-lg">
                <svg class="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <div class="absolute -bottom-4 -left-4 w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center shadow-lg">
                <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../supabase'

const heroData = ref({
  greeting: "Hello, I'm",
  name: 'Brian Perez',
  title: 'Aspiring Full Stack Developer',
  description: 'As a Aspiring Developer and UI/UX Designer, I craft solutions that are not only visually appealing but also intuitive and efficient — combining thoughtful design with clean, scalable code.',
  image: '/me.png'
})

onMounted(async () => {
  if (!supabase) return
  try {
    const { data, error } = await supabase
      .from('personal_info')
      .select('name, title, description, image')
      .order('updated_at', { ascending: false })
      .limit(1)
      .maybeSingle()

    if (error) throw error
    if (data) {
      heroData.value = {
        ...heroData.value,
        name: data.name ?? heroData.value.name,
        title: data.title ?? heroData.value.title,
        description: data.description ?? heroData.value.description,
        image: data.image || '/me.png'
      }
    }
  } catch (e) {
    console.error('Error loading personal_info:', e)
  }
  if (!heroData.value.image) heroData.value.image = '/me.png'
})
</script>