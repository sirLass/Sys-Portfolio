<template>
    <section id="Contact" class="py-24 bg-white">
        <div class="max-w-7xl mx-auto px-6">
            <!-- Loading State -->
            <div v-if="isLoading">
                <div class="text-center mb-16">
                    <div class="h-6 w-40 bg-gray-200 rounded animate-pulse mx-auto mb-4"></div>
                    <div class="h-12 w-64 bg-gray-200 rounded animate-pulse mx-auto mb-6"></div>
                    <div class="space-y-3 max-w-2xl mx-auto">
                        <div class="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                        <div class="h-4 w-5/6 bg-gray-200 rounded animate-pulse mx-auto"></div>
                    </div>
                    <div class="w-24 h-1 bg-gray-200 mx-auto rounded-full mt-6 animate-pulse"></div>
                </div>
                
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    <div>
                        <div class="h-9 w-48 bg-gray-200 rounded animate-pulse mb-8"></div>
                        <div class="space-y-6">
                            <div v-for="i in 3" :key="i" class="flex items-center p-6 bg-gray-50 rounded-2xl">
                                <div class="w-16 h-16 bg-gray-200 rounded-xl animate-pulse mr-6"></div>
                                <div class="flex-1 space-y-3">
                                    <div class="h-6 w-28 bg-gray-200 rounded animate-pulse"></div>
                                    <div class="h-4 w-48 bg-gray-200 rounded animate-pulse"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="bg-gray-50 p-8 rounded-2xl">
                        <div class="h-9 w-48 bg-gray-200 rounded animate-pulse mb-8"></div>
                        <div class="space-y-6">
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div v-for="i in 2" :key="i">
                                    <div class="h-4 w-16 bg-gray-200 rounded animate-pulse mb-3"></div>
                                    <div class="h-14 w-full bg-gray-200 rounded-xl animate-pulse"></div>
                                </div>
                            </div>
                            <div>
                                <div class="h-4 w-20 bg-gray-200 rounded animate-pulse mb-3"></div>
                                <div class="h-14 w-full bg-gray-200 rounded-xl animate-pulse"></div>
                            </div>
                            <div>
                                <div class="h-4 w-24 bg-gray-200 rounded animate-pulse mb-3"></div>
                                <div class="h-32 w-full bg-gray-200 rounded-xl animate-pulse"></div>
                            </div>
                            <div class="h-14 w-full bg-gray-200 rounded-xl animate-pulse"></div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Error State -->
            <div v-else-if="hasError || !contactData" class="text-center py-16">
                <div class="text-gray-400 mb-4">
                    <svg class="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </div>
                <h3 class="text-xl font-semibold text-gray-600 mb-2">Failed to load contact info</h3>
                <p class="text-gray-400">Please check your database connection.</p>
            </div>

            <!-- Loaded Data -->
            <div v-else>
                <!-- Section Header -->
                <div class="text-center mb-16">
                    <p class="text-primary-600 font-semibold text-lg mb-4">{{ contactData.sectionLabel }}</p>
                    <h2 class="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Get In <span class="gradient-text">Touch</span></h2>
                    <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        {{ contactData.description }}
                    </p>
                    <div class="w-24 h-1 bg-primary-600 mx-auto rounded-full mt-6"></div>
                </div>
                
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    <!-- Contact Info -->
                    <div>
                        <h3 class="text-3xl font-bold text-gray-900 mb-8">Let's Connect</h3>
                        <div class="space-y-6">
                            <!-- Email -->
                            <div class="flex items-center p-6 bg-gray-50 rounded-2xl hover:bg-primary-50 transition-all duration-300 card-hover group" v-if="contactData.email">
                                <div class="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center mr-6 group-hover:bg-primary-200 transition-colors duration-300">
                                    <svg class="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                    </svg>
                                </div>
                                <div>
                                    <h4 class="text-xl font-semibold text-gray-900 mb-2">Email Me</h4>
                                    <p class="text-gray-600">{{ contactData.email }}</p>
                                </div>
                            </div>
                            
                            <!-- GitHub -->
                            <div class="flex items-center p-6 bg-gray-50 rounded-2xl hover:bg-primary-50 transition-all duration-300 card-hover group" v-if="contactData.github">
                                <div class="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center mr-6 group-hover:bg-primary-200 transition-colors duration-300">
                                    <svg class="w-8 h-8 text-primary-600" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
                                    </svg>
                                </div>
                                <div>
                                    <h4 class="text-xl font-semibold text-gray-900 mb-2">GitHub</h4>
                                    <a :href="contactData.github" target="_blank" class="text-primary-600 hover:text-primary-700 transition-colors duration-300">
                                        {{ contactData.github.replace('https://', '') }}
                                    </a>
                                </div>
                            </div>
                            
                            <!-- Location -->
                            <div class="flex items-center p-6 bg-gray-50 rounded-2xl hover:bg-primary-50 transition-all duration-300 card-hover group" v-if="contactData.location">
                                <div class="w-16 h-16 bg-primary-100 rounded-xl flex items-center justify-center mr-6 group-hover:bg-primary-200 transition-colors duration-300">
                                    <svg class="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                    </svg>
                                </div>
                                <div>
                                    <h4 class="text-xl font-semibold text-gray-900 mb-2">Location</h4>
                                    <p class="text-gray-600">{{ contactData.location }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Contact Form -->
                    <div class="bg-gray-50 p-8 rounded-2xl">
                        <h3 class="text-3xl font-bold text-gray-900 mb-8">{{ contactData.formHeading }}</h3>
                        <form class="space-y-6">
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label for="name" class="block text-sm font-semibold text-gray-700 mb-3">Name</label>
                                    <input type="text" id="name" class="w-full px-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 bg-white">
                                </div>
                                <div>
                                    <label for="email" class="block text-sm font-semibold text-gray-700 mb-3">Email</label>
                                    <input type="email" id="email" class="w-full px-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 bg-white">
                                </div>
                            </div>
                            <div>
                                <label for="subject" class="block text-sm font-semibold text-gray-700 mb-3">Subject</label>
                                <input type="text" id="subject" class="w-full px-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 bg-white">
                            </div>
                            <div>
                                <label for="message" class="block text-sm font-semibold text-gray-700 mb-3">Message</label>
                                <textarea id="message" rows="6" class="w-full px-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300 resize-none bg-white"></textarea>
                            </div>
                            <button type="submit" class="w-full bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-xl transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center group">
                                <span class="mr-2">Send Message</span>
                                <svg class="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                                </svg>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../supabase'

const contactData = ref(null)
const isLoading = ref(true)
const hasError = ref(false)

onMounted(async () => {
  console.log('Contact - Supabase client:', supabase)
  if (!supabase) {
    console.error('Supabase not initialized - check .env.local credentials')
    hasError.value = true
    isLoading.value = false
    return
  }
  try {
    const { data, error } = await supabase
      .from('contact_section')
      .select('*')
      .limit(1)
      .maybeSingle()

    console.log('Contact query result:', { data, error })

    if (error) {
      console.error('Supabase error:', error)
      throw error
    }
    if (data) {
      contactData.value = {
        sectionLabel: data.section_label || "Let's work together",
        mainHeading: data.main_heading || 'Get In Touch',
        description: data.description || '',
        email: data.email || '',
        github: data.github || '',
        location: data.location || '',
        formHeading: data.form_heading || 'Send a Message'
      }
      console.log('Contact data loaded:', contactData.value)
    } else {
      console.error('No data found in contact_section table')
      // Use fallback data instead of error
      contactData.value = {
        sectionLabel: "Let's work together",
        mainHeading: 'Get In Touch',
        description: "I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.",
        email: 'perezbrian091598@gmail.com',
        github: 'https://github.com/SirP-rezDev',
        location: 'Quezon Province, Philippines',
        formHeading: 'Send a Message'
      }
    }
  } catch (e) {
    console.error('Error loading contact_section:', e)
    // Use fallback data on error
    contactData.value = {
      sectionLabel: "Let's work together",
      mainHeading: 'Get In Touch',
      description: "I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.",
      email: 'perezbrian091598@gmail.com',
      github: 'https://github.com/SirP-rezDev',
      location: 'Quezon Province, Philippines',
      formHeading: 'Send a Message'
    }
  } finally {
    isLoading.value = false
  }
})
</script>