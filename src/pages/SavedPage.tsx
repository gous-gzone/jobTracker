import React from 'react'
import './PlaceholderPage.css'

export const SavedPage: React.FC = () => {
  return (
    <div className="placeholder-page">
      <h1 className="placeholder-page__heading">Saved Jobs</h1>
      <p className="placeholder-page__subtext">
        Your saved opportunities will appear here.
      </p>
    </div>
  )
}
