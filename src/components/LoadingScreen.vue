<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const isVisible = ref(true)
const isExiting = ref(false)
const phase = ref('mark')
const progress = ref(0)

const prefersReducedMotion = ref(false)
let rafId = 0
let timers = []

const progressLabel = computed(() => String(Math.round(progress.value)).padStart(2, '0'))

function later(fn, ms) {
  const id = setTimeout(fn, ms)
  timers.push(id)
  return id
}

function clearAllTimers() {
  timers.forEach(clearTimeout)
  timers = []
}

function lockScroll(lock) {
  document.documentElement.style.overflow = lock ? 'hidden' : ''
  document.body.style.overflow = lock ? 'hidden' : ''
}

function startProgress(duration) {
  const start = performance.now()
  const tick = (now) => {
    const t = Math.min((now - start) / duration, 1)
    const eased = 1 - Math.pow(1 - t, 3)
    progress.value = eased * 100
    if (t < 1) {
      rafId = requestAnimationFrame(tick)
    }
  }
  rafId = requestAnimationFrame(tick)
}

function exit() {
  // Cancel active animation frame loop upon exit
  if (rafId) cancelAnimationFrame(rafId)

  phase.value = 'exit'
  isExiting.value = true
  try {
    sessionStorage.setItem('portfolio-intro-seen', '1')
  } catch (_) {}

  later(() => {
    isVisible.value = false
    lockScroll(false)
  }, 700)
}

onMounted(() => {
  prefersReducedMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  lockScroll(true)

  // Safety net: force-hide after 5 seconds
  later(() => {
    if (isVisible.value) {
      isVisible.value = false
      lockScroll(false)
    }
  }, 5000)

  try {
    if (sessionStorage.getItem('portfolio-intro-seen') === '1') {
      isVisible.value = false
      lockScroll(false)
      return
    }
  } catch (_) {
    // sessionStorage blocked (e.g. private mode) — skip intro
    isVisible.value = false
    lockScroll(false)
    return
  }

  if (prefersReducedMotion.value) {
    phase.value = 'ready'
    progress.value = 100
    later(exit, 500)
    return
  }

  later(() => { phase.value = 'copy' }, 280)
  later(() => { phase.value = 'ready' }, 900)

  startProgress(1800)
  later(exit, 2000)
})

onUnmounted(() => {
  clearAllTimers()
  if (rafId) cancelAnimationFrame(rafId)
  lockScroll(false)
})
</script>

<template>
  <div
    v-if="isVisible"
    class="loading-screen"
    :class="[phase, { exiting: isExiting }]"
    role="status"
    aria-live="polite"
    aria-label="Loading portfolio"
  >
    <div class="atmosphere" aria-hidden="true">
      <div class="orb orb-a"></div>
      <div class="orb orb-b"></div>
      <div class="orb orb-c"></div>
      <div class="grid-fade"></div>
      <div class="grain"></div>
      <div class="vignette"></div>
    </div>

    <div class="stage">
      <div class="monogram">
        <div class="ring"></div>
        <div class="ring-inner"></div>
        <span class="letter letter-s">S</span>
        <span class="letter letter-l">L</span>
      </div>

      <div class="identity">
        <p class="eyebrow">Portfolio</p>
        <h1 class="title">
          <span class="word">sir</span>
          <span class="word accent">Lass</span>
        </h1>
        <div class="rule"></div>
        <p class="tagline">Design <span>×</span> Develop</p>
      </div>
    </div>

    <div class="footer-bar">
      <span class="status">Initializing</span>
      <div class="meter">
        <div class="meter-fill" :style="{ transform: `scaleX(${progress / 100})` }"></div>
      </div>
      <span class="counter">{{ progressLabel }}</span>
    </div>
  </div>
</template>

<style scoped>
.loading-screen {
  --ink: #1a1d27;
  --ink-soft: #3d4254;
  --wash: #f6f3ee;
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background:
    radial-gradient(1200px 700px at 50% -10%, color-mix(in srgb, var(--primary) 14%, transparent), transparent 58%),
    var(--wash);
  color: var(--ink);
  overflow: hidden;
  isolation: isolate;
}

