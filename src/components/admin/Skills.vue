<template>
  <div class="p-6">
    <!-- View Toggle -->

    <div class="max-w-7xl mx-auto mb-8">
      <div class="flex items-center gap-4 p-1 bg-white rounded-lg shadow-sm border border-gray-200 w-fit">
        <button
          v-for="view in viewModes"
          :key="view.id"
          @click="activeView = view.id"
          :class="[
            'px-4 py-2 rounded-md text-sm font-medium transition-all',
            activeView === view.id
              ? 'bg-[var(--admin-primary)] text-white shadow-md'
              : 'text-gray-600 hover:text-gray-900'
          ]"
        >
          {{ view.label }}
        </button>
      </div>
    </div>

    <!-- Skills Cloud View -->
    <div v-if="activeView === 'cloud'" class="max-w-7xl mx-auto space-y-6">
      <div class="bg-white rounded-2xl shadow-lg p-8">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <h2 class="text-2xl font-semibold text-gray-900">Skills Cloud</h2>
            <p class="text-gray-500 text-sm">Visual representation of your mastery</p>
          </div>
          
          <div class="flex items-center gap-3 bg-gray-50 p-1.5 rounded-xl border border-gray-100">
            <button 
              v-for="f in ['All', 'Design', 'Development']" 
              :key="f"
              @click="cloudFilter = f.toLowerCase()"
              :class="[
                'px-4 py-2 text-sm font-medium rounded-lg transition-all',
                cloudFilter === f.toLowerCase() 
                  ? 'bg-white text-[var(--admin-primary)] shadow-sm border border-[var(--admin-primary-light)]' 
                  : 'text-gray-500 hover:text-gray-900'
              ]"
            >
              {{ f }}
            </button>
            <div class="w-px h-6 bg-gray-200 mx-1"></div>
            <button 
              @click="shuffleCloud"
              class="p-2 text-gray-500 hover:text-[var(--admin-primary)] hover:bg-white hover:shadow-sm rounded-lg transition-all"
              title="Shuffle Cloud"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          </div>
        </div>

        <div class="flex flex-wrap gap-4 justify-center items-center min-h-[400px] p-4 relative">
          <div
            v-for="skill in allSkills"
            :key="skill.name"
            @click="editSkillFromCloud(skill)"
            @mouseleave="handleStarLeave"
            class="group relative"
          >
            <div
              :class="[
                'px-6 py-3 rounded-full font-medium cursor-pointer transition-all duration-500 hover:scale-110 hover:shadow-xl hover:z-20',
                getSkillSizeClass(skill.level),
                getSkillColorClass(skill.level)
              ]"
            >
              {{ skill.name }}
            </div>
            
            <!-- Tooltip Popup -->
            <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-300 translate-y-2 group-hover:translate-y-0 z-30">
              <div class="bg-gray-900 text-white p-3 rounded-xl shadow-2xl min-w-[140px]">
                <div class="text-[10px] uppercase tracking-widest text-gray-400 mb-1.5 font-bold">{{ skill.category }}</div>
                <div class="flex items-center gap-1 mb-2">
                  <svg
                    v-for="i in 5"
                    :key="i"
                    class="w-3.5 h-3.5"
                    :class="i <= getStarCount(skill.level) ? 'text-yellow-400 fill-current' : 'text-gray-600'"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <div class="text-xs font-semibold">{{ skill.level }}</div>
                <div class="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-gray-900 rotate-45"></div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="mt-8 pt-6 border-t border-gray-100 flex justify-center">
          <p class="text-xs text-gray-400 flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Click bubbles to rename skills. Levels are managed in Grid View.
          </p>
        </div>
      </div>
    </div>

    <!-- Grid View -->
    <div v-if="activeView === 'grid'" class="max-w-7xl mx-auto space-y-12 pb-20">
      <!-- Design Skills Section -->
      <section class="bg-gray-50/50 rounded-2xl p-6 border border-gray-100">
        <div 
          @click="toggleSection('design')"
          class="flex items-center justify-between cursor-pointer group"
        >
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-sm">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
            </div>
            <div>
              <div class="flex items-center gap-2">
                <h2 class="text-2xl font-bold text-gray-900">Design Skills</h2>
                <svg 
                  class="w-5 h-5 text-gray-400 transition-transform duration-300"
                  :class="{ 'rotate-180': !collapsedSections.design }"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              <p class="text-gray-600">UI/UX Design and Visual Communication</p>
            </div>
          </div>
          <div class="flex items-center gap-4">
            <button 
              @click.stop="addSkill('design')"
              class="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-[var(--admin-primary)] bg-[var(--admin-primary-light)] hover:opacity-80 rounded-lg transition-colors"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              Add Skill
            </button>
          </div>
        </div>
        
        <transition
          enter-active-class="transition duration-300 ease-out"
          enter-from-class="transform -translate-y-4 opacity-0"
          enter-to-class="transform translate-y-0 opacity-100"
          leave-active-class="transition duration-200 ease-in"
          leave-from-class="transform translate-y-0 opacity-100"
          leave-to-class="transform -translate-y-4 opacity-0"
        >
          <div v-show="!collapsedSections.design" class="mt-8">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div
                v-for="(skill, index) in skillsData.designSkills"
                :key="index"
                class="group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
              >
                <!-- Action Buttons -->
                <div class="absolute top-2 right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all z-10">
                  <button 
                    @click.stop="editSkill('design', index)"
                    class="p-1.5 text-blue-400 hover:text-[var(--admin-primary)] hover:bg-[var(--admin-primary-light)] rounded-md transition-colors"
                    title="Edit name"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </button>
                  <button 
                    @click.stop="removeSkill('design', index)"
                    class="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                    title="Delete skill"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>

                <div class="p-6">
                  <div class="flex items-start justify-between mb-2">
                    <h3 class="text-lg font-semibold text-gray-900 group-hover:text-[var(--admin-primary)] transition-colors pr-8">
                      {{ skill.name || `Design Skill ${index + 1}` }}
                    </h3>
                    <span :class="getLevelBadgeClass(skill.level)">
                      {{ skill.level }}
                    </span>
                  </div>
                  
                  <!-- Editable Star Rating -->
                  <div class="flex items-center gap-1.5 mb-2" @mouseleave="handleStarLeave">
                    <svg
                      v-for="i in 5"
                      :key="i"
                      @click.stop="setSkillRating(skill, i)"
                      @mouseenter="handleStarHover(skill.name, i)"
                      class="w-6 h-6 transition-all duration-200 cursor-pointer hover:scale-125"
                      :class="[
                        (hoverRating.skillName === skill.name ? i <= hoverRating.value : i <= getStarCount(skill.level))
                          ? 'text-yellow-400 fill-current' 
                          : 'text-gray-300'
                      ]"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  
                  <div class="flex items-center justify-between text-[11px] text-gray-400 font-medium uppercase tracking-wider">
                    <span>Click stars to rate</span>
                    <span>Hover for actions</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </section>

      <!-- Development Skills Section -->
      <section class="bg-gray-50/50 rounded-2xl p-6 border border-gray-100">
        <div 
          @click="toggleSection('development')"
          class="flex items-center justify-between cursor-pointer group"
        >
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center shadow-sm">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            </div>
            <div>
              <div class="flex items-center gap-2">
                <h2 class="text-2xl font-bold text-gray-900">Development Skills</h2>
                <svg 
                  class="w-5 h-5 text-gray-400 transition-transform duration-300"
                  :class="{ 'rotate-180': !collapsedSections.development }"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              <p class="text-gray-600">Frontend and Backend Development</p>
            </div>
          </div>
          <div class="flex items-center gap-4">
            <button 
              @click.stop="addSkill('development')"
              class="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-[var(--admin-primary)] bg-[var(--admin-primary-light)] hover:opacity-80 rounded-lg transition-colors"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              Add Skill
            </button>
          </div>
        </div>
        
        <transition
          enter-active-class="transition duration-300 ease-out"
          enter-from-class="transform -translate-y-4 opacity-0"
          enter-to-class="transform translate-y-0 opacity-100"
          leave-active-class="transition duration-200 ease-in"
          leave-from-class="transform translate-y-0 opacity-100"
          leave-to-class="transform -translate-y-4 opacity-0"
        >
          <div v-show="!collapsedSections.development" class="mt-8">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div
                v-for="(skill, index) in skillsData.developmentSkills"
                :key="index"
                class="group relative bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
              >
                <!-- Action Buttons -->
                <div class="absolute top-2 right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all z-10">
                  <button 
                    @click.stop="editSkill('development', index)"
                    class="p-1.5 text-blue-400 hover:text-[var(--admin-primary)] hover:bg-[var(--admin-primary-light)] rounded-md transition-colors"
                    title="Edit name"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </button>
                  <button 
                    @click.stop="removeSkill('development', index)"
                    class="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                    title="Delete skill"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>

                <div class="p-6">
                  <div class="flex items-start justify-between mb-2">
                    <h3 class="text-lg font-semibold text-gray-900 group-hover:text-[var(--admin-primary)] transition-colors pr-8">
                      {{ skill.name || `Development Skill ${index + 1}` }}
                    </h3>
                    <span :class="getLevelBadgeClass(skill.level)">
                      {{ skill.level }}
                    </span>
                  </div>
                  
                  <!-- Editable Star Rating -->
                  <div class="flex items-center gap-1.5 mb-2" @mouseleave="handleStarLeave">
                    <svg
                      v-for="i in 5"
                      :key="i"
                      @click.stop="setSkillRating(skill, i)"
                      @mouseenter="handleStarHover(skill.name, i)"
                      class="w-6 h-6 transition-all duration-200 cursor-pointer hover:scale-125"
                      :class="[
                        (hoverRating.skillName === skill.name ? i <= hoverRating.value : i <= getStarCount(skill.level))
                          ? 'text-yellow-400 fill-current' 
                          : 'text-gray-300'
                      ]"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  
                  <div class="flex items-center justify-between text-[11px] text-gray-400 font-medium uppercase tracking-wider">
                    <span>Click stars to rate</span>
                    <span>Hover for actions</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </section>

      <!-- Tools & Software Section -->
      <section class="bg-gray-50/50 rounded-2xl p-6 border border-gray-100">
        <div 
          @click="toggleSection('tools')"
          class="flex items-center justify-between cursor-pointer group"
        >
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center shadow-sm">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </div>
            <div>
              <div class="flex items-center gap-2">
                <h2 class="text-2xl font-bold text-gray-900">Tools & Software</h2>
                <svg 
                  class="w-5 h-5 text-gray-400 transition-transform duration-300"
                  :class="{ 'rotate-180': !collapsedSections.tools }"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              <p class="text-gray-600">Design and Development Tools</p>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <button 
              @click.stop="isAddingTool = true"
              class="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-[var(--admin-primary)] bg-[var(--admin-primary-light)] hover:opacity-80 rounded-lg transition-colors"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              Add Tool
            </button>
          </div>
        </div>
        
        <transition
          enter-active-class="transition duration-300 ease-out"
          enter-from-class="transform -translate-y-4 opacity-0"
          enter-to-class="transform translate-y-0 opacity-100"
          leave-active-class="transition duration-200 ease-in"
          leave-from-class="transform translate-y-0 opacity-100"
          leave-to-class="transform -translate-y-4 opacity-0"
        >
          <div v-show="!collapsedSections.tools" class="mt-8">
            <div class="flex flex-wrap gap-3">
              <div
                v-for="(tool, index) in skillsData.tools"
                :key="index"
                class="group flex items-center gap-2 bg-white rounded-full border border-gray-200 pl-4 pr-2 py-2 hover:border-[var(--admin-primary)] hover:shadow-sm transition-all"
              >
                <span class="text-sm font-medium text-gray-700">{{ tool }}</span>
                <button 
                  @click="removeTool(index)"
                  class="p-1 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </transition>
      </section>
    </div>

    <!-- Floating Save Button -->
    <div class="fixed bottom-8 right-8 z-[70]">
      <button
        @click="handleSave"
        :disabled="saving"
        class="flex items-center gap-3 px-8 py-4 bg-[var(--admin-primary)] hover:bg-[var(--admin-secondary)] text-white rounded-full shadow-2xl hover:shadow-[var(--admin-primary)]/40 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed group"
      >
        <svg v-if="saving" class="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <svg v-else class="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
        </svg>
        <span class="font-bold tracking-wide uppercase text-sm">
          {{ saving ? 'Saving Changes...' : 'Save All Skills' }}
        </span>
      </button>
    </div>

    <!-- Edit Skill Modal -->
    <div v-if="editingSkill" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-[100]">
      <div 
        class="bg-white rounded-2xl shadow-2xl w-full overflow-hidden animate-in fade-in zoom-in duration-200"
        style="max-width: 440px;"
      >
        <div class="p-6 border-b border-gray-100 flex items-center justify-between">
          <h3 class="text-xl font-bold text-gray-900">Edit Skill</h3>
          <button @click="editingSkill = null" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div class="p-6 space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Skill Name</label>
            <input 
              v-model="editForm.name"
              type="text"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--admin-primary)] outline-none"
            >
          </div>
        </div>
        
        <div class="p-6 bg-gray-50 flex justify-end gap-3">
          <button 
            @click="editingSkill = null"
            class="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button 
            @click="saveEdit"
            class="px-6 py-2 text-sm font-medium text-white bg-[var(--admin-primary)] hover:bg-[var(--admin-secondary)] rounded-lg transition-colors"
          >
            Apply Changes
          </button>
        </div>
      </div>
    </div>

    <!-- Add Tool Modal -->
    <div v-if="isAddingTool" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-[100]">
      <div 
        class="bg-white rounded-2xl shadow-2xl w-full overflow-hidden animate-in fade-in zoom-in duration-200"
        style="max-width: 440px;"
      >
        <div class="p-6 border-b border-gray-100 flex items-center justify-between">
          <h3 class="text-xl font-bold text-gray-900">Add New Tool</h3>
          <button @click="isAddingTool = false" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="p-6">
          <label class="block text-sm font-medium text-gray-700 mb-2">Tool/Software Name</label>
          <div class="relative">
            <input 
              v-model="newToolName"
              @keyup.enter="addTool"
              type="text" 
              placeholder="e.g. Photoshop, Docker, Figma"
              class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[var(--admin-primary)] outline-none transition-all pr-12"
              autofocus
            >
            <div v-if="newToolName" class="absolute right-3 top-1/2 -translate-y-1/2">
              <img 
                v-if="suggestedTools.length > 0 && suggestedTools[0].name.toLowerCase() === newToolName.toLowerCase()" 
                :src="`https://skillicons.dev/icons?i=${suggestedTools[0].icon}`" 
                class="w-6 h-6 rounded"
              >
            </div>
          </div>
          
          <!-- Suggestions -->
          <transition
            enter-active-class="transition duration-200 ease-out"
            enter-from-class="opacity-0 -translate-y-2"
            enter-to-class="opacity-100 translate-y-0"
          >
            <div v-if="suggestedTools.length > 0" class="mt-3 space-y-2">
              <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest pl-1">Suggestions</p>
              <div class="grid grid-cols-1 gap-2">
                <button
                  v-for="tool in suggestedTools"
                  :key="tool.name"
                  @click="selectSuggestedTool(tool)"
                  class="flex items-center gap-3 p-2.5 rounded-xl border border-gray-100 hover:border-[var(--admin-primary)] hover:bg-[var(--admin-primary-light)] transition-all text-left group"
                >
                  <div class="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center overflow-hidden border border-gray-100 group-hover:border-[var(--admin-primary)]/10">
                    <img :src="`https://skillicons.dev/icons?i=${tool.icon}`" class="w-6 h-6 object-contain" :alt="tool.name">
                  </div>
                  <span class="text-sm font-medium text-gray-700 group-hover:text-[var(--admin-secondary)]">{{ tool.name }}</span>
                  <svg class="w-4 h-4 ml-auto text-gray-300 group-hover:text-[var(--admin-primary-light)] opacity-0 group-hover:opacity-100 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
            </div>
          </transition>

          <p class="mt-4 text-xs text-gray-500 italic flex items-center gap-1.5">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Press Enter or select a suggestion to save
          </p>
        </div>
        <div class="p-6 bg-gray-50 flex justify-end gap-3">
          <button 
            @click="isAddingTool = false"
            class="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button 
            @click="addTool"
            class="px-6 py-2 text-sm font-medium text-white bg-[var(--admin-primary)] hover:bg-[var(--admin-secondary)] rounded-lg transition-colors shadow-sm"
          >
            Add
          </button>
        </div>
      </div>
    </div>

    <!-- Add Skill Modal -->
    <div v-if="isAddingSkill" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-[100]">
      <div 
        class="bg-white rounded-2xl shadow-2xl w-full overflow-hidden animate-in fade-in zoom-in duration-200"
        style="max-width: 440px;"
      >
        <div class="p-6 border-b border-gray-100 flex items-center justify-between">
          <h3 class="text-xl font-bold text-gray-900">Add New {{ newSkillForm.type === 'design' ? 'Design' : 'Development' }} Skill</h3>
          <button @click="isAddingSkill = false" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="p-6">
          <label class="block text-sm font-medium text-gray-700 mb-1">Skill Name</label>
          <input 
            v-model="newSkillForm.name"
            type="text"
            placeholder="e.g. Graphic Design, Vue.js"
            class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[var(--admin-primary)] outline-none transition-all"
            autofocus
          >
          <p class="mt-2 text-xs text-gray-500 italic">You can set the proficiency level after creating</p>
        </div>
        <div class="p-6 bg-gray-50 flex justify-end gap-3">
          <button 
            @click="isAddingSkill = false"
            class="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button 
            @click="confirmAddSkill"
            class="px-6 py-2 text-sm font-medium text-white bg-[var(--admin-primary)] hover:bg-[var(--admin-secondary)] rounded-lg transition-colors shadow-sm"
          >
            Create Skill
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, inject, computed } from 'vue'
import { supabase, isSupabaseConfigured } from '../../supabase'

