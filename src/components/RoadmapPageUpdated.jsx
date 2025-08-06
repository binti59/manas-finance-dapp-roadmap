import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Settings, Download, Upload, Edit, Plus, Trash2 } from 'lucide-react'
import TaskEditModal from './TaskEditModal'
import QuarterManager from './QuarterManager'

// Complete roadmap data matching reference site, shifted to 2026
const initialRoadmapData = {
  lastUpdated: new Date().toISOString().split('T')[0],
  quarters: [
    {
      id: 'q1-2026',
      name: 'Q1 2026',
      tasks: [
        {
          id: 'project-setup',
          title: 'Project Setup & Infrastructure',
          description: 'Development environment, CI/CD pipeline, security framework',
          category: 'Foundation',
          progress: 100
        },
        {
          id: 'xandeum-storage',
          title: 'Xandeum Storage Abstraction',
          description: 'Storage simulation layer with Xandeum primitives',
          category: 'Foundation',
          progress: 85
        },
        {
          id: 'authentication',
          title: 'Authentication System',
          description: 'User management with blockchain identity support',
          category: 'Foundation',
          progress: 90
        },
        {
          id: 'core-ui',
          title: 'Core UI Components',
          description: 'Design system and responsive component library',
          category: 'Frontend',
          progress: 75
        }
      ]
    },
    {
      id: 'q2-2026',
      name: 'Q2 2026',
      tasks: [
        {
          id: 'transaction-engine',
          title: 'Transaction Processing Engine',
          description: 'Data ingestion, categorization, and duplicate detection',
          category: 'Financial',
          progress: 60
        },
        {
          id: 'account-aggregation',
          title: 'Account Aggregation System',
          description: 'Financial institution connectors and data sync',
          category: 'Financial',
          progress: 45
        },
        {
          id: 'basic-dashboard',
          title: 'Basic Financial Dashboard',
          description: 'Account overview and transaction displays',
          category: 'Frontend',
          progress: 70
        },
        {
          id: 'data-encryption',
          title: 'Data Encryption Framework',
          description: 'Client-side encryption and key management',
          category: 'Foundation',
          progress: 80
        }
      ]
    },
    {
      id: 'q3-2026',
      name: 'Q3 2026',
      tasks: [
        {
          id: 'investment-tracking',
          title: 'Investment Portfolio Tracking',
          description: 'Position tracking and performance analytics',
          category: 'Analytics',
          progress: 30
        },
        {
          id: 'financial-health',
          title: 'Financial Health Assessment',
          description: 'Health scoring and cash flow analysis',
          category: 'Analytics',
          progress: 25
        },
        {
          id: 'goal-management',
          title: 'Goal Management System',
          description: 'Goal setting, tracking, and progress monitoring',
          category: 'Financial',
          progress: 20
        },
        {
          id: 'advanced-ui',
          title: 'Advanced UI Features',
          description: 'Interactive charts and data visualizations',
          category: 'Frontend',
          progress: 40
        }
      ]
    },
    {
      id: 'q4-2026',
      name: 'Q4 2026',
      tasks: [
        {
          id: 'predictive-analytics',
          title: 'Predictive Analytics Engine',
          description: 'Spending prediction and income forecasting',
          category: 'Analytics',
          progress: 15
        },
        {
          id: 'crypto-integration',
          title: 'Cryptocurrency Integration',
          description: 'Exchange APIs and crypto portfolio tracking',
          category: 'Xandeum',
          progress: 10
        },
        {
          id: 'performance-optimization',
          title: 'Performance Optimization',
          description: 'Scalability improvements and caching',
          category: 'Foundation',
          progress: 5
        },
        {
          id: 'beta-testing',
          title: 'Beta Testing Program',
          description: 'User testing and feedback incorporation',
          category: 'Foundation',
          progress: 0
        }
      ]
    },
    {
      id: 'q1-2027',
      name: 'Q1 2027',
      tasks: [
        {
          id: 'xandeum-api',
          title: 'Xandeum API Integration',
          description: 'Migration from simulation to actual Xandeum storage',
          category: 'Xandeum',
          progress: 0
        },
        {
          id: 'smart-contracts',
          title: 'Smart Contract Automation',
          description: 'Automated financial rules and triggers',
          category: 'Xandeum',
          progress: 0
        },
        {
          id: 'security-audit',
          title: 'Advanced Security Audit',
          description: 'Comprehensive security testing and validation',
          category: 'Foundation',
          progress: 0
        },
        {
          id: 'mobile-app',
          title: 'Mobile Application',
          description: 'Native mobile app development',
          category: 'Frontend',
          progress: 0
        }
      ]
    },
    {
      id: 'q2-2027',
      name: 'Q2 2027',
      tasks: [
        {
          id: 'ai-recommendations',
          title: 'AI-Powered Recommendations',
          description: 'Machine learning for personalized insights',
          category: 'Analytics',
          progress: 0
        },
        {
          id: 'decentralized-identity',
          title: 'Decentralized Identity',
          description: 'Full blockchain identity integration',
          category: 'Xandeum',
          progress: 0
        },
        {
          id: 'advanced-analytics',
          title: 'Advanced Analytics Dashboard',
          description: 'Sophisticated financial modeling and forecasting',
          category: 'Analytics',
          progress: 0
        },
        {
          id: 'public-beta',
          title: 'Public Beta Launch',
          description: 'Open beta with community feedback',
          category: 'Frontend',
          progress: 0
        }
      ]
    },
    {
      id: 'q3-2027',
      name: 'Q3 2027',
      tasks: [
        {
          id: 'production-launch',
          title: 'Production Launch',
          description: 'Full public release with marketing campaign',
          category: 'Foundation',
          progress: 0
        },
        {
          id: 'enterprise-features',
          title: 'Enterprise Features',
          description: 'Business financial management capabilities',
          category: 'Financial',
          progress: 0
        },
        {
          id: 'global-expansion',
          title: 'Global Expansion',
          description: 'Internationalization and localization',
          category: 'Foundation',
          progress: 0
        },
        {
          id: 'developer-api',
          title: 'Developer API',
          description: 'Public API for third-party integrations',
          category: 'Foundation',
          progress: 0
        }
      ]
    }
  ]
}

