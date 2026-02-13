import React from 'react'
import { Job } from '../data/jobs'
import { Button } from './'
import './JobModal.css'

interface JobModalProps {
  job: Job | null
  onClose: () => void
}

export const JobModal: React.FC<JobModalProps> = ({ job, onClose }) => {
  if (!job) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal__header">
          <h2 className="modal__title">{job.title}</h2>
          <button className="modal__close" onClick={onClose}>×</button>
        </div>
        
        <div className="modal__content">
          <div className="modal__section">
            <h3 className="modal__section-title">Company</h3>
            <p>{job.company}</p>
          </div>

          <div className="modal__section">
            <h3 className="modal__section-title">Location & Mode</h3>
            <p>{job.location} • {job.mode}</p>
          </div>

          <div className="modal__section">
            <h3 className="modal__section-title">Experience</h3>
            <p>{job.experience}</p>
          </div>

          <div className="modal__section">
            <h3 className="modal__section-title">Salary Range</h3>
            <p>{job.salaryRange}</p>
          </div>

          <div className="modal__section">
            <h3 className="modal__section-title">Skills Required</h3>
            <div className="modal__skills">
              {job.skills.map((skill, index) => (
                <span key={index} className="modal__skill">{skill}</span>
              ))}
            </div>
          </div>

          <div className="modal__section">
            <h3 className="modal__section-title">Description</h3>
            <p>{job.description}</p>
          </div>
        </div>

        <div className="modal__footer">
          <Button variant="secondary" onClick={onClose}>Close</Button>
          <Button variant="primary" onClick={() => window.open(job.applyUrl, '_blank')}>
            Apply Now
          </Button>
        </div>
      </div>
    </div>
  )
}
