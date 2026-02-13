import React from 'react'
import './Checkbox.css'

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string
  checked: boolean
  onCheckedChange: (checked: boolean) => void
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked,
  onCheckedChange,
  className = '',
  ...props
}) => {
  return (
    <label className={`checkbox-wrapper ${className}`}>
      <input
        type="checkbox"
        className="checkbox-input"
        checked={checked}
        onChange={(e) => onCheckedChange(e.target.checked)}
        {...props}
      />
      <span className="checkbox-label">{label}</span>
    </label>
  )
}
