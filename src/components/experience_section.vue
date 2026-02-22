<template>
  <section id="Experience" class="py-24 bg-gray-50">
    <div class="max-w-7xl mx-auto px-6">
      <!-- Section Header -->
      <div class="text-center mb-16">
        <p class="text-primary-600 font-semibold text-lg mb-4">{{ experienceData.sectionLabel }}</p>
        <h2 class="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">{{ experienceData.mainHeading }}</h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          {{ experienceData.description }}
        </p>
        <div class="w-24 h-1 bg-primary-600 mx-auto rounded-full mt-6"></div>
      </div>
      
      <div class="relative max-w-4xl mx-auto">
        <!-- Timeline line -->
        <div class="absolute left-4 lg:left-1/2 transform lg:-translate-x-px top-0 bottom-0 w-0.5 bg-primary-200"></div>
        
        <!-- Experience Items -->
        <div class="space-y-12">
          <div
            v-for="(exp, index) in experienceData.experiences"
            :key="index"
            class="relative flex items-center"
            :class="{ 'lg:flex-row-reverse': index % 2 !== 0 }"
          >
            <div class="absolute left-4 lg:left-1/2 transform -translate-x-1/2 timeline-dot"></div>
            <div
              class="ml-12 lg:ml-0 lg:w-1/2"
              :class="index % 2 === 0 ? 'lg:pr-12 lg:text-right' : 'lg:pl-12 lg:text-left'"
            >
              <div class="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 card-hover">
                <div class="flex items-center justify-between mb-4" :class="{ 'lg:flex-row-reverse': index % 2 === 0 }">
                  <span class="bg-primary-100 text-primary-700 px-4 py-2 rounded-full text-sm font-semibold">{{ exp.dateRange }}</span>
                </div>
                <h3 class="text-2xl font-bold text-gray-900 mb-2">{{ exp.title }}</h3>
                <h4 class="text-lg font-semibold text-primary-600 mb-4">{{ exp.subtitle }}</h4>
                <p class="text-gray-600 mb-6 leading-relaxed">{{ exp.description }}</p>
                <ul class="text-gray-600 space-y-3">
                  <li
                    v-for="(point, pIndex) in exp.bulletPoints"
                    :key="pIndex"
                    class="flex items-start"
                    :class="{ 'lg:flex-row-reverse': index % 2 === 0 }"
                  >
                    <svg
                      class="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0"
                      :class="index % 2 === 0 ? 'lg:ml-3' : 'lg:mr-3 mr-3'"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                    </svg>
                    <span>{{ point }}</span>
                  </li>
                </ul>
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

const experienceData = ref({
  sectionLabel: "My journey so far",
  mainHeading: 'Experience',
  description: "I'm currently a 4th-year college student with a strong foundation in both frontend and backend development. While I don't have formal industry experience yet, I have built a solid skill set through academic projects and personal learning.",
  experiences: [
    {
      dateRange: '2025 - Present',
      title: '4th Year College Student',
      subtitle: 'Capstone Project 2',
      description: 'Introduction of developing a web app with enrollment system, building the enrollment portal through web.',
      bulletPoints: [
        'Managed online enrollment for 20+ applicants through the LMSTC Web Application',
        'Implemented a design system that improved enrollment efficiency'
      ]
    },
    {
      dateRange: '2024 - 2025',
      title: '3rd Year College Student',
      subtitle: 'Frontend Development',
      description: 'Developed frontend logic while applying user interface (UI) design concepts and principles to create visually appealing, user-friendly, and responsive interfaces.',
      bulletPoints: [
        'Built responsive user interfaces using React.js',
        'Integrated frontend with Django backend through REST APIs',
        'Applied key UI/UX principles to improve user experience'
      ]
    },
    {
      dateRange: '2023 - 2024',
      title: '2nd Year College Student',
      subtitle: 'Basic Backend Logic and Tkinter',
      description: 'Gained foundational knowledge in backend development using Python and explored GUI design through Tkinter.',
      bulletPoints: [
        'Created functional desktop applications using Tkinter',
        'Applied basic Python logic for data processing',
        'Explored event-driven programming concepts'
      ]
    }
  ]
})

onMounted(async () => {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('experience_section')
        .select('*')
        .limit(1)
        .single()

      if (!error && data) {
        experienceData.value = {
          sectionLabel: data.section_label || experienceData.value.sectionLabel,
          mainHeading: data.main_heading || experienceData.value.mainHeading,
          description: data.description || experienceData.value.description,
          experiences: data.experiences || experienceData.value.experiences
        }
        return
      }
    } catch (e) {
      console.error('Error fetching experience from Supabase:', e)
    }
  }

  const savedData = localStorage.getItem('experienceSectionData')
  if (savedData) {
    try {
      const parsed = JSON.parse(savedData)
      experienceData.value = { ...experienceData.value, ...parsed }
    } catch (e) {
      console.error('Error loading experience data from localStorage:', e)
    }
  }
})
</script>