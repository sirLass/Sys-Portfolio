<template>
  <section id="Skills" class="py-24 bg-gray-50 dark:bg-[#0f1117] transition-colors duration-300">
    <div class="max-w-7xl mx-auto px-6">
      <!-- Loading Skeleton: mirrors the final layout (header + band + groups) -->
      <div v-if="isLoading" role="status" aria-label="Loading skills" class="skill-skeleton">
        <div class="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div class="w-full max-w-2xl">
            <div class="mb-4 h-3.5 w-44 animate-pulse rounded bg-gray-200 dark:bg-white/10"></div>
            <div class="h-9 w-64 animate-pulse rounded bg-gray-200 dark:bg-white/10 sm:h-10 sm:w-80"></div>
            <div class="mt-5 h-4 w-full animate-pulse rounded bg-gray-200 dark:bg-white/10"></div>
            <div class="mt-3 h-4 w-5/6 animate-pulse rounded bg-gray-200 dark:bg-white/10"></div>
          </div>
          <div class="h-4 w-36 shrink-0 animate-pulse rounded bg-gray-200 dark:bg-white/10"></div>
        </div>

        <div class="mb-12 space-y-3">
          <div v-for="row in 2" :key="`skel-row-${row}`" class="flex gap-3 overflow-hidden">
            <div
              v-for="i in 7"
              :key="`skel-pill-${row}-${i}`"
              class="h-10 w-28 shrink-0 animate-pulse rounded-full bg-gray-200 dark:bg-white/10"
            ></div>
          </div>
        </div>

        <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 sm:gap-10">
          <div v-for="idx in 3" :key="`skel-group-${idx}`">
            <div class="mb-4 border-t border-gray-200 pt-4 dark:border-white/10">
              <div class="flex items-center gap-3">
                <div class="h-8 w-8 animate-pulse rounded-lg bg-gray-200 dark:bg-white/10"></div>
                <div class="h-4 w-32 animate-pulse rounded bg-gray-200 dark:bg-white/10"></div>
                <div class="ml-auto h-3 w-14 animate-pulse rounded bg-gray-200 dark:bg-white/10"></div>
              </div>
            </div>
            <div class="flex flex-wrap gap-2.5">
              <div
                v-for="i in 8"
                :key="`skel-gpill-${idx}-${i}`"
                class="h-10 w-28 animate-pulse rounded-full bg-gray-200 dark:bg-white/10"
              ></div>
            </div>
          </div>
        </div>
        <p class="sr-only">Loading skills…</p>
      </div>

      <!-- Error State -->
      <div v-else-if="hasError || !skillsData" role="alert" class="mx-auto max-w-md py-16 text-center">
        <div class="mb-4 text-stone-400 dark:text-stone-500">
          <svg class="mx-auto h-14 w-14" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h3 class="mb-2 text-xl font-semibold text-stone-800 dark:text-stone-100">Couldn't load skills</h3>
        <p class="mb-6 leading-relaxed text-stone-500 dark:text-stone-400">
          The skills data didn't respond. Check your connection, then retry — saved or default
          skills will appear as soon as it loads.
        </p>
        <button
          type="button"
          class="inline-flex h-10 items-center rounded-full bg-primary-600 px-6 text-sm font-semibold text-white transition-colors hover:bg-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:bg-primary-700 dark:text-[#0f1117] dark:hover:bg-primary-600"
          @click="retry"
        >
          Retry
        </button>
      </div>

      <!-- Loaded Data -->
      <div v-else>
        <!-- Section Header -->
        <header
          v-if="showHeader"
          class="mb-12 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between lg:mb-14"
        >
          <div class="max-w-2xl">
            <p
              v-if="!isHidden('skills', 'sectionLabel')"
              class="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-primary-600 dark:text-primary-400"
            >
              {{ skillsData.sectionLabel }}
            </p>
            <h2
              v-if="!isHidden('skills', 'mainHeading')"
              class="font-serif text-3xl font-normal leading-tight tracking-tight text-stone-900 sm:text-4xl lg:text-5xl dark:text-stone-100"
            >
              {{ skillsData.mainHeading }}
            </h2>
            <p
              v-if="!isHidden('skills', 'description')"
              class="mt-4 text-base font-light leading-relaxed text-stone-600 sm:text-lg dark:text-stone-400"
            >
              {{ skillsData.description }}
            </p>
          </div>
          <p
            v-if="totalSkills > 0"
            class="shrink-0 text-sm text-stone-500 sm:pb-1 dark:text-stone-400"
          >
            <span class="font-semibold text-stone-700 dark:text-stone-200">{{ totalSkills }}</span>
            {{ totalSkills === 1 ? 'skill' : 'skills' }}
            <span v-if="categories.length > 1"> in {{ categories.length }} categories</span>
          </p>
        </header>

        <!-- Signature moment: dual-direction pill marquee (single ambient animation) -->
        <SkillMarquee v-if="marqueeRows.length" :rows="marqueeRows" class="mb-8 lg:mb-10" />

        <!-- Accordion toggle for the category groups -->
        <div v-if="categories.length" class="mb-6">
          <button
            type="button"
            class="inline-flex h-11 items-center gap-2.5 rounded-full border border-stone-200 bg-white px-5 text-sm font-medium text-stone-700 transition-colors hover:border-primary-500 hover:text-primary-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:border-white/10 dark:bg-[#12141c] dark:text-stone-300 dark:hover:border-primary-400 dark:hover:text-primary-400"
            :aria-expanded="categoriesOpen"
            aria-controls="skills-categories-panel"
            @click="categoriesOpen = !categoriesOpen"
          >
            Skills by category
            <svg
              class="h-4 w-4 transition-transform duration-200"
              :class="{ 'rotate-180': categoriesOpen }"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              stroke-width="2"
              aria-hidden="true"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        <!-- Categorized groups with level meters (collapsed by default) -->
        <div
          v-if="categories.length"
          id="skills-categories-panel"
          class="skills-collapse"
          :class="{ 'skills-collapse--open': categoriesOpen }"
        >
          <div class="skills-collapse__inner">
            <div class="grid gap-8 sm:gap-10" :class="groupGridClass">
              <SkillGroup
                v-for="category in categories"
                :key="category.key"
                :title="category.title"
                :items="category.items"
                :icon-paths="category.iconPaths"
              />
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
import SkillMarquee from './skills/SkillMarquee.vue'
import SkillGroup from './skills/SkillGroup.vue'

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

