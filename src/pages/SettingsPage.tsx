import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components'
import { savePreferences, loadPreferences, UserPreferences } from '../utils/preferences'
import './SettingsPage.css'

export const SettingsPage: React.FC = () => {
  const navigate = useNavigate()
  const [roleKeywords, setRoleKeywords] = useState('')
  const [preferredLocations, setPreferredLocations] = useState<string[]>([])
  const [preferredMode, setPreferredMode] = useState<string[]>([])
  const [experienceLevel, setExperienceLevel] = useState('')
  const [skills, setSkills] = useState('')
  const [minMatchScore, setMinMatchScore] = useState(40)

  useEffect(() => {
    const prefs = loadPreferences()
    if (prefs) {
      setRoleKeywords(prefs.roleKeywords.join(', '))
      setPreferredLocations(prefs.preferredLocations)
      setPreferredMode(prefs.preferredMode)
      setExperienceLevel(prefs.experienceLevel)
      setSkills(prefs.skills.join(', '))
      setMinMatchScore(prefs.minMatchScore)
    }
  }, [])

  const handleLocationChange = (location: string) => {
    setPreferredLocations(prev => 
      prev.includes(location) ? prev.filter(l => l !== location) : [...prev, location]
    )
  }

  const handleModeChange = (mode: string) => {
    setPreferredMode(prev => 
      prev.includes(mode) ? prev.filter(m => m !== mode) : [...prev, mode]
    )
  }

  const handleSave = () => {
    const preferences: UserPreferences = {
      roleKeywords: roleKeywords.split(',').map(k => k.trim()).filter(k => k),
      preferredLocations,
      preferredMode,
      experienceLevel,
      skills: skills.split(',').map(s => s.trim()).filter(s => s),
      minMatchScore
    }
    savePreferences(preferences)
    navigate('/dashboard')
  }

  const locations = ['Bangalore', 'Mumbai', 'Pune', 'Hyderabad', 'Chennai', 'Noida', 'Gurgaon', 'Mysore']
  const modes = ['Remote', 'Hybrid', 'Onsite']

  return (
    <div className="settings">
      <h1 className="settings__heading">Settings</h1>
      <p className="settings__subtext">
        Configure your job tracking preferences.
      </p>

      <form className="settings__form" onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
        <div className="settings__field">
          <label className="settings__label">Role Keywords (comma-separated)</label>
          <input 
            type="text" 
            className="settings__input" 
            placeholder="e.g. Frontend Developer, React Engineer, SDE"
            value={roleKeywords}
            onChange={(e) => setRoleKeywords(e.target.value)}
          />
        </div>

        <div className="settings__field">
          <label className="settings__label">Preferred Locations</label>
          <div className="settings__checkbox-group">
            {locations.map(location => (
              <label key={location} className="settings__checkbox-label">
                <input
                  type="checkbox"
                  checked={preferredLocations.includes(location)}
                  onChange={() => handleLocationChange(location)}
                  className="settings__checkbox"
                />
                {location}
              </label>
            ))}
          </div>
        </div>

        <div className="settings__field">
          <label className="settings__label">Preferred Mode</label>
          <div className="settings__checkbox-group">
            {modes.map(mode => (
              <label key={mode} className="settings__checkbox-label">
                <input
                  type="checkbox"
                  checked={preferredMode.includes(mode)}
                  onChange={() => handleModeChange(mode)}
                  className="settings__checkbox"
                />
                {mode}
              </label>
            ))}
          </div>
        </div>

        <div className="settings__field">
          <label className="settings__label">Experience Level</label>
          <select 
            className="settings__select"
            value={experienceLevel}
            onChange={(e) => setExperienceLevel(e.target.value)}
          >
            <option value="">Select level</option>
            <option value="Fresher">Fresher</option>
            <option value="0-1">0-1 Years</option>
            <option value="1-3">1-3 Years</option>
            <option value="3-5">3-5 Years</option>
          </select>
        </div>

        <div className="settings__field">
          <label className="settings__label">Skills (comma-separated)</label>
          <input 
            type="text" 
            className="settings__input" 
            placeholder="e.g. React, JavaScript, Node.js, Python"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />
        </div>

        <div className="settings__field">
          <label className="settings__label">
            Minimum Match Score: {minMatchScore}%
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={minMatchScore}
            onChange={(e) => setMinMatchScore(Number(e.target.value))}
            className="settings__slider"
          />
        </div>

        <div className="settings__actions">
          <Button variant="primary" type="submit">
            Save Preferences
          </Button>
        </div>
      </form>
    </div>
  )
}
