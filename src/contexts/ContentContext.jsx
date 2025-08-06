import React, { createContext, useContext, useState, useEffect } from 'react'

const ContentContext = createContext()

export const useContent = () => {
  const context = useContext(ContentContext)
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider')
  }
  return context
}

const defaultContent = {
  technicalWhitepaper: {
    title: "Technical Whitepaper",
    subtitle: "Xandeum Finance: Decentralized Personal Finance Management",
    sections: [
      {
        id: "executive-summary",
        title: "Executive Summary",
        content: `Xandeum Finance represents a paradigm shift in personal financial management, leveraging Xandeum's revolutionary storage layer to create the first truly decentralized, comprehensive financial platform. Unlike traditional financial applications that rely on centralized databases and limited storage capacity, Xandeum Finance harnesses the power of exabyte-scale storage, smart contract native architecture, and random access capabilities to deliver unprecedented financial insights and automation.

The platform addresses critical limitations in current personal finance solutions: data silos, limited historical analysis, security vulnerabilities, and lack of true user ownership. By building on Xandeum's storage trilemma solution, we enable users to maintain complete control over their financial data while accessing sophisticated analytics previously available only to institutional investors.

Key innovations include real-time cross-platform data aggregation, AI-powered predictive analytics with unlimited historical context, automated financial rule execution through smart contracts, and decentralized identity management. The system supports comprehensive portfolio tracking across traditional investments, cryptocurrencies, real estate, and alternative assets, providing a unified view of net worth and financial health.`
      },
      {
        id: "technical-architecture",
        title: "Technical Architecture",
        content: `Our technical architecture implements a four-layer approach: the Storage Abstraction Layer interfaces with Xandeum's decentralized storage, the Financial Processing Engine handles data ingestion and analysis, the Business Logic Layer manages financial algorithms and smart contracts, and the User Interface Layer provides intuitive access to complex financial insights. This design ensures scalability, security, and user experience excellence while maintaining full decentralization.`
      }
    ]
  },
  architectureOverview: {
    title: "Architecture Overview",
    subtitle: "System Design and Component Interactions",
    sections: [
      {
        id: "system-architecture",
        title: "System Architecture",
        content: `Xandeum Finance employs a microservices architecture optimized for scalability, maintainability, and performance. The system is designed to handle millions of users while maintaining sub-second response times for complex financial queries.

The architecture follows domain-driven design principles, with clear boundaries between financial data management, user authentication, portfolio analysis, and external integrations. Each service operates independently while communicating through well-defined APIs and event streams.

Core services include the User Management Service for authentication and profile management, the Data Ingestion Service for connecting to external financial institutions, the Transaction Processing Service for data normalization and categorization, the Portfolio Analytics Service for investment analysis, and the Notification Service for real-time updates.`
      },
      {
        id: "deployment-scalability",
        title: "Deployment & Scalability",
        content: `Deployment utilizes containerized services with orchestration through Kubernetes, enabling automatic scaling, rolling updates, and fault tolerance. The infrastructure adapts to user demand while maintaining cost efficiency and system reliability.`
      }
    ]
  },
  xandeumIntegration: {
    title: "Xandeum Integration",
    subtitle: "Leveraging Decentralized Storage Capabilities",
    sections: [
      {
        id: "storage-layer-integration",
        title: "Storage Layer Integration",
        content: `Xandeum Finance's integration with Xandeum's storage layer represents the core innovation that enables unprecedented capabilities in personal finance management. The integration leverages Xandeum's unique architecture to solve fundamental limitations in traditional financial applications.

The Storage Abstraction Layer provides a unified interface to Xandeum's decentralized storage network while abstracting the underlying blockchain complexity from application components. This layer handles data encryption, distribution across pNodes, and retrieval optimization while maintaining compatibility with existing application architectures.

Data distribution utilizes Xandeum's pNode network to ensure high availability and fault tolerance. Financial data is automatically replicated across multiple geographic regions with cryptographic verification ensuring data integrity. The system can continue operating even if individual pNodes become unavailable.`
      },
      {
        id: "encryption-privacy",
        title: "Encryption & Privacy",
        content: `Encryption implementation uses client-side encryption with user-controlled keys, ensuring that financial data remains private even from platform operators. The encryption layer integrates seamlessly with Xandeum's storage protocols while maintaining optimal performance for real-time operations.`
      },
      {
        id: "caching-performance",
        title: "Caching & Performance",
        content: `Caching strategies optimize performance by maintaining frequently accessed data in high-speed local storage while leveraging Xandeum's random access capabilities for comprehensive historical queries. The system intelligently prefetches data based on user behavior patterns and analytical requirements.

Data lifecycle management implements automated policies for data retention, archival, and deletion based on user preferences and regulatory requirements. The system can maintain decades of financial history while ensuring compliance with privacy regulations.`
      }
    ]
  },
  financialFeatures: {
    title: "Financial Features",
    subtitle: "Comprehensive Personal Finance Management Capabilities",
    sections: [
      {
        id: "account-aggregation",
        title: "Account Aggregation",
        content: `Xandeum Finance provides comprehensive account aggregation that connects all financial accounts into a unified dashboard, enabling complete visibility across traditional banking, investment accounts, cryptocurrency holdings, and alternative assets.

Bank account integration supports checking, savings, money market, and certificate of deposit accounts from thousands of financial institutions worldwide. The platform utilizes Open Banking APIs, direct bank connections, and aggregation services to ensure reliable data access while maintaining security and user privacy.

Investment account connectivity includes brokerage accounts, retirement accounts (401k, IRA, Roth IRA), pension plans, and employer-sponsored investment programs. The system tracks positions, performance, dividends, and tax implications across all investment vehicles.`
      },
      {
        id: "cryptocurrency-integration",
        title: "Cryptocurrency Integration",
        content: `Cryptocurrency integration supports major exchanges, DeFi protocols, and hardware wallets. The platform tracks cryptocurrency holdings, staking rewards, DeFi yield farming, and NFT collections while providing comprehensive tax reporting for digital asset transactions.`
      },
      {
        id: "real-estate-alternative",
        title: "Real Estate & Alternative Investments",
        content: `Real estate tracking includes primary residences, investment properties, REITs, and real estate crowdfunding platforms. The system monitors property values, rental income, expenses, and tax implications while providing comprehensive real estate portfolio analysis.

Alternative investment support includes commodities, precious metals, collectibles, private equity, and peer-to-peer lending platforms. Users can manually input or connect to supported platforms to track these non-traditional investments.`
      },
      {
        id: "advanced-analytics",
        title: "Advanced Analytics",
        content: `Comprehensive portfolio analysis with performance tracking, risk assessment, and automated rebalancing recommendations. AI-powered insights help optimize investment strategies and identify opportunities for improved financial health.`
      }
    ]
  }
}

