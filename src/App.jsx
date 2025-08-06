import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import HomePage from './components/HomePage'
import EditableTechnicalWhitepaper from './components/EditableTechnicalWhitepaper'
import EditableArchitectureOverview from './components/EditableArchitectureOverview'
import EditableXandeumIntegration from './components/EditableXandeumIntegration'
import EditableFinancialFeatures from './components/EditableFinancialFeatures'
import RoadmapPageUpdated from './components/RoadmapPageUpdated'
import ContentProvider from './contexts/ContentContext'

function App() {
  return (
    <ContentProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-purple-900">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/technical-whitepaper" element={<EditableTechnicalWhitepaper />} />
            <Route path="/architecture-overview" element={<EditableArchitectureOverview />} />
            <Route path="/xandeum-integration" element={<EditableXandeumIntegration />} />
            <Route path="/financial-features" element={<EditableFinancialFeatures />} />
            <Route path="/roadmap" element={<RoadmapPageUpdated />} />
          </Routes>
        </div>
      </Router>
    </ContentProvider>
  )
}

export default App