const addToast = inject('addToast')
const saving = ref(false)
const skillsId = ref(null)

const activeView = ref('grid')
const viewModes = [
  { id: 'grid', label: 'Grid View' },
  { id: 'cloud', label: 'Skills Cloud' }
]

const LEVELS = ['Beginner', 'Intermediate', 'Advanced', 'Expert', 'Professional']

const levelToPercentage = (level) => {
  if (level === 'Beginner') return 20
  if (level === 'Intermediate') return 40
  if (level === 'Advanced') return 60
  if (level === 'Expert') return 80
  if (level === 'Professional') return 100
  return 40
}

const percentageToLevel = (pct) => {
  const n = Number(pct || 0)
  if (n >= 90) return 'Professional'
  if (n >= 70) return 'Expert'
  if (n >= 50) return 'Advanced'
  if (n >= 30) return 'Intermediate'
  return 'Beginner'
}

const skillsData = ref({
  designSkills: [],
  developmentSkills: [],
  tools: []
})

// --- Editing State ---
const editingSkill = ref(null) // { type: 'design'|'development', index: number }
const editForm = ref({ name: '', level: 'Intermediate' })
const isAddingSkill = ref(false)
const newSkillForm = ref({ type: 'design', name: '', level: 'Intermediate' })
const newToolName = ref('')
const isAddingTool = ref(false)
const hoverRating = ref({ skillName: null, value: 0 })

