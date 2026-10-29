<template>
  <div class="skill-pill" :title="titleText || null">
    <img
      v-if="icon && !imgFailed"
      :src="icon"
      :alt="name"
      width="20"
      height="20"
      loading="lazy"
      decoding="async"
      class="skill-pill__icon"
      :class="{ 'skill-pill__icon--invert': isInvertedIcon }"
      @error="imgFailed = true"
    />
    <!-- Fallback: neutral monogram tile instead of a wrong logo -->
    <span v-else class="skill-pill__monogram" aria-hidden="true">{{ monogram }}</span>

    <span class="skill-pill__name">{{ name }}</span>

    <!-- Level meter: quantity of dots (not color alone) carries the meaning -->
    <span v-if="showLevel && dots > 0" class="skill-pill__meter" aria-hidden="true">
      <span
        v-for="i in 5"
        :key="i"
        class="skill-pill__dot"
        :class="{ 'skill-pill__dot--on': i <= dots }"
      ></span>
    </span>
    <span v-if="showLevel && level" class="sr-only">Level: {{ level }}</span>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  name: { type: String, required: true },
  level: { type: String, default: '' },
  icon: { type: String, default: null },
  // Marquee pills hide the meter (levels are surfaced in the groups below)
  showLevel: { type: Boolean, default: true }
})

const imgFailed = ref(false)

// Canonical levels + common aliases -> filled dots out of 5
const LEVEL_DOTS = {
  beginner: 1,
  elementary: 1,
  intermediate: 2,
  moderate: 2,
  advanced: 3,
  proficient: 3,
  expert: 4,
  master: 4,
  professional: 5,
  senior: 5
}

const dots = computed(() => LEVEL_DOTS[(props.level || '').trim().toLowerCase()] || 0)

const monogram = computed(() => {
  const words = (props.name || '')
    .replace(/[^a-zA-Z0-9+#]/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
  if (words.length === 0) return '?'
  if (words.length >= 2) return (words[0][0] + words[1][0]).toUpperCase()
  return words[0].slice(0, 2).toUpperCase()
})

// simple-icons serves black glyphs; invert them only on light pills
const isInvertedIcon = computed(() => (props.icon || '').includes('simple-icons'))

const titleText = computed(() => (props.level ? `${props.name} · ${props.level}` : ''))
</script>

<style scoped>
.skill-pill {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-height: 40px;
  padding: 0 14px;
  border-radius: 999px;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  transition: border-color 0.15s ease, transform 0.15s ease;
}

.skill-pill:hover {
  border-color: rgba(var(--primary-rgb), 0.45);
  transform: translateY(-1px);
}

.skill-pill:active {
  transform: translateY(0);
}

html.dark .skill-pill {
  background: #12141c;
  border-color: rgba(255, 255, 255, 0.1);
}

html.dark .skill-pill:hover {
  border-color: rgba(var(--primary-rgb), 0.55);
}

.skill-pill__icon {
  width: 20px;
  height: 20px;
  flex: none;
  object-fit: contain;
}

/* simple-icons glyphs are black on transparent -> flip on light pills only */
.skill-pill__icon--invert {
  filter: invert(1);
}

html.dark .skill-pill__icon--invert {
  filter: none;
}

.skill-pill__monogram {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: none;
  width: 20px;
  height: 20px;
  border-radius: 6px;
  background: var(--primary-50);
  color: var(--primary-700);
  font-size: 9px;
  font-weight: 600;
  line-height: 1;
}

html.dark .skill-pill__monogram {
  background: var(--primary-100);
  color: var(--primary-300);
}

.skill-pill__name {
  font-size: 0.875rem;
  font-weight: 500;
  color: #292524;
  white-space: nowrap;
}

html.dark .skill-pill__name {
  color: #e7e5e4;
}

.skill-pill__meter {
  display: inline-flex;
  align-items: center;
  gap: 3px;
}

.skill-pill__dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #d6d3d1;
}

html.dark .skill-pill__dot {
  background: rgba(255, 255, 255, 0.22);
}

.skill-pill__dot--on {
  background: var(--primary-500);
}
</style>
