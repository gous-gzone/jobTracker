import React, { useState, useEffect } from 'react'
import { Button } from '../components'
import { testItems, getTestStatus, setTestStatus, getPassedCount, resetTestStatus } from '../utils/testChecklist'
import './TestChecklistPage.css'

export const TestChecklistPage: React.FC = () => {
  const [testStatus, setTestStatusState] = useState<Record<string, boolean>>({})
  const passedCount = getPassedCount()
  const totalCount = testItems.length

  useEffect(() => {
    setTestStatusState(getTestStatus())
  }, [])

  const handleToggle = (id: string) => {
    const newStatus = { ...testStatus, [id]: !testStatus[id] }
    setTestStatusState(newStatus)
    setTestStatus(newStatus)
  }

  const handleReset = () => {
    resetTestStatus()
    setTestStatusState({})
  }

  const allPassed = passedCount === totalCount

  return (
    <div className="test-checklist">
      <div className="test-checklist__header">
        <h1 className="test-checklist__heading">Test Checklist</h1>
        <p className="test-checklist__subtext">
          Verify all features before shipping.
        </p>
      </div>

      <div className={`test-checklist__summary ${allPassed ? 'test-checklist__summary--success' : 'test-checklist__summary--warning'}`}>
        <div className="test-checklist__count">
          Tests Passed: {passedCount} / {totalCount}
        </div>
        {!allPassed && (
          <div className="test-checklist__warning">
            Resolve all issues before shipping.
          </div>
        )}
        {allPassed && (
          <div className="test-checklist__success">
            All tests passed! Ready to ship.
          </div>
        )}
      </div>

      <div className="test-checklist__list">
        {testItems.map(item => (
          <div key={item.id} className="test-checklist__item">
            <input
              type="checkbox"
              className="test-checklist__checkbox"
              checked={testStatus[item.id] || false}
              onChange={() => handleToggle(item.id)}
              id={item.id}
            />
            <div className="test-checklist__content">
              <label htmlFor={item.id} className="test-checklist__label">
                {item.label}
              </label>
              <div className="test-checklist__how-to">
                How to test: {item.howToTest}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="test-checklist__actions">
        <Button variant="secondary" onClick={handleReset}>
          Reset Test Status
        </Button>
      </div>
    </div>
  )
}
