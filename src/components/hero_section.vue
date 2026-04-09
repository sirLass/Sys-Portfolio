<template>
  <section id="hero" class="relative min-h-screen flex items-center justify-center overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-br from-primary-50 via-[#FAF9F6] to-blue-50"></div>
    
    <!-- Cover Image Banner -->
    <div class="absolute top-0 left-0 w-full h-64 md:h-96 z-0" style="-webkit-mask-image: linear-gradient(to bottom, black 30%, transparent 100%); mask-image: linear-gradient(to bottom, black 30%, transparent 100%);">
      <div v-if="isLoading" class="w-full h-full bg-gray-200 animate-pulse"></div>
      <img v-else-if="heroData?.coverImage" :src="heroData.coverImage" @error="$event.target.style.display='none'" alt="Cover Image" class="w-full h-full object-cover opacity-40 mix-blend-overlay" />
      <div class="absolute inset-0 bg-gradient-to-b from-transparent to-primary-50/80"></div>
    </div>

    <div class="absolute inset-0 opacity-30 mt-48 md:mt-72">
      <div
        class="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse"
      ></div>
      <div
        class="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"
      ></div>
    </div>

    <div class="relative z-10 max-w-7xl mx-auto px-6 py-20">
      <!-- Loading State - Skeleton UI -->
      <div v-if="isLoading" class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div class="text-center lg:text-left space-y-6">
          <div class="h-6 w-32 bg-gray-200 rounded animate-pulse mx-auto lg:mx-0"></div>
          <div class="h-16 w-64 bg-gray-200 rounded animate-pulse mx-auto lg:mx-0"></div>
          <div class="h-8 w-48 bg-gray-200 rounded animate-pulse mx-auto lg:mx-0"></div>
          <div class="space-y-3">
            <div class="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
            <div class="h-4 w-5/6 bg-gray-200 rounded animate-pulse"></div>
            <div class="h-4 w-4/6 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div class="flex gap-4 justify-center lg:justify-start pt-4">
            <div class="h-14 w-40 bg-gray-200 rounded-full animate-pulse"></div>
            <div class="h-14 w-40 bg-gray-200 rounded-full animate-pulse"></div>
          </div>
          <div class="flex items-center justify-center lg:justify-start gap-8 pt-8 border-t border-gray-200">
            <div class="h-12 w-20 bg-gray-200 rounded animate-pulse"></div>
            <div class="h-12 w-20 bg-gray-200 rounded animate-pulse"></div>
            <div class="h-8 w-32 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
        <div class="flex justify-center lg:justify-end">
          <div class="w-80 h-80 lg:w-96 lg:h-96 bg-gray-200 rounded-full animate-pulse"></div>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="hasError || !heroData" class="text-center py-16">
        <div class="text-gray-400 mb-4">
          <svg class="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h3 class="text-xl font-semibold text-gray-600 mb-2">Failed to load data</h3>
        <p class="text-gray-400">Please check your database connection or try again later.</p>
      </div>

      <!-- Loaded Data -->
      <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
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

          <div class="mt-12 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-8 border-t border-gray-200 pt-8">
            <div class="flex items-center gap-8">
              <div class="text-center lg:text-left">
                <p class="text-3xl font-bold text-gray-900">{{ heroData.projectsCount }}<span class="text-primary-600 text-xl align-top">+</span></p>
                <p class="text-sm text-gray-500 font-medium tracking-wide uppercase mt-1">Projects</p>
              </div>
              <div class="w-px h-12 bg-gray-200"></div>
              <div class="text-center lg:text-left">
                <p class="text-3xl font-bold text-gray-900">{{ heroData.githubReposCount }}<span class="text-primary-600 text-xl align-top">+</span></p>
                <p class="text-sm text-gray-500 font-medium tracking-wide uppercase mt-1">Github Repos</p>
              </div>
            </div>

            <div class="hidden sm:block w-px h-12 bg-gray-200"></div>
            <div class="sm:hidden w-full h-px bg-gray-200"></div>

            <div class="flex items-center gap-5">
              <a :href="heroData.socials.facebook" target="_blank" class="text-gray-400 hover:text-primary-600 transition-colors transform hover:scale-110">
                <span class="sr-only">Facebook</span>
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd" /></svg>
              </a>
              <a :href="heroData.socials.twitter" target="_blank" class="text-gray-400 hover:text-primary-600 transition-colors transform hover:scale-110">
                <span class="sr-only">Twitter</span>
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
              </a>
              <a :href="heroData.socials.instagram" target="_blank" class="text-gray-400 hover:text-primary-600 transition-colors transform hover:scale-110">
                <span class="sr-only">Instagram</span>
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clip-rule="evenodd" /></svg>
              </a>
            </div>
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
                  <div v-if="isLoading" class="w-full h-full bg-gray-300 animate-pulse"></div>
                  <img v-else-if="heroData?.image" :src="heroData.image" @error="$event.target.style.display='none'" :alt="heroData.name || 'Your Photo'" class="w-full h-full object-cover rounded-full" />
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

const isLoading = ref(true)
const hasError = ref(false)
const heroData = ref(null)

onMounted(async () => {
  console.log('Supabase client:', supabase)
  if (!supabase) {
    console.error('Supabase not initialized - check .env.local credentials')
    hasError.value = true
    isLoading.value = false
    return
  }
  try {
    const { data, error } = await supabase
      .from('personal_info')
      .select('name, title, description, image, cover_image')
      .order('updated_at', { ascending: false })
      .limit(1)
      .maybeSingle()

    console.log('Hero query result:', { data, error })

    if (error) throw error
    if (data) {
      heroData.value = {
        greeting: "Hello, I'm",
        name: data.name || '',
        title: data.title || '',
        description: data.description || '',
        image: data.image || '',
        coverImage: data.cover_image || '',
        projectsCount: 0,
        githubReposCount: 0,
        socials: { facebook: '#', twitter: '#', instagram: '#' }
      }
    } else {
      console.error('No data found in personal_info table')
      hasError.value = true
    }
  } catch (e) {
    console.error('Error loading personal_info:', e)
    hasError.value = true
  } finally {
    isLoading.value = false
  }
})
</script>