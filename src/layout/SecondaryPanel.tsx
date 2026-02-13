import React from 'react'
import { Card } from '../components/Card'
import { Button } from '../components/Button'
import { Textarea } from '../components/Textarea'
import './SecondaryPanel.css'

export interface SecondaryPanelProps {
  stepExplanation: string
  promptText: string
  onCopyPrompt?: () => void
  onBuildInLovable?: () => void
  onItWorked?: () => void
  onError?: () => void
  onAddScreenshot?: () => void
}

export const SecondaryPanel: React.FC<SecondaryPanelProps> = ({
  stepExplanation,
  promptText,
  onCopyPrompt,
  onBuildInLovable,
  onItWorked,
  onError,
  onAddScreenshot,
}) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(promptText)
    onCopyPrompt?.()
  }

  return (
    <div className="secondary-panel">
      <Card className="secondary-panel__card">
        <div className="secondary-panel__section">
          <h3 className="secondary-panel__title">Step Explanation</h3>
          <p className="secondary-panel__explanation">{stepExplanation}</p>
        </div>

        <div className="secondary-panel__section">
          <h3 className="secondary-panel__title">Copyable Prompt</h3>
          <Textarea
            value={promptText}
            readOnly
            className="secondary-panel__prompt"
          />
          <Button variant="secondary" onClick={handleCopy} className="secondary-panel__button">
            Copy
          </Button>
        </div>

        <div className="secondary-panel__actions">
          <Button variant="primary" onClick={onBuildInLovable} className="secondary-panel__button">
            Build in Lovable
          </Button>
          <Button variant="secondary" onClick={onItWorked} className="secondary-panel__button">
            It Worked
          </Button>
          <Button variant="secondary" onClick={onError} className="secondary-panel__button">
            Error
          </Button>
          <Button variant="secondary" onClick={onAddScreenshot} className="secondary-panel__button">
            Add Screenshot
          </Button>
        </div>
      </Card>
    </div>
  )
}
