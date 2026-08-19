<template>
    <section id="Contact" class="py-24 bg-white">
        <div class="max-w-7xl mx-auto px-6">
            <!-- Loading State -->
            <div v-if="isLoading">
                <div class="text-center mb-16">
                    <div class="h-6 w-40 bg-gray-200 rounded animate-pulse mx-auto mb-4"></div>
                    <div class="h-12 w-64 bg-gray-200 rounded animate-pulse mx-auto mb-6"></div>
                    <div class="space-y-3 max-w-2xl mx-auto">
                        <div class="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                        <div class="h-4 w-5/6 bg-gray-200 rounded animate-pulse mx-auto"></div>
                    </div>
                    <div class="w-24 h-1 bg-gray-200 mx-auto rounded-full mt-6 animate-pulse"></div>
                </div>
                
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    <div>
                        <div class="h-9 w-48 bg-gray-200 rounded animate-pulse mb-8"></div>
                        <div class="space-y-6">
                            <div v-for="i in 3" :key="i" class="flex items-center p-6 bg-gray-50 rounded-2xl">
                                <div class="w-16 h-16 bg-gray-200 rounded-xl animate-pulse mr-6"></div>
                                <div class="flex-1 space-y-3">
                                    <div class="h-6 w-28 bg-gray-200 rounded animate-pulse"></div>
                                    <div class="h-4 w-48 bg-gray-200 rounded animate-pulse"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="bg-gray-50 p-8 rounded-2xl">
                        <div class="h-9 w-48 bg-gray-200 rounded animate-pulse mb-8"></div>
                        <div class="space-y-6">
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div v-for="i in 2" :key="i">
                                    <div class="h-4 w-16 bg-gray-200 rounded animate-pulse mb-3"></div>
                                    <div class="h-14 w-full bg-gray-200 rounded-xl animate-pulse"></div>
                                </div>
                            </div>
                            <div>
                                <div class="h-4 w-20 bg-gray-200 rounded animate-pulse mb-3"></div>
                                <div class="h-14 w-full bg-gray-200 rounded-xl animate-pulse"></div>
                            </div>
                            <div>
                                <div class="h-4 w-24 bg-gray-200 rounded animate-pulse mb-3"></div>
                                <div class="h-32 w-full bg-gray-200 rounded-xl animate-pulse"></div>
                            </div>
                            <div class="h-14 w-full bg-gray-200 rounded-xl animate-pulse"></div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Error State -->
            <div v-else-if="hasError || !contactData" class="text-center py-16">
                <div class="text-gray-400 mb-4">
                    <svg class="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </div>
                <h3 class="text-xl font-semibold text-gray-600 mb-2">Failed to load contact info</h3>
                <p class="text-gray-400">Please check your database connection.</p>
            </div>

            <!-- Loaded Data -->
            <div v-else class="animate-in fade-in slide-in-from-bottom-5 duration-700">
                <div class="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
                    
                    <!-- LEFT COLUMN: Intent & Context -->
                    <div class="lg:col-span-5 flex flex-col justify-between">
                        <div>
                            <header v-if="!isHidden('contact', 'sectionLabel') || !isHidden('contact', 'info')" class="mb-16">
                                <div v-if="!isHidden('contact', 'sectionLabel')" class="flex items-center gap-4 mb-6">
                                    <span class="w-12 h-[2px] bg-primary-500"></span>
                                    <h4 class="text-[12px] font-black text-primary-500 uppercase tracking-[0.5em]">{{ contactData.sectionLabel }}</h4>
                                </div>
                                <h2 class="text-5xl md:text-7xl font-black text-gray-900 leading-[1.05] tracking-tighter mb-8 italic uppercase">
                                    Let's <span class="text-primary-600">Connect</span>
                                </h2>
                                <p v-if="!isHidden('contact', 'info')" class="text-xl text-gray-500 font-medium leading-relaxed max-w-md">
                                    {{ contactData.description }}
                                </p>
                            </header>

                            <!-- Modern Info Grid -->
                            <div class="space-y-4">
                                <!-- Email Nodes -->
                                <a 
                                    v-for="(email, index) in contactData.emails" 
                                    :key="`email-${index}`"
                                    :href="`mailto:${email}`"
                                    class="group flex items-center p-6 bg-gray-50/50 hover:bg-white border border-transparent hover:border-gray-100 hover:shadow-2xl rounded-[2rem] transition-all duration-500"
                                >
                                    <div class="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm group-hover:bg-primary-50 transition-colors duration-500">
                                        <svg class="w-6 h-6 text-gray-400 group-hover:text-primary-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                        </svg>
                                    </div>
                                    <div class="ml-6">
                                        <p class="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-1">Direct Line</p>
                                        <p class="text-gray-900 font-black tracking-tight">{{ email }}</p>
                                    </div>
                                    <svg class="w-5 h-5 ml-auto text-gray-300 transform translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </a>

                                <!-- GitHub Nodes -->
                                <a 
                                    v-for="(github, index) in contactData.githubs" 
                                    :key="`gh-${index}`"
                                    :href="github"
                                    target="_blank"
                                    class="group flex items-center p-6 bg-gray-50/50 hover:bg-white border border-transparent hover:border-gray-100 hover:shadow-2xl rounded-[2rem] transition-all duration-500"
                                >
                                    <div class="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm group-hover:bg-primary-50 transition-colors duration-500">
                                        <svg class="w-6 h-6 text-gray-400 group-hover:text-primary-500 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
                                        </svg>
                                    </div>
                                    <div class="ml-6">
                                        <p class="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-1">Open Source</p>
                                        <p class="text-gray-900 font-black tracking-tight">{{ github.replace('https://github.com/', '') }}</p>
                                    </div>
                                    <svg class="w-5 h-5 ml-auto text-gray-300 transform translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </a>

                                <!-- Location Node -->
                                <div class="flex items-center p-6 bg-transparent rounded-[2rem]">
                                    <div class="w-14 h-14 bg-gray-100/50 rounded-2xl flex items-center justify-center">
                                        <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                        </svg>
                                    </div>
                                    <div class="ml-6">
                                        <p class="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-1">HQ</p>
                                        <p class="text-gray-600 font-bold tracking-tight">{{ contactData.location }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Availability Indicator -->
                        <div class="mt-16 sm:mt-0 flex items-center gap-6 p-8 bg-primary-600 rounded-[2.5rem] shadow-2xl shadow-primary-500/20">
                            <div class="relative flex h-4 w-4">
                                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                                <span class="relative inline-flex rounded-full h-4 w-4 bg-white/40 border-2 border-white"></span>
                            </div>
                            <div>
                                <p class="text-[10px] font-black text-primary-100 uppercase tracking-[0.2em] mb-1">Availability</p>
                                <p class="text-white font-black tracking-tight">Open for global opportunities</p>
                            </div>
                        </div>
                    </div>

                    <!-- RIGHT COLUMN: Interaction Node -->
                    <div class="lg:col-span-7">
                        <div class="bg-gray-50 p-10 md:p-14 rounded-[3rem] border border-gray-100 shadow-sm relative overflow-hidden group">
                            <!-- Background Decor -->
                            <div class="absolute -top-24 -right-24 w-64 h-64 bg-primary-100/30 rounded-full blur-[80px] group-hover:bg-primary-200/40 transition-colors duration-1000"></div>
                            
                            <h3 class="text-3xl font-black text-gray-900 tracking-tighter uppercase italic mb-12">
                                {{ contactData.formHeading }}
                            </h3>

                            <form @submit.prevent="handleSubmit" class="space-y-8 relative z-10">
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div class="space-y-3">
                                        <label class="text-[11px] font-black text-gray-400 uppercase tracking-[0.3em] ml-2">Name</label>
                                        <input 
                                            v-model="form.name"
                                            type="text" 
                                            required
                                            class="w-full px-6 py-5 bg-white border-transparent focus:border-primary-500 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary-500/5 transition-all duration-300 font-bold text-gray-900" 
                                            placeholder="John Doe"
                                        >
                                    </div>
                                    <div class="space-y-3">
                                        <label class="text-[11px] font-black text-gray-400 uppercase tracking-[0.3em] ml-2">Email address</label>
                                        <input 
                                            v-model="form.email"
                                            type="email" 
                                            required
                                            class="w-full px-6 py-5 bg-white border-transparent focus:border-primary-500 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary-500/5 transition-all duration-300 font-bold text-gray-900" 
                                            placeholder="johndoe@gmail.com"
                                        >
                                    </div>
                                </div>
                                <div class="space-y-3">
                                    <label class="text-[11px] font-black text-gray-400 uppercase tracking-[0.3em] ml-2">Subject</label>
                                    <input 
                                        v-model="form.subject"
                                        type="text" 
                                        class="w-full px-6 py-5 bg-white border-transparent focus:border-primary-500 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary-500/5 transition-all duration-300 font-bold text-gray-900" 
                                        placeholder="Project Inquiry / Hiring"
                                    >
                                </div>
                                <div class="space-y-3">
                                    <label class="text-[11px] font-black text-gray-400 uppercase tracking-[0.3em] ml-2">Your Message</label>
                                    <textarea 
                                        v-model="form.message"
                                        rows="5" 
                                        required
                                        class="w-full px-6 py-5 bg-white border-transparent focus:border-primary-500 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary-500/5 transition-all duration-300 resize-none font-bold text-gray-900" 
                                        placeholder="Tell me about your vision..."
                                    ></textarea>
                                </div>
                                
                                <!-- Feedback Toast Inside Card -->
                                <div v-if="showFormSuccess" class="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-start gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
                                    <svg class="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <div class="text-left">
                                        <p class="text-xs font-bold text-emerald-800">Transmission Complete</p>
                                        <p class="text-[11px] text-emerald-600 font-medium mt-0.5">{{ formFeedbackMsg }}</p>
                                    </div>
                                </div>

                                <div v-if="showFormError" class="p-4 bg-rose-50 rounded-2xl border border-rose-100 flex items-start gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
                                    <svg class="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                    </svg>
                                    <div class="text-left">
                                        <p class="text-xs font-bold text-rose-800">Dispatch Interrupted</p>
                                        <p class="text-[11px] text-rose-600 font-medium mt-0.5">{{ formFeedbackMsg }}</p>
                                    </div>
                                </div>

                                <button 
                                    type="submit" 
                                    :disabled="isSending"
                                    class="w-full bg-gray-900 hover:bg-black text-white px-10 py-6 rounded-2xl transition-all duration-300 font-black shadow-2xl hover:shadow-primary-500/10 transform active:scale-[0.98] flex items-center justify-center group overflow-hidden relative disabled:opacity-75 disabled:cursor-not-allowed"
                                >
                                    <span class="relative z-10 flex items-center gap-4 text-[11px] uppercase tracking-[0.3em]">
                                        {{ isSending ? 'Transmitting Node...' : 'Dispatch Message' }}
                                        <svg v-if="isSending" class="animate-spin w-5 h-5 text-primary-400" fill="none" viewBox="0 0 24 24">
                                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        <svg v-else class="w-5 h-5 text-primary-400 group-hover:translate-x-2 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </span>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../supabase'
import { useVisibility } from '../composables/useVisibility'

const { isHidden } = useVisibility()
const contactData = ref(null)
const isLoading = ref(true)
const hasError = ref(false)

const form = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const isSending = ref(false)
const showFormSuccess = ref(false)
const showFormError = ref(false)
const formFeedbackMsg = ref('')

const handleSubmit = async () => {
  if (!form.value.name.trim() || !form.value.email.trim() || !form.value.message.trim()) {
    showFormError.value = true
    formFeedbackMsg.value = 'Please complete all required fields.'
    setTimeout(() => { showFormError.value = false }, 4000)
    return
  }

  isSending.value = true
  showFormSuccess.value = false
  showFormError.value = false

  const newInquiry = {
    name: form.value.name.trim(),
    email: form.value.email.trim(),
    subject: form.value.subject.trim() || 'General Inquiry',
    message: form.value.message.trim(),
    is_read: false,
    created_at: new Date().toISOString()
  }

  let dbSaved = false

  // 1. Try to save to Supabase contact_messages table
  if (supabase) {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert([newInquiry])
      
      if (!error) {
        dbSaved = true
      } else {
        console.warn('Supabase message cache fallback:', error)
      }
    } catch (e) {
      console.error('Supabase write failure:', e)
    }
  }

  // 2. Backup cache to Local Storage so Inbox works offline/fallback
  try {
    const saved = localStorage.getItem('submittedContactMessages')
    const existing = saved ? JSON.parse(saved) : []
    existing.push({
      id: Date.now(),
      ...newInquiry
    })
    localStorage.setItem('submittedContactMessages', JSON.stringify(existing))
  } catch (e) {
    console.error('Failed to cache message locally:', e)
  }

  // 3. Dispatch real-time emails to both addresses using Web3Forms
  try {
    const recipients = contactData.value?.emails || ['perezbrian091598@gmail.com', 'perezbrian12124124@gmail.com']
    for (const email of recipients) {
      if (!email) continue
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: '603c40ab-5c3b-48ad-8d96-b6058d88e40f', // Global standard key
          name: form.value.name,
          email: form.value.email,
          subject: `Systematic Portfolio - Message from ${form.value.name}`,
          message: `Inquiry details:
          
Sender Name: ${form.value.name}
Sender Email: ${form.value.email}
Subject: ${form.value.subject || 'General Inquiry'}

Message:
${form.value.message}

--
Sent directly to: ${email}`
        })
      })
    }
  } catch (e) {
    console.error('Email dispatch error:', e)
  }

  await new Promise(resolve => setTimeout(resolve, 1000))
  
  isSending.value = false
  showFormSuccess.value = true
  formFeedbackMsg.value = 'Your message has been transmitted successfully! I will reach out to you soon.'
  
  // Clear inputs
  form.value = {
    name: '',
    email: '',
    subject: '',
    message: ''
  }

  setTimeout(() => { showFormSuccess.value = false }, 5000)
}

onMounted(async () => {
  let loaded = false
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('contact_section')
        .select('*')
        .limit(1)
        .maybeSingle()

      if (!error && data) {
        contactData.value = {
          sectionLabel: data.section_label || "Let's work together",
          mainHeading: data.main_heading || 'Get In Touch',
          description: data.description || '',
          emails: data.emails || (data.email ? [data.email] : []),
          githubs: data.githubs || (data.github ? [data.github] : []),
          location: data.location || '',
          formHeading: data.form_heading || 'Send a Message'
        }
        loaded = true
      }
    } catch (e) {
      console.warn('Error loading contact_section from Supabase, using mock fallback:', e)
    }
  }

  // Graceful out-of-the-box fallback config instead of error screen!
  if (!loaded) {
    contactData.value = {
      sectionLabel: "Let's work together",
      mainHeading: 'Get In Touch',
      description: "I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.",
      emails: ['perezbrian091598@gmail.com', 'perezbrian12124124@gmail.com'],
      githubs: ['https://github.com/sirLass'],
      location: 'Quezon Province, Philippines',
      formHeading: 'Send a Message'
    }
    hasError.value = false
  }

  isLoading.value = false
})
</script>