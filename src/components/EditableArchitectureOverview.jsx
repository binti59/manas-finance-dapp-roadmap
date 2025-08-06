import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Settings } from 'lucide-react'
import { useContent } from '../contexts/ContentContext'
import EnhancedAdminPanel from './EnhancedAdminPanel'

const EditableArchitectureOverview = () => {
  const { content } = useContent()
  const architectureContent = content.architectureOverview

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
          <Settings className="text-cyan-400 mr-4" size={48} />
          <h1 className="text-5xl md:text-6xl font-bold text-cyan-400">
            {architectureContent?.title || 'Architecture Overview'}
          </h1>
        </div>
        <p className="text-xl md:text-2xl text-white/80 max-w-4xl mx-auto">
          {architectureContent?.subtitle || 'System Design and Component Interactions'}
        </p>
      </div>

      {/* Content Sections */}
      <div className="max-w-6xl mx-auto space-y-8">
        {architectureContent?.sections?.map((section, index) => (
          <div key={section.id} className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-8 mb-8 border-l-4 border-l-cyan-500">
            <h2 className="text-3xl font-semibold text-cyan-400 mb-6">
              {section.title}
            </h2>
            <div className="text-white/90 space-y-4 leading-relaxed">
              {section.content.split('\n\n').map((paragraph, pIndex) => (
                <p key={pIndex}>{paragraph}</p>
              ))}
            </div>
          </div>
        ))}
        
        {/* Architecture Diagrams */}
        <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-8 mb-8 border-l-4 border-l-cyan-500">
          <h2 className="text-3xl font-semibold text-cyan-400 mb-6">System Architecture Diagram</h2>
          <div className="text-white/90 space-y-4 leading-relaxed mb-6">
            <p>
              The following diagram illustrates the four-layer architecture of Xandeum Finance, showing how 
              each layer interacts to provide a comprehensive financial management platform.
            </p>
          </div>
          <div className="bg-slate-900/50 rounded-xl p-4 mb-4">
            <img 
              src="/system-architecture-diagram.png" 
              alt="Xandeum Finance System Architecture Diagram" 
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
        
        <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-8 mb-8 border-l-4 border-l-orange-500">
          <h2 className="text-3xl font-semibold text-orange-400 mb-6">Data Flow Architecture</h2>
          <div className="text-white/90 space-y-4 leading-relaxed mb-6">
            <p>
              This diagram shows the complete data flow from user interaction through processing to storage, 
              demonstrating how financial data moves through the system securely and efficiently.
            </p>
          </div>
          <div className="bg-slate-900/50 rounded-xl p-4 mb-4">
            <img 
              src="/data-flow-diagram.png" 
              alt="Xandeum Finance Data Flow Diagram" 
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
        
        <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-8 mb-8 border-l-4 border-l-green-500">
          <h2 className="text-3xl font-semibold text-green-400 mb-6">Xandeum Storage Integration</h2>
          <div className="text-white/90 space-y-4 leading-relaxed mb-6">
            <p>
              The integration diagram below shows how Xandeum Finance leverages the Xandeum storage network 
              for decentralized, secure, and scalable data management across globally distributed pNodes.
            </p>
          </div>
          <div className="bg-slate-900/50 rounded-xl p-4 mb-4">
            <img 
              src="/xandeum-integration-diagram.png" 
              alt="Xandeum Storage Integration Diagram" 
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
        
        {/* Four Layer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border-l-4 border-l-orange-500">
            <h3 className="text-2xl font-semibold text-orange-400 mb-4">Data Layer</h3>
            <p className="text-white/80">
              Distributed data management with Xandeum's decentralized storage, ensuring high availability and 
              fault tolerance across multiple geographic regions.
            </p>
          </div>
          
          <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border-l-4 border-l-green-500">
            <h3 className="text-2xl font-semibold text-green-400 mb-4">Processing Layer</h3>
            <p className="text-white/80">
              High-performance transaction processing with smart contract execution, enabling automated 
              financial rules and real-time analytics.
            </p>
          </div>
          
          <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border-l-4 border-l-purple-500">
            <h3 className="text-2xl font-semibold text-purple-400 mb-4">Security Layer</h3>
            <p className="text-white/80">
              Multi-layered security framework with client-side encryption, smart contract audits, and 
              comprehensive threat monitoring.
            </p>
          </div>
          
          <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border-l-4 border-l-blue-500">
            <h3 className="text-2xl font-semibold text-blue-400 mb-4">Interface Layer</h3>
            <p className="text-white/80">
              Modern React-based user interface with responsive design, real-time updates, and intuitive 
              access to complex financial insights.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center py-8">
          <p className="text-white/60">Last updated: 2025-08-03 • {architectureContent?.sections?.length || 0} sections</p>
        </div>
      </div>
    </div>
  )
}

export default EditableArchitectureOverview

