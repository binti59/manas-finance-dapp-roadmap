import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ArrowLeft, FileText } from 'lucide-react'
import { useContent } from '../contexts/ContentContext'
import { downloadWhitepaperPDF } from '../utils/pdfGenerator'
import EnhancedAdminPanel from './EnhancedAdminPanel'

const EditableTechnicalWhitepaper = () => {
  const { content } = useContent()
  const whitepaperContent = content.technicalWhitepaper

  const handleDownloadPDF = () => {
    const success = downloadWhitepaperPDF(whitepaperContent)
    if (!success) {
      alert('Error generating PDF. Please try again.')
    }
  }

  return (
    <div className="min-h-screen px-4 py-8 relative">
      <EnhancedAdminPanel />
      
      {/* Back Button */}
      <div className="max-w-6xl mx-auto mb-8">
        <Link to="/">
          <Button className="bg-slate-700 hover:bg-slate-600 text-white">
            <ArrowLeft className="mr-2" size={20} />
            Back to Home
          </Button>
        </Link>
      </div>

      {/* Header */}
      <div className="max-w-6xl mx-auto text-center mb-12">
        <div className="flex items-center justify-center mb-6">
          <FileText className="text-orange-400 mr-4" size={48} />
          <h1 className="text-5xl md:text-6xl font-bold text-orange-400">
            {whitepaperContent?.title || 'Technical Whitepaper'}
          </h1>
        </div>
        <p className="text-xl md:text-2xl text-white/80 max-w-4xl mx-auto">
          {whitepaperContent?.subtitle || 'Xandeum Finance: Decentralized Personal Finance Management'}
        </p>
      </div>

      {/* Content Sections */}
      <div className="max-w-6xl mx-auto space-y-8">
        {whitepaperContent?.sections?.map((section, index) => (
          <div key={section.id} className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-8 border-l-4 border-l-orange-500">
            <h2 className="text-3xl font-semibold text-orange-400 mb-6">
              {section.title}
            </h2>
            <div className="text-white/90 space-y-4 leading-relaxed">
              {section.content.split('\n\n').map((paragraph, pIndex) => (
                <p key={pIndex}>{paragraph}</p>
              ))}
            </div>
          </div>
        ))}

        {/* Document Sections Info */}
        <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-8 border-l-4 border-l-cyan-500">
          <h2 className="text-3xl font-semibold text-cyan-400 mb-6">Document Sections</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-slate-900/50 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-cyan-300 mb-4">Core Architecture:</h3>
              <ul className="text-white/80 space-y-2">
                <li>• Storage Abstraction Layer</li>
                <li>• Financial Processing Engine</li>
                <li>• Business Logic Layer</li>
                <li>• User Interface Layer</li>
              </ul>
            </div>
            
            <div className="bg-slate-900/50 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-green-300 mb-4">Key Features:</h3>
              <ul className="text-white/80 space-y-2">
                <li>• Real-time Data Aggregation</li>
                <li>• AI-Powered Analytics</li>
                <li>• Smart Contract Automation</li>
                <li>• Decentralized Identity</li>
              </ul>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-white/60 mb-4">Last updated: 2025-08-03 • {whitepaperContent?.sections?.length || 0} sections</p>
            <Button 
              onClick={handleDownloadPDF}
              className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 text-lg"
            >
              <FileText className="mr-2" size={20} />
              Download Whitepaper (PDF)
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditableTechnicalWhitepaper

