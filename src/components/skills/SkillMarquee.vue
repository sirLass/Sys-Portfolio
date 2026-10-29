<template>
  <!-- Entire band is a visual duplicate of the groups below -> hidden from screen readers -->
  <div class="skill-marquee" aria-hidden="true">
    <div
      v-for="(displayRow, rowIndex) in displayRows"
      :key="`marquee-row-${rowIndex}`"
      class="skill-marquee__row"
      :style="{ '--marquee-duration': displayRow.duration }"
    >
      <div
        class="skill-marquee__track"
        :class="{ 'skill-marquee__track--reverse': rowIndex % 2 === 1 }"
      >
        <!-- Two identical sets => translateX(-50%) loops seamlessly -->
        <div class="skill-marquee__set">
          <SkillPill
            v-for="(item, index) in displayRow.items"
            :key="`a-${index}`"
            :name="item.name"
            :level="item.level"
            :icon="item.icon"
            :show-level="false"
          />
        </div>
        <div class="skill-marquee__set">
          <SkillPill
            v-for="(item, index) in displayRow.items"
            :key="`b-${index}`"
            :name="item.name"
            :level="item.level"
            :icon="item.icon"
            :show-level="false"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import SkillPill from './SkillPill.vue'

const props = defineProps({
  // Array of rows; each row is an array of { name, level, icon }
  rows: { type: Array, default: () => [] }
})

// One set must be wider than the content column (max 1232px), otherwise the
// track's end shows a blank gap partway through the loop. Short rows repeat
// their items until the estimate clears a comfortable margin.
const TARGET_SET_WIDTH = 1400

const repeatItems = (row) => {
  const count = row?.length || 0
  if (count === 0) return []
  // Estimate: pill padding(28) + icon(20) + gap(8) + name at ~7.5px/char + spacing(12)
  const singlePassWidth = row.reduce(
    (total, item) => total + 80 + 7.5 * (item?.name?.length || 0),
    0
  )
  const repetitions = Math.min(16, Math.max(1, Math.ceil(TARGET_SET_WIDTH / singlePassWidth)))
  if (repetitions === 1) return row
  const items = []
  for (let i = 0; i < repetitions; i++) items.push(...row)
  return items
}

// Duration scales with final track length => roughly constant scroll speed
const durationFor = (itemCount) =>
  `${Math.round(Math.min(64, Math.max(26, itemCount * 4.5)))}s`

const displayRows = computed(() =>
  props.rows.map((row) => {
    const items = repeatItems(row)
    return { items, duration: durationFor(items.length) }
  })
)
</script>

<style scoped>
/* The section's single continuous animation: transform-only, 1 per visible row */
.skill-marquee {
  display: flex;
  flex-direction: column;
  gap: 12px;
  overflow: hidden;
  /* Edge fade so pills enter and leave softly */
  -webkit-mask-image: linear-gradient(to right, transparent 0%, #000 6%, #000 94%, transparent 100%);
  mask-image: linear-gradient(to right, transparent 0%, #000 6%, #000 94%, transparent 100%);
}

.skill-marquee__row {
  overflow: hidden;
}

.skill-marquee__track {
  display: flex;
  width: max-content;
  will-change: transform;
  animation: skill-marquee-scroll var(--marquee-duration, 40s) linear infinite;
}

/* Row 2 travels the opposite direction */
.skill-marquee__track--reverse {
  animation-direction: reverse;
}

.skill-marquee__set {
  display: flex;
  gap: 12px;
  /* trailing padding keeps both sets identical so the loop has no hiccup */
  padding-right: 12px;
}

/* Pause on hover and on keyboard focus */
.skill-marquee:hover .skill-marquee__track,
.skill-marquee:focus-within .skill-marquee__track {
  animation-play-state: paused;
}

@keyframes skill-marquee-scroll {
  from {
    transform: translate3d(0, 0, 0);
  }
  to {
    transform: translate3d(-50%, 0, 0);
  }
}

/* Static fallback: the groups below show every skill, name and level */
@media (prefers-reduced-motion: reduce) {
  .skill-marquee {
    display: none;
  }
}
</style>
