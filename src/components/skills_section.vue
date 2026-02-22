<template>
  <section id="Skills" class="py-24 bg-gray-50">
    <div class="max-w-7xl mx-auto px-6">
      <div class="text-center mb-16">
        <p class="text-primary-600 font-semibold text-lg mb-4">{{ skillsData.sectionLabel }}</p>
        <h2 class="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">{{ skillsData.mainHeading }}</h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          {{ skillsData.description }}
        </p>
        <div class="w-24 h-1 bg-primary-600 mx-auto rounded-full mt-6"></div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div class="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 card-hover">
          <div class="flex items-center mb-8">
            <div class="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mr-4">
              <svg class="w-7 h-7 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path>
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-gray-900">Design Skills</h3>
          </div>

          <div class="space-y-6">
            <div v-for="(skill, index) in skillsData.designSkills" :key="index">
              <div class="flex justify-between mb-3">
                <span class="font-medium text-gray-700">{{ skill.name }}</span>
                <span class="text-primary-600 font-semibold">{{ skill.percentage }}%</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-3">
                <div class="bg-gradient-to-r from-primary-500 to-primary-600 h-3 rounded-full skill-bar shadow-sm" :style="`width: ${skill.percentage}%`"></div>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 card-hover">
          <div class="flex items-center mb-8">
            <div class="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mr-4">
              <svg class="w-7 h-7 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-gray-900">Development Skills</h3>
          </div>

          <div class="space-y-6">
            <div v-for="(skill, index) in skillsData.developmentSkills" :key="index">
              <div class="flex justify-between mb-3">
                <span class="font-medium text-gray-700">{{ skill.name }}</span>
                <span class="text-primary-600 font-semibold">{{ skill.percentage }}%</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-3">
                <div class="bg-gradient-to-r from-primary-500 to-primary-600 h-3 rounded-full skill-bar shadow-sm" :style="`width: ${skill.percentage}%`"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 card-hover">
        <div class="flex items-center mb-8">
          <div class="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mr-4">
            <svg class="w-7 h-7 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-gray-900">Tools & Software</h3>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div v-for="(tool, index) in skillsData.tools" :key="index" class="bg-gray-50 p-6 rounded-xl text-center hover:bg-primary-50 transition-all duration-300 card-hover group">
            <div class="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-200 transition-colors duration-300">
              <svg class="w-6 h-6 text-primary-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
            </div>
            <span class="font-medium text-gray-700 group-hover:text-primary-700 transition-colors duration-300">{{ tool }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../supabase'

const skillsData = ref({
  sectionLabel: "What I bring to the table",
  mainHeading: 'My Skills',
  description: "I've worked with a variety of technologies across digital design and development. Here's a glimpse of what I bring to the table.",
  designSkills: [
    { name: 'UI/UX Design', percentage: 65 },
    { name: 'Visual Design', percentage: 70 },
    { name: 'Interaction Design', percentage: 70 },
    { name: 'Prototyping', percentage: 92 }
  ],
  developmentSkills: [
    { name: 'HTML/CSS', percentage: 70 },
    { name: 'JavaScript', percentage: 40 },
    { name: 'Django', percentage: 88 },
    { name: 'Node.js', percentage: 40 }
  ],
  tools: ['Figma', 'VS Code', 'GitHub', 'Django']
})

onMounted(async () => {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('skills_section')
        .select('*')
        .limit(1)
        .single()

      if (!error && data) {
        skillsData.value = {
          ...skillsData.value,
          designSkills: data.design_skills || skillsData.value.designSkills,
          developmentSkills: data.development_skills || skillsData.value.developmentSkills,
          tools: data.tools || skillsData.value.tools
        }
        return
      }
    } catch (e) {
      console.error('Error fetching skills from Supabase:', e)
    }
  }

  const savedData = localStorage.getItem('skillsSectionData')
  if (savedData) {
    try {
      const parsed = JSON.parse(savedData)
      skillsData.value = { ...skillsData.value, ...parsed }
    } catch (e) {
      console.error('Error loading skills data from localStorage:', e)
    }
  }
})
</script>
