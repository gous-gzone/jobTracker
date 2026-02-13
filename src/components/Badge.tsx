import React from 'react'
import './Badge.css'

export type BadgeStatus = 'not-started' | 'in-progress' | 'shipped'

export interface BadgeProps {
  status: BadgeStatus
  children: React.ReactNode
}

const statusLabels: Record<BadgeStatus, string> = {
  'not-started': 'Not Started',
  'in-progress': 'In Progress',
  'shipped': 'Shipped',
}

export const Badge: React.FC<BadgeProps> = ({ status, children }) => {
  return (
    <span className={`badge badge--${status}`}>
      {children || statusLabels[status]}
    </span>
  )
}
