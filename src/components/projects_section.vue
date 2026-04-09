<template>
    <section id="Projects" class="py-24 bg-white">
        <div class="max-width-7xl mx-auto px-6">
            <!-- Loading State -->
            <div v-if="isLoading">
                <div class="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                    <div class="text-left max-w-2xl w-full">
                        <div class="h-6 w-32 bg-gray-200 rounded animate-pulse mb-4"></div>
                        <div class="h-12 w-64 bg-gray-200 rounded animate-pulse mb-6"></div>
                        <div class="space-y-3">
                            <div class="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                            <div class="h-4 w-4/5 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                    </div>
                    <div class="flex items-center gap-3">
                        <div class="w-14 h-14 bg-gray-200 rounded-2xl animate-pulse"></div>
                        <div class="w-14 h-14 bg-gray-200 rounded-2xl animate-pulse"></div>
                        <div class="h-10 w-px bg-gray-200 mx-2"></div>
                        <div class="w-28 h-12 bg-gray-200 rounded-2xl animate-pulse"></div>
                    </div>
                </div>
                <div class="flex gap-8 pb-8">
                    <div v-for="i in 3" :key="i" class="min-w-[320px] md:min-w-[400px] lg:min-w-[450px] flex-shrink-0 bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 h-[400px]">
                        <div class="h-64 bg-gray-200 animate-pulse"></div>
                        <div class="p-6 space-y-3">
                            <div class="h-6 w-40 bg-gray-200 rounded animate-pulse"></div>
                            <div class="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                            <div class="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
                            <div class="flex gap-2 pt-2">
                                <div v-for="j in 3" :key="j" class="h-6 w-16 bg-gray-200 rounded-full animate-pulse"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Error State -->
            <div v-else-if="hasError" class="text-center py-20 px-6">
                <div class="max-w-md mx-auto bg-white rounded-[2rem] p-10 shadow-xl border border-red-50">
                    <div class="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <svg class="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <h3 class="text-2xl font-bold text-gray-900 mb-2">Systems Offline</h3>
                    <p class="text-gray-500 mb-8 leading-relaxed">We're having trouble connecting to the database. Please verify your environment configuration.</p>
                </div>
            </div>

            <!-- Empty State -->
            <div v-else-if="!projectsData?.projects?.length" class="text-center py-20 px-6">
                <div class="max-w-md mx-auto bg-gray-50/50 backdrop-blur-sm rounded-[2rem] p-10 border-2 border-dashed border-gray-200">
                    <div class="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                        <svg class="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                        </svg>
                    </div>
                    <h3 class="text-xl font-bold text-gray-900 mb-2">No Projects Yet</h3>
                    <p class="text-gray-500 mb-8 leading-relaxed">Ready to showcase your work? Add your first project through the admin dashboard.</p>
                </div>
            </div>

            <!-- Loaded Data -->
            <div v-else>
                <!-- Section Header -->
                <div class="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                    <div class="text-left max-w-2xl">
                        <p class="text-primary-600 font-semibold text-lg mb-4">{{ projectsData.sectionLabel }}</p>
                        <h2 class="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">{{ projectsData.mainHeading }}</h2>
                        <p class="text-xl text-gray-600 leading-relaxed">
                            {{ projectsData.description }}
                        </p>
                    </div>
                    
                        <button 
                            @click="toggleAutoSlide"
                            :class="[
                                'flex items-center gap-2 px-6 py-3 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all shadow-sm active:scale-95',
                                isAutoSlide 
                                    ? 'bg-primary-600 text-white shadow-lg shadow-primary-200' 
                                    : 'bg-white text-gray-500 border border-gray-200'
                            ]"
                        >
                            <div v-if="isAutoSlide" class="w-1.5 h-1.5 bg-white rounded-full animate-ping"></div>
                            {{ isAutoSlide ? 'Auto: ON' : 'Auto: OFF' }}
                        </button>
                    </div>
                </div>
                
                <div class="relative group/carousel px-4" v-if="projectsData?.projects?.length > 0">
                    <!-- Previous Button - Overlay -->
                    <button 
                        v-if="projectsData?.projects?.length > 1"
                        @click="scrollPrev"
                        class="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-gray-100 text-gray-400 hover:text-primary-600 hover:bg-white transition-all shadow-xl active:scale-95 z-20 opacity-0 group-hover/carousel:opacity-100"
                        title="Previous Project"
                    >
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    <div 
                        ref="projectsScrollRef"
                        class="flex items-start gap-8 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4"
                        :class="{ 'justify-center': projectsData?.projects?.length === 1 }"
                        style="scrollbar-width: none; -ms-overflow-style: none;"
                        @mouseenter="stopAutoSlide"
                        @mouseleave="resumeAutoSlideIfOn"
                    >
                        <div
                            v-for="(project, index) in projectsData?.projects"
                            :key="index"
                            class="flex-none w-[300px] sm:w-[350px] md:w-[400px] lg:w-[450px] h-auto min-h-[450px] sm:min-h-[500px] snap-center group bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100"
                        >
                             <div
                                class="relative h-64 sm:h-80 flex-shrink-0 overflow-hidden bg-gray-950"
                            >
                                <!-- Live Website Scraping (High Precision Hero Preview) -->
                                <div v-if="project.link && project.link !== '#' && project.link.startsWith('http')" class="absolute inset-0 z-[2]">
                                    <!-- Sync Status Indicator -->
                                    <div class="absolute top-4 left-1/2 -translate-x-1/2 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                        <div class="flex items-center gap-2 px-3 py-1.5 bg-green-500/20 backdrop-blur-md border border-green-500/30 rounded-full">
                                            <div class="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                                            <span class="text-[9px] font-black text-green-500 uppercase tracking-tighter">Live Scraping: Active</span>
                                        </div>
                                    </div>
                                    
                                    <div class="absolute inset-0 bg-black/40 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <img 
                                        :src="`https://api.microlink.io/?url=${encodeURIComponent(project.link)}&screenshot=true&embed=screenshot.url&meta=false&waitFor=3500&viewport.width=1280&viewport.height=800`"
                                        class="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-[2000ms] ease-out"
                                        alt="Live Scraping Preview"
                                        loading="lazy"
                                        @error="(e) => (e.target.style.display = 'none')"
                                    />
                                    <!-- Loading Skeleton / Shimmer -->
                                    <div class="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 -z-10 flex items-center justify-center">
                                        <div class="flex flex-col items-center gap-3">
                                            <div class="w-10 h-10 border-2 border-primary-500/30 border-t-primary-500 rounded-full animate-spin"></div>
                                            <span class="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Accessing Real-Time Data...</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <!-- No Link Watermark -->
                                <div v-if="!project.link || project.link === '#' || !project.link.startsWith('http')" class="absolute inset-0 flex items-center justify-center" :style="getGradientStyle(project.gradientFrom, project.gradientTo)">
                                    <div class="text-center opacity-30">
                                        <svg class="w-20 h-20 text-white mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                        </svg>
                                        <p class="text-[10px] font-black text-white uppercase tracking-[0.3em]">Module In Progress</p>
                                    </div>
                                </div>

                                <div class="absolute top-4 right-4 z-[25]">
                                    <span class="bg-black/60 backdrop-blur-md text-white px-3 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border border-white/10 shadow-2xl">{{ project.category }}</span>
                                </div>
                                <!-- Status Badge (Top Left) -->
                                <div v-if="!project.link || project.link === '#'" class="absolute top-4 left-4 z-20">
                                    <div class="flex items-center gap-2 px-3 py-1.5 bg-black/40 backdrop-blur-md border border-white/10 rounded-xl shadow-lg">
                                        <span class="relative flex h-2 w-2">
                                            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                                            <span class="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                                        </span>
                                        <span class="text-[10px] font-black text-white uppercase tracking-[0.1em]">In Development</span>
                                    </div>
                                </div>
                                
                                <!-- Floating Favicon (Original Size, No Zoom) -->
                                <div class="absolute -bottom-6 left-6 w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-xl border border-gray-50 z-30 group-hover:-translate-y-2 transition-transform duration-500">
                                    <img 
                                        :src="getFavicon(project.link)" 
                                        class="w-6 h-6 object-contain"
                                        alt="Project icon"
                                        @error="(e) => (e.target.src = 'https://skillicons.dev/icons?i=js')"
                                    />
                                </div>
                            </div>
                            <div class="p-8 pt-10">
                                <h3 class="text-xl font-bold text-gray-900 mb-3">{{ project.title }}</h3>
                                <p class="text-gray-600 mb-4 leading-relaxed break-words whitespace-normal">{{ project.description?.slice(0, 60) }}{{ project.description?.length > 60 ? '.....' : '' }}</p>
                                <div class="flex flex-wrap gap-2 mb-6">
                                    <span
                                        v-for="(tech, techIndex) in project.technologies"
                                        :key="techIndex"
                                        class="inline-flex items-center gap-1.5 bg-primary-50 text-primary-700 px-3 py-1 rounded-full text-xs font-semibold border border-primary-100/50 hover:bg-primary-100 transition-colors"
                                    >
                                        <img 
                                            :src="`https://skillicons.dev/icons?i=${getTechIcon(tech)}`" 
                                            class="w-3.5 h-3.5 object-contain"
                                            :alt="tech"
                                            @error="(e) => (e.target.style.display = 'none')"
                                        >
                                        {{ tech }}
                                    </span>
                                </div>
                                <button
                                    @click="openModal(project)"
                                    class="inline-flex items-center text-primary-600 hover:text-primary-700 font-bold group"
                                >
                                    View Details
                                    <svg class="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Next Button - Overlay -->
                    <button 
                        v-if="projectsData?.projects?.length > 1"
                        @click="scrollNext"
                        class="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-gray-100 text-gray-400 hover:text-primary-600 hover:bg-white transition-all shadow-xl active:scale-95 z-20 opacity-0 group-hover/carousel:opacity-100"
                        title="Next Project"
                    >
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>


                <!-- Project Detail Modal (Empty Shell) -->
                <Transition
                    enter-active-class="transition duration-300 ease-out"
                    enter-from-class="opacity-0"
                    enter-to-class="opacity-100"
                    leave-active-class="transition duration-200 ease-in"
                    leave-from-class="opacity-100"
                    leave-to-class="opacity-0"
                >
                    <div v-if="selectedProject" class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 pb-20 sm:pb-6">
                        <!-- Backdrop -->
                        <div @click="closeModal" class="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"></div>
                        
                        <!-- Modal Content Shell - Unified Clean Node -->
                        <div 
                            class="relative bg-white w-full max-w-5xl h-[90vh] md:h-[85vh] rounded-[2.5rem] overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300 flex flex-col"
                        >
                            <!-- Tab Navigation (Master Control) -->
                            <div class="px-10 md:px-16 pt-12 pb-0 border-b border-gray-100 bg-white sticky top-0 z-50 flex items-center justify-between">
                                <div class="flex gap-12">
                                    <button 
                                        @click="activeTab = 'description'"
                                        :class="[
                                            'pb-6 text-[11px] font-black uppercase tracking-[0.4em] transition-all border-b-2',
                                            activeTab === 'description' ? 'border-primary-600 text-primary-600' : 'border-transparent text-gray-400 hover:text-gray-600'
                                        ]"
                                    >
                                        Description
                                    </button>
                                    <button 
                                        @click="activeTab = 'web'"
                                        :class="[
                                            'pb-6 text-[11px] font-black uppercase tracking-[0.4em] transition-all border-b-2',
                                            activeTab === 'web' ? 'border-primary-600 text-primary-600' : 'border-transparent text-gray-400 hover:text-gray-600'
                                        ]"
                                    >
                                        Web Display
                                    </button>
                                </div>
                                
                                <button 
                                    @click="closeModal"
                                    class="pb-6 p-2 text-gray-400 hover:text-gray-900 transition-all"
                                >
                                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <div class="flex-1 overflow-y-auto">
                                <!-- TAB: Description Content -->
                                <div v-if="activeTab === 'description'" class="p-10 md:p-16 text-left animate-in fade-in slide-in-from-left-5 duration-500">
                                    <div class="max-w-4xl">
                                        <header class="mb-16">
                                            <h2 class="text-5xl md:text-7xl font-black text-gray-900 leading-[1.05] tracking-tighter mb-8 italic uppercase">{{ selectedProject.title }}</h2>
                                            <div class="flex items-center gap-4">
                                                <span class="w-12 h-[2px] bg-primary-500"></span>
                                                <h4 class="text-[12px] font-black text-primary-500 uppercase tracking-[0.5em]">Insight & Execution</h4>
                                            </div>
                                        </header>

                                        <div class="space-y-20">
                                            <!-- Main Description Text -->
                                            <div class="max-w-3xl">
                                                <p class="text-gray-600 leading-relaxed text-xl font-medium whitespace-pre-line">
                                                    {{ selectedProject.description }}
                                                </p>
                                            </div>

                                            <!-- Technology Section -->
                                            <div>
                                                <h4 class="text-[11px] font-black text-gray-400 uppercase tracking-[0.4em] mb-10">System Infrastructure</h4>
                                                <div class="flex flex-wrap gap-4">
                                                    <div 
                                                        v-for="(tech, techIndex) in selectedProject.technologies" 
                                                        :key="techIndex"
                                                        class="flex items-center gap-5 px-8 py-5 bg-gray-50 border border-gray-100 rounded-2xl hover:bg-white hover:shadow-2xl hover:border-transparent transition-all duration-300 group"
                                                    >
                                                        <img 
                                                            :src="`https://skillicons.dev/icons?i=${getTechIcon(tech)}`" 
                                                            class="w-10 h-10 object-contain grayscale group-hover:grayscale-0 transition-all duration-500"
                                                            :alt="tech"
                                                        >
                                                        <span class="text-[13px] font-black text-gray-900 tracking-tight">{{ tech }}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <!-- Final Action -->
                                            <div class="pt-10 border-t border-gray-100">
                                                <a 
                                                    v-if="selectedProject.link"
                                                    :href="selectedProject.link"
                                                    target="_blank"
                                                    class="inline-flex items-center justify-center gap-6 px-14 py-6 bg-gray-900 hover:bg-black text-white rounded-2xl font-black shadow-2xl transition-all active:scale-95 text-[11px] uppercase tracking-[0.3em]"
                                                >
                                                    Explore Reality
                                                    <svg class="w-5 h-5 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                    </svg>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- TAB: Web Display Content -->
                                <div v-else-if="activeTab === 'web'" class="h-full flex flex-col animate-in fade-in zoom-in-95 duration-500">
                                    <div v-if="selectedProject.link && selectedProject.link !== '#'" class="flex-1 p-6 md:p-12">
                                        <!-- Desktop Simulator Frame -->
                                        <div class="h-full bg-gray-950 rounded-[2.5rem] overflow-hidden shadow-2xl border border-gray-800 flex flex-col">
                                            <!-- Browser Chrome -->
                                            <div class="bg-gray-900 px-8 py-5 flex items-center justify-between border-b border-gray-800">
                                                <div class="flex gap-2.5">
                                                    <div class="w-3.5 h-3.5 bg-red-500 rounded-full"></div>
                                                    <div class="w-3.5 h-3.5 bg-amber-500 rounded-full"></div>
                                                    <div class="w-3.5 h-3.5 bg-green-500 rounded-full"></div>
                                                </div>
                                                <div class="flex-1 max-w-xl mx-auto bg-black/40 rounded-xl px-4 py-2 flex items-center gap-3 border border-white/5">
                                                    <div class="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                                                    <span class="text-[10px] text-gray-500 font-bold tracking-widest uppercase truncate">{{ selectedProject.link }}</span>
                                                </div>
                                                <div class="w-20"></div>
                                            </div>
                                            <!-- Scraping Stage -->
                                            <div class="flex-1 relative bg-gray-900">
                                                <img 
                                                    :src="`https://api.microlink.io/?url=${encodeURIComponent(selectedProject.link)}&screenshot=true&embed=screenshot.url&viewport.width=1920&viewport.height=1080&waitFor=4000`"
                                                    class="w-full h-full object-cover object-top"
                                                    alt="Live Project Scrap"
                                                />
                                                <!-- Loading State -->
                                                <div class="absolute inset-0 bg-gray-950 flex flex-col items-center justify-center -z-10 gap-6">
                                                    <div class="w-16 h-16 border-4 border-primary-500/20 border-t-primary-500 rounded-full animate-spin"></div>
                                                    <span class="text-[11px] font-black text-gray-500 uppercase tracking-[0.4em]">Fetching Live Node...</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div v-else class="flex-1 flex flex-col items-center justify-center p-20 text-center">
                                        <div class="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-8 border border-gray-200">
                                            <svg class="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                            </svg>
                                        </div>
                                        <h3 class="text-3xl font-black text-gray-900 mb-4 tracking-tighter uppercase">Local Instance Only</h3>
                                        <p class="text-gray-500 max-w-sm font-medium">This architectural module hasn't been deployed to a public node yet. The live scrap is currently unavailable.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Transition>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { supabase } from '../supabase'

