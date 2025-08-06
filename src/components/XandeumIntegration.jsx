import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Box, Lock, Zap, Cloud, HardDrive, RefreshCw } from 'lucide-react'

const XandeumIntegration = () => {
  return (
    <div className="min-h-screen px-4 py-8">
      {/* Navigation */}
      <div className="max-w-6xl mx-auto mb-8">
        <Link to="/">
          <Button variant="outline" className="text-white border-white/20 hover:bg-white/10">
            <ArrowLeft className="mr-2" size={16} />
            Back to Home
          </Button>
        </Link>
      </div>
      
      {/* Content */}
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Box className="text-green-400 mr-3" size={48} />
            <h1 className="text-5xl md:text-6xl font-bold text-green-400">
              Xandeum Integration
            </h1>
          </div>
          
          <p className="text-xl text-white/80 leading-relaxed">
            Leveraging Decentralized Storage Capabilities
          </p>
        </div>
        
        <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-8 mb-8 border-l-4 border-l-green-500">
          <h2 className="text-3xl font-semibold text-green-400 mb-6">Storage Layer Integration</h2>
          <div className="text-white/90 space-y-4 leading-relaxed">
            <p>
              Xandeum Finance's integration with Xandeum's storage layer represents the core innovation that 
              enables unprecedented capabilities in personal finance management. The integration leverages 
              Xandeum's unique architecture to solve fundamental limitations in traditional financial applications.
            </p>
            
            <p>
              The Storage Abstraction Layer provides a unified interface to Xandeum's decentralized storage 
              network while abstracting the underlying blockchain complexity from application components. This 
              layer handles data encryption, distribution across pNodes, and retrieval optimization while 
              maintaining compatibility with existing application architectures.
            </p>
            
            <p>
              Data distribution utilizes Xandeum's pNode network to ensure high availability and fault tolerance. 
              Financial data is automatically replicated across multiple geographic regions with cryptographic 
              verification ensuring data integrity. The system can continue operating even if individual pNodes 
              become unavailable.
            </p>
          </div>
        </div>
        
        <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-8 mb-8 border-l-4 border-l-purple-500">
          <h2 className="text-3xl font-semibold text-purple-400 mb-6">Encryption & Privacy</h2>
          <div className="text-white/90 space-y-4 leading-relaxed">
            <p>
              Encryption implementation uses client-side encryption with user-controlled keys, ensuring that 
              financial data remains private even from platform operators. The encryption layer integrates 
              seamlessly with Xandeum's storage protocols while maintaining optimal performance for real-time 
              operations.
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border-l-4 border-l-cyan-500">
            <div className="flex items-center mb-4">
              <Cloud className="text-cyan-400 mr-3" size={32} />
              <h3 className="text-xl font-semibold text-cyan-400">Distributed Storage</h3>
            </div>
            <p className="text-white/80 text-sm leading-relaxed">
              Automatic data replication across multiple geographic regions with cryptographic verification 
              ensuring data integrity and high availability.
            </p>
          </div>
          
          <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border-l-4 border-l-orange-500">
            <div className="flex items-center mb-4">
              <Zap className="text-orange-400 mr-3" size={32} />
              <h3 className="text-xl font-semibold text-orange-400">Performance Optimization</h3>
            </div>
            <p className="text-white/80 text-sm leading-relaxed">
              Intelligent caching strategies and prefetching based on user behavior patterns for 
              optimal performance in real-time operations.
            </p>
          </div>
          
          <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border-l-4 border-l-red-500">
            <div className="flex items-center mb-4">
              <Lock className="text-red-400 mr-3" size={32} />
              <h3 className="text-xl font-semibold text-red-400">Client-Side Encryption</h3>
            </div>
            <p className="text-white/80 text-sm leading-relaxed">
              User-controlled encryption keys ensure financial data remains private even from 
              platform operators while maintaining seamless integration.
            </p>
          </div>
          
          <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border-l-4 border-l-blue-500">
            <div className="flex items-center mb-4">
              <RefreshCw className="text-blue-400 mr-3" size={32} />
              <h3 className="text-xl font-semibold text-blue-400">Data Lifecycle Management</h3>
            </div>
            <p className="text-white/80 text-sm leading-relaxed">
              Automated policies for data retention, archival, and deletion based on user 
              preferences and regulatory requirements.
            </p>
          </div>
        </div>
        
        <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-8 mb-8 border-l-4 border-l-yellow-500">
          <h2 className="text-3xl font-semibold text-yellow-400 mb-6">Caching & Performance</h2>
          <div className="text-white/90 space-y-4 leading-relaxed">
            <p>
              Caching strategies optimize performance by maintaining frequently accessed data in high-speed local 
              storage while leveraging Xandeum's random access capabilities for comprehensive historical queries. 
              The system intelligently prefetches data based on user behavior patterns and analytical requirements.
            </p>
            
            <p>
              Data lifecycle management implements automated policies for data retention, archival, and deletion 
              based on user preferences and regulatory requirements. The system can maintain decades of financial 
              history while ensuring compliance with privacy regulations.
            </p>
          </div>
        </div>
        
        <div className="text-center">
          <p className="text-white/60 mb-4">Last updated: 2025-08-03 • 4 sections</p>
        </div>
      </div>
    </div>
  )
}

export default XandeumIntegration

