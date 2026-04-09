<script setup>
import { ref, onMounted, computed, provide } from 'vue'
import { supabase } from './supabase'
import LoadingScreen from './components/LoadingScreen.vue'
import ChatBot from './components/ChatBot.vue'

const currentPalette = ref({
  primary: '#008060',
  secondary: '#004c3f',
  accent: '#95bf47'
})

const hexToRgb = (hex) => {
  if (!hex) return '0 0 0'
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? `${parseInt(result[1], 16)} ${parseInt(result[2], 16)} ${parseInt(result[3], 16)}` : '0 0 0'
}

const themeVariables = computed(() => {
  const p = currentPalette.value.primary
  const s = currentPalette.value.secondary
  const a = currentPalette.value.accent
  
  return {
    '--primary': p,
    '--secondary': s,
    '--accent': a,
    '--primary-rgb': hexToRgb(p),
    '--secondary-rgb': hexToRgb(s),
    '--accent-rgb': hexToRgb(a),
    '--primary-light': `color-mix(in srgb, ${p}, transparent 90%)`,
    '--primary-50': `color-mix(in srgb, ${p}, white 95%)`,
    '--primary-100': `color-mix(in srgb, ${p}, white 90%)`,
    '--primary-200': `color-mix(in srgb, ${p}, white 80%)`,
    '--primary-300': `color-mix(in srgb, ${p}, white 60%)`,
    '--primary-400': `color-mix(in srgb, ${p}, white 40%)`,
    '--primary-500': p,
    '--primary-600': `color-mix(in srgb, ${p}, black 10%)`,
    '--primary-700': `color-mix(in srgb, ${p}, black 20%)`,
    '--primary-800': `color-mix(in srgb, ${p}, black 30%)`,
    '--primary-900': `color-mix(in srgb, ${p}, black 40%)`
  }
})

const fetchTheme = async () => {
  if (!supabase) return
  try {
    const { data, error } = await supabase
      .from('personal_info')
      .select('palette')
      .order('updated_at', { ascending: false })
      .limit(1)
      .maybeSingle()
    
    if (data && data.palette) {
      const p = typeof data.palette === 'string' ? JSON.parse(data.palette) : data.palette
      currentPalette.value = p
    }
  } catch (e) {
    console.error('Error fetching global theme:', e)
  }
}

const updateTheme = (newPalette) => {
  if (newPalette) {
    currentPalette.value = newPalette
  }
}

provide('updateGlobalTheme', updateTheme)

onMounted(fetchTheme)
</script>

<template>
  <LoadingScreen :style="themeVariables" />
  <div :style="themeVariables" class="min-h-screen">
    <router-view />
    <ChatBot />
  </div>
</template>

<style>
:root {
  /* Default variables if not set */
  --primary: #008060;
  --secondary: #004c3f;
  --accent: #95bf47;
}

/* Update gradient-text to use dynamic variables */
.gradient-text {
  background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%) !important;
  -webkit-background-clip: text !important;
  -webkit-text-fill-color: transparent !important;
  background-clip: text !important;
}

/* Ensure common elements use the theme */
a:hover {
  color: var(--primary);
}
</style>
