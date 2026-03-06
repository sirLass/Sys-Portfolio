<template>
  <div class="shell">
    <!-- Geometric background -->
    <div class="bg-layer">
      <div class="grid-overlay"></div>
      <div class="orb orb-1"></div>
      <div class="orb orb-2"></div>
      <div class="diagonal-slice"></div>
    </div>

    <div class="stage">
      <!-- Left brand panel -->
      <div class="brand-panel">
        <div class="brand-inner">
          <div class="logo-mark">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <rect x="2" y="2" width="16" height="16" rx="3" fill="#00c98d"/>
              <rect x="22" y="2" width="16" height="16" rx="3" fill="#00c98d" opacity="0.5"/>
              <rect x="2" y="22" width="16" height="16" rx="3" fill="#00c98d" opacity="0.5"/>
              <rect x="22" y="22" width="16" height="16" rx="3" fill="#00c98d"/>
            </svg>
            <span class="logo-text">SIRLASS</span>
          </div>

          <div class="brand-copy">
            <h2 class="brand-headline">Admin<br/>Control<br/>Center</h2>
            <p class="brand-sub">Secure access to your management dashboard.</p>
          </div>

          <div class="brand-stats">
            <div class="stat">
              <span class="stat-num">99.9%</span>
              <span class="stat-label">Uptime</span>
            </div>
            <div class="stat-divider"></div>
            <div class="stat">
              <span class="stat-num">256-bit</span>
              <span class="stat-label">Encryption</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Right form panel -->
      <div class="form-panel">
        <div class="form-card">
          <div class="form-header">
            <div class="header-tag">ADMIN PORTAL</div>
            <h1 class="form-title">Welcome<br/><span class="title-accent">Back.</span></h1>
            <p class="form-sub">Enter your credentials to continue</p>
          </div>

          <form @submit.prevent="handleLogin" class="login-form" novalidate>
            <!-- Username -->
            <div class="field-group" :class="{ 'has-value': username, 'has-error': fieldErrors.username }">
              <label class="field-label" for="username">Username</label>
              <div class="field-wrap">
                <svg class="field-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"/>
                </svg>
                <input
                  id="username"
                  v-model="username"
                  type="text"
                  required
                  autocomplete="username"
                  class="field-input"
                  placeholder="Your username"
                  @focus="clearFieldError('username')"
                />
              </div>
              <span v-if="fieldErrors.username" class="field-error">{{ fieldErrors.username }}</span>
            </div>

            <!-- Password -->
            <div class="field-group" :class="{ 'has-value': password, 'has-error': fieldErrors.password }">
              <label class="field-label" for="password">Password</label>
              <div class="field-wrap">
                <svg class="field-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"/>
                </svg>
                <input
                  id="password"
                  v-model="password"
                  :type="showPassword ? 'text' : 'password'"
                  required
                  autocomplete="current-password"
                  class="field-input"
                  placeholder="Your password"
                  @focus="clearFieldError('password')"
                />
                <button type="button" class="toggle-pw" @click="showPassword = !showPassword" tabindex="-1">
                  <svg v-if="!showPassword" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                  <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"/>
                  </svg>
                </button>
              </div>
              <span v-if="fieldErrors.password" class="field-error">{{ fieldErrors.password }}</span>
            </div>

            <!-- Remember / Forgot -->
            <div class="form-meta">
              <label class="remember-label">
                <input type="checkbox" v-model="rememberMe" class="remember-check" />
                <span class="remember-custom"></span>
                <span class="remember-text">Remember me</span>
              </label>
              <a href="#" class="forgot-link">Forgot password?</a>
            </div>

            <!-- Error alert -->
            <transition name="alert-slide">
              <div v-if="error" class="error-alert">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="12" y1="8" x2="12" y2="12"/>
                  <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
                <span>{{ error }}</span>
              </div>
            </transition>

            <!-- Submit -->
            <button type="submit" class="submit-btn" :class="{ loading }" :disabled="loading">
              <span class="btn-content">
                <svg v-if="!loading" class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                </svg>
                <svg v-else class="btn-icon spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M12 2a10 10 0 0110 10" stroke-linecap="round"/>
                </svg>
                <span>{{ loading ? 'Authenticating…' : 'Sign In' }}</span>
              </span>
              <div class="btn-shimmer"></div>
            </button>

            <!-- Back link -->
            <router-link to="/" class="back-link">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
              </svg>
              Back to Homepage
            </router-link>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const username = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')
const showPassword = ref(false)
const rememberMe = ref(false)
const fieldErrors = reactive({ username: '', password: '' })

const VALID_USERNAME = 'sirlass'
const VALID_PASSWORD = '123'

