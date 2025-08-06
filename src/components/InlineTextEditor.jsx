import React, { useState, useEffect, useRef } from 'react'
import { Check, X, Edit3 } from 'lucide-react'

const InlineTextEditor = ({ 
  value, 
  onSave, 
  onCancel, 
  isEditing, 
  onStartEdit,
  disabled = false,
  multiline = false,
  placeholder = "Enter text...",
  className = "",
  maxLength = null
}) => {
  const [inputValue, setInputValue] = useState(value)
  const [isValid, setIsValid] = useState(true)
  const inputRef = useRef(null)
  const textareaRef = useRef(null)

  useEffect(() => {
    setInputValue(value)
  }, [value])

  useEffect(() => {
    if (isEditing) {
      const element = multiline ? textareaRef.current : inputRef.current
      if (element) {
        element.focus()
        element.select()
      }
    }
  }, [isEditing, multiline])

  const validateInput = (val) => {
    if (maxLength && val.length > maxLength) return false
    return val.trim().length > 0
  }

  const handleChange = (e) => {
    const newValue = e.target.value
    setInputValue(newValue)
    setIsValid(validateInput(newValue))
  }

  const handleSave = () => {
    if (isValid && validateInput(inputValue)) {
      onSave(inputValue.trim())
    }
  }

  const handleCancel = () => {
    setInputValue(value)
    setIsValid(true)
    onCancel()
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !multiline) {
      e.preventDefault()
      handleSave()
    } else if (e.key === 'Enter' && multiline && e.ctrlKey) {
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
    const InputComponent = multiline ? 'textarea' : 'input'
    const ref = multiline ? textareaRef : inputRef
    
    return (
      <div className={`flex items-start space-x-2 ${className}`}>
        <div className="flex-1">
          <InputComponent
            ref={ref}
            type={multiline ? undefined : "text"}
            value={inputValue}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            maxLength={maxLength}
            className={`w-full px-2 py-1 text-sm text-white bg-slate-700 border rounded resize-none ${
              isValid ? 'border-blue-500' : 'border-red-500'
            } focus:outline-none focus:ring-1 focus:ring-blue-500 ${
              multiline ? 'min-h-[60px]' : ''
            }`}
            onClick={(e) => e.stopPropagation()}
            rows={multiline ? 3 : undefined}
          />
          {maxLength && (
            <div className="text-xs text-white/60 mt-1">
              {inputValue.length}/{maxLength} characters
            </div>
          )}
        </div>
        
        <div className="flex flex-col space-y-1">
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
            title={multiline ? "Save (Ctrl+Enter)" : "Save (Enter)"}
          >
            <Check size={14} />
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation()
              handleCancel()
            }}
            className="p-1 text-red-400 hover:bg-red-400/20 rounded"
            title="Cancel (Escape)"
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
        disabled ? 'cursor-not-allowed opacity-50' : 'hover:bg-white/5 rounded px-1 -mx-1'
      }`}
      onClick={handleClick}
      title={disabled ? '' : 'Click to edit'}
    >
      <div className="flex items-start justify-between">
        <span className={multiline ? 'whitespace-pre-wrap' : 'truncate'}>
          {value || placeholder}
        </span>
        {!disabled && (
          <Edit3 
            size={12} 
            className="text-white/40 opacity-0 group-hover:opacity-100 transition-opacity ml-2 mt-1 flex-shrink-0" 
          />
        )}
      </div>
    </div>
  )
}

export default InlineTextEditor