const isAutoSlide = ref(false)
const projectsScrollRef = ref(null)
let autoSlideInterval = null

const projectsData = ref(null)
const isLoading = ref(true)
const hasError = ref(false)
const selectedProject = ref(null)
const activeTab = ref('description')

const openModal = (project) => {
    selectedProject.value = project
    activeTab.value = 'description'
    document.body.style.overflow = 'hidden'
}

const closeModal = () => {
    selectedProject.value = null
    document.body.style.overflow = 'auto'
}

const toggleAutoSlide = () => {
    isAutoSlide.value = !isAutoSlide.value
    if (isAutoSlide.value) {
        startAutoSlide()
    } else {
        stopAutoSlide()
    }
}

const startAutoSlide = () => {
    stopAutoSlide()
    autoSlideInterval = setInterval(() => {
        scrollNext()
    }, 5000)
}

const stopAutoSlide = () => {
    if (autoSlideInterval) {
        clearInterval(autoSlideInterval)
        autoSlideInterval = null
    }
}

const resumeAutoSlideIfOn = () => {
    if (isAutoSlide.value) {
        startAutoSlide()
    }
}

const scrollNext = () => {
    if (!projectsScrollRef.value) return
    const container = projectsScrollRef.value
    const snapCenter = container.querySelector('.snap-center')
    if (!snapCenter) return
    const itemWidth = snapCenter.clientWidth + 32 // item width + gap
    const maxScroll = container.scrollWidth - container.clientWidth
    
    if (container.scrollLeft >= maxScroll - 10) {
        container.scrollTo({ left: 0, behavior: 'smooth' })
    } else {
        container.scrollBy({ left: itemWidth, behavior: 'smooth' })
    }
}

const scrollPrev = () => {
    if (!projectsScrollRef.value) return
    const container = projectsScrollRef.value
    const snapCenter = container.querySelector('.snap-center')
    if (!snapCenter) return
    const itemWidth = snapCenter.clientWidth + 32
    
    if (container.scrollLeft <= 10) {
        container.scrollTo({ left: container.scrollWidth, behavior: 'smooth' })
    } else {
        container.scrollBy({ left: -itemWidth, behavior: 'smooth' })
    }
}

const colorMap = {
  'primary-400': 'var(--primary-400)',
  'primary-600': 'var(--primary-600)',
  'green-400': '#4ade80',
  'blue-500': '#3b82f6',
  'purple-400': '#a78bfa',
  'pink-500': '#ec4899'
}

const getGradientStyle = (from, to) => {
  const fromColor = colorMap[from] || '#60a5fa'
  const toColor = colorMap[to] || '#2563eb'
  return {
    background: `linear-gradient(to bottom right, ${fromColor}, ${toColor})`
  }
}

const getFavicon = (url) => {
  if (!url || url === '#' || url === '') return null
  try {
    const cleanUrl = url.trim()
    if (!cleanUrl.startsWith('http')) return null
    
    // Extract hostname properly
    const urlObj = new URL(cleanUrl)
    const domain = urlObj.hostname
    
    // Using unavatar.io for high-quality icons with better fallback logic
    return `https://unavatar.io/${domain}?fallback=https://www.google.com/s2/favicons?domain=${domain}&sz=128`
  } catch (e) {
    return null
  }
}

