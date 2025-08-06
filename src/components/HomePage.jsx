import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { FileText, Building, Zap, DollarSign, Map, ExternalLink } from 'lucide-react'

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      {/* Header */}
      <h1 className="text-5xl md:text-6xl font-bold text-orange-400 mb-8 leading-tight">
        Xandeum Finance DApp – Your Personal Financial OS
      </h1>
      
      {/* Subtext */}
      <p className="text-xl md:text-2xl text-white/80 mb-16 max-w-4xl leading-relaxed">
        Learn more about our vision for revolutionizing personal finance with Xandeum's storage capabilities.
      </p>
      
      {/* Navigation Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-3 max-w-5xl w-full">
        {/* Technical Whitepaper */}
        <Link to="/technical-whitepaper">
          <Button className="w-full h-16 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
            <div className="flex items-center space-x-2">
              <FileText size={20} />
              <span>Technical Whitepaper</span>
            </div>
          </Button>
        </Link>
        
        {/* Architecture Overview */}
        <Link to="/architecture-overview">
          <Button className="w-full h-16 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
            <div className="flex items-center space-x-2">
              <Building size={20} />
              <span>Architecture Overview</span>
            </div>
          </Button>
        </Link>
        
        {/* Xandeum Integration */}
        <Link to="/xandeum-integration">
          <Button className="w-full h-16 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
            <div className="flex items-center space-x-2">
              <Zap size={20} />
              <span>Xandeum Integration</span>
            </div>
          </Button>
        </Link>
        
        {/* Financial Features */}
        <Link to="/financial-features">
          <Button className="w-full h-16 bg-orange-600 hover:bg-orange-700 text-white text-sm font-medium rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
            <div className="flex items-center space-x-2">
              <DollarSign size={20} />
              <span>Financial Features</span>
            </div>
          </Button>
        </Link>
      </div>
      
      {/* Development Roadmap and Demo - Two column layout */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl w-full">
        {/* Development Roadmap */}
        <Link to="/roadmap">
          <Button className="w-full h-16 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white text-sm font-medium rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
            <div className="flex items-center space-x-2">
              <Map size={20} />
              <span>Development Roadmap</span>
            </div>
          </Button>
        </Link>
        
        {/* Live Demo */}
        <a href="https://pcrckhvz.manus.space/" target="_blank" rel="noopener noreferrer">
          <Button className="w-full h-16 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white text-sm font-medium rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
            <div className="flex items-center space-x-2">
              <ExternalLink size={20} />
              <span>Live Demo</span>
            </div>
          </Button>
        </a>
      </div>
    </div>
  )
}

export default HomePage

