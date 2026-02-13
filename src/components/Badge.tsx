import React from 'react'
import './Badge.css'

export type BadgeStatus = 'not-started' | 'in-progress' | 'shipped'
export type BadgeVariant = 'default' | 'info' | 'warning' | 'success' | 'muted' | 'danger'

export interface BadgeProps {
  status?: BadgeStatus
  variant?: BadgeVariant
  children: React.ReactNode
}

const statusLabels: Record<BadgeStatus, string> = {
  'not-started': 'Not Started',
  'in-progress': 'In Progress',
  'shipped': 'Shipped',
}

export const Badge: React.FC<BadgeProps> = ({ status, variant = 'default', children }) => {
  const className = status ? `badge badge--${status}` : `badge badge--${variant}`
  return (
    <span className={className}>
      {children || (status && statusLabels[status])}
    </span>
  )
}
