import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Download, FileText } from 'lucide-react'

const TechnicalWhitepaper = () => {
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
            <FileText className="text-orange-400 mr-3" size={48} />
            <h1 className="text-5xl md:text-6xl font-bold text-orange-400">
              Technical Whitepaper
            </h1>
          </div>
          
          <p className="text-xl text-white/80 leading-relaxed">
            Xandeum Finance: Decentralized Personal Finance Management
          </p>
        </div>
        
        <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-8 mb-8 border-l-4 border-l-orange-500">
          <h2 className="text-3xl font-semibold text-orange-400 mb-6">Executive Summary</h2>
          <div className="text-white/90 space-y-4 leading-relaxed">
            <p>
              Xandeum Finance represents a paradigm shift in personal financial management, leveraging 
              Xandeum's revolutionary storage layer to create the first truly decentralized, comprehensive 
              financial platform. Unlike traditional financial applications that rely on centralized 
              databases and limited storage capacity, Xandeum Finance harnesses the power of exabyte-scale 
              storage, smart contract native architecture, and random access capabilities to deliver 
              unprecedented financial insights and automation.
            </p>
            
            <p>
              The platform addresses critical limitations in current personal finance solutions: data silos, 
              limited historical analysis, security vulnerabilities, and lack of true user ownership. By 
              building on Xandeum's storage trilemma solution, we enable users to maintain complete control 
              over their financial data while accessing sophisticated analytics previously available only to 
              institutional investors.
            </p>
            
            <p>
              Key innovations include real-time cross-platform data aggregation, AI-powered predictive 
              analytics with unlimited historical context, automated financial rule execution through smart 
              contracts, and decentralized identity management. The system supports comprehensive portfolio 
              tracking across traditional investments, cryptocurrencies, real estate, and alternative assets, 
              providing a unified view of net worth and financial health.
            </p>
          </div>
        </div>
        
        <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-8 mb-8 border-l-4 border-l-purple-500">
          <h2 className="text-3xl font-semibold text-purple-400 mb-6">Technical Architecture</h2>
          <div className="text-white/90 space-y-4 leading-relaxed">
            <p>
              Our technical architecture implements a four-layer approach: the Storage Abstraction Layer 
              interfaces with Xandeum's decentralized storage, the Financial Processing Engine handles data 
              ingestion and analysis, the Business Logic Layer manages financial algorithms and smart contracts, 
              and the User Interface Layer provides intuitive access to complex financial insights. This design 
              ensures scalability, security, and user experience excellence while maintaining full decentralization.
            </p>
          </div>
        </div>
        
        <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-8 mb-8 border-l-4 border-l-cyan-500">
          <h2 className="text-2xl font-semibold text-white mb-4">Document Sections</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div>
              <h3 className="text-lg font-semibold text-cyan-400 mb-3">Core Architecture:</h3>
              <ul className="text-white/80 space-y-2">
                <li>• Storage Abstraction Layer</li>
                <li>• Financial Processing Engine</li>
                <li>• Business Logic Layer</li>
                <li>• User Interface Layer</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-green-400 mb-3">Key Features:</h3>
              <ul className="text-white/80 space-y-2">
                <li>• Real-time Data Aggregation</li>
                <li>• AI-Powered Analytics</li>
                <li>• Smart Contract Automation</li>
                <li>• Decentralized Identity</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="text-center">
          <p className="text-white/60 mb-4">Last updated: 2025-08-03 • 9 sections</p>
          <Button className="bg-orange-600 hover:bg-orange-700 text-white text-lg px-8 py-3 rounded-xl">
            <Download className="mr-2" size={20} />
            Download Whitepaper (PDF)
          </Button>
        </div>
      </div>
    </div>
  )
}

export default TechnicalWhitepaper