/* ==========================================================================
   ICON HELPERS
   getIconSlug returns null for unknown skills so an unknown name never
   renders a wrong logo — SkillPill falls back to a neutral monogram tile.
   ========================================================================== */
const getIconSlug = (name) => {
  if (!name) return null

  const normalized = String(name).toLowerCase().replace(/\s+/g, ' ').trim()

  const slugMap = {
    'ui/ux design': 'figma',
    'visual design': 'ps',
    'interaction design': 'framer',
    framer: 'framer',
    prototyping: 'xd',
    'user research': 'notion',
    wireframing: 'sketch',
    'html/css': 'html',
    javascript: 'js',
    django: 'django',
    'node.js': 'nodejs',
    'vue.js': 'vue',
    react: 'react',
    python: 'python',
    typescript: 'ts',
    'next.js': 'nextjs',
    'tailwind css': 'tailwindcss',
    tailwind: 'tailwindcss',
    laravel: 'laravel',
    'vs code': 'vscode',
    vscode: 'vscode',
    github: 'github',
    figma: 'figma',
    'adobe xd': 'xd',
    'adobe photoshop': 'ps',
    'adobe illustrator': 'ai',
    docker: 'docker',
    firebase: 'firebase',
    postman: 'postman',
    mongodb: 'mongodb',
    postgresql: 'postgresql',
    postgres: 'postgresql',
    mysql: 'mysql',
    git: 'git',
    gitlab: 'gitlab',
    bitbucket: 'bitbucket',
    aws: 'aws',
    vercel: 'vercel',
    netlify: 'netlify',
    supabase: 'supabase',
    redis: 'redis',
    prisma: 'prisma',
    graphql: 'graphql',
    'rest api': 'postman',
    jest: 'jest',
    vite: 'vite',
    webpack: 'webpack',
    npm: 'npm',
    yarn: 'yarn',
    sass: 'sass',
    scss: 'sass',
    less: 'less',
    bootstrap: 'bootstrap',
    jquery: 'jquery',
    php: 'php',
    java: 'java',
    'c++': 'cpp',
    'c#': 'cs',
    go: 'go',
    golang: 'go',
    rust: 'rust',
    swift: 'swift',
    kotlin: 'kotlin',
    flutter: 'flutter',
    'react native': 'react',
    electron: 'electron',
    tauri: 'tauri',
    'nuxt.js': 'nuxtjs',
    nuxt: 'nuxtjs',
    svelte: 'svelte',
    angular: 'angular',
    html: 'html',
    css: 'html',
    js: 'js',
    ts: 'ts',
    nextjs: 'nextjs',
    next: 'nextjs',
    'github desktop': 'github'
  }

  if (slugMap[normalized]) return slugMap[normalized]

  // Ordered rules: specific first so "GitHub" never lands on the generic Git icon
  const rules = [
    [/next/, 'nextjs'],
    [/nuxt/, 'nuxtjs'],
    [/react/, 'react'],
    [/vue/, 'vue'],
    [/python/, 'python'],
    [/django/, 'django'],
    [/flask/, 'flask'],
    [/node/, 'nodejs'],
    [/typescript/, 'ts'],
    [/\bts\b/, 'ts'],
    [/javascript/, 'js'],
    [/\bjsx?\b/, 'js'],
    [/github/, 'github'],
    [/gitlab/, 'gitlab'],
    [/bitbucket/, 'bitbucket'],
    [/\bgit/, 'git'],
    [/figma/, 'figma'],
    [/photoshop/, 'ps'],
    [/illustrator/, 'ai'],
    [/ruby/, 'rb'],
    [/framer/, 'framer'],
    [/laravel/, 'laravel'],
    [/tailwind/, 'tailwindcss'],
    [/mongo/, 'mongodb'],
    [/postgres/, 'postgresql'],
    [/\bsql\b/, 'mysql'],
    [/mysql/, 'mysql'],
    [/docker/, 'docker'],
    [/firebase/, 'firebase'],
    [/\baws\b/, 'aws'],
    [/vercel/, 'vercel'],
    [/netlify/, 'netlify'],
    [/supabase/, 'supabase'],
    [/postman/, 'postman'],
    [/rest ?api/, 'postman'],
    [/graphql/, 'graphql'],
    [/prisma/, 'prisma'],
    [/redis/, 'redis'],
    [/\bvite\b/, 'vite'],
    [/webpack/, 'webpack'],
    [/bootstrap/, 'bootstrap'],
    [/sass|scss/, 'sass'],
    [/jquery/, 'jquery'],
    [/php/, 'php'],
    [/c\+\+/, 'cpp'],
    [/c#/, 'cs'],
    [/\bgolang\b|\bgo\b/, 'go'],
    [/rust/, 'rust'],
    [/swift/, 'swift'],
    [/kotlin/, 'kotlin'],
    [/flutter/, 'flutter'],
    [/electron/, 'electron'],
    [/tauri/, 'tauri'],
    [/svelte/, 'svelte'],
    [/angular/, 'angular'],
    [/\bjava\b/, 'java'],
    [/html/, 'html'],
    [/css/, 'html']
  ]

  for (const [pattern, slug] of rules) {
    if (pattern.test(normalized)) return slug
  }

  // Unknown skill: no logo rather than the wrong one
  return null
}

const getSkillIcon = (name) => {
  const lower = (name || '').toLowerCase()
  if (lower.includes('framer')) {
    return 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/framer.svg'
  }
  const slug = getIconSlug(name)
  return slug ? `https://skillicons.dev/icons?i=${slug}` : null
}

/* ==========================================================================
   CATEGORIES (visibility + empty-state aware)
   ========================================================================== */
const CATEGORY_DEFS = [
  {
    key: 'designSkills',
    title: 'Design Skills',
    iconPaths: [
      'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01'
    ]
  },
  {
    key: 'developmentSkills',
    title: 'Development Skills',
    iconPaths: ['M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4']
  },
  {
    key: 'tools',
    title: 'Tools & Software',
    iconPaths: [
      'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z',
      'M15 12a3 3 0 11-6 0 3 3 0 016 0z'
    ]
  }
]

// Shape raw data items once: { name, level, icon }
const prepareItem = (item) => {
  const name = getItemName(item)
  if (!name) return null
  return { name, level: getItemLevel(item), icon: getSkillIcon(name) }
}

// Respects isHidden() AND drops empty categories so the grid never looks lopsided
const categories = computed(() => {
  const data = skillsData.value
  if (!data) return []
  return CATEGORY_DEFS.filter((def) => !isHidden('skills', def.key))
    .map((def) => ({
      ...def,
      items: (Array.isArray(data[def.key]) ? data[def.key] : [])
        .map(prepareItem)
        .filter(Boolean)
    }))
    .filter((def) => def.items.length > 0)
})

const totalSkills = computed(() =>
  categories.value.reduce((sum, category) => sum + category.items.length, 0)
)

// Split skills into two marquee rows; short lists get a single row
const marqueeRows = computed(() => {
  const items = categories.value.flatMap((category) => category.items)
  if (items.length === 0) return []
  if (items.length < 4) return [items]
  const mid = Math.ceil(items.length / 2)
  return [items.slice(0, mid), items.slice(mid)]
})

const showHeader = computed(
  () =>
    !isHidden('skills', 'sectionLabel') ||
    !isHidden('skills', 'mainHeading') ||
    !isHidden('skills', 'description')
)

const groupGridClass = computed(() => {
  const count = categories.value.length
  if (count === 1) return 'mx-auto max-w-2xl grid-cols-1'
  if (count === 2) return 'mx-auto max-w-5xl grid-cols-1 md:grid-cols-2'
  return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
})

// Accordion: collapsed by default, but starts open for reduced-motion users —
// the marquee band is hidden for them, so the groups must show every skill statically.
const categoriesOpen = ref(
  typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
)

/* ==========================================================================
   DATA LOADING (Supabase -> localStorage -> defaults) — logic unchanged
   ========================================================================== */
const loadSkills = async () => {
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
}

const retry = () => {
  hasError.value = false
  isLoading.value = true
  loadSkills()
}

onMounted(() => {
  loadSkills()
})
</script>

<style scoped>
/* Accordion panel: grid-template-rows 0fr -> 1fr (height animation without JS;
   browsers that can't interpolate fr units simply snap, which is fine) */
.skills-collapse {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.skills-collapse--open {
  grid-template-rows: 1fr;
}

/* visibility keeps collapsed content out of the a11y tree and tab order,
   with a delayed switch so the closing animation stays visible */
.skills-collapse__inner {
  overflow: hidden;
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.2s ease, visibility 0s linear 0.3s;
}

.skills-collapse--open .skills-collapse__inner {
  visibility: visible;
  opacity: 1;
  transition: opacity 0.25s ease 0.1s, visibility 0s linear 0s;
}

@media (prefers-reduced-motion: reduce) {
  .skills-collapse,
  .skills-collapse__inner {
    transition: none !important;
  }
}

/* Loading skeleton freezes under reduced motion (no pulsing) */
@media (prefers-reduced-motion: reduce) {
  .skill-skeleton * {
    animation: none !important;
  }
}
</style>
