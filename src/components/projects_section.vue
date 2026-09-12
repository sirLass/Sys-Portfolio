<template>
    <section id="Projects" class="py-24 bg-[#faf9f6] dark:bg-[#0f1117] transition-colors duration-300">
        <div class="max-w-7xl mx-auto px-6">
            <!-- Loading State -->
            <div v-if="isLoading">
                <div class="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                    <div class="text-left max-w-2xl w-full">
                        <div class="h-4 w-28 bg-stone-200 dark:bg-stone-800 rounded animate-pulse mb-3"></div>
                        <div class="h-10 w-72 bg-stone-200 dark:bg-stone-800 rounded animate-pulse mb-4"></div>
                        <div class="space-y-2">
                            <div class="h-4 w-full bg-stone-200 dark:bg-stone-800 rounded animate-pulse"></div>
                            <div class="h-4 w-4/5 bg-stone-200 dark:bg-stone-800 rounded animate-pulse"></div>
                        </div>
                    </div>
                    <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-full bg-stone-200 dark:bg-stone-800 animate-pulse"></div>
                        <div class="w-10 h-10 rounded-full bg-stone-200 dark:bg-stone-800 animate-pulse"></div>
                        <div class="w-24 h-8 rounded-full bg-stone-200 dark:bg-stone-800 animate-pulse"></div>
                    </div>
                </div>
                <div class="flex gap-8 pb-8 overflow-hidden">
                    <div v-for="i in 3" :key="i" class="w-[320px] sm:w-[380px] md:w-[420px] flex-shrink-0 bg-white dark:bg-[#151821] rounded-2xl border border-stone-200/70 dark:border-stone-800/80 overflow-hidden">
                        <div class="h-64 bg-stone-100 dark:bg-stone-800/50 animate-pulse"></div>
                        <div class="p-7 space-y-3">
                            <div class="h-3 w-20 bg-stone-200 dark:bg-stone-800 rounded animate-pulse"></div>
                            <div class="h-6 w-48 bg-stone-200 dark:bg-stone-800 rounded animate-pulse"></div>
                            <div class="h-4 w-full bg-stone-100 dark:bg-stone-800/40 rounded animate-pulse"></div>
                            <div class="h-4 w-3/4 bg-stone-100 dark:bg-stone-800/40 rounded animate-pulse"></div>
                            <div class="pt-4 border-t border-stone-100 dark:border-stone-800/50 flex justify-between items-center">
                                <div class="h-3 w-28 bg-stone-200 dark:bg-stone-800 rounded animate-pulse"></div>
                                <div class="h-3 w-16 bg-stone-200 dark:bg-stone-800 rounded animate-pulse"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Error State -->
            <div v-else-if="hasError" class="text-center py-20 px-6">
                <div class="max-w-md mx-auto bg-white dark:bg-[#151821] rounded-2xl p-10 border border-stone-200 dark:border-stone-800 shadow-sm">
                    <div class="w-12 h-12 bg-amber-50 dark:bg-amber-950/40 rounded-full flex items-center justify-center mx-auto mb-5">
                        <svg class="w-6 h-6 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <h3 class="font-serif text-2xl font-normal text-stone-900 dark:text-stone-100 mb-2">Service unavailable</h3>
                    <p class="text-stone-500 dark:text-stone-400 text-sm leading-relaxed">We could not load project records at this moment. Please check back shortly.</p>
                </div>
            </div>

            <!-- Empty State -->
            <div v-else-if="!projectsData?.projects?.length" class="text-center py-20 px-6">
                <div class="max-w-md mx-auto bg-white/60 dark:bg-[#151821]/60 rounded-2xl p-10 border border-dashed border-stone-300 dark:border-stone-800">
                    <div class="w-12 h-12 bg-stone-100 dark:bg-stone-800 rounded-full flex items-center justify-center mx-auto mb-4 text-stone-400">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M12 4v16m8-8H4" />
                        </svg>
                    </div>
                    <h3 class="font-serif text-2xl font-normal text-stone-900 dark:text-stone-100 mb-2">No projects published</h3>
                    <p class="text-stone-500 dark:text-stone-400 text-sm leading-relaxed">Case studies and projects will appear here once added in the management console.</p>
                </div>
            </div>

            <!-- Loaded Data -->
            <div v-else>
                <!-- Section Header -->
                <div v-if="!isHidden('projects', 'sectionLabel') || !isHidden('projects', 'mainHeading') || !isHidden('projects', 'description')" class="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
                    <div class="text-left max-w-2xl">
                        <p v-if="!isHidden('projects', 'sectionLabel')" class="text-primary-600 dark:text-primary-400 font-medium text-xs sm:text-sm tracking-[0.25em] uppercase mb-3">
                            {{ projectsData.sectionLabel }}
                        </p>
                        <h2 v-if="!isHidden('projects', 'mainHeading')" class="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal tracking-tight text-stone-900 dark:text-stone-100 mb-4 leading-tight">
                            {{ projectsData.mainHeading }}
                        </h2>
                        <p v-if="!isHidden('projects', 'description')" class="text-stone-600 dark:text-stone-400 text-base sm:text-lg leading-relaxed font-light">
                            {{ projectsData.description }}
                        </p>
                    </div>
                </div>

                <!-- Project Type Underline Tabs & Carousel Controls Row -->
                <div class="flex flex-wrap justify-between items-center gap-6 mb-10 border-b border-stone-200 dark:border-stone-800/80 pb-4">
                    <!-- Underline Tabs -->
                    <div class="flex items-center gap-8">
                        <button 
                            @click="activeProjectType = 'major'"
                            :class="[
                                'relative pb-4 text-sm tracking-wider uppercase transition-colors duration-200 cursor-pointer font-medium',
                                activeProjectType === 'major' 
                                    ? 'text-stone-900 dark:text-stone-100 font-semibold' 
                                    : 'text-stone-400 dark:text-stone-500 hover:text-stone-700 dark:hover:text-stone-300'
                            ]"
                        >
                            Major Projects
                            <span 
                                v-if="activeProjectType === 'major'" 
                                class="absolute bottom-0 inset-x-0 h-[2px] bg-primary-600 dark:bg-primary-400 transition-all duration-300"
                            ></span>
                        </button>
                        <button 
                            @click="activeProjectType = 'mini'"
                            :class="[
                                'relative pb-4 text-sm tracking-wider uppercase transition-colors duration-200 cursor-pointer font-medium',
                                activeProjectType === 'mini' 
                                    ? 'text-stone-900 dark:text-stone-100 font-semibold' 
                                    : 'text-stone-400 dark:text-stone-500 hover:text-stone-700 dark:hover:text-stone-300'
                            ]"
                        >
                            Mini Projects
                            <span 
                                v-if="activeProjectType === 'mini'" 
                                class="absolute bottom-0 inset-x-0 h-[2px] bg-primary-600 dark:bg-primary-400 transition-all duration-300"
                            ></span>
                        </button>
                    </div>

                    <!-- Slide Controls & Auto Slide Toggle -->
                    <div class="flex items-center gap-4">
                        <button 
                            @click="toggleAutoSlide"
                            :class="[
                                'inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 border cursor-pointer',
                                isAutoSlide 
                                    ? 'border-primary-500/40 text-primary-700 dark:text-primary-300 bg-primary-50/60 dark:bg-primary-950/30' 
                                    : 'border-stone-200 dark:border-stone-800 text-stone-500 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200'
                            ]"
                            title="Toggle automatic slide progression"
                        >
                            <span 
                                :class="[
                                    'w-1.5 h-1.5 rounded-full transition-colors',
                                    isAutoSlide ? 'bg-primary-600 dark:bg-primary-400 animate-pulse' : 'bg-stone-300 dark:bg-stone-600'
                                ]"
                            ></span>
                            <span>{{ isAutoSlide ? 'Auto-play on' : 'Auto-play' }}</span>
                        </button>

                        <div class="flex items-center gap-2" v-if="filteredProjects.length > 1">
                            <button 
                                @click="scrollPrev"
                                class="w-9 h-9 rounded-full border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#151821] text-stone-600 dark:text-stone-300 hover:border-stone-400 dark:hover:border-stone-600 hover:text-stone-950 dark:hover:text-white transition-all flex items-center justify-center cursor-pointer shadow-xs"
                                title="Previous Project"
                                aria-label="Previous project"
                            >
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M15 19l-7-7 7-7" />
                                </svg>
                            </button>
                            <button 
                                @click="scrollNext"
                                class="w-9 h-9 rounded-full border border-stone-200 dark:border-stone-800 bg-white dark:bg-[#151821] text-stone-600 dark:text-stone-300 hover:border-stone-400 dark:hover:border-stone-600 hover:text-stone-950 dark:hover:text-white transition-all flex items-center justify-center cursor-pointer shadow-xs"
                                title="Next Project"
                                aria-label="Next project"
                            >
                                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                
                <!-- Filtered Carousel Track -->
                <div class="relative group/carousel -mx-4 px-4" v-if="filteredProjects.length > 0">
                    <!-- Subtle Previous Button Overlay on track hover -->
                    <button 
                        v-if="filteredProjects.length > 1"
                        @click="scrollPrev"
                        class="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/95 dark:bg-[#151821]/95 backdrop-blur-md border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300 hover:text-primary-600 dark:hover:text-primary-400 hover:border-primary-400 transition-all shadow-md z-20 opacity-0 group-hover/carousel:opacity-100 items-center justify-center cursor-pointer"
                        title="Previous Project"
                        aria-label="Previous project"
                    >
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    <div 
                        ref="projectsScrollRef"
                        class="flex items-stretch gap-8 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-6 pt-2"
                        :class="{ 'justify-center': filteredProjects.length === 1 }"
                        style="scrollbar-width: none; -ms-overflow-style: none;"
                        @mouseenter="stopAutoSlide"
                        @mouseleave="resumeAutoSlideIfOn"
                    >
                        <article
                            v-for="(project, index) in filteredProjects"
                            :key="index"
                            class="flex-none w-[320px] sm:w-[380px] md:w-[420px] lg:w-[450px] snap-center group bg-white dark:bg-[#151821] rounded-2xl border border-stone-200/80 dark:border-stone-800 overflow-hidden transition-all duration-300 hover:border-stone-300 dark:hover:border-stone-700 hover:shadow-lg dark:hover:shadow-black/40 flex flex-col"
                        >
                            <!-- Card Hero Preview (Full-Bleed Image Frame) -->
                            <div class="relative h-60 sm:h-72 flex-shrink-0 overflow-hidden bg-stone-100 dark:bg-stone-900 border-b border-stone-100 dark:border-stone-800/60">
                                <!-- Live Website Screenshot Preview -->
                                <div v-if="project.link && project.link !== '#' && project.link.startsWith('http')" class="absolute inset-0 z-[2]">
                                    <!-- Soft editorial photo-credit style hover label -->
                                    <div class="absolute top-3.5 left-3.5 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div class="flex items-center gap-1.5 px-2.5 py-1 bg-stone-900/75 backdrop-blur-md rounded-md border border-white/10 text-stone-200">
                                            <span class="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
                                            <span class="text-[10px] font-medium tracking-wider uppercase">Live preview</span>
                                        </div>
                                    </div>
                                    
                                    <img 
                                        :src="`https://api.microlink.io/?url=${encodeURIComponent(project.link)}&screenshot=true&embed=screenshot.url&meta=false&waitFor=3500&viewport.width=1280&viewport.height=800`"
                                        class="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                                        alt="Project preview"
                                        loading="lazy"
                                        @error="(e) => (e.target.style.display = 'none')"
                                    />
                                    
                                    <!-- Quiet Shimmer / Loading State -->
                                    <div class="absolute inset-0 bg-stone-100 dark:bg-stone-900/90 -z-10 flex flex-col items-center justify-center gap-2.5">
                                        <div class="w-6 h-6 border-2 border-stone-300 dark:border-stone-700 border-t-primary-600 dark:border-t-primary-400 rounded-full animate-spin"></div>
                                        <span class="text-[11px] font-medium text-stone-400 dark:text-stone-500 tracking-wider">Preview loading…</span>
                                    </div>
                                </div>
                                
                                <!-- No Link Graphical Display -->
                                <div v-if="!project.link || project.link === '#' || !project.link.startsWith('http')" class="absolute inset-0 flex items-center justify-center" :style="getGradientStyle(project.gradientFrom, project.gradientTo)">
                                    <div class="text-center opacity-40">
                                        <svg class="w-14 h-14 text-white mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.25" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                        </svg>
                                        <p class="text-[10px] font-medium text-white uppercase tracking-[0.25em]">Concept in progress</p>
                                    </div>
                                </div>

                                <!-- Quiet Category Tag (Top Right) -->
                                <div class="absolute top-3.5 right-3.5 z-[25]">
                                    <span class="bg-white/90 dark:bg-stone-900/90 backdrop-blur-md text-stone-700 dark:text-stone-300 px-2.5 py-1 rounded-md text-[10px] font-medium uppercase tracking-wider border border-stone-200/70 dark:border-white/10 shadow-xs">
                                        {{ project.category }}
                                    </span>
                                </div>

                                <!-- "In Development" quiet caption (Top Left if no external link) -->
                                <div v-if="!project.link || project.link === '#'" class="absolute top-3.5 left-3.5 z-20">
                                    <div class="flex items-center gap-1.5 px-2.5 py-1 bg-white/90 dark:bg-stone-900/90 backdrop-blur-md border border-stone-200/70 dark:border-white/10 rounded-md text-stone-700 dark:text-stone-300 shadow-xs">
                                        <span class="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                                        <span class="text-[10px] font-medium tracking-wide">In development</span>
                                    </div>
                                </div>
                                
                                <!-- Floating Favicon (Quiet framed badge) -->
                                <div class="absolute bottom-3 left-4 w-9 h-9 bg-white dark:bg-[#1e2230] rounded-lg flex items-center justify-center shadow-sm border border-stone-200/80 dark:border-stone-700 z-30 transition-transform duration-300 group-hover:scale-105">
                                    <img 
                                        :src="getFavicon(project.link)" 
                                        class="w-4 h-4 object-contain"
                                        alt="Project icon"
                                        @error="(e) => (e.target.src = 'https://skillicons.dev/icons?i=js')"
                                    />
                                </div>
                            </div>

                            <!-- Card Caption Block -->
                            <div class="p-7 flex flex-col flex-1 text-left">
                                <!-- Eyebrow: index + category -->
                                <div class="flex items-center gap-2 text-xs font-mono text-primary-600 dark:text-primary-400 tracking-wider uppercase mb-2">
                                    <span>№ {{ String(index + 1).padStart(2, '0') }}</span>
                                    <span>·</span>
                                    <span class="font-sans text-[11px] font-medium tracking-widest text-stone-500 dark:text-stone-400">{{ project.category || 'CASE STUDY' }}</span>
                                </div>

                                <!-- Editorial Serif Title (Must retain h3 for selectProjectListener search) -->
                                <h3 class="font-serif text-2xl font-normal text-stone-900 dark:text-stone-100 mb-2.5 leading-snug group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                                    {{ project.title }}
                                </h3>

                                <!-- Description -->
                                <p class="text-stone-600 dark:text-stone-400 text-sm leading-relaxed mb-5 line-clamp-2">
                                    {{ project.description }}
                                </p>

                                <!-- Subdued Plain/Tag Tech Stack -->
                                <div class="flex flex-wrap items-center gap-1.5 mb-6 mt-auto">
                                    <span
                                        v-for="(tech, techIndex) in project.technologies"
                                        :key="techIndex"
                                        class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800/80 text-stone-600 dark:text-stone-400 text-[11px] font-medium"
                                    >
                                        <img 
                                            :src="`https://skillicons.dev/icons?i=${getTechIcon(tech)}`" 
                                            class="w-3 h-3 object-contain opacity-70"
                                            :alt="tech"
                                            @error="(e) => (e.target.style.display = 'none')"
                                        >
                                        {{ tech }}
                                    </span>
                                </div>

                                <!-- Editorial Text Link -->
                                <div class="pt-4 border-t border-stone-100 dark:border-stone-800/80 flex items-center justify-between">
                                    <button
                                        @click="openModal(project)"
                                        class="group/link inline-flex items-center gap-2 text-sm font-medium text-stone-900 dark:text-stone-100 hover:text-primary-600 dark:hover:text-primary-400 transition-colors cursor-pointer"
                                    >
                                        <span>Read the case study</span>
                                        <svg class="w-4 h-4 text-stone-400 group-hover/link:text-primary-600 dark:group-hover/link:text-primary-400 group-hover/link:translate-x-1 transition-all duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </article>
                    </div>

                    <!-- Subtle Next Button Overlay on track hover -->
                    <button 
                        v-if="filteredProjects.length > 1"
                        @click="scrollNext"
                        class="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/95 dark:bg-[#151821]/95 backdrop-blur-md border border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300 hover:text-primary-600 dark:hover:text-primary-400 hover:border-primary-400 transition-all shadow-md z-20 opacity-0 group-hover/carousel:opacity-100 items-center justify-center cursor-pointer"
                        title="Next Project"
                        aria-label="Next project"
                    >
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>

                <!-- Empty Filter State -->
                <div v-else class="text-center py-20 px-6 animate-in fade-in duration-300">
                    <div class="max-w-md mx-auto bg-white/70 dark:bg-[#151821]/70 rounded-2xl p-10 border border-dashed border-stone-300 dark:border-stone-800">
                        <div class="w-12 h-12 bg-stone-100 dark:bg-stone-800 rounded-full flex items-center justify-center mx-auto mb-4 text-stone-400">
                            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M12 4v16m8-8H4" />
                            </svg>
                        </div>
                        <h3 class="font-serif text-xl font-normal text-stone-900 dark:text-stone-100 mb-2">
                            No {{ activeProjectType === 'major' ? 'Major' : 'Mini' }} projects yet
                        </h3>
                        <p class="text-stone-500 dark:text-stone-400 text-sm leading-relaxed">
                            Projects under this category will be showcased here once updated.
                        </p>
                    </div>
                </div>

            </div> <!-- End of Loaded Data v-else -->

            <!-- Project Detail Modal (Editorial Spread) -->
            <Transition
                enter-active-class="transition duration-300 ease-out"
                enter-from-class="opacity-0"
                enter-to-class="opacity-100"
                leave-active-class="transition duration-200 ease-in"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0"
            >
                <div v-if="selectedProject" class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-8">
                    <!-- Backdrop -->
                    <div @click="closeModal" class="absolute inset-0 bg-stone-950/60 backdrop-blur-sm transition-opacity"></div>
                    
                    <!-- Modal Content Container -->
                    <div 
                        class="relative bg-white dark:bg-[#141721] w-full max-w-4xl max-h-[90vh] md:max-h-[85vh] rounded-2xl overflow-hidden shadow-2xl border border-stone-200/80 dark:border-stone-800 flex flex-col animate-in fade-in zoom-in-95 duration-200"
                    >
                        <!-- Modal Header & Tab Navigation -->
                        <div class="px-8 md:px-12 pt-8 pb-0 border-b border-stone-200 dark:border-stone-800/80 bg-white dark:bg-[#141721] sticky top-0 z-50 flex items-center justify-between">
                            <div class="flex gap-8">
                                <button 
                                    @click="activeTab = 'description'"
                                    :class="[
                                        'pb-4 text-xs font-medium uppercase tracking-[0.2em] transition-colors border-b-2 cursor-pointer',
                                        activeTab === 'description' 
                                            ? 'border-primary-600 dark:border-primary-400 text-stone-900 dark:text-stone-100 font-semibold' 
                                            : 'border-transparent text-stone-400 dark:text-stone-500 hover:text-stone-700 dark:hover:text-stone-300'
                                    ]"
                                >
                                    Overview
                                </button>
                                <button 
                                    @click="activeTab = 'web'"
                                    :class="[
                                        'pb-4 text-xs font-medium uppercase tracking-[0.2em] transition-colors border-b-2 cursor-pointer',
                                        activeTab === 'web' 
                                            ? 'border-primary-600 dark:border-primary-400 text-stone-900 dark:text-stone-100 font-semibold' 
                                            : 'border-transparent text-stone-400 dark:text-stone-500 hover:text-stone-700 dark:hover:text-stone-300'
                                    ]"
                                >
                                    Live Preview
                                </button>
                            </div>
                            
                            <button 
                                @click="closeModal"
                                class="pb-4 text-stone-400 hover:text-stone-900 dark:hover:text-white transition-colors cursor-pointer"
                                aria-label="Close modal"
                            >
                                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <!-- Modal Scrollable Body -->
                        <div class="flex-1 overflow-y-auto">
                            <!-- TAB: Description / Editorial Spread -->
                            <div v-if="activeTab === 'description'" class="p-8 md:p-12 text-left animate-in fade-in duration-300">
                                <div class="max-w-3xl">
                                    <!-- Eyebrow & Headline -->
                                    <header class="mb-10">
                                        <div class="flex items-center gap-3 mb-3 text-xs font-mono uppercase tracking-widest text-primary-600 dark:text-primary-400">
                                            <span>Case Study</span>
                                            <span>·</span>
                                            <span class="text-stone-500 dark:text-stone-400 font-sans font-medium">{{ selectedProject.category }}</span>
                                        </div>
                                        <h2 class="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-stone-900 dark:text-stone-100 leading-tight tracking-tight">
                                            {{ selectedProject.title }}
                                        </h2>
                                    </header>

                                    <div class="space-y-12">
                                        <!-- Main Description Text -->
                                        <div>
                                            <h4 class="text-xs font-semibold text-stone-400 dark:text-stone-500 uppercase tracking-widest mb-4">Summary</h4>
                                            <p class="text-stone-700 dark:text-stone-300 leading-relaxed text-base sm:text-lg font-light whitespace-pre-line max-w-2xl">
                                                {{ selectedProject.description }}
                                            </p>
                                        </div>

                                        <!-- Technology Section -->
                                        <div>
                                            <h4 class="text-xs font-semibold text-stone-400 dark:text-stone-500 uppercase tracking-widest mb-4">Technologies Used</h4>
                                            <div class="flex flex-wrap gap-2.5">
                                                <div 
                                                    v-for="(tech, techIndex) in selectedProject.technologies" 
                                                    :key="techIndex"
                                                    class="inline-flex items-center gap-2 px-3.5 py-2 bg-stone-50 dark:bg-stone-800/60 border border-stone-200/80 dark:border-stone-700/60 rounded-lg text-xs font-medium text-stone-700 dark:text-stone-300"
                                                >
                                                    <img 
                                                        :src="`https://skillicons.dev/icons?i=${getTechIcon(tech)}`" 
                                                        class="w-4 h-4 object-contain opacity-80"
                                                        :alt="tech"
                                                        @error="(e) => (e.target.style.display = 'none')"
                                                    >
                                                    <span>{{ tech }}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- Final Action -->
                                        <div class="pt-8 border-t border-stone-200 dark:border-stone-800/80" v-if="selectedProject.link && selectedProject.link !== '#'">
                                            <a 
                                                :href="selectedProject.link"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                class="group inline-flex items-center gap-2 text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
                                            >
                                                <span>Visit the live site</span>
                                                <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- TAB: Web Display / Refined Browser Simulator -->
                            <div v-else-if="activeTab === 'web'" class="h-full flex flex-col p-6 sm:p-8 animate-in fade-in duration-300 min-h-[500px]">
                                <div v-if="selectedProject.link && selectedProject.link !== '#'" class="flex-1 flex flex-col rounded-xl overflow-hidden border border-stone-200 dark:border-stone-800 shadow-sm bg-stone-50 dark:bg-stone-900">
                                    <!-- Refined Lightened Browser Chrome -->
                                    <div class="bg-stone-100 dark:bg-stone-900/90 px-5 py-3 flex items-center justify-between border-b border-stone-200 dark:border-stone-800">
                                        <div class="flex gap-2">
                                            <div class="w-3 h-3 bg-red-400/80 rounded-full"></div>
                                            <div class="w-3 h-3 bg-amber-400/80 rounded-full"></div>
                                            <div class="w-3 h-3 bg-emerald-400/80 rounded-full"></div>
                                        </div>
                                        <div class="flex-1 max-w-md mx-4 bg-white dark:bg-stone-800 rounded-md px-3 py-1 flex items-center gap-2 border border-stone-200/80 dark:border-stone-700">
                                            <svg class="w-3 h-3 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                            </svg>
                                            <span class="text-xs text-stone-500 dark:text-stone-400 font-mono truncate">{{ selectedProject.link }}</span>
                                        </div>
                                        <div class="w-10"></div>
                                    </div>
                                    
                                    <!-- Live Screenshot Frame -->
                                    <div class="flex-1 relative bg-stone-100 dark:bg-stone-950 min-h-[400px]">
                                        <img 
                                            :src="`https://api.microlink.io/?url=${encodeURIComponent(selectedProject.link)}&screenshot=true&embed=screenshot.url&viewport.width=1920&viewport.height=1080&waitFor=4000`"
                                            class="w-full h-full object-cover object-top"
                                            alt="Live project preview"
                                            loading="lazy"
                                        />
                                        <!-- Shimmer Loading -->
                                        <div class="absolute inset-0 bg-stone-100 dark:bg-stone-900 flex flex-col items-center justify-center -z-10 gap-3">
                                            <div class="w-8 h-8 border-2 border-stone-300 dark:border-stone-700 border-t-primary-600 dark:border-t-primary-400 rounded-full animate-spin"></div>
                                            <span class="text-xs font-medium text-stone-500 dark:text-stone-400 tracking-wider">Loading preview…</span>
                                        </div>
                                    </div>
                                </div>
                                <div v-else class="flex-1 flex flex-col items-center justify-center p-12 text-center">
                                    <div class="w-14 h-14 bg-stone-100 dark:bg-stone-800 rounded-full flex items-center justify-center mb-4 text-stone-400">
                                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                        </svg>
                                    </div>
                                    <h3 class="font-serif text-2xl font-normal text-stone-900 dark:text-stone-100 mb-2">Live preview unavailable</h3>
                                    <p class="text-stone-500 dark:text-stone-400 max-w-sm text-sm leading-relaxed">This project has not been deployed to a public URL yet.</p>
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
import { ref, onMounted, onUnmounted, computed, nextTick } from 'vue'
import { supabase } from '../supabase'
import { useVisibility } from '../composables/useVisibility'

