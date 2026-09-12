<template>
  <section id="Skills" class="py-24 bg-gray-50 dark:bg-[#0f1117] transition-colors duration-300">
    <div class="max-w-7xl mx-auto px-6">
      <!-- Loading State -->
      <div v-if="isLoading">
        <div class="text-center mb-16">
          <div class="h-6 w-40 bg-gray-200 dark:bg-white/10 rounded animate-pulse mx-auto mb-4"></div>
          <div class="h-12 w-48 bg-gray-200 dark:bg-white/10 rounded animate-pulse mx-auto mb-6"></div>
          <div class="space-y-3 max-w-2xl mx-auto">
            <div class="h-4 w-full bg-gray-200 dark:bg-white/10 rounded animate-pulse"></div>
            <div class="h-4 w-5/6 bg-gray-200 dark:bg-white/10 rounded animate-pulse mx-auto"></div>
          </div>
        </div>

        <!-- Skeleton Orbital Chamber Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <div
            v-for="idx in 3"
            :key="`skel-${idx}`"
            class="bg-white/80 dark:bg-[#12141c]/80 p-7 rounded-3xl shadow-lg border border-gray-100 dark:border-white/10 flex flex-col justify-between h-[490px]"
          >
            <!-- Skeleton Header -->
            <div class="flex items-center justify-between mb-6">
              <div class="flex items-center">
                <div class="w-12 h-12 bg-gray-200 dark:bg-white/10 rounded-xl animate-pulse mr-3.5"></div>
                <div>
                  <div class="h-6 w-32 bg-gray-200 dark:bg-white/10 rounded animate-pulse mb-1.5"></div>
                  <div class="h-3.5 w-24 bg-gray-100 dark:bg-white/5 rounded animate-pulse"></div>
                </div>
              </div>
              <div class="h-5 w-16 bg-gray-100 dark:bg-white/5 rounded-full animate-pulse"></div>
            </div>

            <!-- Skeleton Orbital Ring Arc -->
            <div class="relative h-[310px] flex items-center justify-center">
              <!-- Orbit Guide Track Skeleton -->
              <div class="w-56 h-28 rounded-[50%] border border-dashed border-gray-200 dark:border-white/10 animate-pulse"></div>
              <!-- Arc nodes -->
              <div class="absolute inset-0 flex items-center justify-center">
                <div class="w-16 h-16 bg-gray-200 dark:bg-white/10 rounded-2xl animate-pulse shadow-sm"></div>
                <div class="w-12 h-12 bg-gray-200/70 dark:bg-white/5 rounded-2xl animate-pulse absolute -translate-x-20 -translate-y-4"></div>
                <div class="w-12 h-12 bg-gray-200/70 dark:bg-white/5 rounded-2xl animate-pulse absolute translate-x-20 -translate-y-4"></div>
                <div class="w-10 h-10 bg-gray-200/40 dark:bg-white/5 rounded-xl animate-pulse absolute -translate-y-12"></div>
              </div>
            </div>

            <!-- Skeleton Footer -->
            <div class="pt-3 border-t border-gray-100 dark:border-white/5 flex items-center justify-between">
              <div class="h-3 w-20 bg-gray-100 dark:bg-white/5 rounded animate-pulse"></div>
              <div class="h-3 w-28 bg-gray-100 dark:bg-white/5 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="hasError || !skillsData" class="text-center py-16">
        <div class="text-gray-400 dark:text-gray-500 mb-4">
          <svg class="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-200 mb-2">Failed to load skills</h3>
        <p class="text-gray-400 dark:text-gray-500">Please check your database connection.</p>
      </div>

      <!-- Loaded Data -->
      <div v-else>
        <!-- Section Header -->
        <div class="text-center mb-16">
          <p class="text-primary-600 dark:text-primary-400 font-semibold text-lg mb-3 tracking-wide">{{ skillsData.sectionLabel }}</p>
          <h2 class="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-5 tracking-tight">{{ skillsData.mainHeading }}</h2>
          <p class="text-lg lg:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            {{ skillsData.description }}
          </p>
          <div class="w-24 h-1 bg-primary-600 dark:bg-primary-500 mx-auto rounded-full mt-6"></div>
        </div>

        <!-- 3D Orbital Chamber Grid -->
        <div
          class="grid gap-8 mb-12"
          :class="[
            visibleCount === 1
              ? 'grid-cols-1 max-w-md mx-auto'
              : visibleCount === 2
              ? 'grid-cols-1 lg:grid-cols-2 max-w-4xl mx-auto'
              : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
          ]"
        >
          <!-- 1. Design Skills Orbital Chamber -->
          <div
            v-if="!isHidden('skills', 'designSkills')"
            class="orbital-chamber group"
          >
            <!-- Card Header -->
            <div class="flex items-center justify-between mb-4 z-10 relative">
              <div class="flex items-center">
                <div class="w-12 h-12 bg-primary-50 dark:bg-primary-950/50 rounded-2xl flex items-center justify-center mr-3.5 border border-primary-100 dark:border-primary-800/30 text-primary-600 dark:text-primary-400 shadow-sm">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="text-xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">Design Skills</h3>
                  <p class="text-xs text-gray-500 dark:text-gray-400 font-medium">UI/UX & Visual Architecture</p>
                </div>
              </div>
              <span class="text-[11px] px-2.5 py-1 rounded-full bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 font-semibold font-mono border border-primary-100/60 dark:border-primary-800/40">
                {{ skillsData.designSkills.length }} Nodes
              </span>
            </div>

            <!-- Orbital 3D Viewport -->
            <div
              class="orbital-viewport pause-on-hover"
              :style="{
                '--duration': `${designConfig.duration}s`
              }"
            >
              <!-- Orbital Mechanical Guide Track (Behind) -->
              <div class="orbital-track-canvas" aria-hidden="true">
                <!-- Elliptical Guide Path -->
                <svg class="orbital-svg-track" viewBox="0 0 300 150">
                  <ellipse
                    cx="150"
                    cy="75"
                    :rx="designConfig.radius"
                    :ry="designConfig.radius * 0.44"
                    class="orbital-ellipse-guide"
                  />
                  <!-- Cardinal Orbit Guide Ticks -->
                  <circle :cx="150 - designConfig.radius" cy="75" r="2.5" class="orbital-tick" />
                  <circle :cx="150 + designConfig.radius" cy="75" r="2.5" class="orbital-tick" />
                  <circle cx="150" :cy="75 - designConfig.radius * 0.44" r="2" class="orbital-tick-sub" />
                  <circle cx="150" :cy="75 + designConfig.radius * 0.44" r="2" class="orbital-tick-sub" />
                </svg>

                <!-- Core Ambient Glow & Beacon -->
                <div class="orbital-core-glow"></div>
                <div class="orbital-core-beacon">
                  <span class="orbital-beacon-pulse"></span>
                  <span class="orbital-beacon-dot"></span>
                </div>
              </div>

              <!-- 3D Scene -->
              <div class="orbital-scene">
                <div class="orbital-ring">
                  <div
                    v-for="(skill, index) in skillsData.designSkills"
                    :key="`design-orbit-${index}`"
                    class="orbital-slot"
                    :style="{
                      '--item-angle': `${(360 / designConfig.count) * index}deg`,
                      '--item-radius': `${designConfig.radius}px`,
                      '--static-angle': `${getStaticAngle(index, designConfig.count)}deg`,
                      '--card-size': `${designConfig.cardSize}px`
                    }"
                  >
                    <div
                      class="orbital-counter-node"
                      :style="{
                        '--item-delay': `${-(designConfig.duration * (index / designConfig.count))}s`
                      }"
                    >
                      <button
                        type="button"
                        class="orbital-card"
                        :aria-label="getItemName(skill)"
                        :title="getItemName(skill)"
                      >
                        <div
                          class="orbital-icon-wrapper"
                          :style="{
                            width: `${designConfig.iconSize}px`,
                            height: `${designConfig.iconSize}px`
                          }"
                        >
                          <img
                            :src="getSkillIcon(getItemName(skill))"
                            :alt="getItemName(skill)"
                            class="w-full h-full object-contain pointer-events-none"
                            loading="lazy"
                          />
                        </div>
                        <span class="orbital-tooltip">{{ getItemName(skill) }}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Card Footer Controls/Telemetry -->
            <div class="pt-3 border-t border-gray-100 dark:border-white/5 flex items-center justify-between text-[11px] text-gray-400 dark:text-gray-500 font-mono">
              <span class="flex items-center gap-1.5">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                ORBIT // {{ designConfig.duration }}s
              </span>
              <span class="flex items-center gap-1 hover:text-primary-500 transition-colors">
                <i class="bi bi-pause-circle text-[10px]"></i> Hover to inspect
              </span>
            </div>
          </div>

          <!-- 2. Development Skills Orbital Chamber -->
          <div
            v-if="!isHidden('skills', 'developmentSkills')"
            class="orbital-chamber group"
          >
            <!-- Card Header -->
            <div class="flex items-center justify-between mb-4 z-10 relative">
              <div class="flex items-center">
                <div class="w-12 h-12 bg-primary-50 dark:bg-primary-950/50 rounded-2xl flex items-center justify-center mr-3.5 border border-primary-100 dark:border-primary-800/30 text-primary-600 dark:text-primary-400 shadow-sm">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="text-xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">Development Skills</h3>
                  <p class="text-xs text-gray-500 dark:text-gray-400 font-medium">Core Stack & Engineering</p>
                </div>
              </div>
              <span class="text-[11px] px-2.5 py-1 rounded-full bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 font-semibold font-mono border border-primary-100/60 dark:border-primary-800/40">
                {{ skillsData.developmentSkills.length }} Nodes
              </span>
            </div>

            <!-- Orbital 3D Viewport -->
            <div
              class="orbital-viewport pause-on-hover"
              :style="{
                '--duration': `${devConfig.duration}s`
              }"
            >
              <!-- Orbital Mechanical Guide Track (Behind) -->
              <div class="orbital-track-canvas" aria-hidden="true">
                <!-- Elliptical Guide Path -->
                <svg class="orbital-svg-track" viewBox="0 0 300 150">
                  <ellipse
                    cx="150"
                    cy="75"
                    :rx="devConfig.radius"
                    :ry="devConfig.radius * 0.44"
                    class="orbital-ellipse-guide"
                  />
                  <!-- Cardinal Orbit Guide Ticks -->
                  <circle :cx="150 - devConfig.radius" cy="75" r="2.5" class="orbital-tick" />
                  <circle :cx="150 + devConfig.radius" cy="75" r="2.5" class="orbital-tick" />
                  <circle cx="150" :cy="75 - devConfig.radius * 0.44" r="2" class="orbital-tick-sub" />
                  <circle cx="150" :cy="75 + devConfig.radius * 0.44" r="2" class="orbital-tick-sub" />
                </svg>

                <!-- Core Ambient Glow & Beacon -->
                <div class="orbital-core-glow"></div>
                <div class="orbital-core-beacon">
                  <span class="orbital-beacon-pulse"></span>
                  <span class="orbital-beacon-dot"></span>
                </div>
              </div>

              <!-- 3D Scene -->
              <div class="orbital-scene">
                <div class="orbital-ring">
                  <div
                    v-for="(skill, index) in skillsData.developmentSkills"
                    :key="`dev-orbit-${index}`"
                    class="orbital-slot"
                    :style="{
                      '--item-angle': `${(360 / devConfig.count) * index}deg`,
                      '--item-radius': `${devConfig.radius}px`,
                      '--static-angle': `${getStaticAngle(index, devConfig.count)}deg`,
                      '--card-size': `${devConfig.cardSize}px`
                    }"
                  >
                    <div
                      class="orbital-counter-node"
                      :style="{
                        '--item-delay': `${-(devConfig.duration * (index / devConfig.count))}s`
                      }"
                    >
                      <button
                        type="button"
                        class="orbital-card"
                        :aria-label="getItemName(skill)"
                        :title="getItemName(skill)"
                      >
                        <div
                          class="orbital-icon-wrapper"
                          :style="{
                            width: `${devConfig.iconSize}px`,
                            height: `${devConfig.iconSize}px`
                          }"
                        >
                          <img
                            :src="getSkillIcon(getItemName(skill))"
                            :alt="getItemName(skill)"
                            class="w-full h-full object-contain pointer-events-none"
                            loading="lazy"
                          />
                        </div>
                        <span class="orbital-tooltip">{{ getItemName(skill) }}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Card Footer Controls/Telemetry -->
            <div class="pt-3 border-t border-gray-100 dark:border-white/5 flex items-center justify-between text-[11px] text-gray-400 dark:text-gray-500 font-mono">
              <span class="flex items-center gap-1.5">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                ORBIT // {{ devConfig.duration }}s
              </span>
              <span class="flex items-center gap-1 hover:text-primary-500 transition-colors">
                <i class="bi bi-pause-circle text-[10px]"></i> Hover to inspect
              </span>
            </div>
          </div>

          <!-- 3. Tools & Software Orbital Chamber -->
          <div
            v-if="!isHidden('skills', 'tools')"
            class="orbital-chamber group"
          >
            <!-- Card Header -->
            <div class="flex items-center justify-between mb-4 z-10 relative">
              <div class="flex items-center">
                <div class="w-12 h-12 bg-primary-50 dark:bg-primary-950/50 rounded-2xl flex items-center justify-center mr-3.5 border border-primary-100 dark:border-primary-800/30 text-primary-600 dark:text-primary-400 shadow-sm">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="text-xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">Tools & Software</h3>
                  <p class="text-xs text-gray-500 dark:text-gray-400 font-medium">Industry Standard Utilities</p>
                </div>
              </div>
              <span class="text-[11px] px-2.5 py-1 rounded-full bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 font-semibold font-mono border border-primary-100/60 dark:border-primary-800/40">
                {{ skillsData.tools.length }} Nodes
              </span>
            </div>

            <!-- Orbital 3D Viewport -->
            <div
              class="orbital-viewport pause-on-hover"
              :style="{
                '--duration': `${toolsConfig.duration}s`
              }"
            >
              <!-- Orbital Mechanical Guide Track (Behind) -->
              <div class="orbital-track-canvas" aria-hidden="true">
                <!-- Elliptical Guide Path -->
                <svg class="orbital-svg-track" viewBox="0 0 300 150">
                  <ellipse
                    cx="150"
                    cy="75"
                    :rx="toolsConfig.radius"
                    :ry="toolsConfig.radius * 0.44"
                    class="orbital-ellipse-guide"
                  />
                  <!-- Cardinal Orbit Guide Ticks -->
                  <circle :cx="150 - toolsConfig.radius" cy="75" r="2.5" class="orbital-tick" />
                  <circle :cx="150 + toolsConfig.radius" cy="75" r="2.5" class="orbital-tick" />
                  <circle cx="150" :cy="75 - toolsConfig.radius * 0.44" r="2" class="orbital-tick-sub" />
                  <circle cx="150" :cy="75 + toolsConfig.radius * 0.44" r="2" class="orbital-tick-sub" />
                </svg>

                <!-- Core Ambient Glow & Beacon -->
                <div class="orbital-core-glow"></div>
                <div class="orbital-core-beacon">
                  <span class="orbital-beacon-pulse"></span>
                  <span class="orbital-beacon-dot"></span>
                </div>
              </div>

              <!-- 3D Scene -->
              <div class="orbital-scene">
                <div class="orbital-ring">
                  <div
                    v-for="(tool, index) in skillsData.tools"
                    :key="`tool-orbit-${index}`"
                    class="orbital-slot"
                    :style="{
                      '--item-angle': `${(360 / toolsConfig.count) * index}deg`,
                      '--item-radius': `${toolsConfig.radius}px`,
                      '--static-angle': `${getStaticAngle(index, toolsConfig.count)}deg`,
                      '--card-size': `${toolsConfig.cardSize}px`
                    }"
                  >
                    <div
                      class="orbital-counter-node"
                      :style="{
                        '--item-delay': `${-(toolsConfig.duration * (index / toolsConfig.count))}s`
                      }"
                    >
                      <button
                        type="button"
                        class="orbital-card"
                        :aria-label="getItemName(tool)"
                        :title="getItemName(tool)"
                      >
                        <div
                          class="orbital-icon-wrapper"
                          :style="{
                            width: `${toolsConfig.iconSize}px`,
                            height: `${toolsConfig.iconSize}px`
                          }"
                        >
                          <img
                            :src="getSkillIcon(getItemName(tool))"
                            :alt="getItemName(tool)"
                            class="w-full h-full object-contain pointer-events-none"
                            loading="lazy"
                          />
                        </div>
                        <span class="orbital-tooltip">{{ getItemName(tool) }}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Card Footer Controls/Telemetry -->
            <div class="pt-3 border-t border-gray-100 dark:border-white/5 flex items-center justify-between text-[11px] text-gray-400 dark:text-gray-500 font-mono">
              <span class="flex items-center gap-1.5">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                ORBIT // {{ toolsConfig.duration }}s
              </span>
              <span class="flex items-center gap-1 hover:text-primary-500 transition-colors">
                <i class="bi bi-pause-circle text-[10px]"></i> Hover to inspect
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { supabase } from '../supabase'
import { useVisibility } from '../composables/useVisibility'

