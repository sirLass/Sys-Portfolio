<script setup>
import { ref, onMounted } from 'vue'

const isVisible = ref(true)
const isFading = ref(false)

onMounted(() => {
  // Wait for the animation to play out (approx 2.5s based on the CSS delays)
  setTimeout(() => {
    isFading.value = true
    setTimeout(() => {
      isVisible.value = false
    }, 800) // Duration of the fade out
  }, 4000)
})
</script>

<template>
  <div 
    v-if="isVisible" 
    class="loading-screen"
    :class="{ 'fade-out': isFading }"
  >
    <div class="logo-wrapper">
      <div class="logo-container floating">
        <div class="glow-effect"></div>
        <div class="letter-s">S</div>
        <div class="letter-l">L</div>
      </div>
    </div>
    
    <div class="subtitle mt-8 text-center">
      <h1 class="title">sir Lass</h1>
      <p class="tagline">Design X Develop</p>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap');

.loading-screen {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #faf8f5;
  font-family: 'Playfair Display', serif;
  transition: opacity 0.8s ease-out;
}

.fade-out {
  opacity: 0;
  pointer-events: none;
}

.logo-container {
  position: relative;
  width: 300px;
  height: 300px;
}

.letter-s {
  position: absolute;
  font-size: 220px;
  font-weight: 700;
  color: var(--primary, #2d1b4e);
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  opacity: 0;
  animation: slideInS 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  z-index: 2;
}

.letter-l {
  position: absolute;
  font-size: 220px;
  font-weight: 700;
  color: var(--secondary, #2d1b4e);
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  opacity: 0;
  animation: slideInL 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  animation-delay: 0.3s;
  z-index: 1;
}

@keyframes slideInS {
  0% {
    opacity: 0;
    transform: translateY(-50%) translateX(-80px) rotate(-15deg) scale(0.8);
  }
  100% {
    opacity: 1;
    transform: translateY(-50%) translateX(0) rotate(0deg) scale(1);
  }
}

@keyframes slideInL {
  0% {
    opacity: 0;
    transform: translateY(-50%) translateX(80px) rotate(15deg) scale(0.8);
  }
  100% {
    opacity: 1;
    transform: translateY(-50%) translateX(0) rotate(0deg) scale(1);
  }
}

.glow-effect {
  position: absolute;
  inset: -20px;
  background: radial-gradient(circle, var(--primary-light, rgba(45, 27, 78, 0.1)) 0%, transparent 70%);
  opacity: 0;
  animation: fadeInGlow 1.5s ease-out forwards;
  animation-delay: 0.8s;
  pointer-events: none;
}

@keyframes fadeInGlow {
  0% {
    opacity: 0;
    transform: scale(0.8);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.floating {
  animation: float 6s ease-in-out infinite;
  animation-delay: 1.5s;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

.subtitle {
  opacity: 0;
  animation: fadeInUp 1s ease-out forwards;
  animation-delay: 1.2s;
}

.title {
  font-size: 1.875rem;
  line-height: 2.25rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--primary, #2d1b4e);
  margin: 0;
}

.tagline {
  margin-top: 0.5rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  letter-spacing: 0.05em;
  opacity: 0.6;
  color: var(--secondary, #2d1b4e);
}

@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
