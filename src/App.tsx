import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { PageLayout } from './layout/PageLayout'
import { LandingPage } from './pages/LandingPage'
import { DashboardPage } from './pages/DashboardPage'
import { SavedPage } from './pages/SavedPage'
import { DigestPage } from './pages/DigestPage'
import { SettingsPage } from './pages/SettingsPage'
import { ProofPage } from './pages/ProofPage'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <PageLayout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/saved" element={<SavedPage />} />
          <Route path="/digest" element={<DigestPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/proof" element={<ProofPage />} />
        </Routes>
      </PageLayout>
    </BrowserRouter>
  )
}

export default App
