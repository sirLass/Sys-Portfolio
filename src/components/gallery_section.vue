<template>
  <section id="Gallery" class="py-24 bg-[#f6f5f2] dark:bg-[#0f1013] transition-colors duration-300 relative overflow-hidden">
    <div class="max-w-7xl mx-auto px-6 relative z-10">
      <!-- Loading State -->
      <div v-if="isLoading" class="py-12">
        <div class="text-center mb-16 max-w-3xl mx-auto">
          <div class="h-5 w-36 bg-neutral-200 dark:bg-white/10 rounded animate-pulse mx-auto mb-4"></div>
          <div class="h-10 w-64 bg-neutral-200 dark:bg-white/10 rounded animate-pulse mx-auto mb-6"></div>
          <div class="h-4 w-96 max-w-full bg-neutral-200 dark:bg-white/10 rounded animate-pulse mx-auto"></div>
        </div>

        <!-- Skeleton Museum Wall Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
          <div
            v-for="i in 4"
            :key="i"
            class="p-3 sm:p-4 bg-[#fdfdfc] dark:bg-[#181a20] rounded-xl sm:rounded-2xl border border-black/[0.06] dark:border-white/[0.06] shadow-sm"
            :class="i === 2 ? 'sm:col-span-2 lg:col-span-2' : 'col-span-1'"
          >
            <div
              class="bg-neutral-200 dark:bg-white/10 rounded-lg sm:rounded-xl animate-pulse"
              :class="i === 2 ? 'aspect-[16/9]' : 'aspect-[4/3]'"
            ></div>
            <div class="mt-3.5 pt-2.5 border-t border-black/[0.05] dark:border-white/[0.05] space-y-2">
              <div class="h-4 w-32 bg-neutral-200 dark:bg-white/10 rounded animate-pulse"></div>
              <div class="h-3 w-48 bg-neutral-100 dark:bg-white/5 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Loaded Gallery -->
      <div v-else>
        <!-- Section Header -->
        <div v-if="!isHidden('gallery', 'sectionLabel') || !isHidden('gallery', 'mainHeading')" class="text-center mb-16 max-w-3xl mx-auto">
          <span v-if="!isHidden('gallery', 'sectionLabel')" class="text-primary-600 dark:text-primary-400 font-semibold text-sm uppercase tracking-[0.2em] block mb-4">
            {{ galleryData.sectionLabel }}
          </span>
          <h2 v-if="!isHidden('gallery', 'mainHeading')" class="text-4xl lg:text-5xl font-black text-gray-900 dark:text-white mb-6 font-outfit">
            {{ galleryData.mainHeading }}
          </h2>
          <p v-if="!isHidden('gallery', 'gallery')" class="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            {{ galleryData.description }}
          </p>
        </div>

        <!-- Museum Wall Grid -->
        <div
          v-if="galleryData?.images?.length"
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 grid-flow-dense"
        >
          <button
            v-for="(img, idx) in galleryData.images"
            :key="idx"
            type="button"
            @click="openModal(idx)"
            class="group text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-4 rounded-xl sm:rounded-2xl"
            :class="getItemSpanClass(idx)"
          >
            <!-- Framed Art Piece with Generous Mat Border -->
            <div class="p-3 sm:p-4 bg-[#fdfdfc] dark:bg-[#181a20] rounded-xl sm:rounded-2xl border border-black/[0.07] dark:border-white/[0.08] shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.4)] transition-all duration-300 ease-out group-hover:-translate-y-1.5 group-hover:shadow-[0_16px_40px_rgb(0,0,0,0.12)] dark:group-hover:shadow-[0_16px_40px_rgb(0,0,0,0.6)]">
              <!-- Inset Photo Container -->
              <div
                class="overflow-hidden rounded-lg sm:rounded-xl border border-black/[0.04] dark:border-white/[0.04] bg-neutral-100 dark:bg-neutral-900 relative"
                :class="getImageAspectClass(idx)"
              >
                <img
                  :src="img.url"
                  :alt="img.alt || img.title"
                  class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  loading="lazy"
                />
              </div>

              <!-- Museum Wall Placard (Printed-label plaque) -->
              <div class="mt-3.5 pt-2.5 px-1 border-t border-black/[0.05] dark:border-white/[0.05]">
                <div class="flex items-baseline justify-between gap-2">
                  <h4 class="text-xs sm:text-sm font-semibold tracking-tight text-neutral-800 dark:text-neutral-200 truncate font-sans">
                    {{ img.title }}
                  </h4>
                  <span
                    v-if="img.linkedProjectTitle"
                    class="text-[9px] uppercase tracking-widest text-primary-600 dark:text-primary-400 font-medium flex-shrink-0"
                  >
                    Project
                  </span>
                </div>
                <p v-if="img.caption" class="text-[11px] sm:text-xs text-neutral-500 dark:text-neutral-400 font-light leading-relaxed mt-1 line-clamp-2">
                  {{ img.caption }}
                </p>
              </div>
            </div>
          </button>
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-20">
          <div class="text-neutral-400 dark:text-neutral-500 mb-4">
            <svg class="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 class="text-lg font-medium text-neutral-600 dark:text-neutral-300 mb-1">No artwork on display</h3>
          <p class="text-xs text-neutral-400 dark:text-neutral-500">Gallery pieces will appear here once added.</p>
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
import { ref, computed, onMounted } from 'vue'
import { supabase } from '../supabase'
import { useVisibility } from '../composables/useVisibility'

