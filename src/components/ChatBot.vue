<template>
    <div class="font-sans">
        <!-- Vertical Toggle Tab (Individual Fixed Trigger) -->
        <button 
            v-if="!isOpen"
            @click="isOpen = !isOpen"
            class="fixed right-0 top-1/2 -translate-y-1/2 z-[110] w-12 h-32 bg-gray-900 flex flex-col items-center justify-center gap-4 rounded-l-2xl shadow-[-10px_0_30px_rgba(0,0,0,0.3)] hover:w-14 transition-all duration-500 group border-l border-y border-white/10"
        >
            <div class="flex flex-col items-center gap-2 transform group-hover:scale-110 transition-transform text-primary-400">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
            </div>
            <span class="[writing-mode:vertical-lr] text-[10px] font-black text-white uppercase tracking-[0.4em] rotate-180">Assistant</span>
        </button>

        <!-- High-Focus Backdrop Overlay -->
        <Transition
            enter-active-class="transition duration-700 ease-out"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="transition duration-500 ease-in"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
        >
            <div 
                v-if="isOpen" 
                @click="isOpen = false"
                class="fixed inset-0 z-[115] bg-gray-900/60 backdrop-blur-xl overflow-hidden"
            ></div>
        </Transition>

        <!-- Solid Side Panel (Command Center) -->
        <Transition
            enter-active-class="transition duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]"
            enter-from-class="translate-x-full"
            enter-to-class="translate-x-0"
            leave-active-class="transition duration-500 ease-in"
            leave-from-class="translate-x-0"
            leave-to-class="translate-x-full"
        >
            <div 
                v-if="isOpen" 
                class="fixed inset-y-0 right-0 z-[120] w-[380px] md:w-[500px] bg-white dark:bg-[#151821] opacity-100 shadow-[-30px_0_80px_rgba(0,0,0,0.4)] flex flex-col border-l border-gray-100 dark:border-white/10"
            >
                <!-- Header Component -->
                <div class="p-10 bg-[#FAF9F6] dark:bg-[#0f1117] border-b border-gray-100 dark:border-white/10">
                    <div class="flex items-center justify-between mb-8">
                        <div class="flex items-center gap-4">
                            <div class="w-12 h-12 bg-gray-900 dark:bg-[#1a1d27] rounded-2xl flex items-center justify-center shadow-2xl border border-transparent dark:border-white/10">
                                <svg class="w-6 h-6 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                </svg>
                            </div>
                            <div>
                                <h3 class="text-xs font-black text-gray-900 dark:text-gray-100 uppercase tracking-[0.2em] italic">Systematic Assistant</h3>
                                <p class="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-1">Ready for Inquiry</p>
                            </div>
                        </div>
                        <button @click="isOpen = false" class="p-3 text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-white/10 rounded-xl transition-all">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                <!-- Chat Canvas -->
                <div class="flex-1 overflow-y-auto p-10 space-y-8 scroll-smooth" ref="messageContainer">
                    <div v-for="(msg, index) in messages" :key="index" :class="['flex', msg.isUser ? 'justify-end' : 'justify-start']">
                        <div 
                            :class="[
                                'max-w-[90%] px-6 py-5 rounded-[2rem] text-[15px] leading-relaxed',
                                msg.isUser 
                                ? 'bg-primary-600 text-white rounded-tr-none font-bold shadow-xl shadow-primary-500/10 animate-in slide-in-from-right-2' 
                                : 'bg-gray-50 dark:bg-[#12141c] text-gray-700 dark:text-gray-300 rounded-tl-none font-medium border border-gray-100 dark:border-white/10 animate-in slide-in-from-left-2'
                            ]"
                        >
                            {{ msg.text }}
                        </div>
                    </div>
                    <div v-if="isTyping" class="flex justify-start">
                        <div class="bg-gray-50 dark:bg-[#12141c] px-6 py-5 rounded-[2rem] rounded-tl-none border border-gray-100 dark:border-white/10 flex gap-1.5 items-center">
                            <span class="w-1.5 h-1.5 bg-gray-300 dark:bg-gray-500 rounded-full animate-bounce"></span>
                            <span class="w-1.5 h-1.5 bg-gray-300 dark:bg-gray-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                            <span class="w-1.5 h-1.5 bg-gray-300 dark:bg-gray-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                        </div>
                    </div>
                </div>

                <!-- Input Interface -->
                <div class="p-10 pt-0">
                    <form @submit.prevent="sendMessage" class="relative group">
                        <div class="absolute inset-0 bg-primary-500/5 rounded-3xl blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
                        <input 
                            v-model="userInput"
                            type="text" 
                            placeholder="Type your inquiry..."
                            class="relative w-full px-8 py-6 bg-gray-50 dark:bg-[#12141c] border-none focus:bg-white dark:focus:bg-[#1a1d27] focus:ring-4 focus:ring-primary-500/5 rounded-3xl transition-all duration-500 font-bold text-gray-900 dark:text-gray-100 text-sm placeholder:text-gray-400"
                        >
                        <button 
                            type="submit"
                            :disabled="!userInput.trim() || isTyping"
                            class="absolute right-3 top-3 bottom-3 px-6 bg-gray-900 text-white rounded-2xl flex items-center justify-center hover:bg-black transition-all active:scale-95 disabled:opacity-20"
                        >
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </button>
                    </form>
                    <p class="text-[9px] font-black text-gray-300 dark:text-gray-500 uppercase tracking-[0.2em] mt-6 text-center">Powered by Systematic AI Node</p>
                </div>
            </div>
        </Transition>
    </div>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue'

