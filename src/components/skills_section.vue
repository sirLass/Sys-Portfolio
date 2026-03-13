<template>
  <section id="Skills" class="py-24 bg-gray-50">
    <div class="max-w-7xl mx-auto px-6">
      <!-- Loading State -->
      <div v-if="isLoading">
        <div class="text-center mb-16">
          <div class="h-6 w-40 bg-gray-200 rounded animate-pulse mx-auto mb-4"></div>
          <div class="h-12 w-48 bg-gray-200 rounded animate-pulse mx-auto mb-6"></div>
          <div class="space-y-3 max-w-2xl mx-auto">
            <div class="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
            <div class="h-4 w-5/6 bg-gray-200 rounded animate-pulse mx-auto"></div>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div class="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
            <div class="flex items-center mb-8">
              <div class="w-14 h-14 bg-gray-200 rounded-xl animate-pulse mr-4"></div>
              <div class="h-8 w-32 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div class="space-y-4 h-[320px]">
              <div v-for="i in 4" :key="i" class="flex items-center justify-between p-3 rounded-xl">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
                  <div class="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div class="flex gap-1">
                  <div v-for="j in 5" :key="j" class="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
            <div class="flex items-center mb-8">
              <div class="w-14 h-14 bg-gray-200 rounded-xl animate-pulse mr-4"></div>
              <div class="h-8 w-40 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div class="space-y-4 h-[320px]">
              <div v-for="i in 4" :key="i" class="flex items-center justify-between p-3 rounded-xl">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
                  <div class="h-4 w-28 bg-gray-200 rounded animate-pulse"></div>
                </div>
                <div class="flex gap-1">
                  <div v-for="j in 5" :key="j" class="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
          <div class="flex items-center mb-8">
            <div class="w-14 h-14 bg-gray-200 rounded-xl animate-pulse mr-4"></div>
            <div>
              <div class="h-8 w-40 bg-gray-200 rounded animate-pulse mb-2"></div>
              <div class="h-4 w-48 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
          <div class="flex gap-6 overflow-hidden py-4">
            <div v-for="i in 4" :key="i" class="w-[200px] bg-gray-100 p-6 rounded-2xl">
              <div class="w-16 h-16 bg-gray-200 rounded-2xl mx-auto mb-4 animate-pulse"></div>
              <div class="h-4 w-20 bg-gray-200 rounded mx-auto animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="hasError || !skillsData" class="text-center py-16">
        <div class="text-gray-400 mb-4">
          <svg class="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h3 class="text-xl font-semibold text-gray-600 mb-2">Failed to load skills</h3>
        <p class="text-gray-400">Please check your database connection.</p>
      </div>

      <!-- Loaded Data -->
      <div v-else>
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

            <div class="relative h-[320px] overflow-hidden">
              <div class="space-y-4 animate-slide-up pause-on-hover">
                <!-- Original List -->
                <div v-for="(skill, index) in skillsData.designSkills" :key="`design-1-${index}`" class="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100 group">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center p-1.5 border border-gray-100 group-hover:border-primary-100 group-hover:bg-white transition-all shadow-sm">
                      <img :src="`https://skillicons.dev/icons?i=${getIconSlug(skill.name)}`" class="w-full h-full object-contain" :alt="skill.name">
                    </div>
                    <span class="font-medium text-gray-700 group-hover:text-primary-600 transition-colors uppercase text-sm tracking-wide">{{ skill.name }}</span>
                  </div>
                  <div class="flex items-center gap-1">
                    <svg v-for="i in 5" :key="i" class="w-4 h-4 transition-all duration-300" :class="i <= getStarCount(skill.level || percentageToLevel(skill.percentage)) ? 'text-yellow-400 fill-current' : 'text-gray-200'" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                </div>
                <!-- Duplicate for Loop -->
                <div v-for="(skill, index) in skillsData.designSkills" :key="`design-2-${index}`" class="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100 group">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center p-1.5 border border-gray-100 group-hover:border-primary-100 group-hover:bg-white transition-all shadow-sm">
                      <img :src="`https://skillicons.dev/icons?i=${getIconSlug(skill.name)}`" class="w-full h-full object-contain" :alt="skill.name">
                    </div>
                    <span class="font-medium text-gray-700 group-hover:text-primary-600 transition-colors uppercase text-sm tracking-wide">{{ skill.name }}</span>
                  </div>
                  <div class="flex items-center gap-1">
                    <svg v-for="i in 5" :key="i" class="w-4 h-4 transition-all duration-300" :class="i <= getStarCount(skill.level || percentageToLevel(skill.percentage)) ? 'text-yellow-400 fill-current' : 'text-gray-200'" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
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

            <div class="relative h-[320px] overflow-hidden">
              <div class="space-y-4 animate-slide-up pause-on-hover">
                <!-- Original List -->
                <div v-for="(skill, index) in skillsData.developmentSkills" :key="`dev-1-${index}`" class="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100 group">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center p-1.5 border border-gray-100 group-hover:border-primary-100 group-hover:bg-white transition-all shadow-sm">
                      <img :src="`https://skillicons.dev/icons?i=${getIconSlug(skill.name)}`" class="w-full h-full object-contain" :alt="skill.name">
                    </div>
                    <span class="font-medium text-gray-700 group-hover:text-primary-600 transition-colors uppercase text-sm tracking-wide">{{ skill.name }}</span>
                  </div>
                  <div class="flex items-center gap-1">
                    <svg v-for="i in 5" :key="i" class="w-4 h-4 transition-all duration-300" :class="i <= getStarCount(skill.level || percentageToLevel(skill.percentage)) ? 'text-yellow-400 fill-current' : 'text-gray-200'" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                </div>
                <!-- Duplicate for Loop -->
                <div v-for="(skill, index) in skillsData.developmentSkills" :key="`dev-2-${index}`" class="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100 group">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center p-1.5 border border-gray-100 group-hover:border-primary-100 group-hover:bg-white transition-all shadow-sm">
                      <img :src="`https://skillicons.dev/icons?i=${getIconSlug(skill.name)}`" class="w-full h-full object-contain" :alt="skill.name">
                    </div>
                    <span class="font-medium text-gray-700 group-hover:text-primary-600 transition-colors uppercase text-sm tracking-wide">{{ skill.name }}</span>
                  </div>
                  <div class="flex items-center gap-1">
                    <svg v-for="i in 5" :key="i" class="w-4 h-4 transition-all duration-300" :class="i <= getStarCount(skill.level || percentageToLevel(skill.percentage)) ? 'text-yellow-400 fill-current' : 'text-gray-200'" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 card-hover overflow-hidden relative">
          <div class="flex items-center mb-8">
            <div class="w-14 h-14 bg-primary-100 rounded-xl flex items-center justify-center mr-4">
              <svg class="w-7 h-7 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
            </div>
            <div>
              <h3 class="text-2xl font-bold text-gray-900">Tools & Software</h3>
              <p class="text-sm text-gray-500 font-medium">Industry standard applications</p>
            </div>
          </div>

          <div class="relative overflow-hidden w-full py-4 horizontal-mask">
            <div class="flex items-center gap-6 animate-slide-left pause-on-hover w-max">
              <!-- Original List -->
              <div v-for="(tool, index) in skillsData.tools" :key="`tool-1-${index}`" class="w-[200px] bg-gray-50 p-6 rounded-2xl text-center hover:bg-white hover:shadow-xl border border-transparent hover:border-primary-100 transition-all duration-500 group">
                <div class="w-16 h-16 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 p-3">
                  <img :src="`https://skillicons.dev/icons?i=${getIconSlug(tool)}`" class="w-full h-full object-contain" :alt="tool">
                </div>
                <span class="font-bold text-sm text-gray-700 group-hover:text-primary-600 transition-colors duration-300 uppercase tracking-widest block">{{ tool }}</span>
              </div>
              <!-- Duplicate for Loop -->
              <div v-for="(tool, index) in skillsData.tools" :key="`tool-2-${index}`" class="w-[200px] bg-gray-50 p-6 rounded-2xl text-center hover:bg-white hover:shadow-xl border border-transparent hover:border-primary-100 transition-all duration-500 group">
                <div class="w-16 h-16 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 p-3">
                  <img :src="`https://skillicons.dev/icons?i=${getIconSlug(tool)}`" class="w-full h-full object-contain" :alt="tool">
                </div>
                <span class="font-bold text-sm text-gray-700 group-hover:text-primary-600 transition-colors duration-300 uppercase tracking-widest block">{{ tool }}</span>
              </div>
              <!-- Triplicate to ensure full width cover for slow/wide screens -->
              <div v-for="(tool, index) in skillsData.tools" :key="`tool-3-${index}`" class="w-[200px] bg-gray-50 p-6 rounded-2xl text-center hover:bg-white hover:shadow-xl border border-transparent hover:border-primary-100 transition-all duration-500 group">
                <div class="w-16 h-16 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 p-3">
                  <img :src="`https://skillicons.dev/icons?i=${getIconSlug(tool)}`" class="w-full h-full object-contain" :alt="tool">
                </div>
                <span class="font-bold text-sm text-gray-700 group-hover:text-primary-600 transition-colors duration-300 uppercase tracking-widest block">{{ tool }}</span>
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

