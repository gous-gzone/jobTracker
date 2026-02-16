import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components'
import './PlaceholderPage.css'

export const ProofPage: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className="placeholder-page">
      <h1 className="placeholder-page__heading">Proof & Submission</h1>
      <p className="placeholder-page__subtext">
        Complete your final proof and submission.
      </p>
      <div style={{ marginTop: '24px' }}>
        <Button variant="primary" onClick={() => navigate('/jt/proof')}>
          Go to Final Proof Page
        </Button>
      </div>
    </div>
  )
}
