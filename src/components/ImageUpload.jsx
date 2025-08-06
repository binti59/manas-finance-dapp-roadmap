import React, { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Upload, X, Image as ImageIcon } from 'lucide-react'

const ImageUpload = ({ onImageUpload, currentImage, label = "Upload Image" }) => {
  const [dragActive, setDragActive] = useState(false)
  const [preview, setPreview] = useState(currentImage || null)
  const fileInputRef = useRef(null)

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleChange = (e) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handleFile = (file) => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const imageUrl = e.target.result
        setPreview(imageUrl)
        onImageUpload(imageUrl, file.name)
      }
      reader.readAsDataURL(file)
    } else {
      alert('Please select an image file (PNG, JPG, GIF, etc.)')
    }
  }

  const removeImage = () => {
    setPreview(null)
    onImageUpload(null, null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const openFileDialog = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-white mb-2">
        {label}
      </label>
      
      {preview ? (
        <div className="relative">
          <div className="bg-slate-800 rounded-lg p-4 border border-slate-600">
            <img 
              src={preview} 
              alt="Preview" 
              className="max-w-full h-auto max-h-48 rounded-lg mx-auto"
            />
            <div className="flex justify-between items-center mt-3">
              <span className="text-sm text-white/70">Image uploaded</span>
              <Button
                onClick={removeImage}
                variant="destructive"
                size="sm"
                className="bg-red-600 hover:bg-red-700"
              >
                <X size={16} className="mr-1" />
                Remove
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div
          className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
            dragActive 
              ? 'border-orange-400 bg-orange-400/10' 
              : 'border-slate-600 hover:border-slate-500'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          
          <div className="space-y-3">
            <div className="mx-auto w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center">
              <ImageIcon className="w-6 h-6 text-slate-400" />
            </div>
            
            <div>
              <p className="text-white font-medium">
                Drop an image here, or{' '}
                <button
                  type="button"
                  onClick={openFileDialog}
                  className="text-orange-400 hover:text-orange-300 underline"
                >
                  browse
                </button>
              </p>
              <p className="text-sm text-slate-400 mt-1">
                PNG, JPG, GIF up to 10MB
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ImageUpload