:global(html.dark) .loading-screen {
  --wash: #0c0e14;
  --ink: #f3f1ec;
  --ink-soft: #c9c4bb;
  background:
    radial-gradient(1000px 640px at 50% -8%, color-mix(in srgb, var(--primary) 22%, transparent), transparent 55%),
    #0c0e14;
}

.atmosphere {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0;
  animation: orbIn 1.4s ease forwards;
}

.orb-a {
  width: 28rem;
  height: 28rem;
  left: -8%;
  top: 12%;
  background: color-mix(in srgb, var(--primary) 28%, transparent);
}

.orb-b {
  width: 22rem;
  height: 22rem;
  right: -6%;
  bottom: 8%;
  background: color-mix(in srgb, var(--secondary) 26%, transparent);
  animation-delay: 0.18s;
}

.orb-c {
  width: 14rem;
  height: 14rem;
  left: 42%;
  top: 58%;
  background: color-mix(in srgb, var(--accent, #95bf47) 18%, transparent);
  animation-delay: 0.32s;
}

.grid-fade {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(color-mix(in srgb, var(--ink) 6%, transparent) 1px, transparent 1px),
    linear-gradient(90deg, color-mix(in srgb, var(--ink) 6%, transparent) 1px, transparent 1px);
  background-size: 72px 72px;
  mask-image: radial-gradient(circle at center, black 18%, transparent 72%);
  opacity: 0.45;
}

.grain {
  position: absolute;
  inset: -20%;
  opacity: 0.09;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 160 160' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  animation: grain 1.2s steps(3) infinite;
  mix-blend-mode: multiply;
}

:global(html.dark) .grain {
  mix-blend-mode: overlay;
  opacity: 0.16;
}

.vignette {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at center, transparent 42%, color-mix(in srgb, var(--wash) 78%, black) 100%);
}

.stage {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.25rem;
}

.monogram {
  position: relative;
  width: 220px;
  height: 220px;
  display: grid;
  place-items: center;
}

.ring,
.ring-inner {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  opacity: 0;
  transform: scale(0.86);
}

.ring {
  border: 1px solid color-mix(in srgb, var(--ink) 18%, transparent);
  animation: ringIn 1.1s cubic-bezier(0.16, 1, 0.3, 1) 0.12s forwards;
}

.ring::before {
  content: '';
  position: absolute;
  inset: -1px;
  border-radius: inherit;
  border: 1px solid transparent;
  border-top-color: var(--primary);
  border-right-color: color-mix(in srgb, var(--primary) 40%, transparent);
  animation: spin 8s linear infinite;
  animation-delay: 0.6s;
}

.ring-inner {
  inset: 18px;
  border: 1px dashed color-mix(in srgb, var(--ink) 16%, transparent);
  animation: ringIn 1.1s cubic-bezier(0.16, 1, 0.3, 1) 0.28s forwards;
}

.letter {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 7.5rem;
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.06em;
}

.letter-s {
  color: var(--primary);
  z-index: 2;
  animation: revealS 0.9s cubic-bezier(0.16, 1, 0.3, 1) both;
}

.letter-l {
  color: var(--ink-soft);
  z-index: 1;
  mix-blend-mode: multiply;
  animation: revealL 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.16s both;
}

:global(html.dark) .letter-l {
  mix-blend-mode: screen;
  color: color-mix(in srgb, var(--primary) 45%, white);
}

.identity {
  text-align: center;
  animation: rise 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.28s both;
}

.eyebrow {
  margin: 0 0 0.55rem;
  font-family: Inter, system-ui, sans-serif;
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.42em;
  text-transform: uppercase;
  color: color-mix(in srgb, var(--ink) 55%, transparent);
}

.title {
  display: flex;
  justify-content: center;
  gap: 0.45rem;
  margin: 0;
  font-family: 'Playfair Display', serif;
  font-size: clamp(2rem, 4vw, 2.75rem);
  font-weight: 600;
  letter-spacing: 0.04em;
}

.word {
  display: inline-block;
}

.word.accent {
  color: var(--primary);
}

.rule {
  width: 0;
  height: 1px;
  margin: 1rem auto 0.85rem;
  background: linear-gradient(90deg, transparent, var(--primary), transparent);
  animation: drawRule 0.7s cubic-bezier(0.16, 1, 0.3, 1) 0.45s forwards;
}

.tagline {
  margin: 0;
  font-family: Inter, system-ui, sans-serif;
  font-size: 0.78rem;
  font-weight: 500;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: color-mix(in srgb, var(--ink) 62%, transparent);
}

.tagline span {
  color: var(--primary);
  padding: 0 0.2rem;
}

.footer-bar {
  position: absolute;
  left: 8%;
  right: 8%;
  bottom: 7%;
  z-index: 2;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 1.25rem;
  font-family: Inter, system-ui, sans-serif;
  opacity: 0;
  animation: rise 0.7s ease 0.35s forwards;
}

.status,
.counter {
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: color-mix(in srgb, var(--ink) 58%, transparent);
}

.counter {
  font-variant-numeric: tabular-nums;
  min-width: 2ch;
}

.meter {
  height: 1px;
  background: color-mix(in srgb, var(--ink) 12%, transparent);
  overflow: hidden;
}

.meter-fill {
  height: 100%;
  width: 100%;
  transform: scaleX(0);
  transform-origin: left center;
  background: var(--primary);
  box-shadow: 0 0 12px color-mix(in srgb, var(--primary) 55%, transparent);
  will-change: transform;
}

.exiting {
  pointer-events: none;
  animation: curtainUp 0.9s cubic-bezier(0.76, 0, 0.24, 1) forwards;
}

.exiting .stage {
  animation: settleOut 0.55s cubic-bezier(0.4, 0, 1, 1) forwards;
}

@keyframes orbIn {
  to { opacity: 0.85; }
}

@keyframes grain {
  0% { transform: translate(0, 0); }
  100% { transform: translate(-2%, 1%); }
}

@keyframes ringIn {
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@keyframes revealS {
  0% {
    opacity: 0;
    clip-path: inset(0 0 100% 0);
    transform: translate(-18px, 22px);
    filter: blur(8px);
  }
  100% {
    opacity: 1;
    clip-path: inset(0 0 0 0);
    transform: translate(-18px, 6px);
    filter: blur(0);
  }
}

@keyframes revealL {
  0% {
    opacity: 0;
    clip-path: inset(0 0 100% 0);
    transform: translate(22px, 12px);
    filter: blur(8px);
  }
  100% {
    opacity: 1;
    clip-path: inset(0 0 0 0);
    transform: translate(22px, -4px);
    filter: blur(0);
  }
}

@keyframes rise {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes drawRule {
  to { width: 7.5rem; }
}

@keyframes settleOut {
  to {
    opacity: 0;
    transform: translateY(-18px) scale(0.98);
    filter: blur(6px);
  }
}

@keyframes curtainUp {
  0% { clip-path: inset(0 0 0 0); }
  100% { clip-path: inset(0 0 100% 0); }
}

@media (max-width: 640px) {
  .monogram {
    width: 168px;
    height: 168px;
  }

  .letter {
    font-size: 5.4rem;
  }

  .footer-bar {
    left: 6%;
    right: 6%;
    gap: 0.75rem;
  }

  .status {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .orb,
  .ring,
  .ring-inner,
  .letter,
  .identity,
  .footer-bar,
  .grain,
  .ring::before {
    animation: none !important;
    opacity: 1 !important;
    transform: none !important;
    clip-path: none !important;
    filter: none !important;
  }

  .rule { 
    animation: none !important;
    width: 7.5rem !important; 
  }
  
  .meter-fill { 
    transform: scaleX(1) !important; 
  }
}
</style>