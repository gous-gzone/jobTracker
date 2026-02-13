import React, { useEffect } from 'react'
import './Toast.css'

interface ToastProps {
  message: string
  onClose: () => void
}

export const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000)
    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div className="toast">
      <div className="toast__message">{message}</div>
    </div>
  )
}
