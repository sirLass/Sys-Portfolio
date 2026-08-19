import { ref, watch } from 'vue'

const STORAGE_KEY = 'portfolio_visibility'

// Default visibility: everything is visible by default
const defaultVisibility = {
  hero: {
    greeting: true,
    name: true,
    title: true,
    description: true,
    profileImage: true,
    stats: true,
    socials: true,
  },
  about: {
    sectionLabel: true,
    mainHeading: true,
    paragraph1: true,
    paragraph2: true,
    name: true,
    email: true,
    location: true,
    status: true,
    cvButton: true,
    profileImage: true,
  },
  skills: {
    sectionLabel: true,
    mainHeading: true,
    description: true,
    designSkills: true,
    developmentSkills: true,
    tools: true,
  },
  projects: {
    sectionLabel: true,
    mainHeading: true,
    description: true,
    projects: true,
  },
  experience: {
    sectionLabel: true,
    mainHeading: true,
    timeline: true,
  },
  gallery: {
    sectionLabel: true,
    mainHeading: true,
    gallery: true,
  },
  contact: {
    sectionLabel: true,
    mainHeading: true,
    form: true,
    info: true,
  },
}

function loadVisibility() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      const parsed = JSON.parse(saved)
      // Merge with defaults to ensure new fields are always visible
      const merged = {}
      for (const section of Object.keys(defaultVisibility)) {
        merged[section] = { ...defaultVisibility[section], ...(parsed[section] || {}) }
      }
      return merged
    }
  } catch (e) {
    console.warn('Error loading visibility settings:', e)
  }
  return JSON.parse(JSON.stringify(defaultVisibility))
}

// Shared reactive state (singleton)
const visibility = ref(loadVisibility())

// Persist on every change
watch(
  visibility,
  (val) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(val))
    } catch (e) {
      console.warn('Error saving visibility settings:', e)
    }
  },
  { deep: true }
)

/**
 * Composable to access and mutate visibility settings.
 *
 * Usage in admin components:
 *   const { vis, toggle, isHidden } = useVisibility()
 *   // toggle('hero', 'name')
 *   // isHidden('hero', 'name')
 *
 * Usage in public components:
 *   const { isHidden } = useVisibility()
 *   // v-if="!isHidden('hero', 'name')"
 */
export function useVisibility() {
  function toggle(section, field) {
    if (visibility.value[section] && field in visibility.value[section]) {
      visibility.value[section][field] = !visibility.value[section][field]
    }
  }

  function setField(section, field, value) {
    if (visibility.value[section]) {
      visibility.value[section][field] = value
    }
  }

  function isHidden(section, field) {
    return visibility.value[section]?.[field] === false
  }

  function resetToDefaults() {
    visibility.value = JSON.parse(JSON.stringify(defaultVisibility))
  }

  return {
    vis: visibility,
    toggle,
    setField,
    isHidden,
    resetToDefaults,
    defaultVisibility,
  }
}
