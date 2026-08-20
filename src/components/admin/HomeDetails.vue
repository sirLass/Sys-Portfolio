<template>
  <div class="space-y-8">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#e3e5e7]">
      <div>
        <h3 class="text-base font-bold text-[#1a1b1c]">Hero Content & Typography</h3>
        <p class="text-xs text-[#6d7175]">Freely customize text, typography styles, sizes, and layout placement with real-time live mirror.</p>
      </div>
      <div class="flex items-center gap-2">
        <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
          <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          Live Mirror Active
        </span>
      </div>
    </div>

    <!-- Main 2-Column Grid: Form on Left, Live Mirror on Right -->
    <div class="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
      
      <!-- Left Column: Controls (7 cols on XL) -->
      <div class="xl:col-span-7 space-y-6">
        
        <!-- 1. Text Content Section -->
        <div class="bg-[#f6f6f7]/50 p-6 rounded-xl border border-[#e3e5e7] space-y-5">
          <div class="flex items-center justify-between">
            <h4 class="text-sm font-bold text-[#1a1b1c] flex items-center gap-2">
              <svg class="w-4 h-4 text-[var(--admin-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Text Information
            </h4>
            <span class="text-xs text-[#6d7175]">Visibility toggles on right</span>
          </div>

          <!-- Greeting Field -->
          <FormField label="Greeting Intro" for-id="greeting">
            <template #label-right>
              <VisibilityToggle :visible="vis.hero.greeting" @toggle="$emit('toggleVis', 'hero', 'greeting')" />
            </template>
            <input
              id="greeting"
              :value="modelValue.greeting ?? 'Hello, I\'m'"
              @input="update('greeting', $event.target.value)"
              type="text"
              class="w-full px-4 py-2.5 text-sm text-[#1a1b1c] bg-white border border-[#c9cccf] rounded-md focus:outline-none focus:border-[var(--admin-primary)] focus:ring-2 focus:ring-[var(--admin-primary)]/20 transition-all"
              placeholder="e.g., Hello, I'm or Welcome, I am"
            />
          </FormField>

          <!-- Name Field -->
          <FormField label="Full Name" for-id="name" :required="true">
            <template #label-right>
              <VisibilityToggle :visible="vis.hero.name" @toggle="$emit('toggleVis', 'hero', 'name')" />
            </template>
            <input
              id="name"
              :value="modelValue.name"
              @input="update('name', $event.target.value)"
              type="text"
              class="w-full px-4 py-2.5 text-sm text-[#1a1b1c] bg-white border border-[#c9cccf] rounded-md focus:outline-none focus:border-[var(--admin-primary)] focus:ring-2 focus:ring-[var(--admin-primary)]/20 transition-all"
              placeholder="Enter your name"
              required
            />
          </FormField>

          <!-- Title Field -->
          <FormField label="Professional Title" for-id="title">
            <template #label-right>
              <VisibilityToggle :visible="vis.hero.title" @toggle="$emit('toggleVis', 'hero', 'title')" />
            </template>
            <input
              id="title"
              :value="modelValue.title"
              @input="update('title', $event.target.value)"
              type="text"
              class="w-full px-4 py-2.5 text-sm text-[#1a1b1c] bg-white border border-[#c9cccf] rounded-md focus:outline-none focus:border-[var(--admin-primary)] focus:ring-2 focus:ring-[var(--admin-primary)]/20 transition-all"
              placeholder="e.g., Full-Stack Developer & Designer"
            />
          </FormField>

          <!-- Description Field -->
          <FormField label="Bio / Description" for-id="description">
            <template #label-right>
              <VisibilityToggle :visible="vis.hero.description" @toggle="$emit('toggleVis', 'hero', 'description')" />
            </template>
            <textarea
              id="description"
              :value="modelValue.description"
              @input="update('description', $event.target.value)"
              rows="5"
              class="w-full px-4 py-2.5 text-sm text-[#1a1b1c] bg-white border border-[#c9cccf] rounded-md focus:outline-none focus:border-[var(--admin-primary)] focus:ring-2 focus:ring-[var(--admin-primary)]/20 transition-all resize-y"
              placeholder="Write a brief intro about yourself..."
            ></textarea>
            <p class="mt-1 text-xs text-[#6d7175]">{{ (modelValue.description || '').length }}/500 characters</p>
          </FormField>
        </div>

        <!-- 2. Typography & Placement Style Section -->
        <div class="bg-[#f6f6f7]/50 p-6 rounded-xl border border-[#e3e5e7] space-y-6">
          <h4 class="text-sm font-bold text-[#1a1b1c] flex items-center gap-2">
            <svg class="w-4 h-4 text-[var(--admin-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            Typography, Size & Placement
          </h4>

          <!-- Placement / Alignment Selector -->
          <div>
            <label class="block text-xs font-semibold text-[#1a1b1c] mb-2">Text Alignment & Placement</label>
            <div class="grid grid-cols-3 gap-2">
              <button
                v-for="align in alignmentOptions"
                :key="align.id"
                type="button"
                @click="update('textAlign', align.id)"
                :class="[
                  'py-2 px-3 text-xs font-medium rounded-lg border flex items-center justify-center gap-2 transition-all',
                  (modelValue.textAlign ?? 'left') === align.id
                    ? 'border-[var(--admin-primary)] bg-white text-[var(--admin-primary)] shadow-sm ring-2 ring-[var(--admin-primary)]/10 font-bold'
                    : 'border-[#c9cccf] bg-white text-[#6d7175] hover:border-[#1a1b1c] hover:text-[#1a1b1c]'
                ]"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="align.icon" />
                </svg>
                {{ align.label }}
              </button>
            </div>
          </div>

          <!-- Font Style / Family -->
          <div>
            <label class="block text-xs font-semibold text-[#1a1b1c] mb-2">Font Style & Family</label>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                v-for="font in fontOptions"
                :key="font.id"
                type="button"
                @click="update('fontFamily', font.id)"
                :class="[
                  'p-3 rounded-lg border text-left transition-all',
                  (modelValue.fontFamily ?? 'sans') === font.id
                    ? 'border-[var(--admin-primary)] bg-white text-[var(--admin-primary)] shadow-sm ring-2 ring-[var(--admin-primary)]/10 font-bold'
                    : 'border-[#c9cccf] bg-white text-[#6d7175] hover:border-[#1a1b1c] hover:text-[#1a1b1c]'
                ]"
              >
                <p class="text-xs font-bold leading-tight" :style="{ fontFamily: font.fontCSS }">{{ font.name }}</p>
                <p class="text-[10px] text-[#6d7175] mt-1">{{ font.desc }}</p>
              </button>
            </div>
          </div>

          <!-- Name Heading Size & Font Weight -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <!-- Heading Size -->
            <div>
              <label class="block text-xs font-semibold text-[#1a1b1c] mb-2">Name Heading Size</label>
              <div class="grid grid-cols-4 gap-1 bg-white p-1 rounded-lg border border-[#c9cccf]">
                <button
                  v-for="size in nameSizeOptions"
                  :key="size.id"
                  type="button"
                  @click="update('nameSize', size.id)"
                  :class="[
                    'py-1.5 text-xs rounded transition-colors text-center font-medium',
                    (modelValue.nameSize ?? 'xl') === size.id
                      ? 'bg-[var(--admin-primary)] text-white shadow-sm font-bold'
                      : 'text-[#6d7175] hover:text-[#1a1b1c]'
                  ]"
                >
                  {{ size.label }}
                </button>
              </div>
            </div>

            <!-- Font Weight -->
            <div>
              <label class="block text-xs font-semibold text-[#1a1b1c] mb-2">Heading Font Weight</label>
              <div class="grid grid-cols-4 gap-1 bg-white p-1 rounded-lg border border-[#c9cccf]">
                <button
                  v-for="weight in fontWeightOptions"
                  :key="weight.id"
                  type="button"
                  @click="update('fontWeight', weight.id)"
                  :class="[
                    'py-1.5 text-xs rounded transition-colors text-center font-medium',
                    (modelValue.fontWeight ?? 'bold') === weight.id
                      ? 'bg-[var(--admin-primary)] text-white shadow-sm font-bold'
                      : 'text-[#6d7175] hover:text-[#1a1b1c]'
                  ]"
                >
                  {{ weight.label }}
                </button>
              </div>
            </div>
          </div>

          <!-- Title Size & Description Size -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-semibold text-[#1a1b1c] mb-2">Title Size</label>
              <select
                :value="modelValue.titleSize ?? 'lg'"
                @change="update('titleSize', $event.target.value)"
                class="w-full px-3 py-2 text-xs text-[#1a1b1c] bg-white border border-[#c9cccf] rounded-lg focus:outline-none focus:border-[var(--admin-primary)]"
              >
                <option value="sm">Compact (Text-xl)</option>
                <option value="md">Regular (Text-2xl)</option>
                <option value="lg">Prominent (Text-3xl - Default)</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-semibold text-[#1a1b1c] mb-2">Description Size</label>
              <select
                :value="modelValue.descSize ?? 'md'"
                @change="update('descSize', $event.target.value)"
                class="w-full px-3 py-2 text-xs text-[#1a1b1c] bg-white border border-[#c9cccf] rounded-lg focus:outline-none focus:border-[var(--admin-primary)]"
              >
                <option value="sm">Small (Text-base)</option>
                <option value="md">Standard (Text-lg - Default)</option>
                <option value="lg">Large (Text-xl)</option>
              </select>
            </div>
          </div>
        </div>

        <!-- 3. Cover Gradient Settings -->
        <div class="bg-[#f6f6f7]/50 p-6 rounded-xl border border-[#e3e5e7] space-y-6">
          <h4 class="text-sm font-bold text-[#1a1b1c] flex items-center gap-2">
            <svg class="w-4 h-4 text-[var(--admin-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Header Cover Gradient Blend
          </h4>

          <!-- Gradient Position Slider -->
          <FormField label="Gradient Position" for-id="gradientPosition">
            <div class="flex items-center justify-between mb-2">
              <span class="text-xs text-[#6d7175]">Start position down the header</span>
              <span class="text-xs font-mono text-[var(--admin-primary)] font-bold">{{ modelValue.gradientPosition ?? 85 }}%</span>
            </div>
            <input
              id="gradientPosition"
              type="range"
              :value="modelValue.gradientPosition ?? 85"
              @input="update('gradientPosition', Number($event.target.value))"
              min="0"
              max="100"
              step="1"
              class="w-full h-2 bg-[#e3e5e7] rounded-lg appearance-none cursor-pointer accent-[var(--admin-primary)]"
            />
          </FormField>

          <!-- Gradient Opacity Slider -->
          <FormField label="Gradient Intensity" for-id="gradientOpacity">
            <div class="flex items-center justify-between mb-2">
              <span class="text-xs text-[#6d7175]">Opacity of bottom blend color</span>
              <span class="text-xs font-mono text-[var(--admin-primary)] font-bold">{{ modelValue.gradientOpacity ?? 80 }}%</span>
            </div>
            <input
              id="gradientOpacity"
              type="range"
              :value="modelValue.gradientOpacity ?? 80"
              @input="update('gradientOpacity', Number($event.target.value))"
              min="0"
              max="100"
              step="1"
              class="w-full h-2 bg-[#e3e5e7] rounded-lg appearance-none cursor-pointer accent-[var(--admin-primary)]"
            />
          </FormField>
        </div>

      </div>

      <!-- Right Column: Live Interactive Hero Mirror Preview (5 cols on XL) -->
      <div class="xl:col-span-5 sticky top-6 space-y-4">
        <div class="bg-white rounded-2xl border-2 border-[var(--admin-primary)]/40 shadow-xl overflow-hidden">
          
          <!-- Mirror Header Bar -->
          <div class="px-5 py-3.5 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
              <span class="text-xs font-bold uppercase tracking-wider text-white">Live Hero Mirror</span>
            </div>
            <span class="text-[11px] text-gray-300 font-mono">Real-Time Simulation</span>
          </div>

          <!-- Hero Section Simulated Viewport -->
          <div class="p-6 sm:p-8 bg-gradient-to-br from-primary-50/60 via-[#FAF9F6] to-blue-50/50 relative overflow-hidden min-h-[480px] flex flex-col justify-center">
            
            <!-- Ambient blurred orbs in mirror -->
            <div class="absolute -top-12 -right-12 w-48 h-48 bg-primary-200/40 rounded-full blur-2xl pointer-events-none"></div>
            <div class="absolute -bottom-12 -left-12 w-48 h-48 bg-blue-200/40 rounded-full blur-2xl pointer-events-none"></div>

            <!-- Mirrored Content Block -->
            <div :class="mirrorContainerClasses" :style="mirrorFontFamilyStyle">
              
              <!-- Greeting -->
              <p
                v-if="vis.hero.greeting"
                class="text-primary-600 font-semibold text-sm sm:text-base mb-3 flex items-center"
                :class="mirrorGreetingClasses"
              >
                <span v-if="(modelValue.textAlign ?? 'left') !== 'right'" class="w-6 h-px bg-primary-600 mr-2.5"></span>
                {{ modelValue.greeting || "Hello, I'm" }}
                <span v-if="(modelValue.textAlign ?? 'left') === 'right'" class="w-6 h-px bg-primary-600 ml-2.5"></span>
              </p>

              <!-- Name -->
              <h1
                v-if="vis.hero.name"
                class="text-gray-900 leading-tight mb-4 transition-all"
                :class="[mirrorNameSizeClass, mirrorNameWeightClass]"
              >
                <template v-if="(modelValue.name || 'Brian Perez').includes(' ')">
                  {{ (modelValue.name || 'Brian Perez').split(' ')[0] }}
                  <span class="gradient-text">{{ (modelValue.name || 'Brian Perez').split(' ').slice(1).join(' ') }}</span>
                </template>
                <template v-else>
                  <span class="gradient-text">{{ modelValue.name || 'Brian Perez' }}</span>
                </template>
              </h1>

              <!-- Title -->
              <h2
                v-if="vis.hero.title"
                class="text-gray-600 font-light mb-5 leading-snug"
                :class="mirrorTitleSizeClass"
              >
                {{ modelValue.title || 'Full-Stack Developer & Designer' }}
              </h2>

              <!-- Description -->
              <p
                v-if="vis.hero.description"
                class="text-gray-700 leading-relaxed mb-6"
                :class="[mirrorDescSizeClass, mirrorDescWidthClass]"
              >
                {{ modelValue.description || 'I build highly performant, responsive web applications with modern design systems.' }}
              </p>

              <!-- CTA Buttons Preview -->
              <div class="flex flex-wrap gap-3 mb-8" :class="mirrorButtonContainerClasses">
                <span class="inline-flex items-center bg-primary-600 text-white px-5 py-2.5 rounded-full text-xs font-semibold shadow-md">
                  View My Work
                  <svg class="w-3.5 h-3.5 ml-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
                <span class="inline-flex items-center border border-primary-600 text-primary-600 px-5 py-2.5 rounded-full text-xs font-semibold">
                  Get In Touch
                </span>
              </div>

              <!-- Counter Stats Preview -->
              <div class="pt-5 border-t border-gray-200/80 flex items-center gap-6" :class="mirrorStatsContainerClasses">
                <div>
                  <p class="text-xl font-bold text-gray-900">12<span class="text-primary-600 text-sm align-top">+</span></p>
                  <p class="text-[10px] text-gray-500 font-medium uppercase tracking-wider">Projects</p>
                </div>
                <div class="w-px h-8 bg-gray-200"></div>
                <div>
                  <p class="text-xl font-bold text-gray-900">24<span class="text-primary-600 text-sm align-top">+</span></p>
                  <p class="text-[10px] text-gray-500 font-medium uppercase tracking-wider">Github Repos</p>
                </div>
              </div>

            </div>
          </div>

          <!-- Mirror Footer info -->
          <div class="p-3.5 bg-gray-50 border-t border-[#e3e5e7] flex items-center justify-between text-xs text-[#6d7175]">
            <span>Font: <strong class="text-[#1a1b1c] capitalize">{{ modelValue.fontFamily ?? 'sans' }}</strong></span>
            <span>Placement: <strong class="text-[#1a1b1c] capitalize">{{ modelValue.textAlign ?? 'left' }}</strong></span>
            <span>Size: <strong class="text-[#1a1b1c] uppercase">{{ modelValue.nameSize ?? 'xl' }}</strong></span>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import FormField from './ui/FormField.vue'
import VisibilityToggle from './ui/VisibilityToggle.vue'

const props = defineProps({
  modelValue: { type: Object, required: true },
  vis: { type: Object, required: true }
})

const emit = defineEmits(['update:modelValue', 'toggleVis'])

const alignmentOptions = [
  { id: 'left', label: 'Left', icon: 'M4 6h16M4 12h10M4 18h14' },
  { id: 'center', label: 'Center', icon: 'M4 6h16M7 12h10M5 18h14' },
  { id: 'right', label: 'Right', icon: 'M4 6h16M10 12h10M6 18h14' }
]

const fontOptions = [
  { id: 'sans', name: 'Modern Sans', desc: 'Clean & Neutral', fontCSS: 'system-ui, -apple-system, Inter, sans-serif' },
  { id: 'serif', name: 'Editorial Serif', desc: 'Classic & Elegant', fontCSS: 'Georgia, Cambria, serif' },
  { id: 'mono', name: 'Tech Mono', desc: 'Code & Terminal', fontCSS: 'ui-monospace, "SF Mono", monospace' },
  { id: 'display', name: 'Display Sans', desc: 'Geometric & Bold', fontCSS: 'Outfit, "Plus Jakarta Sans", sans-serif' }
]

const nameSizeOptions = [
  { id: 'sm', label: 'SM' },
  { id: 'md', label: 'MD' },
  { id: 'lg', label: 'LG' },
  { id: 'xl', label: 'XL' }
]

const fontWeightOptions = [
  { id: 'normal', label: 'Regular' },
  { id: 'medium', label: 'Medium' },
  { id: 'semibold', label: 'Semi' },
  { id: 'bold', label: 'Bold' }
]

function update(field, value) {
  emit('update:modelValue', { ...props.modelValue, [field]: value })
}

// ─── Mirror Computed Classes ───────────────────────────────────────
const mirrorContainerClasses = computed(() => {
  const align = props.modelValue.textAlign ?? 'left'
  return {
    'text-left': align === 'left',
    'text-center': align === 'center',
    'text-right': align === 'right'
  }
})

const mirrorFontFamilyStyle = computed(() => {
  const f = props.modelValue.fontFamily ?? 'sans'
  if (f === 'serif') return { fontFamily: 'Georgia, Cambria, "Times New Roman", serif' }
  if (f === 'mono') return { fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace' }
  if (f === 'display') return { fontFamily: 'Outfit, "Plus Jakarta Sans", system-ui, sans-serif' }
  return { fontFamily: 'system-ui, -apple-system, Inter, BlinkMacSystemFont, sans-serif' }
})

const mirrorGreetingClasses = computed(() => {
  const align = props.modelValue.textAlign ?? 'left'
  return {
    'justify-start': align === 'left',
    'justify-center': align === 'center',
    'justify-end': align === 'right'
  }
})

const mirrorNameSizeClass = computed(() => {
  const s = props.modelValue.nameSize ?? 'xl'
  if (s === 'sm') return 'text-3xl sm:text-4xl'
  if (s === 'md') return 'text-4xl sm:text-5xl'
  if (s === 'lg') return 'text-5xl sm:text-6xl'
  return 'text-5xl sm:text-6xl lg:text-7xl' // xl
})

const mirrorNameWeightClass = computed(() => {
  const w = props.modelValue.fontWeight ?? 'bold'
  if (w === 'normal') return 'font-normal'
  if (w === 'medium') return 'font-medium'
  if (w === 'semibold') return 'font-semibold'
  return 'font-bold'
})

const mirrorTitleSizeClass = computed(() => {
  const s = props.modelValue.titleSize ?? 'lg'
  if (s === 'sm') return 'text-lg sm:text-xl'
  if (s === 'md') return 'text-xl sm:text-2xl'
  return 'text-2xl sm:text-3xl'
})

const mirrorDescSizeClass = computed(() => {
  const s = props.modelValue.descSize ?? 'md'
  if (s === 'sm') return 'text-sm sm:text-base'
  if (s === 'lg') return 'text-lg sm:text-xl'
  return 'text-base sm:text-lg'
})

const mirrorDescWidthClass = computed(() => {
  const align = props.modelValue.textAlign ?? 'left'
  if (align === 'center') return 'max-w-xl mx-auto'
  if (align === 'right') return 'max-w-xl ml-auto'
  return 'max-w-xl'
})

const mirrorButtonContainerClasses = computed(() => {
  const align = props.modelValue.textAlign ?? 'left'
  return {
    'justify-start': align === 'left',
    'justify-center': align === 'center',
    'justify-end': align === 'right'
  }
})

const mirrorStatsContainerClasses = computed(() => {
  const align = props.modelValue.textAlign ?? 'left'
  return {
    'justify-start': align === 'left',
    'justify-center': align === 'center',
    'justify-end': align === 'right'
  }
})
</script>
