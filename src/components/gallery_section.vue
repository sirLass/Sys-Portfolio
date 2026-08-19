<template>
  <section id="Gallery" class="py-24 bg-white relative overflow-hidden">
    <!-- Background Gradients for Premium Touch -->
    <div class="absolute top-1/4 -left-1/4 w-96 h-96 bg-primary-100/30 rounded-full blur-[120px] pointer-events-none"></div>
    <div class="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-indigo-100/30 rounded-full blur-[120px] pointer-events-none"></div>

    <div class="max-w-7xl mx-auto px-6 relative z-10">
      <!-- Loading State -->
      <div v-if="isLoading" class="text-center py-20">
        <div class="h-6 w-32 bg-gray-100 rounded animate-pulse mx-auto mb-4"></div>
        <div class="h-10 w-64 bg-gray-100 rounded animate-pulse mx-auto mb-6"></div>
        <div class="h-4 w-96 bg-gray-100 rounded animate-pulse mx-auto mb-12"></div>
        <div class="flex gap-6 overflow-hidden">
          <div v-for="i in 3" :key="i" class="w-80 h-96 bg-gray-100 rounded-3xl animate-pulse flex-shrink-0"></div>
        </div>
      </div>

      <!-- Loaded Gallery -->
      <div v-else>
        <!-- Section Header -->
        <div v-if="!isHidden('gallery', 'sectionLabel') || !isHidden('gallery', 'mainHeading')" class="text-center mb-16 max-w-3xl mx-auto">
          <span v-if="!isHidden('gallery', 'sectionLabel')" class="text-primary-600 font-semibold text-sm uppercase tracking-[0.2em] block mb-4">
            {{ galleryData.sectionLabel }}
          </span>
          <h2 v-if="!isHidden('gallery', 'mainHeading')" class="text-4xl lg:text-5xl font-black text-gray-900 mb-6 font-outfit">
            {{ galleryData.mainHeading }}
          </h2>
          <p v-if="!isHidden('gallery', 'gallery')" class="text-lg text-gray-600 leading-relaxed">
            {{ galleryData.description }}
          </p>
          
          <!-- Auto-Slide Controls Indicators -->
          <div class="mt-6 flex items-center justify-center gap-3">
            <span class="inline-flex items-center gap-1.5 px-3 py-1 bg-primary-50 rounded-full text-xs font-semibold text-primary-700 border border-primary-100/50">
              <span class="w-1.5 h-1.5 bg-primary-600 rounded-full animate-ping"></span>
              Infinite Loop Active
            </span>
          </div>
        </div>

        <!-- Horizontal Carousel Wrapper with Fading Gradients -->
        <div class="relative overflow-hidden rounded-[2.5rem]">
          <!-- Left side fading gradient overlay -->
          <div 
            class="absolute left-0 top-0 bottom-0 w-24 md:w-48 pointer-events-none z-20"
            style="background: linear-gradient(to right, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.9) 25%, rgba(255, 255, 255, 0) 100%);"
          ></div>

          <!-- Right side fading gradient overlay -->
          <div 
            class="absolute right-0 top-0 bottom-0 w-24 md:w-48 pointer-events-none z-20"
            style="background: linear-gradient(to left, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0.9) 25%, rgba(255, 255, 255, 0) 100%);"
          ></div>

          <!-- Horizontal Carousel Track -->
          <div 
            ref="galleryScrollRef"
            class="w-full flex items-center gap-8 overflow-x-auto scrollbar-hide snap-x py-6 px-16"
            style="scrollbar-width: none; -ms-overflow-style: none;"
            @mouseenter="pauseScroll"
            @mouseleave="resumeScroll"
          >
            <!-- Duplicated images rendering for seamless infinite looping scroll -->
            <div 
              v-for="(img, idx) in displayImages" 
              :key="idx"
              @click="openModal(idx)"
              class="w-72 md:w-80 h-[26rem] flex-shrink-0 snap-start relative group rounded-[2rem] overflow-hidden bg-gradient-to-tr from-gray-900 to-gray-800 border border-gray-100/10 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2"
            >
              <!-- Glass Shine Reflection -->
              <div class="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none z-10"></div>

              <!-- Magnifying Zoom Overlay on Hover -->
              <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center z-20 gap-2">
                <div class="p-3 bg-white/20 backdrop-blur-md rounded-full border border-white/30 text-white transform scale-90 group-hover:scale-100 transition-all duration-300 shadow-lg">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                  </svg>
                </div>
                <span class="text-[10px] font-black text-white uppercase tracking-widest">Click to Expand</span>
              </div>

              <!-- Image -->
              <img 
                :src="img.url" 
                :alt="img.alt || img.title" 
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />

              <!-- Overlay Details Banner at Card Bottom -->
              <div class="absolute bottom-5 left-5 right-5 p-5 bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl text-left z-20 shadow-xl transition-all duration-300 group-hover:translate-y-[-4px]">
                <h4 class="text-md font-bold text-white font-outfit mb-1 truncate">{{ img.title }}</h4>
                <p class="text-xs text-gray-200/90 leading-relaxed truncate">{{ img.caption }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Solid White Lightbox Modal Window -->
    <Transition name="modal-fade">
      <div 
        v-if="isModalOpen" 
        class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-md"
        @click.self="closeModal"
      >
        <div class="relative bg-white rounded-[2.5rem] overflow-hidden max-w-4xl w-full shadow-2xl border border-gray-200/20 flex flex-col md:flex-row max-h-[90vh] md:max-h-[80vh] animate-in fade-in zoom-in-95 duration-300">
          
          <!-- Close Button -->
          <button 
            @click="closeModal"
            class="absolute top-4 right-4 z-50 p-2.5 bg-gray-900/10 hover:bg-gray-900/20 text-gray-800 rounded-full transition-colors active:scale-95"
            title="Close Gallery Window"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <!-- Image Display Side -->
          <div class="w-full md:w-3/5 relative bg-black flex items-center justify-center h-[40vh] md:h-auto">
            <img 
              :src="modalImage.url" 
              :alt="modalImage.alt || modalImage.title" 
              class="w-full h-full object-contain" 
            />
            
            <!-- Quick Navigation Controls inside the Modal -->
            <button 
              @click="modalPrev"
              class="absolute left-4 p-2 bg-black/40 hover:bg-black/60 border border-white/10 rounded-full text-white transition-colors active:scale-90"
              title="Previous Photo"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              @click="modalNext"
              class="absolute right-4 p-2 bg-black/40 hover:bg-black/60 border border-white/10 rounded-full text-white transition-colors active:scale-90"
              title="Next Photo"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <!-- Solid White Description / Metadata Panel Side -->
          <div class="w-full md:w-2/5 p-8 flex flex-col justify-between bg-white text-left overflow-y-auto">
            <div class="space-y-6">
              <div>
                <span class="text-xs font-bold text-primary-600 uppercase tracking-widest block mb-2">Detailed Showcase</span>
                <h3 class="text-2xl font-black text-gray-900 font-outfit leading-tight">{{ modalImage.title }}</h3>
              </div>
              <div class="h-px bg-gray-200/60"></div>
              <div>
                <h4 class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Description / Caption</h4>
                <p class="text-gray-600 text-sm leading-relaxed whitespace-pre-line">{{ modalImage.caption }}</p>
              </div>

              <!-- Linked Portfolio Project Action Box -->
              <div v-if="modalImage.linkedProjectTitle" class="p-5 bg-gradient-to-tr from-primary-50 to-indigo-50/50 rounded-2xl border border-primary-100/50 flex flex-col gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div class="flex items-center gap-2 text-primary-700">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                  <span class="text-xs font-black uppercase tracking-wider">Linked Portfolio Project</span>
                </div>
                <h5 class="text-sm font-bold text-gray-800 leading-tight">{{ modalImage.linkedProjectTitle }}</h5>
                <button 
                  @click="goToLinkedProject(modalImage.linkedProjectTitle)"
                  class="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-primary-600 hover:bg-primary-700 active:scale-95 text-white text-xs font-bold rounded-xl transition-all shadow-md hover:shadow-primary-600/20 cursor-pointer"
                >
                  <span>Explore Project Details</span>
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </div>

            <!-- Footer statistics inside the modal -->
            <div class="pt-6 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400 font-semibold mt-8">
              <span>Photo {{ selectedImageIndex + 1 }} of {{ galleryData.images?.length || 0 }}</span>
              <span class="inline-flex items-center gap-1.5 px-2 py-1 bg-gray-50 rounded text-[10px]">
                <span class="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                Active Link
              </span>
            </div>
          </div>

        </div>
      </div>
    </Transition>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { supabase } from '../supabase'
import { useVisibility } from '../composables/useVisibility'

const { isHidden } = useVisibility()
const galleryData = ref(null)
const isLoading = ref(true)
const galleryScrollRef = ref(null)

// Modal State
const isModalOpen = ref(false)
const selectedImageIndex = ref(0)

// Continuous scroll states
let animationFrameId = null
let isPaused = false

// Default dynamic mockup images to wow the user out-of-the-box
const setMockData = () => {
  galleryData.value = {
    sectionLabel: 'Interactive Gallery Showcase',
    mainHeading: 'Captured Moments & Creations',
    description: 'A beautiful, horizontal sliding carousel that showcases all custom images in a clean, scrollable layout.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop',
        title: 'Modern Coding Station',
        caption: 'A clean, high-productivity developer workspace with elegant ambient neon glow, custom mechanical keyboards, and crisp screen displays.',
        alt: 'Workspace setup',
        linkedProjectTitle: ''
      },
      {
        url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1000&auto=format&fit=crop',
        title: 'Minimalist Tech Design',
        caption: 'A professional and clean aesthetic illustrating our design process, visual wireframes, and beautiful dark layouts.',
        alt: 'Laptop and design assets',
        linkedProjectTitle: ''
      },
      {
        url: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=1000&auto=format&fit=crop',
        title: 'User Interface Blueprinting',
        caption: 'Detailed vector components, clean spacing systems, and Shopify style frameworks assembled for maximum systematic efficiency.',
        alt: 'Wireframes on display',
        linkedProjectTitle: ''
      },
      {
        url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop',
        title: 'Algorithmic Networks',
        caption: 'Visualizing structural flows, database queries, and serverless architectures in beautiful digital environments.',
        alt: 'Digital network connection',
        linkedProjectTitle: ''
      }
    ]
  }
}

