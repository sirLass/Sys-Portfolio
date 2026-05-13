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
                class="fixed inset-y-0 right-0 z-[120] w-[380px] md:w-[500px] bg-white opacity-100 shadow-[-30px_0_80px_rgba(0,0,0,0.4)] flex flex-col border-l border-gray-100"
            >
                <!-- Header Component -->
                <div class="p-10 bg-[#FAF9F6] border-b border-gray-100">
                    <div class="flex items-center justify-between mb-8">
                        <div class="flex items-center gap-4">
                            <div class="w-12 h-12 bg-gray-900 rounded-2xl flex items-center justify-center shadow-2xl">
                                <svg class="w-6 h-6 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                </svg>
                            </div>
                            <div>
                                <h3 class="text-xs font-black text-gray-900 uppercase tracking-[0.2em] italic">Systematic Assistant</h3>
                                <p class="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-1">Ready for Inquiry</p>
                            </div>
                        </div>
                        <button @click="isOpen = false" class="p-3 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all">
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
                                : 'bg-gray-50 text-gray-700 rounded-tl-none font-medium border border-gray-100 animate-in slide-in-from-left-2'
                            ]"
                        >
                            {{ msg.text }}
                        </div>
                    </div>
                    <div v-if="isTyping" class="flex justify-start">
                        <div class="bg-gray-50 px-6 py-5 rounded-[2rem] rounded-tl-none border border-gray-100 flex gap-1.5 items-center">
                            <span class="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce"></span>
                            <span class="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                            <span class="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.4s]"></span>
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
                            class="relative w-full px-8 py-6 bg-gray-50 border-none focus:bg-white focus:ring-4 focus:ring-primary-500/5 rounded-3xl transition-all duration-500 font-bold text-gray-900 text-sm"
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
                    <p class="text-[9px] font-black text-gray-300 uppercase tracking-[0.2em] mt-6 text-center">Powered by Systematic AI Node</p>
                </div>
            </div>
        </Transition>
    </div>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue'

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

const sendMessage = async () => {
    if (!userInput.value.trim() || isTyping.value) return

    const userText = userInput.value
    messages.value.push({ text: userText, isUser: true })
    userInput.value = ''
    scrollToBottom()

    isTyping.value = true

    try {
        const systemInstructionContent = `
            You are the "Systematic Assistant", a high-end AI representative for Brian Perez's professional portfolio.
            Brian Perez is an aspiring Full-Stack Web Developer and UI/UX Designer specialized in Vue.js, Tailwind, and Supabase.
            Your persona is professional, sharp, and helpful. 
            LANGUAGE: If the user speaks Tagalog, reply in Tagalog. If English, stay English.
            Be conversational but concise. Point users to the Contact Section or Projects for more details.
        `;

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
        console.error("AI Error:", error);
        messages.value.push({ 
            text: "My apologies, my neural link is temporarily de-synced. Please try again or reach out to Brian directly.", 
            isUser: false 
        });
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
