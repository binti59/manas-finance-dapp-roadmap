import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useContent } from '../contexts/ContentContext'
import { 
  Settings, 
  Edit, 
  Save, 
  X, 
  Plus, 
  Trash2, 
  Download, 
  Upload,
  RotateCcw,
  Eye,
  EyeOff
} from 'lucide-react'

const AdminPanel = () => {
  const { 
    content, 
    isAdmin, 
    setIsAdmin, 
    updateContent, 
    updateSection, 
    addSection, 
    deleteSection,
    resetContent,
    exportContent,
    importContent
  } = useContent()
  
  const [activeTab, setActiveTab] = useState('technicalWhitepaper')
  const [editingSection, setEditingSection] = useState(null)
  const [editForm, setEditForm] = useState({})
  const [showAdminPanel, setShowAdminPanel] = useState(false)

  const contentTabs = [
    { id: 'technicalWhitepaper', label: 'Technical Whitepaper' },
    { id: 'architectureOverview', label: 'Architecture Overview' },
    { id: 'xandeumIntegration', label: 'Xandeum Integration' },
    { id: 'financialFeatures', label: 'Financial Features' }
  ]

  const handleEditSection = (section) => {
    setEditingSection(section.id)
    setEditForm({
      title: section.title,
      content: section.content
    })
  }

  const handleSaveSection = () => {
    updateSection(activeTab, editingSection, editForm)
    setEditingSection(null)
    setEditForm({})
  }

  const handleCancelEdit = () => {
    setEditingSection(null)
    setEditForm({})
  }

  const handleAddSection = () => {
    const newSection = {
      id: `new-section-${Date.now()}`,
      title: 'New Section',
      content: 'Enter your content here...'
    }
    addSection(activeTab, newSection)
  }

  const handleDeleteSection = (sectionId) => {
    if (window.confirm('Are you sure you want to delete this section?')) {
      deleteSection(activeTab, sectionId)
    }
  }

  const handleUpdateTitle = (newTitle) => {
    updateContent(activeTab, { title: newTitle })
  }

  const handleUpdateSubtitle = (newSubtitle) => {
    updateContent(activeTab, { subtitle: newSubtitle })
  }

  const handleImport = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const success = importContent(e.target.result)
        if (success) {
          alert('Content imported successfully!')
        } else {
          alert('Error importing content. Please check the file format.')
        }
      }
      reader.readAsText(file)
    }
  }

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all content to defaults? This cannot be undone.')) {
      resetContent()
      alert('Content reset to defaults!')
    }
  }

  if (!isAdmin) {
    return (
      <div className="fixed top-4 right-4 z-50">
        <Button
          onClick={() => setIsAdmin(true)}
          className="bg-green-600 hover:bg-green-700 text-white p-3 rounded-full shadow-lg"
          title="Admin Panel"
        >
          <Settings size={20} />
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="flex items-center space-x-2">
        <Button
          onClick={() => setShowAdminPanel(!showAdminPanel)}
          className="bg-green-600 hover:bg-green-700 text-white p-3 rounded-full shadow-lg"
          title={showAdminPanel ? "Hide Admin Panel" : "Show Admin Panel"}
        >
          {showAdminPanel ? <EyeOff size={20} /> : <Eye size={20} />}
        </Button>
        
        <Button
          onClick={() => setIsAdmin(false)}
          className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-full shadow-lg"
          title="Exit Admin Mode"
        >
          <X size={20} />
        </Button>
      </div>

      {showAdminPanel && (
        <div className="absolute top-16 right-0 w-96 max-h-96 bg-slate-800 rounded-lg shadow-xl border border-slate-600 overflow-hidden">
          <div className="p-4 border-b border-slate-600">
            <h3 className="text-white font-semibold text-lg">Content Admin Panel</h3>
            
            {/* Action Buttons */}
            <div className="flex space-x-2 mt-3">
              <Button
                onClick={exportContent}
                size="sm"
                className="bg-blue-600 hover:bg-blue-700 text-white"
                title="Export Content"
              >
                <Download size={16} />
              </Button>
              
              <label className="cursor-pointer">
                <Button
                  size="sm"
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                  title="Import Content"
                  asChild
                >
                  <span>
                    <Upload size={16} />
                  </span>
                </Button>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImport}
                  className="hidden"
                />
              </label>
              
              <Button
                onClick={handleReset}
                size="sm"
                className="bg-orange-600 hover:bg-orange-700 text-white"
                title="Reset to Defaults"
              >
                <RotateCcw size={16} />
              </Button>
            </div>
          </div>

          <div className="overflow-y-auto max-h-80">
            {/* Tab Navigation */}
            <div className="flex flex-wrap p-2 border-b border-slate-600">
              {contentTabs.map(tab => (
                <Button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  size="sm"
                  variant={activeTab === tab.id ? "default" : "ghost"}
                  className={`text-xs m-1 ${
                    activeTab === tab.id 
                      ? 'bg-blue-600 text-white' 
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {tab.label}
                </Button>
              ))}
            </div>

            {/* Content Editing */}
            <div className="p-4">
              <div className="space-y-4">
                {/* Title Editing */}
                <div>
                  <label className="text-slate-300 text-sm">Title:</label>
                  <input
                    type="text"
                    value={content[activeTab]?.title || ''}
                    onChange={(e) => handleUpdateTitle(e.target.value)}
                    className="w-full mt-1 p-2 bg-slate-700 text-white rounded border border-slate-600 text-sm"
                  />
                </div>

                {/* Subtitle Editing */}
                <div>
                  <label className="text-slate-300 text-sm">Subtitle:</label>
                  <input
                    type="text"
                    value={content[activeTab]?.subtitle || ''}
                    onChange={(e) => handleUpdateSubtitle(e.target.value)}
                    className="w-full mt-1 p-2 bg-slate-700 text-white rounded border border-slate-600 text-sm"
                  />
                </div>

                {/* Add Section Button */}
                <Button
                  onClick={handleAddSection}
                  size="sm"
                  className="bg-green-600 hover:bg-green-700 text-white w-full"
                >
                  <Plus size={16} className="mr-2" />
                  Add Section
                </Button>

                {/* Sections */}
                <div className="space-y-3">
                  {content[activeTab]?.sections?.map(section => (
                    <div key={section.id} className="border border-slate-600 rounded p-3">
                      {editingSection === section.id ? (
                        <div className="space-y-2">
                          <input
                            type="text"
                            value={editForm.title}
                            onChange={(e) => setEditForm({...editForm, title: e.target.value})}
                            className="w-full p-2 bg-slate-700 text-white rounded border border-slate-600 text-sm"
                            placeholder="Section title"
                          />
                          <textarea
                            value={editForm.content}
                            onChange={(e) => setEditForm({...editForm, content: e.target.value})}
                            rows={4}
                            className="w-full p-2 bg-slate-700 text-white rounded border border-slate-600 text-sm resize-none"
                            placeholder="Section content"
                          />
                          <div className="flex space-x-2">
                            <Button
                              onClick={handleSaveSection}
                              size="sm"
                              className="bg-green-600 hover:bg-green-700 text-white"
                            >
                              <Save size={14} />
                            </Button>
                            <Button
                              onClick={handleCancelEdit}
                              size="sm"
                              className="bg-gray-600 hover:bg-gray-700 text-white"
                            >
                              <X size={14} />
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="text-white font-medium text-sm">{section.title}</h4>
                            <div className="flex space-x-1">
                              <Button
                                onClick={() => handleEditSection(section)}
                                size="sm"
                                className="bg-blue-600 hover:bg-blue-700 text-white p-1"
                              >
                                <Edit size={12} />
                              </Button>
                              <Button
                                onClick={() => handleDeleteSection(section.id)}
                                size="sm"
                                className="bg-red-600 hover:bg-red-700 text-white p-1"
                              >
                                <Trash2 size={12} />
                              </Button>
                            </div>
                          </div>
                          <p className="text-slate-300 text-xs line-clamp-2">
                            {section.content.substring(0, 100)}...
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminPanel

