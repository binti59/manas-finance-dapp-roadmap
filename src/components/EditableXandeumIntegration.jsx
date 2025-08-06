import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Zap } from 'lucide-react'
import { useContent } from '../contexts/ContentContext'
import EnhancedAdminPanel from './EnhancedAdminPanel'

const EditableXandeumIntegration = () => {
  const { content } = useContent()
  const integrationContent = content.xandeumIntegration

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
          <Zap className="text-green-400 mr-4" size={48} />
          <h1 className="text-5xl md:text-6xl font-bold text-green-400">
            {integrationContent?.title || 'Xandeum Integration'}
          </h1>
        </div>
        <p className="text-xl md:text-2xl text-white/80 max-w-4xl mx-auto">
          {integrationContent?.subtitle || 'Leveraging Decentralized Storage Capabilities'}
        </p>
      </div>

      {/* Content Sections */}
      <div className="max-w-6xl mx-auto space-y-8">
        {integrationContent?.sections?.map((section, index) => (
          <div key={section.id} className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-8 border-l-4 border-l-green-500">
            <h2 className="text-3xl font-semibold text-green-400 mb-6">
              {section.title}
            </h2>
            <div className="text-white/90 space-y-4 leading-relaxed">
              {section.content.split('\n\n').map((paragraph, pIndex) => (
                <p key={pIndex}>{paragraph}</p>
              ))}
            </div>
          </div>
        ))}

        {/* Integration Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border-l-4 border-l-blue-500">
            <h3 className="text-2xl font-semibold text-blue-400 mb-4">Scalability</h3>
            <p className="text-white/80">
              Xandeum's exabyte-scale storage enables unlimited historical data retention and complex 
              analytics without performance degradation.
            </p>
          </div>
          
          <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border-l-4 border-l-purple-500">
            <h3 className="text-2xl font-semibold text-purple-400 mb-4">Security</h3>
            <p className="text-white/80">
              Client-side encryption with user-controlled keys ensures financial data remains private 
              and secure across the decentralized network.
            </p>
          </div>
          
          <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border-l-4 border-l-orange-500">
            <h3 className="text-2xl font-semibold text-orange-400 mb-4">Performance</h3>
            <p className="text-white/80">
              Random access capabilities and intelligent caching provide sub-second response times 
              for complex financial queries and analytics.
            </p>
          </div>
          
          <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border-l-4 border-l-cyan-500">
            <h3 className="text-2xl font-semibold text-cyan-400 mb-4">Decentralization</h3>
            <p className="text-white/80">
              True user ownership of financial data with no single point of failure or control, 
              enabling unprecedented privacy and autonomy.
            </p>
          </div>
        </div>

        {/* Technical Implementation */}
        <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-8 border-l-4 border-l-cyan-500">
          <h2 className="text-3xl font-semibold text-cyan-400 mb-6">Technical Implementation</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-900/50 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-cyan-300 mb-3">Storage Abstraction</h4>
              <p className="text-white/80 text-sm">
                Unified API layer that abstracts Xandeum's blockchain complexity while providing 
                seamless integration with existing application architectures.
              </p>
            </div>
            
            <div className="bg-slate-900/50 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-green-300 mb-3">pNode Network</h4>
              <p className="text-white/80 text-sm">
                Globally distributed storage nodes ensure high availability, fault tolerance, and 
                optimal performance across different geographic regions.
              </p>
            </div>
            
            <div className="bg-slate-900/50 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-orange-300 mb-3">Smart Contracts</h4>
              <p className="text-white/80 text-sm">
                Native smart contract integration enables automated financial rules, compliance 
                monitoring, and programmable financial logic execution.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center py-8">
          <p className="text-white/60">Last updated: 2025-08-03 • {integrationContent?.sections?.length || 0} sections</p>
        </div>
      </div>
    </div>
  )
}

export default EditableXandeumIntegration