const { isHidden } = useVisibility()

const skillsData = ref(null)
const isLoading = ref(true)
const hasError = ref(false)

// Item extractors supporting both objects { name, level } and strings
const getItemName = (item) => {
  if (!item) return ''
  return typeof item === 'string' ? item : (item.name || '')
}

const getItemLevel = (item) => {
  if (!item || typeof item === 'string') return ''
  return item.level || ''
}

// Compute dynamic orbital parameters based on item count
const computeOrbitConfig = (items, baseDuration = 22) => {
  const count = (items && items.length) ? items.length : 4
  // Radius adapts smoothly from ~112px (for 3 items) up to ~155px (for 8-10+ items)
  const radius = Math.min(112 + Math.max(0, count - 3) * 6.5, 155)
  // Card and icon sizing adapts so dense orbits have room to breathe
  const cardSize = count <= 4 ? 66 : count <= 6 ? 60 : count <= 8 ? 54 : 48
  const iconSize = count <= 4 ? 38 : count <= 6 ? 34 : count <= 8 ? 30 : 26

  return {
    count,
    radius,
    cardSize,
    iconSize,
    duration: baseDuration
  }
}

// Computed configs for each orbital ring
const designConfig = computed(() => {
  return computeOrbitConfig(skillsData.value?.designSkills, 22)
})

