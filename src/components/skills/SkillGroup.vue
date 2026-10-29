<template>
  <section class="skill-group">
    <header class="skill-group__header">
      <span class="skill-group__icon">
        <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.75" aria-hidden="true">
          <path
            v-for="(d, i) in iconPaths"
            :key="i"
            stroke-linecap="round"
            stroke-linejoin="round"
            :d="d"
          />
        </svg>
      </span>
      <h3 class="skill-group__title">{{ title }}</h3>
      <span class="skill-group__count">{{ countLabel }}</span>
    </header>

    <ul class="skill-group__list">
      <li v-for="(item, index) in items" :key="`${item.name}-${index}`">
        <SkillPill :name="item.name" :level="item.level" :icon="item.icon" />
      </li>
    </ul>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import SkillPill from './SkillPill.vue'

const props = defineProps({
  title: { type: String, required: true },
  // Items are pre-shaped as { name, level, icon } by the parent
  items: { type: Array, default: () => [] },
  iconPaths: { type: Array, default: () => [] }
})

const countLabel = computed(
  () => `${props.items.length} ${props.items.length === 1 ? 'skill' : 'skills'}`
)
</script>

<style scoped>
.skill-group__header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #e7e5e4;
}

html.dark .skill-group__header {
  border-top-color: rgba(255, 255, 255, 0.1);
}

.skill-group__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: none;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: var(--primary-50);
  color: var(--primary-600);
}

html.dark .skill-group__icon {
  background: var(--primary-100);
  color: var(--primary-400);
}

.skill-group__title {
  font-size: 1rem;
  font-weight: 600;
  color: #1c1917;
}

html.dark .skill-group__title {
  color: #f5f5f4;
}

.skill-group__count {
  margin-left: auto;
  font-size: 0.75rem;
  font-weight: 500;
  color: #78716c;
  white-space: nowrap;
}

html.dark .skill-group__count {
  color: #a8a29e;
}

.skill-group__list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
</style>
