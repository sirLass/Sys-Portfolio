<template>
    <div class="font-sans">
        <!-- Vertical Toggle Tab (Individual Fixed Trigger) -->
        <button 
            v-if="!isOpen"
            @click="isOpen = !isOpen"
            aria-label="Open Assistant"
            class="fixed bottom-8 right-8 z-[110] flex items-center gap-3 h-14 w-14 pl-3 overflow-hidden bg-[#0a0a0a] dark:bg-[#0f1117] text-white rounded-sm shadow-[0_10px_35px_rgba(0,0,0,0.45)] hover:bg-black dark:hover:bg-[#151821] hover:w-[170px] hover:-translate-y-0.5 transition-all duration-300 ease-out group border border-white/10"
        >
            <span class="flex items-center justify-center w-8 h-8 flex-shrink-0 rounded-sm bg-white/10 text-white/75 group-hover:text-white transition-all duration-300 group-hover:scale-110 group-hover:-rotate-6">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
            </span>
            <span class="text-[10px] font-medium text-white uppercase tracking-[0.3em] whitespace-nowrap opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 delay-100">Assistant</span>
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
                class="fixed inset-0 z-[115] bg-black/70 backdrop-blur-md overflow-hidden"
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
                class="chat-panel fixed inset-y-0 right-0 z-[120] w-[380px] md:w-[500px] bg-[#0a0a0a] dark:bg-[#0f1117] text-white opacity-100 shadow-[-30px_0_80px_rgba(0,0,0,0.6)] flex flex-col border-l border-white/10"
            >
                <!-- Header Component -->
                <div class="px-8 pt-8 pb-7 border-b border-white/10">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-4">
                            <div class="w-11 h-11 flex items-center justify-center bg-white/5 border border-white/10">
                                <svg class="w-5 h-5 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                </svg>
                            </div>
                            <div>
                                <h3 class="editorial-title text-sm md:text-base text-white leading-none">Systematic Assistant</h3>
                                <p class="text-[9px] font-medium text-white/40 uppercase tracking-[0.3em] mt-2">Ready for Inquiry</p>
                            </div>
                        </div>
                        <button @click="isOpen = false" aria-label="Close assistant" class="p-2.5 -m-1 text-white/40 hover:text-white hover:bg-white/5 transition-colors duration-300">
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                <!-- Chat Canvas -->
                <div class="chat-scroll flex-1 overflow-y-auto px-8 py-8 space-y-7 scroll-smooth" ref="messageContainer">
                    <div v-for="(msg, index) in messages" :key="index" :class="['msg-in flex', msg.isUser ? 'justify-end' : 'justify-start']">
                        <!-- User message: sharp monochrome block -->
                        <div
                            v-if="msg.isUser"
                            class="max-w-[85%] px-5 py-3.5 bg-white/[0.06] border border-white/10 rounded-sm text-sm leading-relaxed text-white/90"
                        >
                            {{ msg.text }}
                        </div>
                        <!-- Assistant message: hairline rule + rendered Markdown (About motif) -->
                        <div v-else class="max-w-[92%] border-l border-white/70 pl-5">
                            <p class="text-[9px] font-medium uppercase tracking-[0.35em] text-white/40 mb-2">Assistant</p>
                            <div class="msg-markdown text-sm font-light leading-relaxed text-white/75" v-html="renderMarkdown(msg.text)"></div>
                        </div>
                    </div>
                    <div v-if="isTyping" class="flex justify-start">
                        <div class="border-l border-white/70 pl-5">
                            <p class="text-[9px] font-medium uppercase tracking-[0.35em] text-white/40 mb-2">Assistant</p>
                            <div class="flex gap-1.5 items-center py-1">
                                <span class="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce"></span>
                                <span class="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                                <span class="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Input Interface -->
                <div class="px-8 py-7 border-t border-white/10">
                    <form @submit.prevent="sendMessage" class="flex items-stretch gap-2">
                        <input 
                            v-model="userInput"
                            type="text" 
                            placeholder="Type your inquiry..."
                            aria-label="Message"
                            class="flex-1 min-w-0 px-5 py-4 bg-white/5 border border-white/10 rounded-sm text-sm font-light text-white placeholder:text-white/35 focus:outline-none focus:border-white/70 focus:bg-white/[0.07] transition-all duration-300"
                        >
                        <button 
                            type="submit"
                            :disabled="!userInput.trim() || isTyping"
                            aria-label="Send message"
                            class="px-5 bg-white text-[#0a0a0a] rounded-sm flex items-center justify-center hover:bg-white/80 transition-all duration-300 active:scale-95 disabled:opacity-30"
                        >
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </button>
                    </form>
                    <p class="text-[9px] font-medium text-white/30 uppercase tracking-[0.3em] mt-5 text-center">Powered by Tulips Engine</p>
                </div>
            </div>
        </Transition>
    </div>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue'
