import { ref } from 'vue'

const STORAGE_KEY = 'portfolio-theme'
const isDark = ref(false)
let initialized = false

function applyClass(dark) {
  if (typeof document === 'undefined') return
  const root = document.documentElement
  root.classList.toggle('dark', dark)
  root.style.colorScheme = dark ? 'dark' : 'light'
}

function initTheme() {
  if (initialized || typeof window === 'undefined') return
  initialized = true
  const saved = localStorage.getItem(STORAGE_KEY)
  isDark.value = saved === 'dark'
  applyClass(isDark.value)
}

function toggleTheme() {
  isDark.value = !isDark.value
  applyClass(isDark.value)
  localStorage.setItem(STORAGE_KEY, isDark.value ? 'dark' : 'light')
}

export function useTheme() {
  initTheme()
  return { isDark, toggleTheme }
}