const skillsData = ref(null)
const isLoading = ref(true)
const hasError = ref(false)

const getStarCount = (level) => {
  if (level === 'None') return 0
  const starMap = {
    'Beginner': 1,
    'Intermediate': 2,
    'Advanced': 3,
    'Expert': 4,
    'Professional': 5
  }
  return starMap[level] || 1
}

const percentageToLevel = (pct) => {
  const n = Number(pct || 0)
  if (n >= 90) return 'Professional'
  if (n >= 70) return 'Expert'
  if (n >= 50) return 'Advanced'
  if (n >= 30) return 'Intermediate'
  return 'Beginner'
}

const getIconSlug = (name) => {
  if (!name) return 'js'
  const slugMap = {
    'UI/UX Design': 'figma',
    'Visual Design': 'ps',
    'Interaction Design': 'framer',
    'Prototyping': 'xd',
    'User Research': 'notion',
    'Wireframing': 'sketch',
    'HTML/CSS': 'html',
    'JavaScript': 'js',
    'Django': 'django',
    'Node.js': 'nodejs',
    'Vue.js': 'vue',
    'React': 'react',
    'Python': 'python',
    'TypeScript': 'ts',
    'Next.js': 'nextjs',
    'Tailwind CSS': 'tailwind',
    'VS Code': 'vscode',
    'GitHub': 'github',
    'Figma': 'figma',
    'Adobe XD': 'xd',
    'Adobe Photoshop': 'ps',
    'Adobe Illustrator': 'ai',
    'Docker': 'docker',
    'Firebase': 'firebase',
    'Postman': 'postman',
    'MongoDB': 'mongodb',
    'PostgreSQL': 'postgres'
  }
  
  // Try exact match first
  if (slugMap[name]) return slugMap[name]
  
  // Try lowercase match or partial match
  const lower = name.toLowerCase()
  if (lower.includes('vue')) return 'vue'
  if (lower.includes('react')) return 'react'
  if (lower.includes('python')) return 'python'
  if (lower.includes('node')) return 'nodejs'
  if (lower.includes('css') || lower.includes('html')) return 'html'
  if (lower.includes('js')) return 'js'
  if (lower.includes('git')) return 'git'
  if (lower.includes('figma')) return 'figma'
  
  return 'js' // default fallback
}

