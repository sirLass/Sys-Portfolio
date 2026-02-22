<template>
    <section id="Contact" class="py-24 bg-white">
        <div class="max-w-7xl mx-auto px-6">
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
                        <div class="flex items-center p-6 bg-gray-50 rounded-2xl hover:bg-primary-50 transition-all duration-300 card-hover group">
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
                        <div class="flex items-center p-6 bg-gray-50 rounded-2xl hover:bg-primary-50 transition-all duration-300 card-hover group">
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
                        <div class="flex items-center p-6 bg-gray-50 rounded-2xl hover:bg-primary-50 transition-all duration-300 card-hover group">
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
    </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../supabase'

const contactData = ref({
  sectionLabel: "Let's work together",
  mainHeading: 'Get In Touch',
  description: "Have a project in mind or want to chat? Feel free to reach out through any of the channels below.",
  email: 'perezbrian091598@gmail.com',
  github: 'https://github.com/SirP-rezDev',
  location: 'Quezon Province, Philippines',
  formHeading: 'Send a Message'
})

onMounted(async () => {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('contact_section')
        .select('*')
        .limit(1)
        .single()

      if (!error && data) {
        contactData.value = {
          sectionLabel: data.section_label || contactData.value.sectionLabel,
          mainHeading: data.main_heading || contactData.value.mainHeading,
          description: data.description || contactData.value.description,
          email: data.email || contactData.value.email,
          github: data.github || contactData.value.github,
          location: data.location || contactData.value.location,
          formHeading: data.form_heading || contactData.value.formHeading
        }
        return
      }
    } catch (e) {
      console.error('Error fetching contact from Supabase:', e)
    }
  }

  const savedData = localStorage.getItem('contactSectionData')
  if (savedData) {
    try {
      const parsed = JSON.parse(savedData)
      contactData.value = { ...contactData.value, ...parsed }
    } catch (e) {
      console.error('Error loading contact data from localStorage:', e)
    }
  }
})
</script>