const collapsedSections = ref({
  design: false,
  development: false,
  tools: false
})

const toggleSection = (section) => {
  collapsedSections.value[section] = !collapsedSections.value[section]
}

// --- Cloud View Enhancements ---
const cloudFilter = ref('all') // 'all' | 'design' | 'development'
const cloudOrder = ref([])

const shuffleCloud = () => {
  const skills = [...allSkills.value]
  for (let i = skills.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [skills[i], skills[j]] = [skills[j], skills[i]]
  }
  cloudOrder.value = skills.map(s => s.name)
}

const handleStarHover = (skillName, value) => {
  hoverRating.value = { skillName, value }
}

const handleStarLeave = () => {
  hoverRating.value = { skillName: null, value: 0 }
}

const COMMON_TOOLS = [
  { name: 'Figma', icon: 'figma' },
  { name: 'Adobe Photoshop', icon: 'ps' },
  { name: 'Adobe Illustrator', icon: 'ai' },
  { name: 'VS Code', icon: 'vscode' },
  { name: 'GitHub', icon: 'github' },
  { name: 'Docker', icon: 'docker' },
  { name: 'Firebase', icon: 'firebase' },
  { name: 'Postman', icon: 'postman' },
  { name: 'Trello', icon: 'trello' },
  { name: 'Notion', icon: 'notion' },
  { name: 'React', icon: 'react' },
  { name: 'Vue.js', icon: 'vue' },
  { name: 'Angular', icon: 'angular' },
  { name: 'Node.js', icon: 'nodejs' },
  { name: 'Python', icon: 'python' },
  { name: 'TypeScript', icon: 'ts' },
  { name: 'JavaScript', icon: 'js' },
  { name: 'Tailwind CSS', icon: 'tailwind' },
  { name: 'Git', icon: 'git' },
  { name: 'Next.js', icon: 'nextjs' },
  { name: 'MongoDB', icon: 'mongodb' },
  { name: 'PostgreSQL', icon: 'postgres' },
  { name: 'Redux', icon: 'redux' },
  { name: 'AWS', icon: 'aws' },
  { name: 'Google Cloud', icon: 'gcp' },
  { name: 'Azure', icon: 'azure' },
  { name: 'Svelte', icon: 'svelte' },
  { name: 'Dribbble', icon: 'dribbble' },
  { name: 'Behance', icon: 'behance' },
  { name: 'Framer', icon: 'framer' },
  { name: 'Slack', icon: 'slack' },
  { name: 'Discord', icon: 'discord' }
]

const suggestedTools = computed(() => {
  const query = newToolName.value.toLowerCase().trim()
  if (!query) return []
  return COMMON_TOOLS.filter(tool => 
    tool.name.toLowerCase().includes(query)
  ).slice(0, 4)
})

const selectSuggestedTool = (tool) => {
  newToolName.value = tool.name
  addTool()
}

const addSkill = (type) => {
  newSkillForm.value = { type, name: '', level: 'Beginner' }
  isAddingSkill.value = true
}

const confirmAddSkill = () => {
  if (!newSkillForm.value.name.trim()) return
  
  const skill = { 
    name: newSkillForm.value.name, 
    level: newSkillForm.value.level,
    percentage: levelToPercentage(newSkillForm.value.level)
  }
  
  if (newSkillForm.value.type === 'design') {
    skillsData.value.designSkills.push(skill)
  } else {
    skillsData.value.developmentSkills.push(skill)
  }
  
  isAddingSkill.value = false
}

const removeSkill = (type, index) => {
  if (confirm('Are you sure you want to remove this skill?')) {
    if (type === 'design') {
      skillsData.value.designSkills.splice(index, 1)
    } else {
      skillsData.value.developmentSkills.splice(index, 1)
    }
  }
}

const editSkill = (type, index) => {
  const skill = type === 'design' 
    ? skillsData.value.designSkills[index] 
    : skillsData.value.developmentSkills[index]
  
  editingSkill.value = { type, index }
  editForm.value = { 
    name: skill.name, 
    level: skill.level || percentageToLevel(skill.percentage) 
  }
}

