import React, { useState, useEffect } from 'react'
import { Button, Badge } from '../components'
import { 
  getProofLinks, 
  setProofLinks, 
  isValidUrl, 
  getProjectStatus, 
  getStepStatuses,
  formatFinalSubmission,
  ProofLinks 
} from '../utils/proof'
import './FinalProofPage.css'

export const FinalProofPage: React.FC = () => {
  const [links, setLinks] = useState<ProofLinks>(getProofLinks())
  const [errors, setErrors] = useState<Record<string, string>>({})
  const projectStatus = getProjectStatus()
  const stepStatuses = getStepStatuses()

  useEffect(() => {
    setLinks(getProofLinks())
  }, [])

  const handleChange = (field: keyof ProofLinks, value: string) => {
    const newLinks = { ...links, [field]: value }
    setLinks(newLinks)
    setProofLinks(newLinks)
    
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' })
    }
  }

  const validateLinks = (): boolean => {
    const newErrors: Record<string, string> = {}
    
    if (!isValidUrl(links.lovableProject)) {
      newErrors.lovableProject = 'Please enter a valid URL'
    }
    if (!isValidUrl(links.githubRepository)) {
      newErrors.githubRepository = 'Please enter a valid URL'
    }
    if (!isValidUrl(links.deployedUrl)) {
      newErrors.deployedUrl = 'Please enter a valid URL'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleCopySubmission = () => {
    if (!validateLinks()) return
    
    const text = formatFinalSubmission(links)
    navigator.clipboard.writeText(text)
  }

  const getStatusVariant = (status: string) => {
    if (status === 'Shipped') return 'success'
    if (status === 'In Progress') return 'warning'
    return 'default'
  }

  return (
    <div className="final-proof">
      <div className="final-proof__header">
        <h1 className="final-proof__title">Project 1 — Job Notification Tracker</h1>
        <p className="final-proof__subtitle">
          Final proof and submission system.
        </p>
      </div>

      <div className="final-proof__section">
        <h2 className="final-proof__section-title">A) Step Completion Summary</h2>
        <div className="final-proof__steps">
          {stepStatuses.map(step => (
            <div key={step.id} className="final-proof__step">
              <span className="final-proof__step-icon">
                {step.completed ? '✓' : '○'}
              </span>
              <span className="final-proof__step-name">{step.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="final-proof__section">
        <h2 className="final-proof__section-title">B) Artifact Collection</h2>
        
        <div className="final-proof__form">
          <div className="final-proof__field">
            <label className="final-proof__label">Lovable Project Link *</label>
            <input
              type="text"
              className={`final-proof__input ${errors.lovableProject ? 'final-proof__input--error' : ''}`}
              placeholder="https://lovable.dev/projects/..."
              value={links.lovableProject}
              onChange={(e) => handleChange('lovableProject', e.target.value)}
            />
            {errors.lovableProject && (
              <span className="final-proof__error">{errors.lovableProject}</span>
            )}
          </div>

          <div className="final-proof__field">
            <label className="final-proof__label">GitHub Repository Link *</label>
            <input
              type="text"
              className={`final-proof__input ${errors.githubRepository ? 'final-proof__input--error' : ''}`}
              placeholder="https://github.com/username/repo"
              value={links.githubRepository}
              onChange={(e) => handleChange('githubRepository', e.target.value)}
            />
            {errors.githubRepository && (
              <span className="final-proof__error">{errors.githubRepository}</span>
            )}
          </div>

          <div className="final-proof__field">
            <label className="final-proof__label">Deployed URL (Vercel or equivalent) *</label>
            <input
              type="text"
              className={`final-proof__input ${errors.deployedUrl ? 'final-proof__input--error' : ''}`}
              placeholder="https://your-app.vercel.app"
              value={links.deployedUrl}
              onChange={(e) => handleChange('deployedUrl', e.target.value)}
            />
            {errors.deployedUrl && (
              <span className="final-proof__error">{errors.deployedUrl}</span>
            )}
          </div>
        </div>
      </div>

      <div className="final-proof__status">
        <span className="final-proof__status-label">Project Status:</span>
        <Badge variant={getStatusVariant(projectStatus)}>{projectStatus}</Badge>
      </div>

      <div className="final-proof__actions">
        <Button variant="primary" onClick={handleCopySubmission}>
          Copy Final Submission
        </Button>
      </div>

      {projectStatus === 'Shipped' && (
        <div className="final-proof__shipped">
          <p className="final-proof__shipped-message">
            Project 1 Shipped Successfully.
          </p>
        </div>
      )}
    </div>
  )
}
