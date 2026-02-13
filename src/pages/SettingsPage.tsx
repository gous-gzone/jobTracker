import React from 'react'
import { Button } from '../components'
import './SettingsPage.css'

export const SettingsPage: React.FC = () => {
  return (
    <div className="settings">
      <h1 className="settings__heading">Settings</h1>
      <p className="settings__subtext">
        Configure your job tracking preferences.
      </p>

      <form className="settings__form">
        <div className="settings__field">
          <label className="settings__label">Role Keywords</label>
          <input 
            type="text" 
            className="settings__input" 
            placeholder="e.g. Frontend Developer, React Engineer"
          />
        </div>

        <div className="settings__field">
          <label className="settings__label">Preferred Locations</label>
          <input 
            type="text" 
            className="settings__input" 
            placeholder="e.g. San Francisco, New York, Remote"
          />
        </div>

        <div className="settings__field">
          <label className="settings__label">Mode</label>
          <select className="settings__select">
            <option value="">Select mode</option>
            <option value="remote">Remote</option>
            <option value="hybrid">Hybrid</option>
            <option value="onsite">Onsite</option>
          </select>
        </div>

        <div className="settings__field">
          <label className="settings__label">Experience Level</label>
          <select className="settings__select">
            <option value="">Select level</option>
            <option value="entry">Entry Level</option>
            <option value="mid">Mid Level</option>
            <option value="senior">Senior Level</option>
            <option value="lead">Lead</option>
          </select>
        </div>

        <div className="settings__actions">
          <Button variant="primary" type="button">
            Save Preferences
          </Button>
        </div>
      </form>
    </div>
  )
}
