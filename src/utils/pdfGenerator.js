// PDF Generation utility for MANAS Finance DApp Whitepaper
import { jsPDF } from 'jspdf'

export const generateWhitepaperPDF = (content) => {
  const doc = new jsPDF()
  
  // Set up document properties
  doc.setProperties({
    title: 'MANAS Finance DApp - Technical Whitepaper',
    subject: 'Decentralized Personal Finance Management',
    author: 'MANAS Finance Team',
    keywords: 'blockchain, finance, DApp, Xandeum',
    creator: 'MANAS Finance DApp'
  })
  
  // Page settings
  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  const margin = 20
  const maxWidth = pageWidth - (margin * 2)
  let yPosition = margin
  
  // Helper function to add new page if needed
  const checkPageBreak = (requiredHeight = 10) => {
    if (yPosition + requiredHeight > pageHeight - margin) {
      doc.addPage()
      yPosition = margin
    }
  }
  
  // Helper function to wrap text
  const addWrappedText = (text, fontSize = 12, fontStyle = 'normal') => {
    doc.setFontSize(fontSize)
    doc.setFont('helvetica', fontStyle)
    
    const lines = doc.splitTextToSize(text, maxWidth)
    const lineHeight = fontSize * 0.4
    
    checkPageBreak(lines.length * lineHeight)
    
    lines.forEach(line => {
      doc.text(line, margin, yPosition)
      yPosition += lineHeight
    })
    
    yPosition += 5 // Add some spacing after text block
  }
  
  // Title Page
  doc.setFontSize(24)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(247, 115, 22) // Orange color
  
  const title = content?.title || 'MANAS Finance DApp'
  const titleLines = doc.splitTextToSize(title, maxWidth)
  titleLines.forEach(line => {
    doc.text(line, margin, yPosition, { align: 'left' })
    yPosition += 12
  })
  
  yPosition += 10
  
  doc.setFontSize(18)
  doc.setTextColor(0, 0, 0) // Black color
  const subtitle = content?.subtitle || 'Technical Whitepaper - Decentralized Personal Finance Management'
  const subtitleLines = doc.splitTextToSize(subtitle, maxWidth)
  subtitleLines.forEach(line => {
    doc.text(line, margin, yPosition)
    yPosition += 8
  })
  
  yPosition += 20
  
  // Add date
  doc.setFontSize(12)
  doc.setFont('helvetica', 'normal')
  doc.text(`Generated: ${new Date().toLocaleDateString()}`, margin, yPosition)
  yPosition += 30
  
  // Add sections
  if (content?.sections && content.sections.length > 0) {
    content.sections.forEach((section, index) => {
      // Section title
      checkPageBreak(20)
      doc.setFontSize(16)
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(247, 115, 22) // Orange color
      doc.text(section.title, margin, yPosition)
      yPosition += 10
      
      // Section content
      doc.setTextColor(0, 0, 0) // Black color
      addWrappedText(section.content, 11, 'normal')
      
      yPosition += 10
    })
  } else {
    // Default content if no sections provided
    addWrappedText('Executive Summary', 16, 'bold')
    addWrappedText(`MANAS Finance represents a paradigm shift in personal financial management, leveraging Xandeum's revolutionary storage layer to create the first truly decentralized, comprehensive financial platform. Unlike traditional financial applications that rely on centralized databases and limited storage capacity, MANAS Finance harnesses the power of exabyte-scale storage, smart contract native architecture, and random access capabilities to deliver unprecedented financial insights and automation.

The platform addresses critical limitations in current personal finance solutions: data silos, limited historical analysis, security vulnerabilities, and lack of true user ownership. By building on Xandeum's storage trilemma solution, we enable users to maintain complete control over their financial data while accessing sophisticated analytics previously available only to institutional investors.`)
    
    addWrappedText('Technical Architecture', 16, 'bold')
    addWrappedText(`Our technical architecture implements a four-layer approach: the Storage Abstraction Layer interfaces with Xandeum's decentralized storage, the Financial Processing Engine handles data ingestion and analysis, the Business Logic Layer manages financial algorithms and smart contracts, and the User Interface Layer provides intuitive access to complex financial insights. This design ensures scalability, security, and user experience excellence while maintaining full decentralization.`)
  }
  
  // Footer on each page
  const totalPages = doc.internal.getNumberOfPages()
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i)
    doc.setFontSize(10)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(128, 128, 128) // Gray color
    doc.text(`MANAS Finance DApp - Technical Whitepaper`, margin, pageHeight - 10)
    doc.text(`Page ${i} of ${totalPages}`, pageWidth - margin - 30, pageHeight - 10)
  }
  
  return doc
}

export const downloadWhitepaperPDF = (content) => {
  try {
    const doc = generateWhitepaperPDF(content)
    const filename = `MANAS-Finance-Whitepaper-${new Date().toISOString().split('T')[0]}.pdf`
    doc.save(filename)
    return true
  } catch (error) {
    console.error('Error generating PDF:', error)
    return false
  }
}

