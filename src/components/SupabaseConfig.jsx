import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { AlertCircle, CheckCircle, Cloud, Database, Settings } from 'lucide-react'
import { usePersistenceService } from '../hooks/usePersistence'
import { configs } from '../services/persistenceService'

const SupabaseConfig = ({ onClose }) => {
  const [supabaseUrl, setSupabaseUrl] = useState('')
  const [supabaseKey, setSupabaseKey] = useState('')
  const [isConnecting, setIsConnecting] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState(null)
  const [migrationStatus, setMigrationStatus] = useState(null)

  const { service, checkHealth, migrateToSupabase } = usePersistenceService()

  // Load existing configuration
  useEffect(() => {
    const url = process.env.REACT_APP_SUPABASE_URL || localStorage.getItem('supabase_url') || ''
    const key = process.env.REACT_APP_SUPABASE_ANON_KEY || localStorage.getItem('supabase_key') || ''
    setSupabaseUrl(url)
    setSupabaseKey(key)
  }, [])

  const testConnection = async () => {
    if (!supabaseUrl || !supabaseKey) {
      setConnectionStatus({ success: false, message: 'Please provide both URL and API key' })
      return
    }

    setIsConnecting(true)
    setConnectionStatus(null)

    try {
      // Store credentials temporarily
      localStorage.setItem('supabase_url', supabaseUrl)
      localStorage.setItem('supabase_key', supabaseKey)

      // Create test service with Supabase config
      const testConfig = {
        ...configs.supabase,
        supabase: {
          url: supabaseUrl,
          anonKey: supabaseKey
        }
      }

      // Test connection (this would need to be implemented in the service)
      const health = await checkHealth()
      
      if (health.supabase) {
        setConnectionStatus({ success: true, message: 'Successfully connected to Supabase!' })
      } else {
        setConnectionStatus({ success: false, message: 'Failed to connect to Supabase. Please check your credentials.' })
      }
    } catch (error) {
      setConnectionStatus({ success: false, message: `Connection error: ${error.message}` })
    } finally {
      setIsConnecting(false)
    }
  }

  const handleMigration = async () => {
    if (!connectionStatus?.success) {
      alert('Please test and confirm the connection first')
      return
    }

    if (!window.confirm('This will migrate all your data to Supabase. Continue?')) {
      return
    }

    setMigrationStatus({ status: 'migrating', message: 'Migrating data to Supabase...' })

    try {
      const keys = ['roadmapData', 'xandeum-content']
      const results = await migrateToSupabase(keys, 'anonymous')
      
      const successful = Object.values(results).every(result => result.success)
      
      if (successful) {
        setMigrationStatus({ 
          status: 'success', 
          message: 'Data successfully migrated to Supabase! You can now use cloud storage.' 
        })
      } else {
        setMigrationStatus({ 
          status: 'error', 
          message: 'Some data failed to migrate. Please check the console for details.' 
        })
      }
    } catch (error) {
      setMigrationStatus({ 
        status: 'error', 
        message: `Migration failed: ${error.message}` 
      })
    }
  }

  const clearCredentials = () => {
    localStorage.removeItem('supabase_url')
    localStorage.removeItem('supabase_key')
    setSupabaseUrl('')
    setSupabaseKey('')
    setConnectionStatus(null)
    setMigrationStatus(null)
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-800 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white flex items-center">
            <Cloud className="mr-2" size={24} />
            Supabase Configuration
          </h2>
          <Button
            onClick={onClose}
            variant="ghost"
            className="text-white/60 hover:text-white"
          >
            ✕
          </Button>
        </div>

        <div className="space-y-6">
          {/* Information */}
          <div className="bg-blue-900/30 border border-blue-500/30 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Database className="text-blue-400 mt-1" size={20} />
              <div>
                <h3 className="text-blue-400 font-semibold mb-2">Cloud Storage with Supabase</h3>
                <p className="text-white/80 text-sm">
                  Connect to Supabase for cloud storage and synchronization across devices. 
                  Your data will be securely stored and accessible from anywhere.
                </p>
              </div>
            </div>
          </div>

          {/* Configuration Form */}
          <div className="space-y-4">
            <div>
              <label className="block text-white font-medium mb-2">
                Supabase Project URL
              </label>
              <input
                type="url"
                value={supabaseUrl}
                onChange={(e) => setSupabaseUrl(e.target.value)}
                placeholder="https://your-project.supabase.co"
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white placeholder-white/50 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-white font-medium mb-2">
                Supabase Anon Key
              </label>
              <input
                type="password"
                value={supabaseKey}
                onChange={(e) => setSupabaseKey(e.target.value)}
                placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white placeholder-white/50 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Connection Status */}
            {connectionStatus && (
              <div className={`p-3 rounded-lg flex items-center space-x-2 ${
                connectionStatus.success ? 'bg-green-900/30 border border-green-500/30' : 'bg-red-900/30 border border-red-500/30'
              }`}>
                {connectionStatus.success ? (
                  <CheckCircle className="text-green-400" size={20} />
                ) : (
                  <AlertCircle className="text-red-400" size={20} />
                )}
                <span className={connectionStatus.success ? 'text-green-400' : 'text-red-400'}>
                  {connectionStatus.message}
                </span>
              </div>
            )}

            {/* Migration Status */}
            {migrationStatus && (
              <div className={`p-3 rounded-lg flex items-center space-x-2 ${
                migrationStatus.status === 'success' ? 'bg-green-900/30 border border-green-500/30' :
                migrationStatus.status === 'error' ? 'bg-red-900/30 border border-red-500/30' :
                'bg-yellow-900/30 border border-yellow-500/30'
              }`}>
                {migrationStatus.status === 'success' ? (
                  <CheckCircle className="text-green-400" size={20} />
                ) : migrationStatus.status === 'error' ? (
                  <AlertCircle className="text-red-400" size={20} />
                ) : (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-yellow-400"></div>
                )}
                <span className={
                  migrationStatus.status === 'success' ? 'text-green-400' :
                  migrationStatus.status === 'error' ? 'text-red-400' :
                  'text-yellow-400'
                }>
                  {migrationStatus.message}
                </span>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex space-x-3">
            <Button
              onClick={testConnection}
              disabled={isConnecting || !supabaseUrl || !supabaseKey}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {isConnecting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Testing...
                </>
              ) : (
                'Test Connection'
              )}
            </Button>

            {connectionStatus?.success && (
              <Button
                onClick={handleMigration}
                disabled={migrationStatus?.status === 'migrating'}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                {migrationStatus?.status === 'migrating' ? 'Migrating...' : 'Migrate Data'}
              </Button>
            )}

            <Button
              onClick={clearCredentials}
              variant="outline"
              className="border-red-500 text-red-400 hover:bg-red-500/10"
            >
              Clear
            </Button>
          </div>

          {/* Instructions */}
          <div className="bg-slate-700/50 rounded-lg p-4">
            <h4 className="text-white font-medium mb-2">Setup Instructions:</h4>
            <ol className="text-white/80 text-sm space-y-1 list-decimal list-inside">
              <li>Create a free account at <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">supabase.com</a></li>
              <li>Create a new project</li>
              <li>Go to Settings → API</li>
              <li>Copy your Project URL and anon/public key</li>
              <li>Paste them above and test the connection</li>
              <li>Migrate your existing data to the cloud</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SupabaseConfig

