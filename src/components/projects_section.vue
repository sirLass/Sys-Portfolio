<template>
    <section id="Projects" class="py-24 bg-white">
        <div class="max-w-7xl mx-auto px-6">
            <!-- Section Header -->
            <div class="text-center mb-16">
                <p class="text-primary-600 font-semibold text-lg mb-4">{{ projectsData.sectionLabel }}</p>
                <h2 class="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">{{ projectsData.mainHeading }}</h2>
                <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                    {{ projectsData.description }}
                </p>
                <div class="w-24 h-1 bg-primary-600 mx-auto rounded-full mt-6"></div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div
                    v-for="(project, index) in projectsData.projects"
                    :key="index"
                    class="group bg-white rounded-2xl shadow-lg overflow-hidden card-hover border border-gray-100"
                >
                    <div
                        class="relative h-64 overflow-hidden"
                        :style="getGradientStyle(project.gradientFrom, project.gradientTo)"
                    >
                        <div class="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300"></div>
                        <div class="absolute inset-0 flex items-center justify-center">
                            <svg class="w-24 h-24 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                            </svg>
                        </div>
                        <div class="absolute top-4 right-4">
                            <span class="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">{{ project.category }}</span>
                        </div>
                    </div>
                    <div class="p-6">
                        <h3 class="text-xl font-bold text-gray-900 mb-3">{{ project.title }}</h3>
                        <p class="text-gray-600 mb-4 leading-relaxed">{{ project.description }}</p>
                        <div class="flex flex-wrap gap-2 mb-6">
                            <span
                                v-for="(tech, techIndex) in project.technologies"
                                :key="techIndex"
                                class="bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-sm font-medium"
                            >
                                {{ tech }}
                            </span>
                        </div>
                        <a
                            v-if="project.link"
                            :href="project.link"
                            class="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium group"
                        >
                            View Project
                            <svg class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                            </svg>
                        </a>
                        <span v-else class="inline-flex items-center text-gray-400 font-medium">
                            In Development
                            <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../supabase'

const projectsData = ref({
  sectionLabel: "My recent work",
  mainHeading: 'Featured Projects',
  description: "Here are some of the projects I've worked on, each designed with performance and user experience in mind.",
  projects: [
    {
      title: 'Enrollment System',
      description: 'A comprehensive web application for managing student enrollment with automated data processing and job recommendation features.',
      category: 'Web App',
      link: '#',
      technologies: ['Django', 'PostgreSQL', 'Tailwindcss'],
      gradientFrom: 'primary-400',
      gradientTo: 'primary-600'
    },
    {
      title: 'Booking System',
      description: 'An intuitive booking management system with real-time availability tracking and automated confirmation processes.',
      category: 'Web System',
      link: '#',
      technologies: ['Django', 'Tailwindcss', 'PostgreSQL'],
      gradientFrom: 'green-400',
      gradientTo: 'blue-500'
    },
    {
      title: 'Web E-commerce',
      description: 'A modern dashboard for managing portfolio content with analytics and performance tracking capabilities.',
      category: 'Coming Soon',
      link: '',
      technologies: ['React.js', 'MongoDB', 'Tailwind'],
      gradientFrom: 'purple-400',
      gradientTo: 'pink-500'
    }
  ]
})

// Color mapping for Tailwind colors
const colorMap = {
  'primary-400': '#60a5fa',
  'primary-600': '#2563eb',
  'green-400': '#4ade80',
  'blue-500': '#3b82f6',
  'purple-400': '#a78bfa',
  'pink-500': '#ec4899'
}

const getGradientStyle = (from, to) => {
  const fromColor = colorMap[from] || '#60a5fa'
  const toColor = colorMap[to] || '#2563eb'
  return {
    background: `linear-gradient(to bottom right, ${fromColor}, ${toColor})`
  }
}

onMounted(async () => {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('projects_section')
        .select('*')
        .limit(1)
        .single()

      if (!error && data) {
        projectsData.value = {
          sectionLabel: data.section_label || projectsData.value.sectionLabel,
          mainHeading: data.main_heading || projectsData.value.mainHeading,
          description: data.description || projectsData.value.description,
          projects: data.projects || projectsData.value.projects
        }
        return
      }
    } catch (e) {
      console.error('Error fetching projects from Supabase:', e)
    }
  }

  const savedData = localStorage.getItem('projectsSectionData')
  if (savedData) {
    try {
      const parsed = JSON.parse(savedData)
      projectsData.value = { ...projectsData.value, ...parsed }
    } catch (e) {
      console.error('Error loading projects data from localStorage:', e)
    }
  }
})
</script>
