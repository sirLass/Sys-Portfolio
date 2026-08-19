import { ref } from 'vue'
import { supabase, isSupabaseConfigured } from '../supabase'
import { useToast } from './useToast'

/**
 * Composable for Supabase CRUD operations with consistent loading/error handling.
 *
 * @param {string} table - Supabase table name
 * @param {Object} options
 * @param {string} options.localStorageKey - Fallback localStorage key
 * @param {string} options.selectColumns - Columns to select (default '*')
 * @param {string} options.orderBy - Column to order by (default 'updated_at')
 * @param {boolean} options.orderAsc - Order ascending? (default false)
 * @param {number} options.limit - Row limit (default 1)
 * @param {Object} options.defaultData - Default data when no rows exist
 *
 * Usage:
 *   const { data, loading, save, remove, load } = useSupabaseCrud('personal_info', {
 *     localStorageKey: 'heroSectionData',
 *     defaultData: { name: '', title: '' }
 *   })
 *   await load()
 *   await save({ name: 'Updated' })
 */
export function useSupabaseCrud(table, options = {}) {
  const {
    localStorageKey = '',
    selectColumns = '*',
    orderBy = 'updated_at',
    orderAsc = false,
    limit = 1,
    defaultData = null
  } = options

  const data = ref(defaultData ? { ...defaultData } : null)
  const currentId = ref(null)
  const loading = ref(false)
  const saving = ref(false)
  const error = ref(null)

  const toast = useToast()

  const loadFromStorage = () => {
    if (!localStorageKey) return null
    try {
      const saved = localStorage.getItem(localStorageKey)
      return saved ? JSON.parse(saved) : null
    } catch (e) {
      console.error(`Error loading ${localStorageKey} from localStorage:`, e)
      return null
    }
  }

  const saveToStorage = (payload) => {
    if (!localStorageKey) return
    try {
      localStorage.setItem(localStorageKey, JSON.stringify(payload))
    } catch (e) {
      console.error(`Error saving ${localStorageKey} to localStorage:`, e)
    }
  }

  const load = async () => {
    loading.value = true
    error.value = null

    if (!isSupabaseConfigured()) {
      const stored = loadFromStorage()
      if (stored) {
        data.value = { ...data.value, ...stored }
      }
      loading.value = false
      return
    }

    try {
      const { data: rows, error: fetchError } = await supabase
        .from(table)
        .select(selectColumns)
        .order(orderBy, { ascending: orderAsc })
        .limit(limit)
        .maybeSingle()

      if (fetchError) throw fetchError

      if (rows) {
        currentId.value = rows.id
        data.value = rows
        return
      }
    } catch (e) {
      console.error(`Error loading ${table}:`, e)
      error.value = e.message
    } finally {
      loading.value = false
    }

    // Fallback to localStorage or defaults
    const stored = loadFromStorage()
    if (stored) {
      data.value = { ...data.value, ...stored }
    } else if (defaultData) {
      data.value = { ...defaultData }
    }
  }

  const save = async (payload, options = {}) => {
    const { showToast = true, fallbackToLocal = true } = options
    saving.value = true
    error.value = null

    const toSave = {
      ...payload,
      updated_at: new Date().toISOString()
    }

    // Always save to localStorage as backup
    if (fallbackToLocal) {
      saveToStorage(toSave)
    }

    if (!isSupabaseConfigured()) {
      if (showToast) toast.info('Saved locally (database unavailable)')
      saving.value = false
      return { success: true, fallback: true }
    }

    try {
      let result
      if (currentId.value != null) {
        result = await supabase
          .from(table)
          .update(toSave)
          .eq('id', currentId.value)
      } else {
        result = await supabase
          .from(table)
          .insert(toSave)
          .select('id')
          .single()
        if (result.data?.id) currentId.value = result.data.id
      }

      if (result.error) throw result.error

      if (showToast) toast.success('Changes saved successfully')
      return { success: true }
    } catch (e) {
      console.error(`Error saving ${table}:`, e)
      error.value = e.message
      if (showToast) toast.warning('Saved locally (database error)')
      return { success: true, fallback: true }
    } finally {
      saving.value = false
    }
  }

  const remove = async (id = null) => {
    const targetId = id || currentId.value
    if (!targetId) return { success: false }

    if (!isSupabaseConfigured()) {
      toast.info('Removed locally (database unavailable)')
      return { success: true, fallback: true }
    }

    try {
      const { error: deleteError } = await supabase
        .from(table)
        .delete()
        .eq('id', targetId)

      if (deleteError) throw deleteError

      if (!id) {
        currentId.value = null
        data.value = defaultData ? { ...defaultData } : null
      }

      toast.success('Deleted successfully')
      return { success: true }
    } catch (e) {
      console.error(`Error deleting from ${table}:`, e)
      toast.error('Failed to delete')
      return { success: false }
    }
  }

  return {
    data,
    currentId,
    loading,
    saving,
    error,
    load,
    save,
    remove
  }
}
