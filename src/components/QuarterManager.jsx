import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Plus, Edit, Trash2, Save, X } from 'lucide-react'

const QuarterManager = ({ quarters, onUpdateQuarters }) => {
  const [editingQuarter, setEditingQuarter] = useState(null)
  const [editForm, setEditForm] = useState({})

  const handleEditQuarter = (quarter) => {
    setEditingQuarter(quarter.id)
    setEditForm({
      name: quarter.name,
      id: quarter.id
    })
  }

  const handleSaveQuarter = () => {
    if (editingQuarter) {
      const updatedQuarters = quarters.map(quarter => 
        quarter.id === editingQuarter 
          ? { ...quarter, name: editForm.name, id: editForm.id }
          : quarter
      )
      onUpdateQuarters(updatedQuarters)
      setEditingQuarter(null)
      setEditForm({})
    }
  }

  const handleCancelEdit = () => {
    setEditingQuarter(null)
    setEditForm({})
  }

  const handleAddQuarter = () => {
    const newQuarter = {
      id: `q${quarters.length + 1}-2026`,
      name: `Q${quarters.length + 1} 2026`,
      tasks: []
    }
    onUpdateQuarters([...quarters, newQuarter])
  }

  const handleDeleteQuarter = (quarterId) => {
    if (window.confirm('Are you sure you want to delete this quarter and all its tasks?')) {
      const updatedQuarters = quarters.filter(quarter => quarter.id !== quarterId)
      onUpdateQuarters(updatedQuarters)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Quarter Management</h3>
        <Button
          onClick={handleAddQuarter}
          size="sm"
          className="bg-green-600 hover:bg-green-700"
        >
          <Plus size={16} className="mr-1" />
          Add Quarter
        </Button>
      </div>

      <div className="space-y-2">
        {quarters.map((quarter) => (
          <div key={quarter.id} className="bg-slate-700 rounded p-3">
            {editingQuarter === quarter.id ? (
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-white mb-1">Quarter ID:</label>
                  <input
                    type="text"
                    value={editForm.id || ''}
                    onChange={(e) => setEditForm({ ...editForm, id: e.target.value })}
                    className="w-full px-2 py-1 bg-slate-600 border border-slate-500 rounded text-white text-sm"
                    placeholder="e.g., q1-2026"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-1">Quarter Name:</label>
                  <input
                    type="text"
                    value={editForm.name || ''}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="w-full px-2 py-1 bg-slate-600 border border-slate-500 rounded text-white text-sm"
                    placeholder="e.g., Q1 2026"
                  />
                </div>
                <div className="flex space-x-2">
                  <Button
                    onClick={handleSaveQuarter}
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
                  <p className="text-sm font-medium text-white">{quarter.name}</p>
                  <p className="text-xs text-white/60">{quarter.tasks.length} task(s)</p>
                </div>
                <div className="flex space-x-1 ml-2">
                  <Button
                    onClick={() => handleEditQuarter(quarter)}
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Edit size={12} />
                  </Button>
                  <Button
                    onClick={() => handleDeleteQuarter(quarter.id)}
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
  )
}

export default QuarterManager

