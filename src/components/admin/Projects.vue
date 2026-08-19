<template>
  <div class="p-6">
    <!-- Success Message -->
    <div v-if="showSuccess" class="mb-6 flex items-center gap-3 p-4 bg-[var(--admin-primary-light)] border border-[var(--admin-primary)] rounded-lg">
      <svg class="w-5 h-5 text-[var(--admin-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
      </svg>
      <p class="text-sm font-medium text-[var(--admin-secondary)]">Changes saved successfully!</p>
    </div>

    <div class="space-y-8">


        <!-- Projects List -->
        <div>
          <div class="flex items-center justify-between mb-4">
            <div class="flex items-center gap-3">
              <h3 class="text-base font-semibold text-[#1a1b1c]">Projects</h3>
              <button type="button" @click="toggleVis('projects', 'projects')" class="inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium transition-all" :class="vis.projects.projects ? 'text-[var(--admin-primary)] bg-[var(--admin-primary)]/10' : 'text-[#6d7175] bg-[#f6f6f7]'" :title="vis.projects.projects ? 'Visible on public site' : 'Hidden from public site'">
                <svg v-if="vis.projects.projects" class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                <svg v-else class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                {{ vis.projects.projects ? 'Visible' : 'Hidden' }}
              </button>
            </div>
            <button
              type="button"
              @click="openAddModal"
              class="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-[var(--admin-primary)] bg-[var(--admin-primary-light)] rounded-md hover:bg-[var(--admin-primary)] hover:text-white transition-all transition-colors duration-200"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              Add Project
            </button>
          </div>

          <!-- Projects Table -->
          <div class="border border-[#c9cccf] rounded-lg overflow-hidden">
            <table class="w-full">
              <thead class="bg-[#f6f6f7]">
                <tr>
                  <th class="px-4 py-3 text-left text-xs font-semibold text-[#6d7175] uppercase tracking-wider">Project</th>
                  <th class="px-4 py-3 text-left text-xs font-semibold text-[#6d7175] uppercase tracking-wider">Type</th>
                  <th class="px-4 py-3 text-left text-xs font-semibold text-[#6d7175] uppercase tracking-wider">Category</th>
                  <th class="px-4 py-3 text-left text-xs font-semibold text-[#6d7175] uppercase tracking-wider">Technologies</th>
                  <th class="px-4 py-3 text-left text-xs font-semibold text-[#6d7175] uppercase tracking-wider">Status</th>
                  <th class="px-4 py-3 text-right text-xs font-semibold text-[#6d7175] uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#e3e5e7]">
                <tr v-for="(project, index) in projectsData.projects" :key="index" class="hover:bg-[#f6f6f7] transition-colors">
                  <td class="px-4 py-4">
                    <div class="flex items-center gap-3">
                      <div 
                        class="w-10 h-10 rounded-lg flex items-center justify-center text-white text-sm font-bold"
                        :style="getGradientStyle(project)"
                      >
                        {{ project.title ? project.title.charAt(0).toUpperCase() : 'P' }}
                      </div>
                      <div>
                        <p class="text-sm font-medium text-[#1a1b1c]">{{ project.title || 'Untitled Project' }}</p>
                        <p class="text-xs text-[#6d7175] truncate max-w-[200px]">{{ project.description || 'No description' }}</p>
                      </div>
                    </div>
                  </td>
                  <td class="px-4 py-4">
                    <span 
                      class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border"
                      :class="project.projectType === 'mini' ? 'bg-[#e2f1e8] text-[#1e513c] border-[#a3d1b7]' : 'bg-[#e3f2fd] text-[#0d47a1] border-[#bbdefb]'"
                    >
                      {{ project.projectType === 'mini' ? 'Mini Project' : 'Major Project' }}
                    </span>
                  </td>
                  <td class="px-4 py-4">
                    <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-[#ebf5ff] text-[#2c6ecb]">
                      {{ project.category || 'Uncategorized' }}
                    </span>
                  </td>
                  <td class="px-4 py-4">
                    <div class="flex flex-wrap gap-1">
                      <span 
                        v-for="(tech, techIndex) in (project.technologies || []).slice(0, 3)" 
                        :key="techIndex"
                        class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-[#f6f6f7] text-[#6d7175] border border-[#c9cccf]"
                      >
                        {{ tech }}
                      </span>
                      <span v-if="(project.technologies || []).length > 3" class="text-xs text-[#6d7175]">
                        +{{ project.technologies.length - 3 }}
                      </span>
                    </div>
                  </td>
                  <td class="px-4 py-4">
                    <span 
                      class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium"
                      :class="project.link && project.link !== '#' ? 'bg-[var(--admin-primary-light)] text-[var(--admin-primary)]' : 'bg-[#ffea8a] text-[#1a1b1c]'"
                    >
                      {{ project.link && project.link !== '#' ? 'Live' : 'In Dev' }}
                    </span>
                  </td>
                  <td class="px-4 py-4 text-right">
                    <div class="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        @click="editProject(index)"
                        class="p-1.5 text-[#6d7175] hover:text-[var(--admin-primary)] hover:bg-[var(--admin-primary-light)] rounded transition-all"
                        title="Edit"
                      >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>
                      <button
                        v-if="projectsData.projects.length > 1"
                        type="button"
                        @click="removeProject(index)"
                        class="p-1.5 text-[#6d7175] hover:text-[#d72c0d] hover:bg-[#fff4f4] rounded transition-all"
                        title="Delete"
                      >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

    <!-- Add Project Modal -->
    <div v-if="isAddingProject" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-200">
        <div class="px-6 py-4 border-b border-[#c9cccf] flex items-center justify-between">
          <h3 class="text-lg font-semibold text-[#1a1b1c]">Create New Project</h3>
          <button @click="isAddingProject = false" class="text-[#6d7175] hover:text-[#1a1b1c]">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div class="p-6 space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label class="block text-sm font-medium text-[#1a1b1c] mb-2">Title</label>
              <input
                v-model="newProject.title"
                type="text"
                class="w-full px-4 py-2.5 text-sm text-[#1a1b1c] bg-white border border-[#c9cccf] rounded-md focus:outline-none focus:border-[var(--admin-primary)] focus:ring-2 focus:ring-[var(--admin-primary)]/20 transition-all font-outfit"
                placeholder="Project Title"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-[#1a1b1c] mb-2">Project Type</label>
              <select
                v-model="newProject.projectType"
                class="w-full px-4 py-2.5 text-sm text-[#1a1b1c] bg-white border border-[#c9cccf] rounded-md focus:outline-none focus:border-[var(--admin-primary)] focus:ring-2 focus:ring-[var(--admin-primary)]/20 transition-all font-outfit cursor-pointer"
              >
                <option value="major">Major Project</option>
                <option value="mini">Mini Project</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-[#1a1b1c] mb-2">Category</label>
              <select
                v-model="newProject.category"
                class="w-full px-4 py-2.5 text-sm text-[#1a1b1c] bg-white border border-[#c9cccf] rounded-md focus:outline-none focus:border-[var(--admin-primary)] focus:ring-2 focus:ring-[var(--admin-primary)]/20 transition-all font-outfit cursor-pointer"
              >
                <option value="" disabled>Select category</option>
                <option value="Web App">Web App</option>
                <option value="Web System">Web System</option>
              </select>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-[#1a1b1c] mb-2">Description</label>
            <textarea
              v-model="newProject.description"
              rows="3"
              class="w-full px-4 py-2.5 text-sm text-[#1a1b1c] bg-white border border-[#c9cccf] rounded-md focus:outline-none focus:border-[var(--admin-primary)] focus:ring-2 focus:ring-[var(--admin-primary)]/20 transition-all resize-y font-outfit"
              placeholder="Project description..."
            ></textarea>
          </div>

          <div>
            <div class="flex items-center justify-between mb-2">
              <label class="block text-sm font-medium text-[#1a1b1c]">Project Link</label>
              <span 
                class="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider transition-all"
                :class="newProject.link && newProject.link !== '#' ? 'bg-[var(--admin-primary-light)] text-[var(--admin-primary)]' : 'bg-[#ffea8a] text-[#1a1b1c]'"
              >
                {{ newProject.link && newProject.link !== '#' ? 'Live' : 'In Dev' }}
              </span>
            </div>
            <input
              v-model="newProject.link"
              type="text"
              class="w-full px-4 py-2.5 text-sm text-[#1a1b1c] bg-white border border-[#c9cccf] rounded-md focus:outline-none focus:border-[var(--admin-primary)] focus:ring-2 focus:ring-[var(--admin-primary)]/20 transition-all font-outfit"
              placeholder="https://... or # for in development"
            />
            <p class="mt-1 text-xs text-[#6d7175]">Leave empty or use # to set status as "In Dev"</p>
          </div>

          <div>
            <label class="block text-sm font-medium text-[#1a1b1c] mb-2">Technologies</label>
            <div class="space-y-3">
              <div class="relative w-full">
                <input
                  v-model="techSearchQuery"
                  type="text"
                  class="w-full px-4 py-2.5 text-sm text-[#1a1b1c] bg-white border border-[#c9cccf] rounded-md focus:outline-none focus:border-[var(--admin-primary)] focus:ring-2 focus:ring-[var(--admin-primary)]/20 transition-all font-outfit"
                  placeholder="Search or add technology (e.g. Next.js, Django)"
                  @keyup.enter="handleTechAdd('new')"
                />
                <!-- Suggestions Dropdown -->
                <div v-if="suggestedTechs.length > 0 && techSearchQuery" class="absolute z-50 left-0 right-0 mt-1 bg-white border border-[#e3e5e7] rounded-md shadow-lg overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                  <button
                    v-for="tech in suggestedTechs"
                    :key="tech.name"
                    type="button"
                    @click="selectSuggestedTech(tech, 'new')"
                    class="w-full px-4 py-2 text-left text-sm hover:bg-[#f6f6f7] flex items-center gap-3 transition-colors"
                  >
                    <img :src="`https://skillicons.dev/icons?i=${tech.icon}`" class="w-5 h-5 object-contain" @error="(e) => (e.target.style.display = 'none')">
                    <span class="text-[#1a1b1c]">{{ tech.name }}</span>
                  </button>
                </div>
              </div>

              <!-- Selected Technologies underneath -->
              <div v-if="newProject.technologies?.length > 0" class="flex flex-wrap gap-2">
                <span
                  v-for="(tech, techIndex) in newProject.technologies"
                  :key="techIndex"
                  class="inline-flex items-center gap-1 px-3 py-1 bg-[#f6f6f7] text-[#1a1b1c] rounded-full text-sm border border-[#c9cccf] animate-in fade-in zoom-in duration-200"
                >
                  {{ tech }}
                  <button @click="newProject.technologies.splice(techIndex, 1)" class="text-[#6d7175] hover:text-[#d72c0d] transition-colors">
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              </div>
              
              <p v-if="techSearchQuery" class="text-[10px] text-[#6d7175] flex items-center gap-1">
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Tip: Press Enter to add custom technology
              </p>
            </div>
          </div>


          <!-- Project Gallery -->
          <div>
            <label class="block text-sm font-medium text-[#1a1b1c] mb-3">Project Gallery (Documentation)</label>
            <div class="space-y-4">
              <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                <!-- Gallery Item -->
                <div 
                  v-for="(img, imgIndex) in newProject.gallery" 
                  :key="imgIndex"
                  class="relative aspect-video rounded-lg overflow-hidden border border-[#c9cccf] group"
                >
                  <img :src="img" class="w-full h-full object-cover" />
                  <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button 
                      type="button"
                      @click="newProject.gallery.splice(imgIndex, 1)"
                      class="p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                    >
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                <!-- Add Image Button -->
                <button 
                  type="button"
                  @click="triggerGalleryUpload('new')"
                  class="aspect-video rounded-lg border-2 border-dashed border-[#c9cccf] hover:border-[var(--admin-primary)] hover:bg-[#f6f6f7] transition-all flex flex-col items-center justify-center gap-1 text-[#6d7175] hover:text-[var(--admin-primary)]"
                >
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                  </svg>
                  <span class="text-[10px] font-medium uppercase tracking-wider">Add Image</span>
                </button>
              </div>
              <input 
                ref="galleryInputNew"
                type="file"
                multiple
                accept="image/*"
                class="hidden"
                @change="(e) => handleGalleryUpload(e, 'new')"
              />
              <p class="text-xs text-[#6d7175]">Upload screenshots or documentation images of your project.</p>
            </div>
          </div>
        </div>

        <div class="px-6 py-4 border-t border-[#c9cccf] flex items-center justify-end gap-3">
          <button
            type="button"
            @click="isAddingProject = false"
            class="px-4 py-2 text-sm font-medium text-[#1a1b1c] hover:text-[var(--admin-primary)] transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            @click="confirmAddProject"
            class="px-6 py-2.5 text-sm font-medium text-white bg-[var(--admin-primary)] rounded-md hover:bg-[var(--admin-secondary)] transition-all shadow-sm"
          >
            Create Project
          </button>
        </div>
      </div>
    </div>

    <!-- Edit Project Modal -->
    <div v-if="editingProject !== null" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div class="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-200">
        <div class="px-6 py-4 border-b border-[#c9cccf] flex items-center justify-between">
          <h3 class="text-lg font-semibold text-[#1a1b1c]">Edit Project</h3>
          <button @click="editingProject = null" class="text-[#6d7175] hover:text-[#1a1b1c]">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div class="p-6 space-y-6" v-if="editingProject !== null">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label class="block text-sm font-medium text-[#1a1b1c] mb-2">Title</label>
              <input
                v-model="projectsData.projects[editingProject].title"
                type="text"
                class="w-full px-4 py-2.5 text-sm text-[#1a1b1c] bg-white border border-[#c9cccf] rounded-md focus:outline-none focus:border-[var(--admin-primary)] focus:ring-2 focus:ring-[var(--admin-primary)]/20 transition-all font-outfit"
                placeholder="Project Title"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-[#1a1b1c] mb-2">Project Type</label>
              <select
                v-model="projectsData.projects[editingProject].projectType"
                class="w-full px-4 py-2.5 text-sm text-[#1a1b1c] bg-white border border-[#c9cccf] rounded-md focus:outline-none focus:border-[var(--admin-primary)] focus:ring-2 focus:ring-[var(--admin-primary)]/20 transition-all font-outfit cursor-pointer"
              >
                <option value="major">Major Project</option>
                <option value="mini">Mini Project</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-[#1a1b1c] mb-2">Category</label>
              <select
                v-model="projectsData.projects[editingProject].category"
                class="w-full px-4 py-2.5 text-sm text-[#1a1b1c] bg-white border border-[#c9cccf] rounded-md focus:outline-none focus:border-[var(--admin-primary)] focus:ring-2 focus:ring-[var(--admin-primary)]/20 transition-all font-outfit cursor-pointer"
              >
                <option value="" disabled>Select category</option>
                <option value="Web App">Web App</option>
                <option value="Web System">Web System</option>
              </select>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-[#1a1b1c] mb-2">Description</label>
            <textarea
              v-model="projectsData.projects[editingProject].description"
              rows="3"
              class="w-full px-4 py-2.5 text-sm text-[#1a1b1c] bg-white border border-[#c9cccf] rounded-md focus:outline-none focus:border-[var(--admin-primary)] focus:ring-2 focus:ring-[var(--admin-primary)]/20 transition-all resize-y font-outfit"
              placeholder="Project description..."
            ></textarea>
          </div>

          <div>
            <div class="flex items-center justify-between mb-2">
              <label class="block text-sm font-medium text-[#1a1b1c]">Project Link</label>
              <span 
                class="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider transition-all"
                :class="projectsData.projects[editingProject].link && projectsData.projects[editingProject].link !== '#' ? 'bg-[var(--admin-primary-light)] text-[var(--admin-primary)]' : 'bg-[#ffea8a] text-[#1a1b1c]'"
              >
                {{ projectsData.projects[editingProject].link && projectsData.projects[editingProject].link !== '#' ? 'Live' : 'In Dev' }}
              </span>
            </div>
            <input
              v-model="projectsData.projects[editingProject].link"
              type="text"
              class="w-full px-4 py-2.5 text-sm text-[#1a1b1c] bg-white border border-[#c9cccf] rounded-md focus:outline-none focus:border-[var(--admin-primary)] focus:ring-2 focus:ring-[var(--admin-primary)]/20 transition-all font-outfit"
              placeholder="https://... or # for in development"
            />
            <p class="mt-1 text-xs text-[#6d7175]">Leave empty or use # to set status as "In Dev"</p>
          </div>

          <div>
            <label class="block text-sm font-medium text-[#1a1b1c] mb-2">Technologies</label>
            <div class="space-y-3">
              <div class="relative w-full">
                <input
                  v-model="techSearchQuery"
                  type="text"
                  class="w-full px-4 py-2.5 text-sm text-[#1a1b1c] bg-white border border-[#c9cccf] rounded-md focus:outline-none focus:border-[var(--admin-primary)] focus:ring-2 focus:ring-[var(--admin-primary)]/20 transition-all font-outfit"
                  placeholder="Search or add technology"
                  @keyup.enter="handleTechAdd('edit')"
                />
                <!-- Suggestions Dropdown -->
                <div v-if="suggestedTechs.length > 0 && techSearchQuery" class="absolute z-50 left-0 right-0 mt-1 bg-white border border-[#e3e5e7] rounded-md shadow-lg overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                  <button
                    v-for="tech in suggestedTechs"
                    :key="tech.name"
                    type="button"
                    @click="selectSuggestedTech(tech, 'edit')"
                    class="w-full px-4 py-2 text-left text-sm hover:bg-[#f6f6f7] flex items-center gap-3 transition-colors"
                  >
                    <img :src="`https://skillicons.dev/icons?i=${tech.icon}`" class="w-5 h-5 object-contain" @error="(e) => (e.target.style.display = 'none')">
                    <span class="text-[#1a1b1c]">{{ tech.name }}</span>
                  </button>
                </div>
              </div>

              <!-- Selected Technologies underneath -->
              <div v-if="projectsData.projects[editingProject].technologies?.length > 0" class="flex flex-wrap gap-2">
                <span
                  v-for="(tech, techIndex) in projectsData.projects[editingProject].technologies"
                  :key="techIndex"
                  class="inline-flex items-center gap-1 px-3 py-1 bg-[#f6f6f7] text-[#1a1b1c] rounded-full text-sm border border-[#c9cccf] animate-in fade-in zoom-in duration-200"
                >
                  {{ tech }}
                  <button @click="removeTechnology(editingProject, techIndex)" class="text-[#6d7175] hover:text-[#d72c0d] transition-colors">
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              </div>
            </div>
          </div>


          <!-- Project Gallery (Edit) -->
          <div v-if="editingProject !== null">
            <label class="block text-sm font-medium text-[#1a1b1c] mb-3">Project Gallery (Documentation)</label>
            <div class="space-y-4">
              <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                <div 
                  v-for="(img, imgIndex) in projectsData.projects[editingProject].gallery" 
                  :key="imgIndex"
                  class="relative aspect-video rounded-lg overflow-hidden border border-[#c9cccf] group"
                >
                  <img :src="img" class="w-full h-full object-cover" />
                  <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button 
                      type="button"
                      @click="projectsData.projects[editingProject].gallery.splice(imgIndex, 1)"
                      class="p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                    >
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                <button 
                  type="button"
                  @click="triggerGalleryUpload('edit')"
                  class="aspect-video rounded-lg border-2 border-dashed border-[#c9cccf] hover:border-[var(--admin-primary)] hover:bg-[#f6f6f7] transition-all flex flex-col items-center justify-center gap-1 text-[#6d7175] hover:text-[var(--admin-primary)]"
                >
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                  </svg>
                  <span class="text-[10px] font-medium uppercase tracking-wider">Add Image</span>
                </button>
              </div>
              <input 
                ref="galleryInputEdit"
                type="file"
                multiple
                accept="image/*"
                class="hidden"
                @change="(e) => handleGalleryUpload(e, 'edit')"
              />
            </div>
          </div>
        </div>

        <div class="px-6 py-4 border-t border-[#c9cccf] flex items-center justify-end gap-3">
          <button
            type="button"
            @click="editingProject = null"
            class="px-4 py-2 text-sm font-medium text-[#1a1b1c] hover:text-[var(--admin-primary)] transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            @click="handleEditDone"
            class="px-6 py-2.5 text-sm font-medium text-white bg-[var(--admin-primary)] rounded-md hover:bg-[var(--admin-secondary)] transition-all shadow-sm"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, inject, nextTick, computed } from 'vue'
import { supabase, isSupabaseConfigured } from '../../supabase'
import { useVisibility } from '../../composables/useVisibility'

const { vis, toggle: toggleVis } = useVisibility()
const COMMON_TECHS = [
  // Frontend
  { name: 'React', icon: 'react' },
  { name: 'Vue.js', icon: 'vue' },
  { name: 'Next.js', icon: 'nextjs' },
  { name: 'Nuxt.js', icon: 'nuxtjs' },
  { name: 'Angular', icon: 'angular' },
  { name: 'Svelte', icon: 'svelte' },
  { name: 'Tailwind CSS', icon: 'tailwind' },
  { name: 'TypeScript', icon: 'ts' },
  { name: 'JavaScript', icon: 'js' },
  { name: 'HTML5', icon: 'html' },
  { name: 'CSS3', icon: 'css' },
  { name: 'Vite', icon: 'vite' },
  { name: 'Figma', icon: 'figma' },
  // Backend
  { name: 'Node.js', icon: 'nodejs' },
  { name: 'Express', icon: 'express' },
  { name: 'NestJS', icon: 'nestjs' },
  { name: 'Django', icon: 'django' },
  { name: 'Python', icon: 'python' },
  { name: 'Flask', icon: 'flask' },
  { name: 'Laravel', icon: 'laravel' },
  { name: 'PHP', icon: 'php' },
  { name: 'Ruby', icon: 'ruby' },
  { name: 'Go', icon: 'go' },
  { name: 'Rust', icon: 'rust' },
  // Database
  { name: 'PostgreSQL', icon: 'postgres' },
  { name: 'MySQL', icon: 'mysql' },
  { name: 'MongoDB', icon: 'mongodb' },
  { name: 'Redis', icon: 'redis' },
  { name: 'SQLite', icon: 'sqlite' },
  { name: 'Supabase', icon: 'supabase' },
  { name: 'Firebase', icon: 'firebase' },
  { name: 'Prisma', icon: 'prisma' },
  // Others
  { name: 'Docker', icon: 'docker' },
  { name: 'Git', icon: 'git' },
  { name: 'GraphQL', icon: 'graphql' }
]

const addToast = inject('addToast')
const projectsId = ref(null)

const projectsData = ref({
  projects: []
})

const saving = ref(false)
const showSuccess = ref(false)
const editingProject = ref(null)
const isAddingProject = ref(false)
const newProject = ref({
  title: '',
  description: '',
  category: '',
  projectType: 'major',
  link: '',
  technologies: [],
  gallery: [],
  gradientFrom: 'primary-400',
  gradientTo: 'primary-600'
})
const techSearchQuery = ref('')
const galleryInputNew = ref(null)
const galleryInputEdit = ref(null)
const addTechInput = ref(null)
const editTechInput = ref(null)
const techInputs = ref({})

const suggestedTechs = computed(() => {
  const query = techSearchQuery.value.toLowerCase().trim()
  if (!query) return []
  return COMMON_TECHS.filter(tech => 
    tech.name.toLowerCase().includes(query) || 
    tech.icon.toLowerCase().includes(query)
  ).slice(0, 5)
})

// Load data from localStorage on mount
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
      .from('projects')
      .select('*')
      .limit(1)
      .single()

    if (error && error.code !== 'PGRST116') {
      console.error('Error loading projects data:', error)
      loadFromStorage()
      return
    }

    if (data) {
      projectsId.value = data.id
      projectsData.value = {
        projects: data.projects || []
      }
    } else {
      loadFromStorage()
    }
  } catch (err) {
    console.error('Database fetch error:', err)
    loadFromStorage()
  }
}

const loadFromStorage = () => {
  const savedData = localStorage.getItem('projectsSectionData')
  if (savedData) {
    try {
      projectsData.value = { ...projectsData.value, ...JSON.parse(savedData) }
    } catch (e) {
      console.error('Error loading projects data:', e)
    }
  } else {
    // Set default values if nothing is saved
    projectsData.value = {
      projects: []
    }
  }
}

const triggerGalleryUpload = (mode) => {
  if (mode === 'new' && galleryInputNew.value) {
    galleryInputNew.value.click()
  } else if (mode === 'edit' && galleryInputEdit.value) {
    galleryInputEdit.value.click()
  }
}

const handleGalleryUpload = async (event, mode) => {
  const files = event.target.files
  if (!files || files.length === 0) return

  for (const file of files) {
    try {
      const fileName = `${Date.now()}-${file.name}`
      const filePath = `project-gallery/${fileName}`

      let publicUrl = ''
      
      if (isSupabaseConfigured()) {
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('portfolio-assets')
          .upload(filePath, file)

        if (uploadError) throw uploadError

        const { data: { publicUrl: url } } = supabase.storage
          .from('portfolio-assets')
          .getPublicUrl(filePath)
        
        publicUrl = url
      } else {
        // Fallback to base64 for local development
        publicUrl = await new Promise((resolve) => {
          const reader = new FileReader()
          reader.onloadend = () => resolve(reader.result)
          reader.readAsDataURL(file)
        })
      }

      if (mode === 'new') {
        if (!newProject.value.gallery) newProject.value.gallery = []
        newProject.value.gallery.push(publicUrl)
      } else {
        if (!projectsData.value.projects[editingProject.value].gallery) {
          projectsData.value.projects[editingProject.value].gallery = []
        }
        projectsData.value.projects[editingProject.value].gallery.push(publicUrl)
      }
    } catch (error) {
      console.error('Error uploading gallery image:', error)
      if (addToast) addToast(`Failed to upload ${file.name}`, 'error')
    }
  }
}

const getGradientStyle = (project) => {
  const colorMap = {
    'primary-400': '#60a5fa',
    'primary-600': '#2563eb',
    'green-400': '#4ade80',
    'blue-500': '#3b82f6',
    'purple-400': '#c084fc',
    'pink-500': '#ec4899',
    'gray-400': '#9ca3af',
    'gray-600': '#4b5563'
  }
  
  const fromColor = colorMap[project.gradientFrom] || colorMap['gray-400']
  const toColor = colorMap[project.gradientTo] || colorMap['gray-600']
  
  return {
    background: `linear-gradient(135deg, ${fromColor}, ${toColor})`
  }
}

const getRandomGradient = () => {
  const colors = [
    'primary-400', 'primary-600', 'green-400', 
    'blue-500', 'purple-400', 'pink-500', 
    'gray-400', 'gray-600'
  ]
  const from = colors[Math.floor(Math.random() * colors.length)]
  const to = colors[Math.floor(Math.random() * colors.length)]
  return { from, to }
}

const openAddModal = () => {
  const randomColors = getRandomGradient()
  newProject.value = {
    title: '',
    description: '',
    category: '',
    projectType: 'major',
    link: '',
    technologies: [],
    gallery: [],
    gradientFrom: randomColors.from,
    gradientTo: randomColors.to
  }
  isAddingProject.value = true
}

const confirmAddProject = async () => {
  if (!newProject.value.title.trim()) {
    if (addToast) addToast('Please enter a project title', 'error')
    return
  }
  projectsData.value.projects.push({ ...newProject.value })
  isAddingProject.value = false
  await handleSave()
}

const handleTechAdd = (mode) => {
  const value = techSearchQuery.value.trim()
  if (!value) return

  if (mode === 'new') {
    if (!newProject.value.technologies.includes(value)) {
      newProject.value.technologies.push(value)
    }
  } else if (mode === 'edit' && editingProject.value !== null) {
    if (!projectsData.value.projects[editingProject.value].technologies) {
      projectsData.value.projects[editingProject.value].technologies = []
    }
    if (!projectsData.value.projects[editingProject.value].technologies.includes(value)) {
      projectsData.value.projects[editingProject.value].technologies.push(value)
    }
  }
  techSearchQuery.value = ''
}

const selectSuggestedTech = (tech, mode) => {
  if (mode === 'new') {
    if (!newProject.value.technologies.includes(tech.name)) {
      newProject.value.technologies.push(tech.name)
    }
  } else if (mode === 'edit' && editingProject.value !== null) {
    if (!projectsData.value.projects[editingProject.value].technologies.includes(tech.name)) {
      projectsData.value.projects[editingProject.value].technologies.push(tech.name)
    }
  }
  techSearchQuery.value = ''
}



const removeProject = async (index) => {
  projectsData.value.projects.splice(index, 1)
  await handleSave()
}

const editProject = async (index) => {
  editingProject.value = index
  if (!projectsData.value.projects[index].projectType) {
    projectsData.value.projects[index].projectType = 'major'
  }
  await nextTick()
  if (editTechInput.value) {
    editTechInput.value.focus()
  }
}

const handleEditDone = async () => {
  editingProject.value = null
  await handleSave()
}

const removeTechnology = (projectIndex, techIndex) => {
  projectsData.value.projects[projectIndex].technologies.splice(techIndex, 1)
}

const resetData = () => {
  localStorage.removeItem('projectsSectionData')
  loadFromDatabase()
}

const handleSave = async () => {
  saving.value = true
  showSuccess.value = false

  try {
    const dbData = {
      projects: projectsData.value.projects,
      updated_at: new Date().toISOString()
    }

    let success = false
    if (isSupabaseConfigured()) {
      let result
      if (projectsId.value) {
        result = await supabase
          .from('projects')
          .update(dbData)
          .eq('id', projectsId.value)
      } else {
        result = await supabase
          .from('projects')
          .insert(dbData)
          .select()
          .single()
        if (result.data) projectsId.value = result.data.id
      }
      if (!result.error) success = true
    }

    // Always backup to localStorage
    localStorage.setItem('projectsSectionData', JSON.stringify(projectsData.value))
    if (!isSupabaseConfigured()) success = true

    await new Promise(resolve => setTimeout(resolve, 500))
    
    if (success) {
      showSuccess.value = true
      if (addToast) addToast('Projects section updated successfully', 'success')
      setTimeout(() => { showSuccess.value = false }, 3000)
    } else {
      if (addToast) addToast('Error saving to database', 'error')
    }
  } catch (error) {
    console.error('Error saving projects data:', error)
    if (addToast) addToast('An error occurred while saving', 'error')
  } finally {
    saving.value = false
  }
}

// Expose methods for parent
defineExpose({
  refresh: loadFromDatabase,
  onSearch: (query) => {
  }
})
</script>
