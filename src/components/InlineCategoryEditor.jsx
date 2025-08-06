import React, { useState, useEffect, useRef } from 'react'
import { Check, X, Edit3, ChevronDown } from 'lucide-react'

const InlineCategoryEditor = ({ 
  value, 
  onSave, 
  onCancel, 
  isEditing, 
  onStartEdit,
  disabled = false,
  options = [],
  className = ""
}) => {
  const [selectedValue, setSelectedValue] = useState(value)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const selectRef = useRef(null)
  const dropdownRef = useRef(null)

  useEffect(() => {
    setSelectedValue(value)
  }, [value])

  useEffect(() => {
    if (isEditing && selectRef.current) {
      selectRef.current.focus()
      setIsDropdownOpen(true)
    }
  }, [isEditing])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isDropdownOpen])

  const handleSave = () => {
    onSave(selectedValue)
    setIsDropdownOpen(false)
  }

  const handleCancel = () => {
    setSelectedValue(value)
    setIsDropdownOpen(false)
    onCancel()
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSave()
    } else if (e.key === 'Escape') {
      e.preventDefault()
      handleCancel()
    }
  }

  const handleClick = (e) => {
    e.stopPropagation()
    if (!disabled && !isEditing) {
      onStartEdit()
    }
  }

  const handleOptionSelect = (option) => {
    setSelectedValue(option)
    setIsDropdownOpen(false)
    onSave(option)
  }

  // Category colors mapping
  const categoryColors = {
    Foundation: 'bg-purple-600',
    Financial: 'bg-cyan-500',
    Frontend: 'bg-orange-500',
    Analytics: 'bg-blue-500',
    Security: 'bg-red-500',
    Xandeum: 'bg-green-500'
  }

  const categoryColor = categoryColors[value] || 'bg-gray-500'

  if (isEditing) {
    return (
      <div className={`relative ${className}`} ref={dropdownRef}>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <button
              ref={selectRef}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              onKeyDown={handleKeyDown}
              className={`px-2 py-1 rounded text-xs font-medium text-white border border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 flex items-center space-x-1 ${categoryColors[selectedValue] || 'bg-gray-500'}`}
            >
              <span>{selectedValue}</span>
              <ChevronDown size={12} />
            </button>
            
            {isDropdownOpen && (
              <div className="absolute top-full left-0 mt-1 bg-slate-700 border border-slate-600 rounded shadow-lg z-50 min-w-[120px]">
                {options.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleOptionSelect(option)}
                    className={`w-full text-left px-3 py-2 text-xs font-medium text-white hover:bg-slate-600 first:rounded-t last:rounded-b ${categoryColors[option] || 'bg-gray-500'}`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <button
            onClick={(e) => {
              e.stopPropagation()
              handleSave()
            }}
            className="p-1 text-green-400 hover:bg-green-400/20 rounded"
            title="Save"
          >
            <Check size={14} />
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation()
              handleCancel()
            }}
            className="p-1 text-red-400 hover:bg-red-400/20 rounded"
            title="Cancel"
          >
            <X size={14} />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div 
      className={`cursor-pointer group ${className} ${
        disabled ? 'cursor-not-allowed opacity-50' : 'hover:bg-white/10 rounded px-1 -mx-1'
      }`}
      onClick={handleClick}
      title={disabled ? '' : 'Click to edit category'}
    >
      <div className="flex items-center justify-between">
        <span className={`px-2 py-1 rounded text-xs font-medium text-white ${categoryColor}`}>
          {value}
        </span>
        {!disabled && (
          <Edit3 
            size={12} 
            className="text-white/40 opacity-0 group-hover:opacity-100 transition-opacity ml-2" 
          />
        )}
      </div>
    </div>
  )
}

export default InlineCategoryEditor