const { isHidden } = useVisibility()
const galleryData = ref(null)
const isLoading = ref(true)

// Modal State
const isModalOpen = ref(false)
const selectedImageIndex = ref(0)

// Curated span logic for museum wall rhythm
const getItemSpanClass = (idx) => {
  if (idx % 6 === 1 || idx % 6 === 4) {
    return 'sm:col-span-2 lg:col-span-2'
  }
  return 'col-span-1'
}

// Aspect ratio variations for museum frames
const getImageAspectClass = (idx) => {
  if (idx % 6 === 1 || idx % 6 === 4) {
    return 'aspect-[16/10] sm:aspect-[16/9]'
  }
  if (idx % 3 === 2) {
    return 'aspect-[4/5]'
  }
  return 'aspect-[4/3]'
}

// Default dynamic mockup images to wow the user out-of-the-box
const setMockData = () => {
  galleryData.value = {
    sectionLabel: 'Gallery Showcase',
    mainHeading: 'Captured Moments & Creations',
    description: 'A curated museum-wall exhibition featuring our favorite design iterations, engineering snapshots, and architectural compositions.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1000&auto=format&fit=crop',
        title: 'Modern Coding Station',
        caption: 'A clean, high-productivity developer workspace with ambient neon glow, mechanical keyboards, and crisp screen displays.',
        alt: 'Workspace setup',
        linkedProjectTitle: ''
      },
      {
        url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1000&auto=format&fit=crop',
        title: 'Minimalist Tech Design',
        caption: 'A clean aesthetic illustrating our design process, visual wireframes, and responsive component systems.',
        alt: 'Laptop and design assets',
        linkedProjectTitle: ''
      },
      {
        url: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=1000&auto=format&fit=crop',
        title: 'User Interface Blueprinting',
        caption: 'Detailed vector components, clean spacing systems, and systematic UI architecture assembled for efficiency.',
        alt: 'Wireframes on display',
        linkedProjectTitle: ''
      },
      {
        url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop',
        title: 'Algorithmic Networks',
        caption: 'Visualizing structural flows, database queries, and serverless architectures in digital environments.',
        alt: 'Digital network connection',
        linkedProjectTitle: ''
      }
    ]
  }
}

const modalImage = computed(() => {
  if (!galleryData.value?.images || galleryData.value.images.length === 0) {
    return { url: '', title: '', caption: '', alt: '', linkedProjectTitle: '' }
  }
  return galleryData.value.images[selectedImageIndex.value]
})

// Modal Lightbox Actions
const openModal = (idx) => {
  if (!galleryData.value?.images?.length) return
  selectedImageIndex.value = idx % galleryData.value.images.length
  isModalOpen.value = true
  document.body.style.overflow = 'hidden' // Lock background scrolling
}

const closeModal = () => {
  isModalOpen.value = false
  document.body.style.overflow = '' // Restore background scrolling
}

const modalNext = () => {
  if (!galleryData.value?.images?.length) return
  selectedImageIndex.value = (selectedImageIndex.value + 1) % galleryData.value.images.length
}

const modalPrev = () => {
  if (!galleryData.value?.images?.length) return
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

      // Dispatch a CustomEvent that projects_section.vue can listen to
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
          sectionLabel: data.section_label || 'Gallery Showcase',
          mainHeading: data.main_heading || 'Captured Moments',
          description: data.description || '',
          images: data.images || []
        }
        isLoading.value = false
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
      return
    } catch (e) {
      console.error('Error parsing gallery local storage data:', e)
    }
  }

  // Fallback to high quality mock data
  setMockData()
  isLoading.value = false
}

onMounted(() => {
  loadData()
})
</script>

<style scoped>
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