const devConfig = computed(() => {
  return computeOrbitConfig(skillsData.value?.developmentSkills, 26)
})

const toolsConfig = computed(() => {
  return computeOrbitConfig(skillsData.value?.tools, 20)
})

// Number of visible categories for responsive layout centering
const visibleCount = computed(() => {
  let count = 0
  if (!isHidden('skills', 'designSkills')) count++
  if (!isHidden('skills', 'developmentSkills')) count++
  if (!isHidden('skills', 'tools')) count++
  return count
})

// Static angle for reduced-motion arc layout (spread across front -55deg to +55deg)
const getStaticAngle = (index, total) => {
  if (total <= 1) return 0
  return -55 + (110 / (total - 1)) * index
}

const getIconSlug = (name) => {
  if (!name) return 'js'
  const slugMap = {
    'UI/UX Design': 'figma',
    'Visual Design': 'ps',
    'Interaction Design': 'framer',
    'Framer': 'framer',
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
    'Tailwind CSS': 'tailwindcss',
    'Tailwind': 'tailwindcss',
    'Laravel': 'laravel',
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
    'PostgreSQL': 'postgresql',
    'MySQL': 'mysql',
    'Git': 'git',
    'GitLab': 'gitlab',
    'Bitbucket': 'bitbucket',
    'AWS': 'aws',
    'Vercel': 'vercel',
    'Netlify': 'netlify',
    'Supabase': 'supabase',
    'Redis': 'redis',
    'Prisma': 'prisma',
    'GraphQL': 'graphql',
    'REST API': 'postman',
    'Jest': 'jest',
    'Vite': 'vite',
    'Webpack': 'webpack',
    'NPM': 'npm',
    'Yarn': 'yarn',
    'Sass': 'sass',
    'Less': 'less',
    'Bootstrap': 'bootstrap',
    'jQuery': 'jquery',
    'PHP': 'php',
    'Java': 'java',
    'C++': 'cpp',
    'C#': 'cs',
    'Go': 'go',
    'Rust': 'rust',
    'Swift': 'swift',
    'Kotlin': 'kotlin',
    'Flutter': 'flutter',
    'React Native': 'react',
    'Electron': 'electron',
    'Tauri': 'tauri',
    'Nuxt.js': 'nuxtjs',
    'Svelte': 'svelte',
    'Angular': 'angular'
  }

  if (slugMap[name]) return slugMap[name]

  const lower = name.toLowerCase()
  if (lower.includes('vue')) return 'vue'
  if (lower.includes('react')) return 'react'
  if (lower.includes('python')) return 'python'
  if (lower.includes('node')) return 'nodejs'
  if (lower.includes('css') || lower.includes('html')) return 'html'
  if (lower.includes('js') || lower.includes('javascript')) return 'js'
  if (lower.includes('git')) return 'git'
  if (lower.includes('figma')) return 'figma'
  if (lower.includes('framer')) return 'framer'
  if (lower.includes('laravel')) return 'laravel'
  if (lower.includes('tailwind')) return 'tailwindcss'
  if (lower.includes('mongodb')) return 'mongodb'
  if (lower.includes('postgres')) return 'postgresql'
  if (lower.includes('mysql')) return 'mysql'
  if (lower.includes('docker')) return 'docker'
  if (lower.includes('firebase')) return 'firebase'
  if (lower.includes('aws')) return 'aws'
  if (lower.includes('vercel')) return 'vercel'
  if (lower.includes('netlify')) return 'netlify'
  if (lower.includes('supabase')) return 'supabase'
  if (lower.includes('php')) return 'php'
  if (lower.includes('java ')) return 'java'
  if (lower.includes('typescript') || lower.includes('ts')) return 'ts'
  if (lower.includes('next')) return 'nextjs'
  if (lower.includes('nuxt')) return 'nuxtjs'
  if (lower.includes('svelte')) return 'svelte'
  if (lower.includes('angular')) return 'angular'
  if (lower.includes('django')) return 'django'
  if (lower.includes('flask')) return 'flask'
  if (lower.includes('bootstrap')) return 'bootstrap'
  if (lower.includes('sass') || lower.includes('scss')) return 'sass'
  if (lower.includes('graphql')) return 'graphql'
  if (lower.includes('prisma')) return 'prisma'
  if (lower.includes('redis')) return 'redis'
  if (lower.includes('vite')) return 'vite'
  if (lower.includes('webpack')) return 'webpack'

  return 'js'
}

const getSkillIcon = (name) => {
  const lower = (name || '').toLowerCase()
  if (lower.includes('framer')) {
    return 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/framer.svg'
  }
  return `https://skillicons.dev/icons?i=${getIconSlug(name)}`
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
/* ==========================================================================
   ORBITAL CHAMBER CONTAINER STYLES
   ========================================================================== */
.orbital-chamber {
  position: relative;
  background: rgba(255, 255, 255, 0.85);
  padding: 1.75rem;
  border-radius: 1.75rem;
  box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(229, 231, 235, 0.8);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

:global(html.dark) .orbital-chamber {
  background: rgba(18, 20, 28, 0.75);
  border-color: rgba(255, 255, 255, 0.08);
  box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.05);
}

.orbital-chamber:hover {
  border-color: rgba(var(--primary-rgb, 14, 165, 233), 0.35);
  box-shadow: 0 16px 36px -8px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(var(--primary-rgb, 14, 165, 233), 0.15);
}

:global(html.dark) .orbital-chamber:hover {
  border-color: rgba(var(--primary-rgb, 14, 165, 233), 0.45);
  box-shadow: 0 16px 36px -8px rgba(0, 0, 0, 0.6), 0 0 24px -4px rgba(var(--primary-rgb, 14, 165, 233), 0.15);
}

/* ==========================================================================
   VIEWPORT & BACKGROUND MECHANICAL TRACK
   ========================================================================== */
.orbital-viewport {
  position: relative;
  width: 100%;
  height: 310px;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
}

.orbital-track-canvas {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}

.orbital-svg-track {
  width: 100%;
  max-width: 320px;
  height: 160px;
  overflow: visible;
}

.orbital-ellipse-guide {
  fill: none;
  stroke: rgba(156, 163, 175, 0.35);
  stroke-width: 1.5;
  stroke-dasharray: 4 6;
  transition: stroke 0.3s ease;
}

:global(html.dark) .orbital-ellipse-guide {
  stroke: rgba(255, 255, 255, 0.15);
}

.orbital-chamber:hover .orbital-ellipse-guide {
  stroke: rgba(var(--primary-rgb, 14, 165, 233), 0.4);
}

.orbital-tick {
  fill: rgba(var(--primary-rgb, 14, 165, 233), 0.7);
}

.orbital-tick-sub {
  fill: rgba(156, 163, 175, 0.4);
}

:global(html.dark) .orbital-tick-sub {
  fill: rgba(255, 255, 255, 0.2);
}

/* Core Beacon & Ambient Glow */
.orbital-core-glow {
  position: absolute;
  width: 140px;
  height: 70px;
  border-radius: 50%;
  background: radial-gradient(ellipse, rgba(var(--primary-rgb, 14, 165, 233), 0.12) 0%, transparent 70%);
  filter: blur(10px);
}

:global(html.dark) .orbital-core-glow {
  background: radial-gradient(ellipse, rgba(var(--primary-rgb, 14, 165, 233), 0.2) 0%, transparent 70%);
  filter: blur(14px);
}

.orbital-core-beacon {
  position: absolute;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.orbital-beacon-pulse {
  position: absolute;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: rgba(var(--primary-rgb, 14, 165, 233), 0.35);
  animation: beacon-ping 2.5s cubic-bezier(0, 0, 0.2, 1) infinite;
}

.orbital-beacon-dot {
  position: relative;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--primary-600, #0284c7);
  box-shadow: 0 0 6px rgba(var(--primary-rgb, 14, 165, 233), 0.8);
}

:global(html.dark) .orbital-beacon-dot {
  background: var(--primary-400, #38bdf8);
}

@keyframes beacon-ping {
  75%, 100% {
    transform: scale(2.2);
    opacity: 0;
  }
}

/* ==========================================================================
   3D ORBITAL RING & PERSPECTIVE SCENE
   ========================================================================== */
.orbital-scene {
  position: relative;
  width: 100%;
  height: 100%;
  perspective: 1000px;
  perspective-origin: 50% 36%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.orbital-ring {
  position: absolute;
  width: 0;
  height: 0;
  transform-style: preserve-3d;
  animation: orbital-spin var(--duration, 22s) linear infinite;
  will-change: transform;
}

.orbital-slot {
  position: absolute;
  left: 0;
  top: 0;
  transform-style: preserve-3d;
  transform: rotateY(var(--item-angle)) translateZ(var(--item-radius));
  margin-left: calc(-1 * var(--card-size) / 2);
  margin-top: calc(-1 * var(--card-size) / 2);
  width: var(--card-size);
  height: var(--card-size);
  will-change: transform;
}

.orbital-counter-node {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  animation: orbital-counter-depth var(--duration, 22s) linear infinite;
  animation-delay: var(--item-delay);
  will-change: transform, opacity, filter;
}

:global(html.dark) .orbital-counter-node {
  animation-name: orbital-counter-depth-dark;
}

/* ==========================================================================
   KEYFRAME ANIMATIONS: RING SPIN & CONTINUOUS COUNTER-ROTATION + DEPTH CUE
   ========================================================================== */
@keyframes orbital-spin {
  from {
    transform: rotateY(0deg);
  }
  to {
    transform: rotateY(360deg);
  }
}

/* Light mode counter-rotation + dynamic depth cues */
@keyframes orbital-counter-depth {
  0% {
    transform: rotateY(0deg);
    opacity: 1;
    filter: blur(0px);
    box-shadow: 0 0 20px -2px rgba(var(--primary-rgb, 14, 165, 233), 0.45), 0 0 0 1.5px rgba(var(--primary-rgb, 14, 165, 233), 0.5);
  }
  25% {
    transform: rotateY(-90deg);
    opacity: 0.72;
    filter: blur(0.8px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
  50% {
    transform: rotateY(-180deg);
    opacity: 0.32;
    filter: blur(2.2px);
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
  }
  75% {
    transform: rotateY(-270deg);
    opacity: 0.72;
    filter: blur(0.8px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  }
  100% {
    transform: rotateY(-360deg);
    opacity: 1;
    filter: blur(0px);
    box-shadow: 0 0 20px -2px rgba(var(--primary-rgb, 14, 165, 233), 0.45), 0 0 0 1.5px rgba(var(--primary-rgb, 14, 165, 233), 0.5);
  }
}

/* Dark mode counter-rotation + dynamic depth cues */
@keyframes orbital-counter-depth-dark {
  0% {
    transform: rotateY(0deg);
    opacity: 1;
    filter: blur(0px);
    box-shadow: 0 0 24px 0px rgba(var(--primary-rgb, 14, 165, 233), 0.55), 0 0 0 1.5px rgba(var(--primary-rgb, 14, 165, 233), 0.65);
  }
  25% {
    transform: rotateY(-90deg);
    opacity: 0.72;
    filter: blur(0.8px);
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.35);
  }
  50% {
    transform: rotateY(-180deg);
    opacity: 0.28;
    filter: blur(2.4px);
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  }
  75% {
    transform: rotateY(-270deg);
    opacity: 0.72;
    filter: blur(0.8px);
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.35);
  }
  100% {
    transform: rotateY(-360deg);
    opacity: 1;
    filter: blur(0px);
    box-shadow: 0 0 24px 0px rgba(var(--primary-rgb, 14, 165, 233), 0.55), 0 0 0 1.5px rgba(var(--primary-rgb, 14, 165, 233), 0.65);
  }
}

/* ==========================================================================
   PAUSE-ON-HOVER & FOCUS-WITHIN PAUSE LOGIC
   ========================================================================== */
.pause-on-hover:hover .orbital-ring,
.pause-on-hover:hover .orbital-counter-node,
.pause-on-hover:focus-within .orbital-ring,
.pause-on-hover:focus-within .orbital-counter-node {
  animation-play-state: paused;
}

/* ==========================================================================
   ORBITAL CARD BUTTON STYLING & INTERACTION
   ========================================================================== */
.orbital-card {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.35rem;
  border-radius: 1.15rem;
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid rgba(229, 231, 235, 0.9);
  cursor: pointer;
  outline: none;
  transform: translateZ(0);
  transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s ease, border-color 0.25s ease;
  transform-style: preserve-3d;
}

:global(html.dark) .orbital-card {
  background: rgba(26, 29, 39, 0.92);
  border-color: rgba(255, 255, 255, 0.12);
}

.orbital-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.25s ease;
}

/* Floating Tooltip on Hover/Focus */
.orbital-tooltip {
  position: absolute;
  bottom: -26px;
  left: 50%;
  transform: translateX(-50%) translateY(4px);
  padding: 2px 7px;
  border-radius: 6px;
  background: rgba(17, 24, 39, 0.92);
  color: #ffffff;
  font-size: 9.5px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  white-space: nowrap;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.2s ease, transform 0.2s ease;
  z-index: 60;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

:global(html.dark) .orbital-tooltip {
  background: rgba(30, 41, 59, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.orbital-card:hover .orbital-tooltip,
.orbital-card:focus-visible .orbital-tooltip {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}

/* Active Hover & Focus States on Individual Icon */
.orbital-counter-node:hover,
.orbital-counter-node:focus-within {
  opacity: 1 !important;
  filter: blur(0px) !important;
  z-index: 50 !important;
}

.orbital-card:hover,
.orbital-card:focus-visible {
  transform: translateZ(26px) scale(1.14);
  box-shadow: 0 0 30px rgba(var(--primary-rgb, 14, 165, 233), 0.6), 0 0 0 2px var(--primary-500, #0ea5e9) !important;
  border-color: var(--primary-500, #0ea5e9) !important;
}

.orbital-card:focus-visible {
  ring: 2px solid var(--primary-500, #0ea5e9);
  ring-offset: 2px;
}

.orbital-card:hover .orbital-card-title,
.orbital-card:focus-visible .orbital-card-title {
  color: var(--primary-600, #0284c7);
}

:global(html.dark) .orbital-card:hover .orbital-card-title,
:global(html.dark) .orbital-card:focus-visible .orbital-card-title {
  color: var(--primary-400, #38bdf8);
}

.orbital-card:hover .orbital-icon-wrapper,
.orbital-card:focus-visible .orbital-icon-wrapper {
  transform: scale(1.08);
}

/* ==========================================================================
   REDUCED MOTION SUPPORT (STATIC FRONT ARC FALLBACK)
   ========================================================================== */
@media (prefers-reduced-motion: reduce) {
  .orbital-ring {
    animation: none !important;
    transform: none !important;
  }

  .orbital-slot {
    transform: rotateY(var(--static-angle)) translateZ(var(--item-radius)) rotateY(calc(-1 * var(--static-angle))) !important;
  }

  .orbital-counter-node {
    animation: none !important;
    opacity: 1 !important;
    filter: none !important;
    transform: none !important;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08) !important;
  }

  :global(html.dark) .orbital-counter-node {
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.4) !important;
  }

  .orbital-beacon-pulse {
    animation: none !important;
  }
}
</style>