const { isHidden } = useVisibility()

const isAutoSlide = ref(false)
const projectsScrollRef = ref(null)
let autoSlideInterval = null

const projectsData = ref(null)
const isLoading = ref(true)
const hasError = ref(false)
const selectedProject = ref(null)
const activeTab = ref('description')

const activeProjectType = ref('major')

const filteredProjects = computed(() => {
  if (!projectsData.value?.projects) return []
  return projectsData.value.projects.filter(project => {
    const type = project.projectType || 'major'
    return type === activeProjectType.value
  })
})

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

let selectProjectListener = null

onMounted(async () => {
  // Listen for the custom project selection event from gallery modal
  selectProjectListener = (e) => {
    const projectTitle = e.detail?.title
    if (!projectTitle || !projectsData.value?.projects) return

    // Find the project object in the array
    const proj = projectsData.value.projects.find(p => p.title === projectTitle)
    if (proj) {
      // Switch active type tab to match the target project so it is shown
      activeProjectType.value = proj.projectType || 'major'

      setTimeout(() => {
        // Open the details modal automatically
        openModal(proj)
        
        // Scroll the carousel to center this specific project card
        nextTick(() => {
          if (projectsScrollRef.value) {
            const container = projectsScrollRef.value
            const cards = container.children
            for (let i = 0; i < cards.length; i++) {
              const cardTitle = cards[i].querySelector('h3')?.textContent?.trim()
              if (cardTitle === projectTitle) {
                cards[i].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
                break
              }
            }
          }
        })
      }, 100)
    }
  }

  window.addEventListener('select-project', selectProjectListener)

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
    if (selectProjectListener) {
      window.removeEventListener('select-project', selectProjectListener)
    }
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
