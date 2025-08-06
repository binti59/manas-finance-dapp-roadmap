import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ArrowLeft, DollarSign } from 'lucide-react'
import { useContent } from '../contexts/ContentContext'
import EnhancedAdminPanel from './EnhancedAdminPanel'

const EditableFinancialFeatures = () => {
  const { content } = useContent()
  const featuresContent = content.financialFeatures

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
          <DollarSign className="text-orange-400 mr-4" size={48} />
          <h1 className="text-5xl md:text-6xl font-bold text-orange-400">
            {featuresContent?.title || 'Financial Features'}
          </h1>
        </div>
        <p className="text-xl md:text-2xl text-white/80 max-w-4xl mx-auto">
          {featuresContent?.subtitle || 'Comprehensive Personal Finance Management Capabilities'}
        </p>
      </div>

      {/* Content Sections */}
      <div className="max-w-6xl mx-auto space-y-8">
        {featuresContent?.sections?.map((section, index) => (
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

        {/* Feature Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border-l-4 border-l-blue-500">
            <h3 className="text-2xl font-semibold text-blue-400 mb-4">Bank Integration</h3>
            <p className="text-white/80 mb-4">
              Connect checking, savings, money market, and CD accounts from thousands of financial 
              institutions worldwide using Open Banking APIs and secure connections.
            </p>
          </div>
          
          <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border-l-4 border-l-green-500">
            <h3 className="text-2xl font-semibold text-green-400 mb-4">Investment Tracking</h3>
            <p className="text-white/80 mb-4">
              Track brokerage accounts, retirement accounts (401k, IRA, Roth IRA), pension plans, and 
              employer-sponsored investment programs with full performance analysis.
            </p>
          </div>
          
          <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border-l-4 border-l-purple-500">
            <h3 className="text-2xl font-semibold text-purple-400 mb-4">Cryptocurrency Support</h3>
            <p className="text-white/80 mb-4">
              Integration with major exchanges, DeFi protocols, and hardware wallets. Track holdings, 
              staking rewards, yield farming, and NFT collections with comprehensive tax reporting.
            </p>
          </div>
          
          <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-6 border-l-4 border-l-cyan-500">
            <h3 className="text-2xl font-semibold text-cyan-400 mb-4">Real Estate Tracking</h3>
            <p className="text-white/80 mb-4">
              Monitor primary residences, investment properties, REITs, and real estate crowdfunding 
              platforms with property values, rental income, and expense tracking.
            </p>
          </div>
        </div>

        {/* Advanced Features */}
        <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-8 border-l-4 border-l-purple-500">
          <h2 className="text-3xl font-semibold text-purple-400 mb-6">Advanced Analytics & AI</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-900/50 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-purple-300 mb-3">Portfolio Analysis</h4>
              <p className="text-white/80 text-sm">
                Comprehensive performance tracking, risk assessment, and automated rebalancing 
                recommendations across all asset classes.
              </p>
            </div>
            
            <div className="bg-slate-900/50 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-blue-300 mb-3">Predictive Insights</h4>
              <p className="text-white/80 text-sm">
                AI-powered financial forecasting and trend analysis to help optimize investment 
                strategies and identify growth opportunities.
              </p>
            </div>
            
            <div className="bg-slate-900/50 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-green-300 mb-3">Smart Automation</h4>
              <p className="text-white/80 text-sm">
                Automated savings rules, bill payments, and investment contributions based on 
                personalized financial goals and spending patterns.
              </p>
            </div>
          </div>
        </div>

        {/* Financial Health Metrics */}
        <div className="bg-slate-800/60 backdrop-blur-sm rounded-2xl p-8 border-l-4 border-l-green-500">
          <h2 className="text-3xl font-semibold text-green-400 mb-6">Financial Health Dashboard</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-slate-900/50 rounded-xl p-4 text-center">
              <h4 className="text-lg font-semibold text-green-300 mb-2">Net Worth</h4>
              <p className="text-white/80 text-sm">Real-time calculation across all assets and liabilities</p>
            </div>
            
            <div className="bg-slate-900/50 rounded-xl p-4 text-center">
              <h4 className="text-lg font-semibold text-blue-300 mb-2">Cash Flow</h4>
              <p className="text-white/80 text-sm">Monthly income vs expenses with trend analysis</p>
            </div>
            
            <div className="bg-slate-900/50 rounded-xl p-4 text-center">
              <h4 className="text-lg font-semibold text-purple-300 mb-2">Investment ROI</h4>
              <p className="text-white/80 text-sm">Portfolio performance with benchmark comparisons</p>
            </div>
            
            <div className="bg-slate-900/50 rounded-xl p-4 text-center">
              <h4 className="text-lg font-semibold text-orange-300 mb-2">Financial Score</h4>
              <p className="text-white/80 text-sm">Overall financial health rating and recommendations</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center py-8">
          <p className="text-white/60">Last updated: 2025-08-03 • {featuresContent?.sections?.length || 0} sections</p>
        </div>
      </div>
    </div>
  )
}

export default EditableFinancialFeatures