const editSkillFromCloud = (skill) => {
  const type = skill.category === 'Design' ? 'design' : 'development'
  const list = type === 'design' ? skillsData.value.designSkills : skillsData.value.developmentSkills
  const index = list.findIndex(s => s.name === skill.name)
  if (index !== -1) {
    editSkill(type, index)
  }
}

const setSkillRating = (skill, rating) => {
  const currentRating = getStarCount(skill.level)
  
  // If clicking the current rating, allow it to "clear" or decrease
  if (currentRating === rating) {
    if (rating === 1) {
      skill.level = 'None' // Custom state for 0 stars
      skill.percentage = 0
      return
    }
    // Optional: could decrease by 1, but usually standard is to set to the clicked value
  }

  const levelMap = {
    1: 'Beginner',
    2: 'Intermediate',
    3: 'Advanced',
    4: 'Expert',
    5: 'Professional'
  }
  
  skill.level = levelMap[rating] || 'Beginner'
  skill.percentage = levelToPercentage(skill.level)
}

const saveEdit = () => {
  if (!editingSkill.value) return
  
  const { type, index } = editingSkill.value
  const target = type === 'design' 
    ? skillsData.value.designSkills[index] 
    : skillsData.value.developmentSkills[index]
  
  target.name = editForm.value.name
  
  editingSkill.value = null
}

