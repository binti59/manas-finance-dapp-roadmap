// Enhanced Persistence Service for Xandeum Finance DApp
// Supports both LocalStorage (MVP) and Supabase (Scalable) backends

class PersistenceService {
  constructor(config = {}) {
    this.storageType = config.storageType || 'localStorage' // 'localStorage' or 'supabase'
    this.supabaseConfig = config.supabase || null
    this.debounceTime = config.debounceTime || 1000
    this.debounceTimers = new Map()
    
    // Initialize Supabase if configured
    if (this.storageType === 'supabase' && this.supabaseConfig) {
      this.initializeSupabase()
    }
  }

  // Initialize Supabase client
  async initializeSupabase() {
    try {
      console.warn('Supabase integration requires @supabase/supabase-js package. Using localStorage instead.')
      this.storageType = 'localStorage'
      return
      
      // Uncomment below when @supabase/supabase-js is installed:
      // const { createClient } = await import('@supabase/supabase-js')
      // this.supabase = createClient(
      //   this.supabaseConfig.url,
      //   this.supabaseConfig.anonKey
      // )
      // console.log('Supabase initialized successfully')
    } catch (error) {
      console.error('Failed to initialize Supabase:', error)
      // Fallback to localStorage
      this.storageType = 'localStorage'
    }
  }

  // Debounced save to prevent excessive writes
  debouncedSave(key, data, callback) {
    // Clear existing timer
    if (this.debounceTimers.has(key)) {
      clearTimeout(this.debounceTimers.get(key))
    }

    // Set new timer
    const timer = setTimeout(() => {
      callback()
      this.debounceTimers.delete(key)
    }, this.debounceTime)

    this.debounceTimers.set(key, timer)
  }

  // Validate data structure
  validateData(data, schema) {
    if (!data || typeof data !== 'object') {
      return false
    }

    // Basic schema validation
    if (schema) {
      for (const [key, type] of Object.entries(schema)) {
        if (!(key in data) || typeof data[key] !== type) {
          return false
        }
      }
    }

    return true
  }

  // LocalStorage operations
  async saveToLocalStorage(key, data) {
    try {
      const serializedData = JSON.stringify(data)
      localStorage.setItem(key, serializedData)
      return { success: true }
    } catch (error) {
      console.error('LocalStorage save error:', error)
      return { success: false, error: error.message }
    }
  }

  async loadFromLocalStorage(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key)
      if (item === null) {
        return { success: true, data: defaultValue }
      }
      const data = JSON.parse(item)
      return { success: true, data }
    } catch (error) {
      console.error('LocalStorage load error:', error)
      return { success: false, error: error.message, data: defaultValue }
    }
  }

  async removeFromLocalStorage(key) {
    try {
      localStorage.removeItem(key)
      return { success: true }
    } catch (error) {
      console.error('LocalStorage remove error:', error)
      return { success: false, error: error.message }
    }
  }

  // Supabase operations
  async saveToSupabase(table, data, userId = 'anonymous') {
    if (!this.supabase) {
      throw new Error('Supabase not initialized')
    }

    try {
      const { data: result, error } = await this.supabase
        .from(table)
        .upsert({
          user_id: userId,
          data: data,
          updated_at: new Date().toISOString()
        })

      if (error) throw error
      return { success: true, data: result }
    } catch (error) {
      console.error('Supabase save error:', error)
      return { success: false, error: error.message }
    }
  }

  async loadFromSupabase(table, userId = 'anonymous') {
    if (!this.supabase) {
      throw new Error('Supabase not initialized')
    }

    try {
      const { data, error } = await this.supabase
        .from(table)
        .select('data')
        .eq('user_id', userId)
        .single()

      if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
        throw error
      }

      return { success: true, data: data?.data || null }
    } catch (error) {
      console.error('Supabase load error:', error)
      return { success: false, error: error.message, data: null }
    }
  }

  // Unified API methods
  async save(key, data, options = {}) {
    const { validate = true, schema = null, userId = 'anonymous' } = options

    // Validate data if requested
    if (validate && !this.validateData(data, schema)) {
      return { success: false, error: 'Data validation failed' }
    }

    // Add metadata
    const dataWithMetadata = {
      ...data,
      _metadata: {
        lastUpdated: new Date().toISOString(),
        version: '1.0'
      }
    }

    if (this.storageType === 'supabase') {
      return await this.saveToSupabase(key, dataWithMetadata, userId)
    } else {
      return await this.saveToLocalStorage(key, dataWithMetadata)
    }
  }

  async load(key, defaultValue = null, options = {}) {
    const { userId = 'anonymous' } = options

    let result
    if (this.storageType === 'supabase') {
      result = await this.loadFromSupabase(key, userId)
    } else {
      result = await this.loadFromLocalStorage(key, defaultValue)
    }

    // Return data without metadata for cleaner API
    if (result.success && result.data && result.data._metadata) {
      const { _metadata, ...cleanData } = result.data
      result.data = cleanData
    }

    return result
  }

  async remove(key, options = {}) {
    const { userId = 'anonymous' } = options

    if (this.storageType === 'supabase') {
      try {
        const { error } = await this.supabase
          .from(key)
          .delete()
          .eq('user_id', userId)

        if (error) throw error
        return { success: true }
      } catch (error) {
        return { success: false, error: error.message }
      }
    } else {
      return await this.removeFromLocalStorage(key)
    }
  }

  // Backup and restore
  async backup(keys = []) {
    const backup = {
      timestamp: new Date().toISOString(),
      storageType: this.storageType,
      data: {}
    }

    for (const key of keys) {
      const result = await this.load(key)
      if (result.success) {
        backup.data[key] = result.data
      }
    }

    return backup
  }

  async restore(backup) {
    const results = {}
    
    for (const [key, data] of Object.entries(backup.data)) {
      results[key] = await this.save(key, data)
    }

    return results
  }

  // Migration utilities
  async migrateToSupabase(keys = [], userId = 'anonymous') {
    if (this.storageType === 'supabase') {
      return { success: false, error: 'Already using Supabase' }
    }

    const results = {}
    
    for (const key of keys) {
      // Load from localStorage
      const localResult = await this.loadFromLocalStorage(key)
      if (localResult.success && localResult.data) {
        // Save to Supabase
        const supabaseResult = await this.saveToSupabase(key, localResult.data, userId)
        results[key] = supabaseResult
      }
    }

    return results
  }

  // Health check
  async healthCheck() {
    const health = {
      storageType: this.storageType,
      localStorage: false,
      supabase: false
    }

    // Test localStorage
    try {
      const testKey = '_health_check_test'
      localStorage.setItem(testKey, 'test')
      localStorage.removeItem(testKey)
      health.localStorage = true
    } catch (error) {
      console.error('LocalStorage health check failed:', error)
    }

    // Test Supabase
    if (this.supabase) {
      try {
        const { error } = await this.supabase.from('health_check').select('*').limit(1)
        health.supabase = !error
      } catch (error) {
        console.error('Supabase health check failed:', error)
      }
    }

    return health
  }
}

// Schemas for data validation
export const schemas = {
  roadmapData: {
    lastUpdated: 'string',
    quarters: 'object'
  },
  contentData: {
    technicalWhitepaper: 'object',
    architectureOverview: 'object',
    xandeumIntegration: 'object',
    financialFeatures: 'object'
  }
}

// Default configurations
export const configs = {
  localStorage: {
    storageType: 'localStorage',
    debounceTime: 1000
  },
  supabase: {
    storageType: 'supabase',
    debounceTime: 2000,
    supabase: {
      url: process.env.REACT_APP_SUPABASE_URL,
      anonKey: process.env.REACT_APP_SUPABASE_ANON_KEY
    }
  }
}

export default PersistenceService

