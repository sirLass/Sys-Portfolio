<template>
  <div class="p-6">
    <!-- Banners -->
    <Banner :show="showSuccess" type="success" message="Message status updated successfully!" />

    <!-- Toolbar Actions -->
    <div class="flex justify-between items-center bg-[#f6f6f7] p-4 rounded-lg border border-[#e3e5e7] mb-6">
      <div class="flex items-center gap-4">
        <span class="text-xs font-semibold text-[#6d7175]">Total Inquiries: {{ messages.length }}</span>
        <span class="text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-100">
          Unread: {{ unreadCount }}
        </span>
      </div>
      <div class="flex gap-2">
        <button
          v-if="messages.length > 0"
          type="button"
          @click="clearAllMessages"
          class="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-red-600 bg-red-50 hover:bg-red-600 hover:text-white rounded-md transition-all active:scale-95 border border-red-200/50"
        >
          Clear Inbox
        </button>
      </div>
    </div>

    <!-- Messages Container -->
    <div class="border border-[#c9cccf] rounded-lg overflow-hidden bg-white">
      <table class="w-full text-left border-collapse">
        <thead class="bg-[#f6f6f7]">
          <tr>
            <th class="px-4 py-3 text-xs font-semibold text-[#6d7175] uppercase tracking-wider w-8">Status</th>
            <th class="px-4 py-3 text-xs font-semibold text-[#6d7175] uppercase tracking-wider">Sender</th>
            <th class="px-4 py-3 text-xs font-semibold text-[#6d7175] uppercase tracking-wider">Subject</th>
            <th class="px-4 py-3 text-xs font-semibold text-[#6d7175] uppercase tracking-wider">Date Sent</th>
            <th class="px-4 py-3 text-right text-xs font-semibold text-[#6d7175] uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-[#e3e5e7]">
          <tr 
            v-for="(msg, index) in messages" 
            :key="msg.id || index"
            :class="[
              'hover:bg-[#f6f6f7]/50 transition-colors cursor-pointer',
              !msg.is_read ? 'bg-primary-50/10 font-bold' : ''
            ]"
            @click="openMessageDetails(msg)"
          >
            <td class="px-4 py-4 text-center">
              <span 
                class="inline-block w-2.5 h-2.5 rounded-full"
                :class="!msg.is_read ? 'bg-[var(--admin-primary)] animate-pulse' : 'bg-gray-300'"
              ></span>
            </td>
            <td class="px-4 py-4">
              <div class="flex flex-col">
                <span class="text-sm text-gray-900 font-bold">{{ msg.name || 'Anonymous' }}</span>
                <span class="text-xs text-gray-400 font-medium">{{ msg.email }}</span>
              </div>
            </td>
            <td class="px-4 py-4 text-sm text-gray-800 truncate max-w-[200px]">
              {{ msg.subject || 'No Subject' }}
            </td>
            <td class="px-4 py-4 text-xs text-gray-500 font-semibold">
              {{ formatDate(msg.created_at) }}
            </td>
            <td class="px-4 py-4 text-right space-x-2" @click.stop>
              <button
                type="button"
                @click="toggleReadStatus(msg)"
                class="inline-flex items-center p-1.5 text-gray-400 hover:text-[var(--admin-primary)] hover:bg-gray-50 rounded-md transition-colors"
                :title="msg.is_read ? 'Mark as Unread' : 'Mark as Read'"
              >
                <svg class="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 19v-8.93a2 2 0 01.89-1.664l8-5.333a2 2 0 012.22 0l8 5.333A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-2.25-1.5a2 2 0 00-2.22 0l-2.25 1.5" />
                </svg>
              </button>
              <button
                type="button"
                @click="deleteMessage(msg)"
                class="inline-flex items-center p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                title="Delete Inquiry"
              >
                <svg class="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </td>
          </tr>
          <tr v-if="messages.length === 0">
            <td colspan="5" class="px-4 py-16 text-center text-gray-400 text-sm italic">
              Your inbox is clean! No messages received yet.
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Inquiry Details Modal Drawer -->
    <div v-if="selectedMessage" class="fixed inset-0 bg-black/55 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div class="bg-white rounded-3xl shadow-2xl max-w-xl w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200 border border-gray-200">
        <div class="px-6 py-4 border-b border-[#c9cccf] flex items-center justify-between bg-[#f6f6f7]">
          <h3 class="text-md font-bold text-gray-900 font-outfit uppercase tracking-wider">
            Inquiry Message Details
          </h3>
          <button @click="closeMessageDetails" class="text-gray-400 hover:text-gray-700 focus:outline-none">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div class="p-6 space-y-6 max-h-[75vh] overflow-y-auto text-left">
          <div class="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-100">
            <div>
              <span class="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Sender Name</span>
              <span class="text-sm font-bold text-gray-800">{{ selectedMessage.name }}</span>
            </div>
            <div>
              <span class="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Email Address</span>
              <a :href="`mailto:${selectedMessage.email}`" class="text-sm font-bold text-primary-600 hover:underline">{{ selectedMessage.email }}</a>
            </div>
            <div>
              <span class="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Subject</span>
              <span class="text-sm font-bold text-gray-800">{{ selectedMessage.subject || 'No Subject' }}</span>
            </div>
            <div>
              <span class="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Date Received</span>
              <span class="text-xs font-semibold text-gray-500">{{ formatDate(selectedMessage.created_at) }}</span>
            </div>
          </div>

          <div class="space-y-2">
            <span class="block text-[10px] font-black text-gray-400 uppercase tracking-widest">Message Content</span>
            <div class="p-5 bg-white border border-gray-200 rounded-2xl text-sm leading-relaxed text-gray-700 whitespace-pre-wrap font-medium shadow-inner min-h-[120px]">
              {{ selectedMessage.message }}
            </div>
          </div>
        </div>

        <div class="px-6 py-4 bg-[#f6f6f7] border-t border-[#c9cccf] flex justify-between gap-3">
          <button
            type="button"
            @click="deleteMessage(selectedMessage); closeMessageDetails()"
            class="px-4 py-2 text-sm font-bold text-red-600 hover:bg-red-50 rounded-xl transition-all"
          >
            Delete Inquiry
          </button>
          <div class="flex gap-2">
            <a 
              :href="`mailto:${selectedMessage.email}?subject=RE: ${selectedMessage.subject || 'Your Portfolio Inquiry'}`"
              class="px-5 py-2 text-sm font-bold text-white bg-primary-600 hover:bg-primary-700 rounded-xl transition-all shadow-md flex items-center gap-1.5"
            >
              Reply via Email
            </a>
            <button
              type="button"
              @click="closeMessageDetails"
              class="px-4 py-2 text-sm font-semibold text-gray-600 hover:text-gray-800"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, inject, computed } from 'vue'