// Double-duplicate images for smooth infinite wrap-around
const displayImages = computed(() => {
  if (!galleryData.value?.images?.length) return []
  const list = galleryData.value.images
  return [...list, ...list, ...list]
})

const modalImage = computed(() => {
  if (!galleryData.value?.images || galleryData.value.images.length === 0) {
    return { url: '', title: '', caption: '', alt: '', linkedProjectTitle: '' }
  }
  return galleryData.value.images[selectedImageIndex.value]
})

// Highly precise requestAnimationFrame Continuous Loop scrolling
const startContinuousScroll = () => {
  if (!galleryScrollRef.value || !galleryData.value?.images?.length) return
  const track = galleryScrollRef.value
  
  const scrollLoop = () => {
    if (isPaused) {
      animationFrameId = requestAnimationFrame(scrollLoop)
      return
    }
    
    const originalWidth = track.scrollWidth / 3
    
    // Slow, extremely premium continuous floating motion
    track.scrollLeft += 0.8
    
    // Seamless wrapping loop: if scroll reaches past 2 copies of the list, 
    // instantly offset it back to 1 copy of the list. Zero jumping!
    if (track.scrollLeft >= originalWidth * 2) {
      track.scrollLeft -= originalWidth
    }
    
    animationFrameId = requestAnimationFrame(scrollLoop)
  }
  
  // Set initial scroll offset inside the 2nd copy to allow smooth left/right scrolls
  const originalWidth = track.scrollWidth / 3
  if (track.scrollLeft === 0) {
    track.scrollLeft = originalWidth
  }
  
  animationFrameId = requestAnimationFrame(scrollLoop)
}