// Category colors matching reference site exactly
const categoryColors = {
  Foundation: 'bg-purple-500',
  Financial: 'bg-cyan-500', 
  Frontend: 'bg-orange-500',
  Analytics: 'bg-blue-500',
  Security: 'bg-red-500',
  Xandeum: 'bg-green-500'
}

const categoryBorderColors = {
  Foundation: 'border-l-purple-500',
  Financial: 'border-l-cyan-500',
  Frontend: 'border-l-orange-500',
  Analytics: 'border-l-blue-500',
  Security: 'border-l-red-500',
  Xandeum: 'border-l-green-500'
}

const categoryProgressColors = {
  Foundation: 'bg-purple-500',
  Financial: 'bg-cyan-500',
  Frontend: 'bg-orange-500',
  Analytics: 'bg-blue-500',
  Security: 'bg-red-500',
  Xandeum: 'bg-green-500'
}

const TaskCard = ({ quarter, task, isAdmin = false }) => {
  const categoryColor = categoryColors[task.category] || 'bg-gray-500'
  const borderColor = categoryBorderColors[task.category] || 'border-l-gray-500'
  const progressColor = categoryProgressColors[task.category] || 'bg-gray-500'

  return (
    <div className={`bg-slate-800/80 rounded-lg p-4 border-l-4 ${borderColor} relative group`}>
      <div className="flex justify-between items-start mb-2">
        <h4 className="text-white font-semibold text-sm leading-tight">{task.title}</h4>
        <div className="flex items-center space-x-2">
          <span className="text-white font-bold text-sm">{task.progress}%</span>
          {isAdmin && (
            <div className="opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1">
              <Button
                onClick={() => window.openEditModal(task, quarter.id)}
                size="sm"
                className="bg-blue-600 hover:bg-blue-700 h-6 w-6 p-0"
              >
                <Edit size={12} />
              </Button>
              <Button
                onClick={() => window.deleteTask({ ...task, quarterId: quarter.id })}
                size="sm"
                className="bg-red-600 hover:bg-red-700 h-6 w-6 p-0"
              >
                <Trash2 size={12} />
              </Button>
            </div>
          )}
        </div>
      </div>
      
      <p className="text-gray-300 text-xs mb-3 leading-relaxed">{task.description}</p>
      
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className={`px-2 py-1 rounded text-xs font-medium text-white ${categoryColor}`}>
            {task.category}
          </span>
        </div>
        
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-300 ${progressColor}`}
            style={{ width: `${task.progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  )
}

const RoadmapPageUpdated = () => {
  const [roadmapData, setRoadmapData] = useState(() => {
    const saved = localStorage.getItem('roadmapData')
    return saved ? JSON.parse(saved) : initialRoadmapData
  })
  
  const [showAdminPanel, setShowAdminPanel] = useState(false)
  const [showTaskModal, setShowTaskModal] = useState(false)
  const [editingTask, setEditingTask] = useState(null)

  useEffect(() => {
    localStorage.setItem('roadmapData', JSON.stringify(roadmapData))
  }, [roadmapData])

  const updateLastUpdated = () => {
    setRoadmapData(prev => ({
      ...prev,
      lastUpdated: new Date().toISOString().split('T')[0]
    }))
  }

  const generateTaskId = (title) => {
    return title.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')
  }

  const saveTask = (taskData) => {
    setRoadmapData(prev => ({
      ...prev,
      quarters: prev.quarters.map(quarter => {
        if (quarter.id === taskData.quarterId) {
          if (taskData.id && quarter.tasks.find(t => t.id === taskData.id)) {
            // Update existing task
            return {
              ...quarter,
              tasks: quarter.tasks.map(task =>
                task.id === taskData.id ? { ...taskData } : task
              )
            }
          } else {
            // Add new task
            const newTask = {
              ...taskData,
              id: generateTaskId(taskData.title)
            }
            return {
              ...quarter,
              tasks: [...quarter.tasks, newTask]
            }
          }
        }
        return quarter
      })
    }))
    updateLastUpdated()
  }

  const deleteTask = (taskData) => {
    setRoadmapData(prev => ({
      ...prev,
      quarters: prev.quarters.map(quarter => {
        if (quarter.id === taskData.quarterId) {
          return {
            ...quarter,
            tasks: quarter.tasks.filter(task => task.id !== taskData.id)
          }
        }
        return quarter
      })
    }))
    updateLastUpdated()
  }

  const openEditModal = (task, quarterId) => {
    setEditingTask({ ...task, quarterId })
    setShowTaskModal(true)
  }

  const openAddModal = (quarterId) => {
    setEditingTask({ quarterId })
    setShowTaskModal(true)
  }

  const closeTaskModal = () => {
    setShowTaskModal(false)
    setEditingTask(null)
  }

  const exportConfig = () => {
    const dataStr = JSON.stringify(roadmapData, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `roadmap-config-${roadmapData.lastUpdated}.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  const importConfig = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const importedData = JSON.parse(e.target.result)
          setRoadmapData(importedData)
        } catch (error) {
          alert('Error importing configuration. Please check the file format.')
        }
      }
      reader.readAsText(file)
    }
  }

  // Make functions available globally for TaskCard
  useEffect(() => {
    window.openEditModal = openEditModal
    window.deleteTask = deleteTask
    return () => {
      delete window.openEditModal
      delete window.deleteTask
    }
  }, [])

  return (
    <div className="min-h-screen px-4 py-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="flex justify-between items-center mb-8">
          <Link to="/">
            <Button className="bg-slate-700 hover:bg-slate-600 text-white">
              <ArrowLeft className="mr-2" size={16} />
              Back to Home
            </Button>
          </Link>
          
          <Button
            onClick={() => setShowAdminPanel(!showAdminPanel)}
            className="bg-green-600 hover:bg-green-700 text-white"
            title="Admin Panel"
          >
            <Settings size={16} />
          </Button>
        </div>
        
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-orange-400 mb-4">
            Xandeum Finance dApp Roadmap
          </h1>
          <p className="text-xl text-white/80 mb-2">
            Building the future of decentralized personal finance management on Xandeum.
          </p>
          <p className="text-white/60 text-sm">
            (Subject to change based on Xandeum ecosystem development)
          </p>
          <p className="text-white/60 text-sm mt-2">
            Last updated: {roadmapData.lastUpdated}
          </p>
        </div>
      </div>

      {/* Admin Panel */}
      {showAdminPanel && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-2xl p-6 max-w-6xl w-full max-h-[90vh] overflow-y-auto border border-white/20">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center">
                <Settings className="mr-2" size={24} />
                Roadmap Admin Panel
              </h2>
              <Button
                onClick={() => setShowAdminPanel(false)}
                variant="ghost"
                className="text-white/60 hover:text-white"
              >
                ✕
              </Button>
            </div>
            
            <div className="flex space-x-4 mb-6">
              <Button onClick={exportConfig} className="bg-green-600 hover:bg-green-700">
                <Download className="mr-2" size={16} />
                Export Config
              </Button>
              <label className="cursor-pointer">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Upload className="mr-2" size={16} />
                  Import Config
                </Button>
                <input
                  type="file"
                  accept=".json"
                  onChange={importConfig}
                  className="hidden"
                />
              </label>
              <span className="text-white/60 text-sm self-center">
                Last updated: {roadmapData.lastUpdated}
              </span>
            </div>
            
            {/* Quarter Management */}
            <div className="mb-6">
              <QuarterManager 
                quarters={roadmapData.quarters}
                onUpdateQuarters={(updatedQuarters) => {
                  setRoadmapData(prev => ({ ...prev, quarters: updatedQuarters }))
                  updateLastUpdated()
                }}
              />
            </div>
            
            {/* Admin Task List */}
            <div className="space-y-6">
              {roadmapData.quarters.map(quarter => (
                <div key={quarter.id}>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-white">{quarter.name}</h3>
                    <Button
                      onClick={() => openAddModal(quarter.id)}
                      className="bg-purple-600 hover:bg-purple-700 text-white"
                      size="sm"
                    >
                      <Plus className="mr-1" size={16} />
                      Add Task
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {quarter.tasks.map(task => (
                      <TaskCard key={task.id} quarter={quarter} task={task} isAdmin={true} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Task Edit Modal */}
      <TaskEditModal
        task={editingTask}
        isOpen={showTaskModal}
        onClose={closeTaskModal}
        onSave={saveTask}
      />

      {/* Roadmap Content */}
      <div className="max-w-7xl mx-auto">
        <div className="space-y-12">
          {roadmapData.quarters.map(quarter => (
            <div key={quarter.id} className="flex gap-8">
              {/* Quarter Label */}
              <div className="flex-shrink-0 w-32">
                <div className="bg-slate-700/80 rounded-lg p-4 text-center sticky top-8">
                  <h3 className="text-white font-bold text-lg">{quarter.name}</h3>
                </div>
              </div>
              
              {/* Tasks Grid */}
              <div className="flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {quarter.tasks.map(task => (
                    <TaskCard key={task.id} quarter={quarter} task={task} />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Categories Legend */}
        <div className="mt-16 text-center">
          <h3 className="text-white font-semibold mb-4">Categories</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {Object.entries(categoryColors).map(([category, colorClass]) => (
              <div key={category} className="flex items-center space-x-2">
                <div className={`w-4 h-4 rounded ${colorClass}`}></div>
                <span className="text-white/80 text-sm">{category}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default RoadmapPageUpdated

