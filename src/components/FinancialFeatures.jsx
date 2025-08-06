import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ArrowLeft, DollarSign, CreditCard, PieChart, Building, Coins, TrendingUp } from 'lucide-react'

const FinancialFeatures = () => {
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
            <DollarSign className="text-orange-400 mr-3" size={48} />
            <h1 className="text-5xl md:text-6xl font-bold text-orange-400">
              Financial Features
            </h1>
          </div>
          
          <p className="text-xl text-white/80 leading-relaxed">
            Comprehensive Personal Finance Management Capabilities
          </p>
        </div>
        
        <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-8 mb-8 border-l-4 border-l-orange-500">
          <h2 className="text-3xl font-semibold text-orange-400 mb-6">Account Aggregation</h2>
          <div className="text-white/90 space-y-4 leading-relaxed">
            <p>
              Xandeum Finance provides comprehensive account aggregation that connects all financial accounts 
              into a unified dashboard, enabling complete visibility across traditional banking, investment 
              accounts, cryptocurrency holdings, and alternative assets.
            </p>
            
            <p>
              Bank account integration supports checking, savings, money market, and certificate of deposit 
              accounts from thousands of financial institutions worldwide. The platform utilizes Open Banking 
              APIs, direct bank connections, and aggregation services to ensure reliable data access while 
              maintaining security and user privacy.
            </p>
            
            <p>
              Investment account connectivity includes brokerage accounts, retirement accounts (401k, IRA, Roth 
              IRA), pension plans, and employer-sponsored investment programs. The system tracks positions, 
              performance, dividends, and tax implications across all investment vehicles.
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border-l-4 border-l-blue-500">
            <div className="flex items-center mb-4">
              <CreditCard className="text-blue-400 mr-3" size={32} />
              <h3 className="text-xl font-semibold text-blue-400">Bank Integration</h3>
            </div>
            <p className="text-white/80 text-sm leading-relaxed">
              Connect checking, savings, money market, and CD accounts from thousands of financial 
              institutions worldwide using Open Banking APIs and secure connections.
            </p>
          </div>
          
          <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border-l-4 border-l-green-500">
            <div className="flex items-center mb-4">
              <PieChart className="text-green-400 mr-3" size={32} />
              <h3 className="text-xl font-semibold text-green-400">Investment Tracking</h3>
            </div>
            <p className="text-white/80 text-sm leading-relaxed">
              Track brokerage accounts, retirement accounts (401k, IRA, Roth IRA), pension plans, 
              and employer-sponsored investment programs with full performance analysis.
            </p>
          </div>
          
          <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border-l-4 border-l-purple-500">
            <div className="flex items-center mb-4">
              <Coins className="text-purple-400 mr-3" size={32} />
              <h3 className="text-xl font-semibold text-purple-400">Cryptocurrency Support</h3>
            </div>
            <p className="text-white/80 text-sm leading-relaxed">
              Integration with major exchanges, DeFi protocols, and hardware wallets. Track holdings, 
              staking rewards, yield farming, and NFT collections with comprehensive tax reporting.
            </p>
          </div>
          
          <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border-l-4 border-l-red-500">
            <div className="flex items-center mb-4">
              <Building className="text-red-400 mr-3" size={32} />
              <h3 className="text-xl font-semibold text-red-400">Real Estate Tracking</h3>
            </div>
            <p className="text-white/80 text-sm leading-relaxed">
              Monitor primary residences, investment properties, REITs, and real estate crowdfunding 
              platforms with property values, rental income, and expense tracking.
            </p>
          </div>
        </div>
        
        <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-8 mb-8 border-l-4 border-l-cyan-500">
          <h2 className="text-3xl font-semibold text-cyan-400 mb-6">Cryptocurrency Integration</h2>
          <div className="text-white/90 space-y-4 leading-relaxed">
            <p>
              Cryptocurrency integration supports major exchanges, DeFi protocols, and hardware wallets. The 
              platform tracks cryptocurrency holdings, staking rewards, DeFi yield farming, and NFT collections 
              while providing comprehensive tax reporting for digital asset transactions.
            </p>
          </div>
        </div>
        
        <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-8 mb-8 border-l-4 border-l-green-500">
          <h2 className="text-3xl font-semibold text-green-400 mb-6">Real Estate & Alternative Investments</h2>
          <div className="text-white/90 space-y-4 leading-relaxed">
            <p>
              Real estate tracking includes primary residences, investment properties, REITs, and real estate 
              crowdfunding platforms. The system monitors property values, rental income, expenses, and tax 
              implications while providing comprehensive real estate portfolio analysis.
            </p>
            
            <p>
              Alternative investment support includes commodities, precious metals, collectibles, private equity, 
              and peer-to-peer lending platforms. Users can manually input or connect to supported platforms to 
              track these non-traditional investments.
            </p>
          </div>
        </div>
        
        <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-8 mb-8 border-l-4 border-l-yellow-500">
          <div className="flex items-center mb-6">
            <TrendingUp className="text-yellow-400 mr-3" size={32} />
            <h2 className="text-3xl font-semibold text-yellow-400">Advanced Analytics</h2>
          </div>
          <div className="text-white/90 space-y-4 leading-relaxed">
            <p>
              Comprehensive portfolio analysis with performance tracking, risk assessment, and automated 
              rebalancing recommendations. AI-powered insights help optimize investment strategies and 
              identify opportunities for improved financial health.
            </p>
          </div>
        </div>
        
        <div className="text-center">
          <p className="text-white/60 mb-4">Last updated: 2025-08-03 • 6 sections</p>
        </div>
      </div>
    </div>
  )
}

export default FinancialFeatures