const addTool = () => {
  if (!newToolName.value.trim()) return
  if (!skillsData.value.tools) skillsData.value.tools = []
  
  if (!skillsData.value.tools.includes(newToolName.value.trim())) {
    skillsData.value.tools.push(newToolName.value.trim())
  }
  newToolName.value = ''
  isAddingTool.value = false
}

const removeTool = (index) => {
  skillsData.value.tools.splice(index, 1)
}

// Computed property for all skills combined with filtering and order
const allSkills = computed(() => {
  const designSkills = (skillsData.value.designSkills || []).map(skill => ({
    ...skill,
    category: 'Design'
  }))
  const devSkills = (skillsData.value.developmentSkills || []).map(skill => ({
    ...skill,
    category: 'Development'
  }))
  
  let merged = [...designSkills, ...devSkills]
  
  // Apply filter
  if (cloudFilter.value !== 'all') {
    merged = merged.filter(s => s.category.toLowerCase() === cloudFilter.value)
  }
  
  // Apply persistent random order if exists
  if (cloudOrder.value.length > 0) {
    const ordered = []
    cloudOrder.value.forEach(name => {
      const found = merged.find(s => s.name === name)
      if (found) ordered.push(found)
    })
    // Add any new skills that aren't in the order list yet
    merged.forEach(s => {
      if (!ordered.find(o => o.name === s.name)) ordered.push(s)
    })
    return ordered
  }
  
  return merged
})