// ─── JSON Knowledge Base ─────────────────────────────────────────────
const knowledgeBase = {
    owner: {
        name: "Brian Perez",
        role: "Full-Stack Software Developer",
        summary: "Brian is a Full-Stack Software Developer who crafts solutions that are not only visually appealing but also intuitive and efficient — combining thoughtful design with clean, scalable code."
    },
    portfolio: {
        frontend: "Vue.js (Vue 3 with Composition API)",
        styling: "Tailwind CSS",
        backend: "Supabase (Backend-as-a-Service)",
        database: "PostgreSQL (via Supabase)",
        status: "Ongoing Development — Brian is continuously improving and adding new features to this portfolio."
    },
    sections: {
        skills: "For a detailed breakdown of Brian's technical skills and proficiencies, please scroll down to the Skills Section of this portfolio — it covers everything from frontend frameworks to backend technologies.",
        projects: "To see Brian's featured work and case studies, please check out the Projects Section below. Each project showcases different aspects of his development capabilities.",
        contact: "If you'd like to get in touch with Brian, head over to the Contact Section at the bottom of the page. You can also reach out directly through the form there.",
        about: "The About Section provides more insight into Brian's background, journey, and what drives him as a developer.",
        experience: "Check out the Experience Section to see Brian's professional timeline and career journey."
    },
    faq: [
        {
            keywords: ["who", "name", "brian", "owner", "developer", "about you", "about him", "sino", "ikaw", "siya"],
            answer: "Brian Perez A.K.A sirLass is a Full-Stack Software Developer who specializes in building modern, responsive web applications. He combines thoughtful UI/UX design with clean, scalable code to deliver premium digital experiences."
        },
        {
            keywords: ["skill", "tech", "technology", "stack", "know", "tools", "framework", "language", "alam", "expertise"],
            answer: "Brian has a diverse skill set! For a complete and detailed breakdown of all his technical skills and proficiencies, I'd recommend checking out the Skills Section of this portfolio — it's all laid out there with proficiency levels."
        },
        {
            keywords: ["project", "work", "portfolio", "build", "made", "gawa", "ginawa", "created"],
            answer: "Brian has worked on some impressive projects! You can explore all of them in the Projects Section below — each one highlights different technologies and problem-solving approaches. Give it a scroll!"
        },
        {
            keywords: ["contact", "hire", "reach", "email", "message", "connect", "talk", "makipag"],
            answer: "Great question! You can reach sirLass through the Contact Section at the bottom of this page. There's a form you can fill out, and he'll get back to you as soon as possible."
        },
        {
            keywords: ["built with", "what tech", "portfolio tech", "how was this", "made with", "frontend", "backend", "database", "vue", "supabase", "postgresql"],
            answer: "This portfolio is built with a modern tech stack: Vue.js (Vue 3) for the frontend, Tailwind CSS for styling, Supabase as the backend service, and PostgreSQL as the database. The project is currently under ongoing development with new features being added regularly."
        },
        {
            keywords: ["status", "ongoing", "finished", "complete", "done", "update"],
            answer: "This portfolio is currently under ongoing development! Brian is continuously improving and adding new features to make the experience even better. Stay tuned for more updates."
        },
        {
            keywords: ["hello", "hi", "hey", "kumusta", "musta", "good morning", "good afternoon", "good evening", "yo", "sup"],
            answer: "Hey there! 👋 Welcome to sirLass's portfolio. I'm the Systematic Assistant — feel free to ask me anything about Brian, his skills, projects, or how to get in touch!"
        },
        {
            keywords: ["thank", "thanks", "salamat", "appreciate"],
            answer: "You're welcome! If you have any more questions about sirLass or his work, don't hesitate to ask. Enjoy exploring the portfolio! 😊"
        },
        {
            keywords: ["experience", "work history", "career", "job", "trabaho"],
            answer: "sirLass's professional journey is outlined in the Experience Section of this portfolio. Scroll down to see his career timeline and the roles he's held!"
        }
    ]
}

