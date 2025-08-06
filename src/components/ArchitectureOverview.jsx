import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Settings, Database, Shield, Cpu } from 'lucide-react'

const ArchitectureOverview = () => {
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
            <Settings className="text-blue-400 mr-3" size={48} />
            <h1 className="text-5xl md:text-6xl font-bold text-blue-400">
              Architecture Overview
            </h1>
          </div>
          
          <p className="text-xl text-white/80 leading-relaxed">
            System Design and Component Interactions
          </p>
        </div>
        
        <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-8 mb-8 border-l-4 border-l-blue-500">
          <h2 className="text-3xl font-semibold text-blue-400 mb-6">System Architecture</h2>
          <div className="text-white/90 space-y-4 leading-relaxed">
            <p>
              Xandeum Finance employs a microservices architecture optimized for scalability, maintainability, 
              and performance. The system is designed to handle millions of users while maintaining sub-second 
              response times for complex financial queries.
            </p>
            
            <p>
              The architecture follows domain-driven design principles, with clear boundaries between financial 
              data management, user authentication, portfolio analysis, and external integrations. Each service 
              operates independently while communicating through well-defined APIs and event streams.
            </p>
            
            <p>
              Core services include the User Management Service for authentication and profile management, the 
              Data Ingestion Service for connecting to external financial institutions, the Transaction Processing 
              Service for data normalization and categorization, the Portfolio Analytics Service for investment 
              analysis, and the Notification Service for real-time updates.
            </p>
          </div>
        </div>
        
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border-l-4 border-l-orange-500">
            <div className="flex items-center mb-4">
              <Database className="text-orange-400 mr-3" size={32} />
              <h3 className="text-xl font-semibold text-orange-400">Data Layer</h3>
            </div>
            <p className="text-white/80 text-sm leading-relaxed">
              Distributed data management with Xandeum's decentralized storage, ensuring high availability 
              and fault tolerance across multiple geographic regions.
            </p>
          </div>
          
          <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border-l-4 border-l-green-500">
            <div className="flex items-center mb-4">
              <Cpu className="text-green-400 mr-3" size={32} />
              <h3 className="text-xl font-semibold text-green-400">Processing Layer</h3>
            </div>
            <p className="text-white/80 text-sm leading-relaxed">
              High-performance transaction processing with smart contract execution, enabling automated 
              financial rules and real-time analytics.
            </p>
          </div>
          
          <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border-l-4 border-l-purple-500">
            <div className="flex items-center mb-4">
              <Shield className="text-purple-400 mr-3" size={32} />
              <h3 className="text-xl font-semibold text-purple-400">Security Layer</h3>
            </div>
            <p className="text-white/80 text-sm leading-relaxed">
              Multi-layered security framework with client-side encryption, smart contract audits, 
              and comprehensive threat monitoring.
            </p>
          </div>
          
          <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border-l-4 border-l-blue-500">
            <div className="flex items-center mb-4">
              <Settings className="text-blue-400 mr-3" size={32} />
              <h3 className="text-xl font-semibold text-blue-400">Interface Layer</h3>
            </div>
            <p className="text-white/80 text-sm leading-relaxed">
              Modern React-based user interface with responsive design, real-time updates, and 
              intuitive access to complex financial insights.
            </p>
          </div>
        </div>
        
        <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-8 mb-8 border-l-4 border-l-red-500">
          <h2 className="text-3xl font-semibold text-red-400 mb-6">Deployment & Scalability</h2>
          <div className="text-white/90 space-y-4 leading-relaxed">
            <p>
              Deployment utilizes containerized services with orchestration through Kubernetes, enabling 
              automatic scaling, rolling updates, and fault tolerance. The infrastructure adapts to user 
              demand while maintaining cost efficiency and system reliability.
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

export default ArchitectureOverview