onMounted(async () => {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('skills')
        .select('*')
        .limit(1)
        .maybeSingle()

      if (!error && data) {
        skillsData.value = {
          sectionLabel: data.section_label || 'What I bring to the table',
          mainHeading: data.main_heading || 'My Skills',
          description: data.description || '',
          designSkills: data.design_skills || [],
          developmentSkills: data.development_skills || [],
          tools: data.tools || []
        }
        isLoading.value = false
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
      skillsData.value = {
        sectionLabel: parsed.sectionLabel || 'What I bring to the table',
        mainHeading: parsed.mainHeading || 'My Skills',
        description: parsed.description || '',
        designSkills: parsed.designSkills || [],
        developmentSkills: parsed.developmentSkills || [],
        tools: parsed.tools || []
      }
    } catch (e) {
      console.error('Error loading skills data from localStorage:', e)
      // Use fallback data on error
      skillsData.value = {
        sectionLabel: 'What I bring to the table',
        mainHeading: 'My Skills',
        description: 'A blend of creative design and technical development expertise.',
        designSkills: [
          { name: 'UI/UX Design', level: 'Advanced' },
          { name: 'Visual Design', level: 'Intermediate' },
          { name: 'Prototyping', level: 'Advanced' },
          { name: 'Wireframing', level: 'Expert' }
        ],
        developmentSkills: [
          { name: 'HTML/CSS', level: 'Professional' },
          { name: 'JavaScript', level: 'Advanced' },
          { name: 'Vue.js', level: 'Advanced' },
          { name: 'Node.js', level: 'Intermediate' }
        ],
        tools: ['VS Code', 'GitHub', 'Figma', 'Adobe XD']
      }
    }
  } else {
    // Fallback data when no database or localStorage data exists
    skillsData.value = {
      sectionLabel: 'What I bring to the table',
      mainHeading: 'My Skills',
      description: 'A blend of creative design and technical development expertise.',
      designSkills: [
        { name: 'UI/UX Design', level: 'Advanced' },
        { name: 'Visual Design', level: 'Intermediate' },
        { name: 'Prototyping', level: 'Advanced' },
        { name: 'Wireframing', level: 'Expert' }
      ],
      developmentSkills: [
        { name: 'HTML/CSS', level: 'Professional' },
        { name: 'JavaScript', level: 'Advanced' },
        { name: 'Vue.js', level: 'Advanced' },
        { name: 'Node.js', level: 'Intermediate' }
      ],
      tools: ['VS Code', 'GitHub', 'Figma', 'Adobe XD']
    }
  }
  isLoading.value = false
})
</script>

<style scoped>
@keyframes slide-up {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-50%);
  }
}

.animate-slide-up {
  animation: slide-up 20s linear infinite;
}

@keyframes slide-left {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(calc(-100% / 3));
  }
}

.animate-slide-left {
  animation: slide-left 40s linear infinite;
}

.pause-on-hover:hover {
  animation-play-state: paused;
}

/* Mask for smooth fade at sides */
.horizontal-mask {
  mask-image: linear-gradient(
    to right,
    transparent 0%,
    black 10%,
    black 90%,
    transparent 100%
  );
  -webkit-mask-image: linear-gradient(
    to right,
    transparent 0%,
    black 10%,
    black 90%,
    transparent 100%
  );
}

/* Mask for smooth fade at top and bottom (Vertical) */
.relative.overflow-hidden::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  background: linear-gradient(
    to bottom,
    white 0%,
    transparent 10%,
    transparent 90%,
    white 100%
  );
}

#Skills .bg-gray-50 {
  background-color: #f9fafb;
}

.bg-white .relative.overflow-hidden::after {
  background: linear-gradient(
    to bottom,
    white 0%,
    transparent 15%,
    transparent 85%,
    white 100%
  );
}
/* Hide scrollbar for Chrome, Safari and Opera */
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.scrollbar-hide {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
