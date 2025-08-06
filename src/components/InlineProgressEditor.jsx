import React, { useState, useEffect, useRef } from 'react'
import { Check, X, Edit3 } from 'lucide-react'

const InlineProgressEditor = ({ 
  progress, 
  onSave, 
  onCancel, 
  isEditing, 
  onStartEdit,
  disabled = false,
  className = ""
}) => {
  const [value, setValue] = useState(progress)
  const [isValid, setIsValid] = useState(true)
  const inputRef = useRef(null)

  useEffect(() => {
    setValue(progress)
  }, [progress])

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [isEditing])

  const validateProgress = (val) => {
    const num = parseInt(val)
    return !isNaN(num) && num >= 0 && num <= 100
  }

  const handleChange = (e) => {
    const newValue = e.target.value
    setValue(newValue)
    setIsValid(validateProgress(newValue))
  }

  const handleSave = () => {
    if (isValid && validateProgress(value)) {
      const numValue = parseInt(value)
      onSave(numValue)
    }
  }

  const handleCancel = () => {
    setValue(progress)
    setIsValid(true)
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

  if (isEditing) {
    return (
      <div className={`flex items-center space-x-1 ${className}`}>
        <div className="relative">
          <input
            ref={inputRef}
            type="number"
            min="0"
            max="100"
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className={`w-16 px-2 py-1 text-sm text-white bg-slate-700 border rounded ${
              isValid ? 'border-blue-500' : 'border-red-500'
            } focus:outline-none focus:ring-1 focus:ring-blue-500`}
            onClick={(e) => e.stopPropagation()}
          />
          <span className="absolute right-2 top-1 text-xs text-white/60">%</span>
        </div>
        
        <button
          onClick={(e) => {
            e.stopPropagation()
            handleSave()
          }}
          disabled={!isValid}
          className={`p-1 rounded ${
            isValid 
              ? 'text-green-400 hover:bg-green-400/20' 
              : 'text-gray-500 cursor-not-allowed'
          }`}
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
    )
  }

  return (
    <div 
      className={`flex items-center space-x-1 cursor-pointer group ${className} ${
        disabled ? 'cursor-not-allowed opacity-50' : 'hover:bg-white/10 rounded px-1'
      }`}
      onClick={handleClick}
      title={disabled ? '' : 'Click to edit progress'}
    >
      <span className="text-white font-bold text-sm">{progress}%</span>
      {!disabled && (
        <Edit3 
          size={12} 
          className="text-white/40 opacity-0 group-hover:opacity-100 transition-opacity" 
        />
      )}
    </div>
  )
}

export default InlineProgressEditor

