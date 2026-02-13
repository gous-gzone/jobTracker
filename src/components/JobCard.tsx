import React, { useState } from 'react'
import { Job } from '../data/jobs'
import { Badge, Button } from './'
import { getJobStatus, setJobStatus, getStatusColor, JobStatus } from '../utils/status'
import './JobCard.css'

interface JobCardProps {
  job: Job
  onView: (job: Job) => void
  onSave: (jobId: string) => void
  onApply: (url: string) => void
  isSaved: boolean
  matchScore?: number
  onStatusChange?: (status: JobStatus) => void
}

export const JobCard: React.FC<JobCardProps> = ({ job, onView, onSave, onApply, isSaved, matchScore, onStatusChange }) => {
  const [status, setStatus] = useState<JobStatus>(getJobStatus(job.id))

  const getPostedText = (days: number) => {
    if (days === 0) return 'Today'
    if (days === 1) return '1 day ago'
    return `${days} days ago`
  }

  const getMatchScoreVariant = (score: number) => {
    if (score >= 80) return 'success'
    if (score >= 60) return 'warning'
    if (score >= 40) return 'default'
    return 'muted'
  }

  const handleStatusChange = (newStatus: JobStatus) => {
    setStatus(newStatus)
    setJobStatus(job.id, newStatus, job.title, job.company)
    if (onStatusChange) onStatusChange(newStatus)
  }

  const statuses: JobStatus[] = ['Not Applied', 'Applied', 'Rejected', 'Selected']

  return (
    <div className="job-card">
      <div className="job-card__header">
        <div>
          <h3 className="job-card__title">{job.title}</h3>
          <div className="job-card__company">{job.company}</div>
        </div>
        <div className="job-card__badges">
          {matchScore !== undefined && (
            <Badge variant={getMatchScoreVariant(matchScore)}>
              {matchScore}% match
            </Badge>
          )}
          <Badge variant={job.source === 'LinkedIn' ? 'info' : job.source === 'Naukri' ? 'warning' : 'default'}>
            {job.source}
          </Badge>
        </div>
      </div>

      <div className="job-card__meta">
        <span className="job-card__meta-item">{job.location}</span>
        <span className="job-card__meta-item">• {job.mode}</span>
        <span className="job-card__meta-item">• {job.experience}</span>
      </div>

      <div className="job-card__salary">{job.salaryRange}</div>

      <div className="job-card__status">
        <label className="job-card__status-label">Status:</label>
        <select 
          className="job-card__status-select"
          value={status}
          onChange={(e) => handleStatusChange(e.target.value as JobStatus)}
        >
          {statuses.map(s => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <Badge variant={getStatusColor(status)}>{status}</Badge>
      </div>

      <div className="job-card__footer">
        <span className="job-card__posted">{getPostedText(job.postedDaysAgo)}</span>
        <div className="job-card__actions">
          <Button variant="secondary" onClick={() => onView(job)}>View</Button>
          <Button variant="secondary" onClick={() => onSave(job.id)}>
            {isSaved ? 'Unsave' : 'Save'}
          </Button>
          <Button variant="primary" onClick={() => onApply(job.applyUrl)}>Apply</Button>
        </div>
      </div>
    </div>
  )
}
