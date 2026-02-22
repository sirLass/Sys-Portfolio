<template>
  <div class="min-h-screen bg-gradient-to-br from-primary-50 via-white to-blue-50 flex items-center justify-center px-6 py-12">
    <div class="absolute inset-0 opacity-30 overflow-hidden">
      <div
        class="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse"
      ></div>
      <div
        class="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"
      ></div>
    </div>

    <div class="relative z-10 w-full max-w-md">
      <div class="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 border border-gray-100">
        <div class="text-center mb-8">
          <h1 class="text-4xl font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p class="text-gray-600">Sign in to access the admin panel</p>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-6">
          <div>
            <label for="username" class="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <input
              id="username"
              v-model="username"
              type="text"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#008060]/20 focus:border-[#008060] transition-all duration-300 outline-none"
              placeholder="Enter your username"
            />
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              id="password"
              v-model="password"
              type="password"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#008060]/20 focus:border-[#008060] transition-all duration-300 outline-none"
              placeholder="Enter your password"
            />
          </div>

          <div class="flex items-center justify-between">
            <label class="flex items-center">
              <input type="checkbox" class="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
              <span class="ml-2 text-sm text-gray-600">Remember me</span>
            </label>
            <a href="#" class="text-sm text-[#008060] hover:text-[#004c3f] font-medium">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="w-full bg-[#008060] text-white py-3 rounded-lg font-semibold hover:bg-[#004c3f] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
          >
            <span v-if="!loading">Sign In</span>
            <span v-else class="flex items-center justify-center">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Signing in...
            </span>
          </button>
        </form>

        <div v-if="error" class="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p class="text-sm text-red-600">{{ error }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const username = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

// Hardcoded credentials
const VALID_USERNAME = 'sirlass'
const VALID_PASSWORD = '123'

const handleLogin = async () => {
  loading.value = true
  error.value = ''

  try {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // Check hardcoded credentials
    if (username.value === VALID_USERNAME && password.value === VALID_PASSWORD) {
      // Store authentication state in localStorage
      localStorage.setItem('isAuthenticated', 'true')
      localStorage.setItem('username', username.value)
      
      // Navigate to admin panel after successful login
      router.push('/admin')
    } else {
      error.value = 'Invalid username or password. Please try again.'
    }
  } catch (err) {
    error.value = 'An error occurred. Please try again.'
    console.error('Login error:', err)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}
</style>
