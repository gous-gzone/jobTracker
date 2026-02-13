import React from 'react'
import { Navigation } from '../components/Navigation'
import './PageLayout.css'

export interface PageLayoutProps {
  children: React.ReactNode
}

export const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <div className="page-layout">
      <Navigation />
      <main className="page-layout__content">
        {children}
      </main>
    </div>
  )
}