// Helper methods for visual styling
const getStarCount = (level) => {
  if (level === 'None') return 0
  const starMap = {
    'Beginner': 1,
    'Intermediate': 2,
    'Advanced': 3,
    'Expert': 4,
    'Professional': 5
  }
  return starMap[level] || 1
}

const getLevelBadgeClass = (level) => {
  const classMap = {
    'None': 'px-3 py-1 text-xs font-medium bg-red-50 text-red-400 rounded-full border border-red-100',
    'Beginner': 'px-3 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full',
    'Intermediate': 'px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full',
    'Advanced': 'px-3 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full',
    'Expert': 'px-3 py-1 text-xs font-medium bg-indigo-100 text-indigo-800 rounded-full',
    'Professional': 'px-3 py-1 text-xs font-medium bg-gradient-to-r from-emerald-100 to-green-100 text-green-800 rounded-full'
  }
  return classMap[level] || classMap['Beginner']
}

const getSkillSizeClass = (level) => {
  const sizeMap = {
    'None': 'text-xs opacity-50 px-3 py-1.5',
    'Beginner': 'text-sm px-4 py-2',
    'Intermediate': 'text-base px-5 py-2.5',
    'Advanced': 'text-lg px-6 py-3',
    'Expert': 'text-xl px-7 py-4 font-bold',
    'Professional': 'text-2xl px-8 py-5 font-black uppercase tracking-tighter'
  }
  return sizeMap[level] || sizeMap['Beginner']
}

const getSkillColorClass = (level) => {
  const colorMap = {
    'None': 'bg-red-50 text-red-300 border border-red-100 italic',
    'Beginner': 'bg-gray-200 text-gray-700 hover:bg-gray-300',
    'Intermediate': 'bg-blue-200 text-blue-800 hover:bg-blue-300',
    'Advanced': 'bg-purple-200 text-purple-800 hover:bg-purple-300',
    'Expert': 'bg-indigo-200 text-indigo-800 hover:bg-indigo-300',
    'Professional': 'bg-gradient-to-br from-emerald-400 via-green-500 to-teal-400 text-white shadow-lg hover:brightness-110'
  }
  return colorMap[level] || colorMap['Beginner']
}

// --- Lifecycle ---
onMounted(() => {
  loadFromDatabase()
})

