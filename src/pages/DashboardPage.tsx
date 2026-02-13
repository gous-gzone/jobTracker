import React from 'react'
import './PlaceholderPage.css'

export const DashboardPage: React.FC = () => {
  return (
    <div className="placeholder-page">
      <h1 className="placeholder-page__heading">Dashboard</h1>
      <p className="placeholder-page__subtext">
        No jobs yet. In the next step, you will load a realistic dataset.
      </p>
    </div>
  )
}