const stopContinuousScroll = () => {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
    animationFrameId = null
  }
}

// Pause and resume scroll triggers for hover interaction
const pauseScroll = () => {
  isPaused = true
}

const resumeScroll = () => {
  isPaused = false
}

// Modal Lightbox Actions
const openModal = (idx) => {
  const originalLength = galleryData.value.images.length
  selectedImageIndex.value = idx % originalLength
  isModalOpen.value = true
  isPaused = true // Stop scroll when modal is active
  document.body.style.overflow = 'hidden' // Lock background scrolling
}

const closeModal = () => {
  isModalOpen.value = false
  isPaused = false // Resume scroll
  document.body.style.overflow = '' // Restore background scrolling
}

const modalNext = () => {
  if (!galleryData.value?.images) return
  selectedImageIndex.value = (selectedImageIndex.value + 1) % galleryData.value.images.length
}

const modalPrev = () => {
  if (!galleryData.value?.images) return
  selectedImageIndex.value = (selectedImageIndex.value - 1 + galleryData.value.images.length) % galleryData.value.images.length
}

// Navigates and focuses linked project card
const goToLinkedProject = (projectTitle) => {
  closeModal()
  
  // Wait briefly for modal close exit animation
  setTimeout(() => {
    const projectsSection = document.getElementById('Projects')
    if (projectsSection) {
      const headerOffset = 80 // Account for sticky navbar height
      const elementPosition = projectsSection.getBoundingClientRect().top + window.pageYOffset
      const offsetPosition = elementPosition - headerOffset
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
      
      // Dispatch a CustomEvent that projects_section.vue can listen to,
      // letting it automatically set filters or highlight the matching project card!
      const event = new CustomEvent('select-project', { 
        detail: { title: projectTitle } 
      })
      window.dispatchEvent(event)
    }
  }, 400)
}

const loadData = async () => {
  isLoading.value = true
  
  // Try fetching from Supabase database
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('gallery_section')
        .select('*')
        .limit(1)
        .maybeSingle()
        
      if (!error && data) {
        galleryData.value = {
          sectionLabel: data.section_label || 'Interactive Gallery',
          mainHeading: data.main_heading || 'Captured Moments',
          description: data.description || '',
          images: data.images || []
        }
        isLoading.value = false
        
        // Wait for DOM compilation and then start infinite scroll
        setTimeout(() => {
          startContinuousScroll()
        }, 300)
        return
      }
    } catch (e) {
      console.error('Error fetching gallery from Supabase:', e)
    }
  }

  // Try fetching from local storage fallback
  const saved = localStorage.getItem('gallerySectionData')
  if (saved) {
    try {
      galleryData.value = JSON.parse(saved)
      isLoading.value = false
      setTimeout(() => {
        startContinuousScroll()
      }, 300)
      return
    } catch (e) {
      console.error('Error parsing gallery local storage data:', e)
    }
  }

  // Fallback to high quality mock data
  setMockData()
  isLoading.value = false
  setTimeout(() => {
    startContinuousScroll()
  }, 300)
}

onMounted(() => {
  loadData()
})

onUnmounted(() => {
  stopContinuousScroll()
})
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

/* Lightbox Modal Transitions */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
  transform: scale(0.96) translateY(5px);
}
</style>
