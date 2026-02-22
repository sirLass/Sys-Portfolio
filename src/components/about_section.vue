<template>
  <section id="About" class="py-24 bg-white">
    <div class="max-w-7xl mx-auto px-6">
      <div class="text-center mb-16">
        <p class="text-primary-600 font-semibold text-lg mb-4">{{ aboutData.sectionLabel }}</p>
        <h2 class="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">{{ aboutData.mainHeading }}</h2>
        <div class="w-24 h-1 bg-primary-600 mx-auto rounded-full"></div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div class="order-2 lg:order-1 flex justify-center">
          <div class="relative">
            <div class="w-80 h-80 lg:w-96 lg:h-96 bg-gradient-to-br from-primary-100 to-blue-100 rounded-3xl shadow-2xl flex items-center justify-center">
              <img :src="aboutData.image || '/me.png'" :alt="aboutData.name || 'Your Photo'" class="w-full h-full object-cover transform translate-y-2" />
            </div>
            <div class="absolute -top-6 -right-6 w-24 h-24 bg-primary-200 rounded-full opacity-60"></div>
            <div class="absolute -bottom-6 -left-6 w-32 h-32 bg-blue-200 rounded-full opacity-40"></div>
          </div>
        </div>

        <div class="order-1 lg:order-2">
          <h3 class="text-3xl font-bold text-gray-900 mb-6">{{ aboutData.subheading }}</h3>
          <div class="space-y-6 text-lg text-gray-700 leading-relaxed">
            <p>{{ aboutData.paragraph1 }}</p>
            <p>{{ aboutData.paragraph2 }}</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 mb-8">
            <div class="space-y-4">
              <div class="flex items-center">
                <span class="font-semibold text-gray-900 w-20">Name:</span>
                <span class="text-gray-600">{{ aboutData.name }}</span>
              </div>
              <div class="flex items-center">
                <span class="font-semibold text-gray-900 w-20">Email:</span>
                <span class="text-gray-600">{{ aboutData.email }}</span>
              </div>
            </div>
            <div class="space-y-4">
              <div class="flex items-center">
                <span class="font-semibold text-gray-900 w-24">Location:</span>
                <span class="text-gray-600">{{ aboutData.location }}</span>
              </div>
              <div class="flex items-center">
                <span class="font-semibold text-gray-900 w-24">Status:</span>
                <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  <span class="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                  {{ aboutData.status }}
                </span>
              </div>
            </div>
          </div>

          <a
            :href="aboutData.cvLink"
            target="_blank"
            class="inline-flex items-center bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 group"
          >
            <svg class="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download CV
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../supabase'

const aboutData = ref({
  sectionLabel: "Get to know me",
  mainHeading: 'About Me',
  subheading: 'My Developer Journey',
  paragraph1: 'As a passionate designer and full stack developer, I\'ve developed the skills to build web apps, internal tools, and full web systems—even as an undergraduate.',
  paragraph2: 'My approach focuses on logical problem-solving, choosing solutions that suit each functionality while avoiding unnecessary complexity. With a background in both visual design and development, I bridge the gap between creativity and engineering to deliver polished, user-friendly digital experiences.',
  name: 'Brian Perez',
  email: 'perezbrian091598@gmail.com',
  location: 'Quezon Province, Philippines',
  status: 'Available for Remote Work',
  cvLink: '/myCv.pdf',
  image: '/me.png'
})

onMounted(async () => {
  // Try to load from Supabase first
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('about_me')
        .select('*')
        .limit(1)
        .single()

      if (!error && data) {
        aboutData.value = {
          ...aboutData.value,
          paragraph1: data.Paragraph1 || aboutData.value.paragraph1,
          paragraph2: data.Paragraph2 || aboutData.value.paragraph2,
          name: data.name || aboutData.value.name,
          email: data.email || aboutData.value.email,
          location: data.location || aboutData.value.location,
          status: data.status || aboutData.value.status,
          cvLink: data.cv_link || aboutData.value.cvLink,
          image: data.image_url || aboutData.value.image
        }
        return // Successfully loaded from DB
      }
    } catch (e) {
      console.error('Error fetching About from Supabase:', e)
    }
  }

  // Fallback to localStorage
  const savedData = localStorage.getItem('aboutSectionData')
  if (savedData) {
    try {
      const parsed = JSON.parse(savedData)
      aboutData.value = { ...aboutData.value, ...parsed }
      if (!aboutData.value.image) {
        aboutData.value.image = '/me.png'
      }
    } catch (e) {
      console.error('Error loading about data from localStorage:', e)
    }
  }
})
</script>