import { marked } from 'marked'
import DOMPurify from 'dompurify'

// ─── Markdown rendering for AI replies (user messages stay plain) ────
marked.setOptions({ gfm: true, breaks: true })

// Force any link the model emits to open safely in a new tab
// (DOMPurify instantiates fully only where a real window exists — always the case in this SPA)
if (typeof DOMPurify.addHook === 'function') {
    DOMPurify.addHook('afterSanitizeAttributes', (node) => {
        if (node.tagName === 'A') {
            node.setAttribute('target', '_blank')
            node.setAttribute('rel', 'noopener noreferrer')
        }
    })
}

const escapeHtml = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const renderMarkdown = (text) => {
    const raw = String(text ?? '')
    const html = marked.parse(raw)
    // Sanitized HTML when the sanitizer is live; escaped plain text as the safe degraded path
    if (typeof DOMPurify.sanitize !== 'function') return escapeHtml(raw)
    return DOMPurify.sanitize(html)
}

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
        - FORMAT: reply in Markdown — **bold**, bullet lists, ### subheadings, inline code, and fenced code blocks when useful, so answers are easy to scan.
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
        // Groq (OpenAI-compatible): system prompt + full conversation history
        const chatMessages = [
            { role: 'system', content: buildSystemPrompt() },
            ...messages.value.slice(1, -1).map(m => ({
                role: m.isUser ? 'user' : 'assistant',
                content: m.text
            })),
            { role: 'user', content: userText }
        ];

        const apiKey = import.meta.env.VITE_GROQ_API_KEY;
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'qwen/qwen3.8-27b',
                messages: chatMessages,
                temperature: 0.8,
                max_tokens: 1024
            })
        });

        const data = await response.json();

        if (data.error) {
            console.error("Groq API Error details:", data.error);
            throw new Error(data.error.message);
        }

        const aiResponse = data.choices?.[0]?.message?.content?.trim();
        if (aiResponse) {
            messages.value.push({ text: aiResponse, isUser: false });
        } else {
            console.error("Unexpected API Response format:", data);
            throw new Error("Invalid response format");
        }
    } catch (error) {
        console.error("Groq API Error:", error);
        messages.value.push({ text: "⚠️ I couldn't reach the AI engine right now. Please try again in a moment.", isUser: false });
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
/* Editorial type system (mirrors about_section.vue) */
.chat-panel {
    font-family: Inter, system-ui, -apple-system, sans-serif;
}

.editorial-title {
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-weight: 300;
    text-transform: uppercase;
    letter-spacing: 0.08em;
}

/* Message entrance: subtle opacity fade like the About corner elements */
.msg-in {
    animation: msgIn 0.3s ease-out both;
}

@keyframes msgIn {
    from {
        opacity: 0;
        transform: translateY(6px);
    }
    to {
        opacity: 1;
        transform: none;
    }
}

/* Markdown content (AI replies) — dark editorial treatment */
.msg-markdown {
    overflow-wrap: break-word;
}
.msg-markdown :deep(p) {
    margin: 0.625rem 0;
}
.msg-markdown :deep(p:first-child) {
    margin-top: 0;
}
.msg-markdown :deep(p:last-child) {
    margin-bottom: 0;
}
.msg-markdown :deep(ul),
.msg-markdown :deep(ol) {
    margin: 0.625rem 0;
    padding-left: 1.375rem;
}
.msg-markdown :deep(ul) {
    list-style: disc;
}
.msg-markdown :deep(ol) {
    list-style: decimal;
}
.msg-markdown :deep(li) {
    margin: 0.3rem 0;
}
.msg-markdown :deep(li::marker) {
    color: rgba(255, 255, 255, 0.5);
}
.msg-markdown :deep(strong) {
    font-weight: 600;
    color: rgba(255, 255, 255, 0.95);
}
.msg-markdown :deep(em) {
    font-style: italic;
}
.msg-markdown :deep(a) {
    color: rgba(255, 255, 255, 0.85);
    text-decoration: underline;
    text-underline-offset: 2px;
    transition: color 0.3s;
}
.msg-markdown :deep(a:hover) {
    color: #fff;
}
.msg-markdown :deep(code) {
    font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
    font-size: 0.85em;
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 2px;
    padding: 0.1rem 0.35rem;
}
.msg-markdown :deep(pre) {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 2px;
    padding: 0.875rem;
    margin: 0.75rem 0;
    overflow-x: auto;
}
.msg-markdown :deep(pre code) {
    background: none;
    border: none;
    padding: 0;
    font-size: 0.8125rem;
}
.msg-markdown :deep(blockquote) {
    border-left: 2px solid rgba(255, 255, 255, 0.35);
    padding-left: 0.875rem;
    margin: 0.75rem 0;
    color: rgba(255, 255, 255, 0.6);
}
.msg-markdown :deep(h1),
.msg-markdown :deep(h2),
.msg-markdown :deep(h3),
.msg-markdown :deep(h4),
.msg-markdown :deep(h5),
.msg-markdown :deep(h6) {
    font-weight: 500;
    font-size: 0.875rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: rgba(255, 255, 255, 0.95);
    margin: 1rem 0 0.5rem;
}
.msg-markdown :deep(h1:first-child),
.msg-markdown :deep(h2:first-child),
.msg-markdown :deep(h3:first-child),
.msg-markdown :deep(h4:first-child),
.msg-markdown :deep(h5:first-child),
.msg-markdown :deep(h6:first-child) {
    margin-top: 0;
}
.msg-markdown :deep(hr) {
    border: 0;
    border-top: 1px solid rgba(255, 255, 255, 0.15);
    margin: 1rem 0;
}
.msg-markdown :deep(table) {
    width: 100%;
    border-collapse: collapse;
    display: block;
    overflow-x: auto;
    margin: 0.75rem 0;
    font-size: 0.8125rem;
}
.msg-markdown :deep(th),
.msg-markdown :deep(td) {
    border: 1px solid rgba(255, 255, 255, 0.12);
    padding: 0.4rem 0.7rem;
    text-align: left;
}
.msg-markdown :deep(th) {
    background: rgba(255, 255, 255, 0.06);
    font-weight: 500;
}
.msg-markdown :deep(img) {
    max-width: 100%;
    border-radius: 2px;
}
.msg-markdown :deep(input[type='checkbox']) {
    accent-color: #fff;
    margin-right: 0.4rem;
}

/* Dark-surface scrollbar */
.chat-scroll::-webkit-scrollbar {
    width: 6px;
}
.chat-scroll::-webkit-scrollbar-track {
    background: transparent;
}
.chat-scroll::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.18);
    border-radius: 10px;
}
.chat-scroll::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.4);
}

@media (prefers-reduced-motion: reduce) {
    .msg-in {
        animation: none !important;
    }
}
</style>