// ─── Fallback: Match user input against knowledge base ───────────────
const getFallbackResponse = (userText) => {
    const input = userText.toLowerCase()

    // Check FAQ entries for keyword matches
    let bestMatch = null
    let bestScore = 0

    for (const entry of knowledgeBase.faq) {
        const score = entry.keywords.filter(kw => input.includes(kw)).length
        if (score > bestScore) {
            bestScore = score
            bestMatch = entry
        }
    }

    if (bestMatch && bestScore > 0) {
        return bestMatch.answer
    }

    // Generic fallback if no keywords matched at all
    return `Thanks for your question! While I'm having a bit of trouble connecting to my AI engine right now, here's what I can tell you: Brian Perez is a ${knowledgeBase.owner.role} who builds modern web apps with Vue.js, Supabase, and PostgreSQL. Feel free to explore the Skills, Projects, and Contact sections of this portfolio for more details — or try asking me again in a moment!`
}

// ─── Component State ─────────────────────────────────────────────────
const isOpen = ref(false)
const isTyping = ref(false)
const userInput = ref('')
const messageContainer = ref(null)

const messages = ref([
    { text: "Hello! I'm your Systematic Assistant. How can I help you navigate through the work of Brian Perez today?", isUser: false }
])

const scrollToBottom = async () => {
    await nextTick()
    if (messageContainer.value) {
        messageContainer.value.scrollTo({
            top: messageContainer.value.scrollHeight,
            behavior: 'smooth'
        })
    }
}

// ─── Build enriched system prompt with knowledge base context ────────
const buildSystemPrompt = () => {
    return `
        You are the "Systematic Assistant", a high-end AI representative for Brian Perez's professional portfolio.
        
        IMPORTANT CONTEXT ABOUT BRIAN:
        - Name: ${knowledgeBase.owner.name}
        - Role: ${knowledgeBase.owner.role}
        - Summary: ${knowledgeBase.owner.summary}
        
        PORTFOLIO TECH STACK:
        - Frontend: ${knowledgeBase.portfolio.frontend}
        - Styling: ${knowledgeBase.portfolio.styling}
        - Backend: ${knowledgeBase.portfolio.backend}
        - Database: ${knowledgeBase.portfolio.database}
        - Project Status: ${knowledgeBase.portfolio.status}
        
        SECTION GUIDANCE:
        - When asked about skills: ${knowledgeBase.sections.skills}
        - When asked about projects: ${knowledgeBase.sections.projects}
        - When asked about contact: ${knowledgeBase.sections.contact}
        - When asked about experience: ${knowledgeBase.sections.experience}
        
        BEHAVIOR RULES:
        - Your persona is professional, sharp, and helpful.
        - LANGUAGE: If the user speaks Tagalog, reply in Tagalog. If English, stay English.
        - Be conversational but concise.
        - Always direct users to the relevant portfolio section when appropriate.
        - Never make up information about Brian that isn't provided above.
    `
}

const sendMessage = async () => {
    if (!userInput.value.trim() || isTyping.value) return

    const userText = userInput.value
    messages.value.push({ text: userText, isUser: true })
    userInput.value = ''
    scrollToBottom()

    isTyping.value = true

    try {
        const systemInstructionContent = buildSystemPrompt()

        // Format history for Gemini (alternating user/model)
        const history = messages.value.slice(1, -1).map(m => ({
            role: m.isUser ? "user" : "model",
            parts: [{ text: m.text }]
        }));

        const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [
                    {
                        role: "user",
                        parts: [{ 
                            text: `${systemInstructionContent}\n\nExisting Conversation Context:\n${messages.value.slice(1, -1).map(m => (m.isUser ? 'User: ' : 'AI: ') + m.text).join('\n')}\n\nCurrent User Message: ${userText}` 
                        }]
                    }
                ],
                generationConfig: {
                    temperature: 0.8,
                    maxOutputTokens: 1000,
                }
            })
        });

        const data = await response.json();
        
        if (data.error) {
            console.error("Gemini API Error details:", data.error);
            throw new Error(data.error.message);
        }

        if (data.candidates && data.candidates[0] && data.candidates[0].content) {
            const aiResponse = data.candidates[0].content.parts[0].text;
            messages.value.push({ text: aiResponse, isUser: false });
        } else {
            console.error("Unexpected API Response format:", data);
            throw new Error("Invalid response format");
        }
    } catch (error) {
        console.error("AI Error (falling back to knowledge base):", error);
        // Use the smart fallback instead of a generic error
        const fallbackAnswer = getFallbackResponse(userText)
        messages.value.push({ text: fallbackAnswer, isUser: false });
    } finally {
        isTyping.value = false
        scrollToBottom()
    }
}

watch(isOpen, (newVal) => {
    if (newVal) scrollToBottom()
})
</script>

<style scoped>
/* Optional: Custom scrollbar for better aesthetics */
div::-webkit-scrollbar {
    width: 6px;
}
div::-webkit-scrollbar-track {
    background: transparent;
}
div::-webkit-scrollbar-thumb {
    background: #e5e7eb;
    border-radius: 10px;
}
div::-webkit-scrollbar-thumb:hover {
    background: #d1d5db;
}
</style>
