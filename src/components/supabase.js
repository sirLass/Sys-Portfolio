// src/components/supabase.js
import { createClient } from '@supabase/supabase-js'

// Read Supabase credentials from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Check if both variables exist
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    'Supabase URL or ANON key missing. Supabase client will not be initialized.'
  )
}

// Initialize Supabase client only if both URL and key are provided
export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null

/**
 * Helper function to check if Supabase is configured
 */
export const isSupabaseConfigured = () => !!supabase
