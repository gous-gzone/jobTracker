import React from 'react'
import './PlaceholderPage.css'

export const DigestPage: React.FC = () => {
  return (
    <div className="placeholder-page">
      <h1 className="placeholder-page__heading">Daily Digest</h1>
      <p className="placeholder-page__subtext">
        Your personalized job digest will be delivered daily at 9AM.
      </p>
    </div>
  )
}