const loadFromDatabase = async () => {
  if (!isSupabaseConfigured()) {
    console.warn('Supabase not configured, falling back to localStorage')
    loadFromStorage()
    return
  }

  try {
    const { data, error } = await supabase
      .from('skills')
      .select('*')
      .limit(1)
      .single()

    if (error && error.code !== 'PGRST116') {
      console.error('Error loading skills data:', error)
      loadFromStorage()
      return
    }

    if (data) {
      skillsId.value = data.id
      skillsData.value = {
        designSkills: data.design_skills || [],
        developmentSkills: data.development_skills || [],
        tools: data.tools || []
      }
      normalizeDesignSkills()
      normalizeDevelopmentSkills()
    } else {
      loadFromStorage()
    }
  } catch (err) {
    console.error('Database fetch error:', err)
    loadFromStorage()
  }
}

const loadFromStorage = () => {
  const savedData = localStorage.getItem('skillsSectionData')
  if (savedData) {
    try {
      skillsData.value = { ...skillsData.value, ...JSON.parse(savedData) }
      normalizeDesignSkills()
      normalizeDevelopmentSkills()
    } catch (e) {
      console.error('Error loading skills data:', e)
    }
  } else {
    // Set default values if nothing is saved
    skillsData.value = {
      designSkills: [
        { name: 'UI/UX Design', percentage: 65, level: 'Advanced' },
        { name: 'Visual Design', percentage: 70, level: 'Advanced' },
        { name: 'Interaction Design', percentage: 70, level: 'Advanced' },
        { name: 'Prototyping', percentage: 92, level: 'Expert' },
        { name: 'User Research', percentage: 50, level: 'Intermediate' },
        { name: 'Wireframing', percentage: 85, level: 'Expert' }
      ],
      developmentSkills: [
        { name: 'HTML/CSS', percentage: 70, level: 'Advanced' },
        { name: 'JavaScript', percentage: 40, level: 'Intermediate' },
        { name: 'Vue.js', percentage: 60, level: 'Intermediate' },
        { name: 'React', percentage: 45, level: 'Intermediate' },
        { name: 'Node.js', percentage: 40, level: 'Intermediate' },
        { name: 'Python', percentage: 55, level: 'Intermediate' }
      ],
      tools: ['Figma', 'Adobe XD', 'Sketch', 'VS Code', 'GitHub', 'Docker', 'Tailwind CSS', 'Photoshop']
    }
  }
}

const normalizeDesignSkills = () => {
  skillsData.value.designSkills = (skillsData.value.designSkills || []).map(s => {
    const lvl = s.level || percentageToLevel(s.percentage)
    const pct = typeof s.percentage === 'number' ? s.percentage : levelToPercentage(lvl)
    return { ...s, level: lvl, percentage: pct }
  })
}

const normalizeDevelopmentSkills = () => {
  skillsData.value.developmentSkills = (skillsData.value.developmentSkills || []).map(s => {
    const lvl = s.level || percentageToLevel(s.percentage)
    const pct = typeof s.percentage === 'number' ? s.percentage : levelToPercentage(lvl)
    return { ...s, level: lvl, percentage: pct }
  })
}

const handleSave = async () => {
  saving.value = true
  try {
    const dbData = {
      design_skills: skillsData.value.designSkills,
      development_skills: skillsData.value.developmentSkills,
      tools: skillsData.value.tools,
      updated_at: new Date().toISOString()
    }

    let success = false
    if (isSupabaseConfigured()) {
      let result
      if (skillsId.value) {
        result = await supabase
          .from('skills')
          .update(dbData)
          .eq('id', skillsId.value)
      } else {
        result = await supabase
          .from('skills')
          .insert(dbData)
          .select()
          .single()
        if (result.data) skillsId.value = result.data.id
      }
      if (!result.error) success = true
    }

    // Always backup to localStorage
    localStorage.setItem('skillsSectionData', JSON.stringify(skillsData.value))
    if (!isSupabaseConfigured()) success = true

    if (success) {
      if (addToast) addToast('Skills updated successfully', 'success')
    } else {
      if (addToast) addToast('Error saving to database', 'error')
    }
  } catch (e) {
    console.error('Save error:', e)
    if (addToast) addToast('An error occurred while saving', 'error')
  } finally {
    saving.value = false
  }
}

const resetData = () => {
  localStorage.removeItem('skillsSectionData')
  loadFromDatabase()
}

// Expose methods for parent
defineExpose({
  refresh: loadFromDatabase,
  onSearch: (query) => {
    console.log('Searching:', query)
  }
})
</script>