export const ContentProvider = ({ children }) => {
  const [content, setContent] = useState(defaultContent)
  const [isAdmin, setIsAdmin] = useState(false)

  // Load content from localStorage on mount
  useEffect(() => {
    const savedContent = localStorage.getItem('xandeum-content')
    if (savedContent) {
      try {
        setContent(JSON.parse(savedContent))
      } catch (error) {
        console.error('Error loading saved content:', error)
      }
    }
  }, [])

  // Save content to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('xandeum-content', JSON.stringify(content))
  }, [content])

  const updateContent = (section, data) => {
    setContent(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        ...data
      }
    }))
  }

  const updateSection = (contentType, sectionId, data) => {
    setContent(prev => ({
      ...prev,
      [contentType]: {
        ...prev[contentType],
        sections: prev[contentType].sections.map(section =>
          section.id === sectionId ? { ...section, ...data } : section
        )
      }
    }))
  }

  const addSection = (contentType, section) => {
    setContent(prev => ({
      ...prev,
      [contentType]: {
        ...prev[contentType],
        sections: [...prev[contentType].sections, section]
      }
    }))
  }

  const deleteSection = (contentType, sectionId) => {
    setContent(prev => ({
      ...prev,
      [contentType]: {
        ...prev[contentType],
        sections: prev[contentType].sections.filter(section => section.id !== sectionId)
      }
    }))
  }

  const resetContent = () => {
    setContent(defaultContent)
    localStorage.removeItem('xandeum-content')
  }

  const exportContent = () => {
    const dataStr = JSON.stringify(content, null, 2)
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
    
    const exportFileDefaultName = 'xandeum-content-export.json'
    
    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', exportFileDefaultName)
    linkElement.click()
  }

  const importContent = (jsonData) => {
    try {
      const importedContent = JSON.parse(jsonData)
      setContent(importedContent)
      return true
    } catch (error) {
      console.error('Error importing content:', error)
      return false
    }
  }

  const value = {
    content,
    isAdmin,
    setIsAdmin,
    updateContent,
    updateSection,
    addSection,
    deleteSection,
    resetContent,
    exportContent,
    importContent
  }

  return (
    <ContentContext.Provider value={value}>
      {children}
    </ContentContext.Provider>
  )
}

export default ContentProvider