const clearFieldError = (field) => { fieldErrors[field] = '' }

const handleLogin = async () => {
  fieldErrors.username = ''
  fieldErrors.password = ''
  error.value = ''

  if (!username.value.trim()) { fieldErrors.username = 'Username is required'; return }
  if (!password.value) { fieldErrors.password = 'Password is required'; return }

  loading.value = true
  try {
    await new Promise(resolve => setTimeout(resolve, 700))
    if (username.value === VALID_USERNAME && password.value === VALID_PASSWORD) {
      localStorage.setItem('isAuthenticated', 'true')
      localStorage.setItem('username', username.value)
      router.push('/admin')
    } else {
      error.value = 'Invalid username or password. Please try again.'
    }
  } catch (err) {
    error.value = 'An error occurred. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

.shell {
  min-height: 100vh;
  font-family: 'DM Sans', sans-serif;
  background: #0a0f1a;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: stretch;
}

/* ── Background ── */
.bg-layer {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}

.grid-overlay {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(0,201,141,0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,201,141,0.04) 1px, transparent 1px);
  background-size: 48px 48px;
}

.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.15;
}
.orb-1 {
  width: 480px; height: 480px;
  background: radial-gradient(circle, #00c98d, transparent 70%);
  top: -100px; right: -100px;
  animation: drift 8s ease-in-out infinite alternate;
}
.orb-2 {
  width: 360px; height: 360px;
  background: radial-gradient(circle, #0047ff, transparent 70%);
  bottom: -80px; left: -80px;
  animation: drift 10s ease-in-out infinite alternate-reverse;
}
.diagonal-slice {
  position: absolute;
  top: 0; right: 0; bottom: 0;
  width: 55%;
  background: rgba(255,255,255,0.015);
  clip-path: polygon(8% 0, 100% 0, 100% 100%, 0% 100%);
}

@keyframes drift {
  from { transform: translate(0, 0) scale(1); }
  to   { transform: translate(20px, 20px) scale(1.05); }
}

/* ── Layout ── */
.stage {
  position: relative;
  z-index: 1;
  width: 100%;
  display: flex;
  min-height: 100vh;
}

/* ── Brand Panel ── */
.brand-panel {
  width: 42%;
  display: flex;
  align-items: center;
  padding: 48px;
  border-right: 1px solid rgba(255,255,255,0.06);
}
.brand-inner {
  display: flex;
  flex-direction: column;
  gap: 48px;
}

.logo-mark {
  display: flex;
  align-items: center;
  gap: 14px;
}
.logo-text {
  font-family: 'Syne', sans-serif;
  font-weight: 800;
  font-size: 18px;
  letter-spacing: 0.12em;
  color: #fff;
  text-transform: uppercase;
}

.brand-headline {
  font-family: 'Syne', sans-serif;
  font-weight: 800;
  font-size: clamp(36px, 4vw, 56px);
  line-height: 1.05;
  color: #fff;
}
.brand-sub {
  margin-top: 16px;
  font-size: 14px;
  color: rgba(255,255,255,0.45);
  line-height: 1.6;
  max-width: 260px;
}

.brand-stats {
  display: flex;
  align-items: center;
  gap: 24px;
}
.stat { display: flex; flex-direction: column; gap: 4px; }
.stat-num {
  font-family: 'Syne', sans-serif;
  font-weight: 700;
  font-size: 22px;
  color: #00c98d;
}
.stat-label {
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.35);
}
.stat-divider {
  width: 1px;
  height: 40px;
  background: rgba(255,255,255,0.1);
}

/* ── Form Panel ── */
.form-panel {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px 40px;
}

.form-card {
  width: 100%;
  max-width: 420px;
}

/* Header */
.form-header { margin-bottom: 40px; }
.header-tag {
  display: inline-block;
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #00c98d;
  background: rgba(0,201,141,0.08);
  border: 1px solid rgba(0,201,141,0.2);
  padding: 4px 12px;
  border-radius: 100px;
  margin-bottom: 20px;
}
.form-title {
  font-family: 'Syne', sans-serif;
  font-weight: 800;
  font-size: clamp(38px, 5vw, 52px);
  line-height: 1;
  color: #fff;
}
.title-accent { color: #00c98d; }
.form-sub {
  margin-top: 12px;
  font-size: 14px;
  color: rgba(255,255,255,0.4);
}

/* Fields */
.login-form { display: flex; flex-direction: column; gap: 20px; }

.field-group { display: flex; flex-direction: column; gap: 8px; }

.field-label {
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.5);
  transition: color 0.2s;
}
.field-group:focus-within .field-label { color: #00c98d; }

.field-wrap {
  position: relative;
  display: flex;
  align-items: center;
}
.field-icon {
  position: absolute;
  left: 14px;
  width: 18px; height: 18px;
  color: rgba(255,255,255,0.25);
  pointer-events: none;
  transition: color 0.2s;
}
.field-group:focus-within .field-icon { color: #00c98d; }

.field-input {
  width: 100%;
  padding: 14px 44px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 10px;
  font-family: 'DM Sans', sans-serif;
  font-size: 15px;
  color: #fff;
  outline: none;
  transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
}
.field-input::placeholder { color: rgba(255,255,255,0.2); }
.field-input:focus {
  border-color: #00c98d;
  background: rgba(0,201,141,0.05);
  box-shadow: 0 0 0 3px rgba(0,201,141,0.1);
}
.has-error .field-input { border-color: #ff5c5c; }
.has-error .field-input:focus { box-shadow: 0 0 0 3px rgba(255,92,92,0.12); }

.toggle-pw {
  position: absolute;
  right: 14px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  color: rgba(255,255,255,0.25);
  transition: color 0.2s;
  display: flex;
}
.toggle-pw svg { width: 18px; height: 18px; }
.toggle-pw:hover { color: rgba(255,255,255,0.6); }

.field-error {
  font-size: 12px;
  color: #ff7070;
}

/* Meta row */
.form-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.remember-label {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}
.remember-check { display: none; }
.remember-custom {
  width: 16px; height: 16px;
  border: 1.5px solid rgba(255,255,255,0.2);
  border-radius: 4px;
  flex-shrink: 0;
  position: relative;
  transition: border-color 0.2s, background 0.2s;
}
.remember-check:checked + .remember-custom {
  background: #00c98d;
  border-color: #00c98d;
}
.remember-check:checked + .remember-custom::after {
  content: '';
  position: absolute;
  left: 3px; top: 1px;
  width: 5px; height: 9px;
  border: 2px solid #0a0f1a;
  border-top: none;
  border-left: none;
  transform: rotate(45deg);
}
.remember-text { font-size: 13px; color: rgba(255,255,255,0.5); }
.forgot-link {
  font-size: 13px;
  color: #00c98d;
  text-decoration: none;
  font-weight: 500;
  opacity: 0.85;
  transition: opacity 0.2s;
}
.forgot-link:hover { opacity: 1; }

/* Error Alert */
.error-alert {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 16px;
  background: rgba(255,80,80,0.08);
  border: 1px solid rgba(255,80,80,0.2);
  border-radius: 10px;
  font-size: 13px;
  color: #ff8080;
}
.error-alert svg { width: 16px; height: 16px; flex-shrink: 0; }

.alert-slide-enter-active { transition: all 0.3s ease; }
.alert-slide-leave-active { transition: all 0.2s ease; }
.alert-slide-enter-from { opacity: 0; transform: translateY(-6px); }
.alert-slide-leave-to   { opacity: 0; transform: translateY(-4px); }

/* Submit Button */
.submit-btn {
  position: relative;
  width: 100%;
  padding: 15px;
  background: #00c98d;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  overflow: hidden;
  transition: background 0.25s, transform 0.15s, box-shadow 0.25s;
  box-shadow: 0 4px 24px rgba(0,201,141,0.3);
}
.submit-btn:hover:not(:disabled) {
  background: #00e5a0;
  transform: translateY(-1px);
  box-shadow: 0 8px 32px rgba(0,201,141,0.4);
}
.submit-btn:active:not(:disabled) { transform: translateY(0); }
.submit-btn:disabled { opacity: 0.65; cursor: not-allowed; }

.btn-content {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-family: 'Syne', sans-serif;
  font-weight: 700;
  font-size: 15px;
  letter-spacing: 0.04em;
  color: #0a0f1a;
}
.btn-icon { width: 18px; height: 18px; }
.spin { animation: rotate 0.8s linear infinite; }
@keyframes rotate { to { transform: rotate(360deg); } }

.btn-shimmer {
  position: absolute;
  inset: 0;
  background: linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.2) 50%, transparent 60%);
  transform: translateX(-100%);
  transition: transform 0.6s;
}
.submit-btn:hover .btn-shimmer { transform: translateX(100%); }

/* Back link */
.back-link {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 13px;
  color: rgba(255,255,255,0.35);
  text-decoration: none;
  transition: color 0.2s;
}
.back-link svg { width: 14px; height: 14px; }
.back-link:hover { color: rgba(255,255,255,0.7); }

/* ── Responsive ── */
@media (max-width: 768px) {
  .brand-panel { display: none; }
  .form-panel { padding: 32px 24px; }
}
</style>