onMounted(async () => {
  if (!supabase) {
    console.warn('ProjectsSection: Supabase client not initialized. Falling back to local storage.')
    loadFromLocalStorage()
    return
  }

  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .limit(1)
      .maybeSingle()

    if (error) {
      console.error('ProjectsSection: Supabase fetch error:', error)
      loadFromLocalStorage()
      return
    }

    if (data) {
      projectsData.value = {
        sectionLabel: data.section_label || 'My recent work',
        mainHeading: data.main_heading || 'Featured Projects',
        description: data.description || '',
        projects: data.projects || []
      }
      isLoading.value = false
      if (isAutoSlide.value && projectsData.value?.projects?.length > 0) {
        startAutoSlide()
      }
      return
    } else {
      console.log('ProjectsSection: No remote data found, trying local storage.')
      loadFromLocalStorage()
    }
  } catch (e) {
    console.error('ProjectsSection: Catch block error:', e)
    loadFromLocalStorage()
  }
})

const loadFromLocalStorage = () => {
  const savedData = localStorage.getItem('projectsSectionData')
  if (savedData) {
    try {
      const parsed = JSON.parse(savedData)
      projectsData.value = {
        sectionLabel: parsed.sectionLabel || 'My recent work',
        mainHeading: parsed.mainHeading || 'Featured Projects',
        description: parsed.description || '',
        projects: parsed.projects || []
      }
      hasError.value = false
    } catch (e) {
      console.error('ProjectsSection: Error parsing localStorage data:', e)
      hasError.value = true
    }
  } else {
    // If no remote AND no local data, we just set isLoading to false.
    // The template will handle the empty projects list by showing the empty state.
    hasError.value = false 
  }
  isLoading.value = false
  if (isAutoSlide.value && projectsData.value?.projects?.length > 0) {
    startAutoSlide()
  }
}

