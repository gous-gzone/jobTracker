import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components'
import './LandingPage.css'

export const LandingPage: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className="landing">
      <div className="landing__content">
        <h1 className="landing__headline">Stop Missing The Right Jobs.</h1>
        <p className="landing__subtext">
          Precision-matched job discovery delivered daily at 9AM.
        </p>
        <Button 
          variant="primary" 
          onClick={() => navigate('/settings')}
          className="landing__cta"
        >
          Start Tracking
        </Button>
      </div>
    </div>
  )
}
