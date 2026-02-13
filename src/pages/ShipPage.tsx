import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components'
import { allTestsPassed, getPassedCount, testItems } from '../utils/testChecklist'
import './ShipPage.css'

export const ShipPage: React.FC = () => {
  const navigate = useNavigate()
  const isUnlocked = allTestsPassed()
  const passedCount = getPassedCount()
  const totalCount = testItems.length

  if (!isUnlocked) {
    return (
      <div className="ship">
        <div className="ship__locked">
          <div className="ship__locked-icon">🔒</div>
          <h1 className="ship__heading">Ship Locked</h1>
          <p className="ship__locked-text">
            Complete all {totalCount} test checklist items to unlock shipping.
            <br />
            Currently passed: {passedCount} / {totalCount}
          </p>
          <Button variant="primary" onClick={() => navigate('/proof')}>
            Go to Test Checklist
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="ship">
      <div className="ship__unlocked">
        <div className="ship__unlocked-icon">🚀</div>
        <h1 className="ship__heading">Ready to Ship!</h1>
        <p className="ship__unlocked-text">
          All tests passed. Your Job Notification Tracker is ready for production.
        </p>
      </div>
    </div>
  )
}