const getTechIcon = (tech) => {
  if (!tech) return 'js'
  const techLower = tech.toLowerCase().trim()
  
  // Mapping of common display names to SkillIcons slugs
  const iconMap = {
    'vue.js': 'vue',
    'vue': 'vue',
    'react.js': 'react',
    'react': 'react',
    'node.js': 'nodejs',
    'node': 'nodejs',
    'express.js': 'express',
    'express': 'express',
    'postgresql': 'postgres',
    'postgres': 'postgres',
    'db': 'postgres',
    'mongodb': 'mongodb',
    'mongo': 'mongodb',
    'tailwind css': 'tailwind',
    'tailwind': 'tailwind',
    'typescript': 'ts',
    'ts': 'ts',
    'javascript': 'js',
    'js': 'js',
    'html5': 'html',
    'html': 'html',
    'css3': 'css',
    'css': 'css',
    'next.js': 'nextjs',
    'next': 'nextjs',
    'nuxt.js': 'nuxtjs',
    'nuxt': 'nuxtjs',
    'django': 'django',
    'python': 'python',
    'supabase': 'supabase',
    'firebase': 'firebase',
    'docker': 'docker',
    'git': 'git',
    'github': 'github',
    'figma': 'figma',
    'laravel': 'laravel',
    'php': 'php',
    'mysql': 'mysql',
    'sqlite': 'sqlite',
    'redis': 'redis',
    'aws': 'aws',
    'google cloud': 'gcp',
    'gcp': 'gcp',
    'azure': 'azure',
    'vite': 'vite',
    'prisma': 'prisma',
    'graphQL': 'graphql',
    'sass': 'sass',
    'scss': 'sass',
    'flutter': 'flutter',
    'dart': 'dart',
    'swift': 'swift',
    'kotlin': 'kotlin',
    'java': 'java',
    'spring': 'spring',
    'go': 'go',
    'rust': 'rust',
    'cloudflare': 'cloudflare'
  }

  return iconMap[techLower] || techLower
}

onUnmounted(() => {
    stopAutoSlide()
})
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.snap-center {
  scroll-snap-align: center;
}

@media (min-width: 768px) {
    .snap-center {
        scroll-snap-align: start;
    }
}
</style>