import { supabase, isSupabaseConfigured } from '../../supabase'
import Banner from './ui/Banner.vue'

const addToast = inject('addToast')
const messages = ref([])
const showSuccess = ref(false)
const selectedMessage = ref(null)

const unreadCount = computed(() => {
  return messages.value.filter(m => !m.is_read).length
})

const formatDate = (dateStr) => {
  if (!dateStr) return ''
  try {
    const d = new Date(dateStr)
    return d.toLocaleDateString(undefined, { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  } catch (e) {
    return dateStr
  }
}

const loadMessages = async () => {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase
        .from('contact_messages')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (!error && data) {
        messages.value = data
        return
      }
    } catch (e) {
      console.error('Error fetching dynamic Supabase messages:', e)
    }
  }

  // Fallback to local storage
  const saved = localStorage.getItem('submittedContactMessages')
  if (saved) {
    try {
      messages.value = JSON.parse(saved).sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    } catch (e) {
      console.error('Error parsing local storage messages:', e)
    }
  }
}

const toggleReadStatus = async (msg) => {
  msg.is_read = !msg.is_read

  if (isSupabaseConfigured()) {
    try {
      await supabase
        .from('contact_messages')
        .update({ is_read: msg.is_read })
        .eq('id', msg.id)
    } catch (e) {
      console.error('Error updating status in Supabase:', e)
    }
  }

  // Backup to localStorage
  localStorage.setItem('submittedContactMessages', JSON.stringify(messages.value))
  if (addToast) addToast(`Message marked as ${msg.is_read ? 'read' : 'unread'}`, 'success')
}

const openMessageDetails = (msg) => {
  selectedMessage.value = msg
  if (!msg.is_read) {
    toggleReadStatus(msg)
  }
}

const closeMessageDetails = () => {
  selectedMessage.value = null
}

const deleteMessage = async (msg) => {
  const index = messages.value.findIndex(m => m.id === msg.id)
  if (index !== -1) {
    messages.value.splice(index, 1)
  }

  if (isSupabaseConfigured() && msg.id) {
    try {
      await supabase
        .from('contact_messages')
        .delete()
        .eq('id', msg.id)
    } catch (e) {
      console.error('Error deleting from Supabase:', e)
    }
  }

  localStorage.setItem('submittedContactMessages', JSON.stringify(messages.value))
  if (addToast) addToast('Inquiry deleted successfully', 'info')
}

const clearAllMessages = async () => {
  if (!confirm('Are you absolutely sure you want to clear all inquiries permanently?')) return

  messages.value = []

  if (isSupabaseConfigured()) {
    try {
      // Clear table
      await supabase
        .from('contact_messages')
        .delete()
        .gt('id', 0) // delete all
    } catch (e) {
      console.error('Error truncating table:', e)
    }
  }

  localStorage.setItem('submittedContactMessages', JSON.stringify([]))
  if (addToast) addToast('All inquiries cleared permanently', 'success')
}

onMounted(() => {
  loadMessages()
})

defineExpose({
  refresh: loadMessages
})
</script>
