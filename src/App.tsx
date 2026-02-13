import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { PageLayout } from './layout/PageLayout'
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
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
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
