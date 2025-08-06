import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useContent } from '../contexts/ContentContext'
import ImageUpload from './ImageUpload'
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
  EyeOff,
  Image as ImageIcon
} from 'lucide-react'

const EnhancedAdminPanel = () => {
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
  const [showImageManager, setShowImageManager] = useState(false)

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
      content: section.content,
      images: section.images || []
    })
  }

  const handleSaveSection = () => {
    if (editingSection) {
      updateSection(activeTab, editingSection, editForm)
      setEditingSection(null)
      setEditForm({})
    }
  }

  const handleCancelEdit = () => {
    setEditingSection(null)
    setEditForm({})
  }

  const handleAddSection = () => {
    const newSection = {
      id: `section_${Date.now()}`,
      title: 'New Section',
      content: 'Enter your content here...',
      images: []
    }
    addSection(activeTab, newSection)
  }

  const handleDeleteSection = (sectionId) => {
    if (window.confirm('Are you sure you want to delete this section?')) {
      deleteSection(activeTab, sectionId)
    }
  }

  const handleImageUpload = (imageUrl, fileName) => {
    if (editingSection) {
      const updatedImages = editForm.images || []
      if (imageUrl) {
        updatedImages.push({ url: imageUrl, name: fileName, id: Date.now() })
      }
      setEditForm({ ...editForm, images: updatedImages })
    }
  }

  const handleRemoveImage = (imageId) => {
    if (editingSection) {
      const updatedImages = (editForm.images || []).filter(img => img.id !== imageId)
      setEditForm({ ...editForm, images: updatedImages })
    }
  }

  const handleExport = () => {
    exportContent()
  }

  const handleImport = (event) => {
    const file = event.target.files[0]
    if (file) {
      importContent(file)
    }
  }

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all content to defaults? This cannot be undone.')) {
      resetContent()
    }
  }

  const currentContent = content[activeTab] || { title: '', subtitle: '', sections: [] }

  if (!isAdmin) {
    return (
      <div className="fixed top-4 right-4 z-50">
        <Button
          onClick={() => setIsAdmin(true)}
          className="bg-green-600 hover:bg-green-700 text-white"
          title="Admin Panel"
        >
          <Settings size={20} />
        </Button>
      </div>
    )
  }

  return (
    <div className="fixed top-4 right-4 z-50">
      {/* Admin Mode Controls */}
      <div className="flex space-x-2 mb-2">
        <Button
          onClick={() => setShowAdminPanel(!showAdminPanel)}
          className="bg-green-600 hover:bg-green-700 text-white"
          title={showAdminPanel ? "Hide Admin Panel" : "Show Admin Panel"}
        >
          {showAdminPanel ? <EyeOff size={20} /> : <Eye size={20} />}
        </Button>
        <Button
          onClick={() => setIsAdmin(false)}
          className="bg-red-600 hover:bg-red-700 text-white"
          title="Exit Admin Mode"
        >
          <X size={20} />
        </Button>
      </div>

      {/* Admin Panel */}
      {showAdminPanel && (
        <div className="bg-slate-800 rounded-lg p-4 w-96 max-h-96 overflow-y-auto border border-slate-600 shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Content Admin Panel</h3>
            <div className="flex space-x-1">
              <Button
                onClick={handleExport}
                size="sm"
                className="bg-blue-600 hover:bg-blue-700"
                title="Export Content"
              >
                <Download size={16} />
              </Button>
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImport}
                  className="hidden"
                />
                <Button
                  as="span"
                  size="sm"
                  className="bg-purple-600 hover:bg-purple-700"
                  title="Import Content"
                >
                  <Upload size={16} />
                </Button>
              </label>
              <Button
                onClick={handleReset}
                size="sm"
                className="bg-orange-600 hover:bg-orange-700"
                title="Reset to Defaults"
              >
                <RotateCcw size={16} />
              </Button>
              <Button
                onClick={() => setShowImageManager(!showImageManager)}
                size="sm"
                className="bg-cyan-600 hover:bg-cyan-700"
                title="Image Manager"
              >
                <ImageIcon size={16} />
              </Button>
            </div>
          </div>

          {/* Content Type Tabs */}
          <div className="flex flex-wrap gap-1 mb-4">
            {contentTabs.map(tab => (
              <Button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                size="sm"
                className={`text-xs ${
                  activeTab === tab.id 
                    ? 'bg-orange-600 hover:bg-orange-700' 
                    : 'bg-slate-600 hover:bg-slate-500'
                }`}
              >
                {tab.label}
              </Button>
            ))}
          </div>

          {/* Title and Subtitle Editing */}
          <div className="space-y-3 mb-4">
            <div>
              <label className="block text-sm font-medium text-white mb-1">Title:</label>
              <input
                type="text"
                value={currentContent.title || ''}
                onChange={(e) => updateContent(activeTab, { ...currentContent, title: e.target.value })}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-white mb-1">Subtitle:</label>
              <input
                type="text"
                value={currentContent.subtitle || ''}
                onChange={(e) => updateContent(activeTab, { ...currentContent, subtitle: e.target.value })}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded text-white text-sm"
              />
            </div>
          </div>

          {/* Add Section Button */}
          <Button
            onClick={handleAddSection}
            className="w-full mb-4 bg-green-600 hover:bg-green-700 text-white"
            size="sm"
          >
            <Plus size={16} className="mr-1" />
            Add Section
          </Button>

          {/* Sections List */}
          <div className="space-y-2">
            {currentContent.sections?.map((section) => (
              <div key={section.id} className="bg-slate-700 rounded p-3">
                {editingSection === section.id ? (
                  <div className="space-y-3">
                    <input
                      type="text"
                      placeholder="Section title"
                      value={editForm.title || ''}
                      onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                      className="w-full px-2 py-1 bg-slate-600 border border-slate-500 rounded text-white text-sm"
                    />
                    <textarea
                      placeholder="Section content"
                      value={editForm.content || ''}
                      onChange={(e) => setEditForm({ ...editForm, content: e.target.value })}
                      rows={4}
                      className="w-full px-2 py-1 bg-slate-600 border border-slate-500 rounded text-white text-sm resize-none"
                    />
                    
                    {/* Image Management for Section */}
                    {showImageManager && (
                      <div className="space-y-2">
                        <ImageUpload
                          onImageUpload={handleImageUpload}
                          label="Add Image to Section"
                        />
                        {editForm.images && editForm.images.length > 0 && (
                          <div className="space-y-2">
                            <p className="text-xs text-white/70">Section Images:</p>
                            {editForm.images.map((image) => (
                              <div key={image.id} className="flex items-center justify-between bg-slate-600 p-2 rounded">
                                <span className="text-xs text-white truncate">{image.name}</span>
                                <Button
                                  onClick={() => handleRemoveImage(image.id)}
                                  size="sm"
                                  className="bg-red-600 hover:bg-red-700 ml-2"
                                >
                                  <X size={12} />
                                </Button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                    
                    <div className="flex space-x-2">
                      <Button
                        onClick={handleSaveSection}
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <Save size={14} />
                      </Button>
                      <Button
                        onClick={handleCancelEdit}
                        size="sm"
                        className="bg-gray-600 hover:bg-gray-700"
                      >
                        <X size={14} />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">{section.title}</p>
                      <p className="text-xs text-white/60 truncate">{section.content.substring(0, 50)}...</p>
                      {section.images && section.images.length > 0 && (
                        <p className="text-xs text-cyan-400">{section.images.length} image(s)</p>
                      )}
                    </div>
                    <div className="flex space-x-1 ml-2">
                      <Button
                        onClick={() => handleEditSection(section)}
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <Edit size={12} />
                      </Button>
                      <Button
                        onClick={() => handleDeleteSection(section.id)}
                        size="sm"
                        className="bg-red-600 hover:bg-red-700"
                      >
                        <Trash2 size={12} />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default EnhancedAdminPanel

