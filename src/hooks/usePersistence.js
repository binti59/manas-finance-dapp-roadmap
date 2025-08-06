// React Hook for Persistence Service Integration
import { useState, useEffect, useCallback, useRef } from 'react'
import PersistenceService, { configs, schemas } from '../services/persistenceService'

// Global persistence service instance
let persistenceService = null

// Initialize persistence service
const initializePersistenceService = (config = configs.localStorage) => {
  if (!persistenceService) {
    persistenceService = new PersistenceService(config)
  }
  return persistenceService
}

// Hook for managing persisted state
export const usePersistence = (key, initialValue, options = {}) => {
  const {
    schema = null,
    debounce = true,
    autoSave = true,
    storageConfig = configs.localStorage
  } = options

  const [data, setData] = useState(initialValue)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [saving, setSaving] = useState(false)
  const saveTimeoutRef = useRef(null)

  // Initialize persistence service
  const service = initializePersistenceService(storageConfig)

  // Load data on mount
  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      setError(null)

      try {
        const result = await service.load(key, initialValue, { schema })
        
        if (result.success) {
          setData(result.data || initialValue)
        } else {
          setError(result.error)
          setData(initialValue)
        }
      } catch (err) {
        setError(err.message)
        setData(initialValue)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [key, initialValue, schema])

  // Save data function
  const saveData = useCallback(async (newData) => {
    setSaving(true)
    setError(null)

    try {
      const result = await service.save(key, newData, { schema })
      
      if (!result.success) {
        setError(result.error)
        return false
      }
      
      return true
    } catch (err) {
      setError(err.message)
      return false
    } finally {
      setSaving(false)
    }
  }, [key, schema, service])

  // Debounced save function
  const debouncedSave = useCallback((newData) => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current)
    }

    saveTimeoutRef.current = setTimeout(() => {
      saveData(newData)
    }, debounce ? 1000 : 0)
  }, [saveData, debounce])

  // Update data function
  const updateData = useCallback((newData) => {
    setData(newData)
    
    if (autoSave) {
      if (debounce) {
        debouncedSave(newData)
      } else {
        saveData(newData)
      }
    }
  }, [autoSave, debounce, debouncedSave, saveData])

  // Manual save function
  const save = useCallback(() => {
    return saveData(data)
  }, [data, saveData])

  // Remove data function
  const remove = useCallback(async () => {
    try {
      const result = await service.remove(key)
      if (result.success) {
        setData(initialValue)
        return true
      } else {
        setError(result.error)
        return false
      }
    } catch (err) {
      setError(err.message)
      return false
    }
  }, [key, initialValue, service])

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current)
      }
    }
  }, [])

  return {
    data,
    setData: updateData,
    loading,
    error,
    saving,
    save,
    remove,
    service
  }
}

// Hook for roadmap data persistence
export const useRoadmapPersistence = (initialData) => {
  return usePersistence('roadmapData', initialData, {
    schema: schemas.roadmapData,
    debounce: true,
    autoSave: true
  })
}

// Hook for content data persistence
export const useContentPersistence = (initialData) => {
  return usePersistence('xandeum-content', initialData, {
    schema: schemas.contentData,
    debounce: true,
    autoSave: true
  })
}

// Hook for Supabase persistence (when available)
export const useSupabasePersistence = (key, initialValue, options = {}) => {
  const supabaseConfig = {
    ...configs.supabase,
    supabase: {
      url: process.env.REACT_APP_SUPABASE_URL,
      anonKey: process.env.REACT_APP_SUPABASE_ANON_KEY
    }
  }

  return usePersistence(key, initialValue, {
    ...options,
    storageConfig: supabaseConfig
  })
}

// Hook for persistence service management
export const usePersistenceService = (config = configs.localStorage) => {
  const [service] = useState(() => initializePersistenceService(config))
  const [health, setHealth] = useState(null)

  // Health check function
  const checkHealth = useCallback(async () => {
    const healthResult = await service.healthCheck()
    setHealth(healthResult)
    return healthResult
  }, [service])

  // Backup function
  const backup = useCallback(async (keys) => {
    return await service.backup(keys)
  }, [service])

  // Restore function
  const restore = useCallback(async (backupData) => {
    return await service.restore(backupData)
  }, [service])

  // Migration function
  const migrateToSupabase = useCallback(async (keys, userId) => {
    return await service.migrateToSupabase(keys, userId)
  }, [service])

  return {
    service,
    health,
    checkHealth,
    backup,
    restore,
    migrateToSupabase
  }
}

export default usePersistence

