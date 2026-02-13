import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Navigation.css'

export const Navigation: React.FC = () => {
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navItems = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/saved', label: 'Saved' },
    { path: '/digest', label: 'Digest' },
    { path: '/settings', label: 'Settings' },
    { path: '/proof', label: 'Proof' },
  ]

  const isActive = (path: string) => {
    if (path === '/dashboard') {
      return location.pathname === '/' || location.pathname === '/dashboard'
    }
    return location.pathname === path
  }

  return (
    <nav className="navigation">
      <div className="navigation__container">
        <div className="navigation__brand">
          <Link to="/dashboard" className="navigation__brand-link">
            Job Notification Tracker
          </Link>
        </div>

        <button
          className="navigation__hamburger"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`navigation__hamburger-line ${isMobileMenuOpen ? 'navigation__hamburger-line--open' : ''}`}></span>
          <span className={`navigation__hamburger-line ${isMobileMenuOpen ? 'navigation__hamburger-line--open' : ''}`}></span>
          <span className={`navigation__hamburger-line ${isMobileMenuOpen ? 'navigation__hamburger-line--open' : ''}`}></span>
        </button>

        <div className={`navigation__links ${isMobileMenuOpen ? 'navigation__links--open' : ''}`}>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`navigation__link ${isActive(item.path) ? 'navigation__link--active' : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
