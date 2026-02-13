import React from 'react'
import { Badge, BadgeStatus } from '../components/Badge'
import './TopBar.css'

export interface TopBarProps {
  projectName: string
  currentStep: number
  totalSteps: number
  status: BadgeStatus
}

export const TopBar: React.FC<TopBarProps> = ({
  projectName,
  currentStep,
  totalSteps,
  status,
}) => {
  return (
    <div className="top-bar">
      <div className="top-bar__left">
        <span className="top-bar__project-name">{projectName}</span>
      </div>
      <div className="top-bar__center">
        <span className="top-bar__progress">
          Step {currentStep} / {totalSteps}
        </span>
      </div>
      <div className="top-bar__right">
        <Badge status={status} />
      </div>
    </div>
  )
}
