import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import AdminPanel from '../components/admin_panel.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/admin',
    name: 'AdminPanel',
    component: AdminPanel,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

import { supabase } from '../supabase'

// Route guard to protect admin panel
router.beforeEach(async (to, from, next) => {
  let isAuthenticated = false
  if (supabase) {
    try {
      const { data: { session } } = await supabase.auth.getSession()
      isAuthenticated = !!session
    } catch (e) {
      console.error('Error checking active session:', e)
    }
  } else {
    // If Supabase is offline/not configured (e.g. initial Vercel deploy), fallback to localStorage mock auth
    isAuthenticated = localStorage.getItem('isMockAuthenticated') === 'true'
  }
  
  if (to.meta.requiresAuth && !isAuthenticated) {
    // Redirect to login if not authenticated
    next('/login')
  } else if (to.path === '/login' && isAuthenticated) {
    // Redirect to admin if already logged in and trying to access login page
    next('/admin')
  } else {
    next()
  }
})

export default router
