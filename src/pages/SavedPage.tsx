import React, { useState, useEffect } from 'react'
import { jobs as allJobs, Job } from '../data/jobs'
import { JobCard, JobModal, Toast } from '../components'
import { getJobStatus, JobStatus } from '../utils/status'
import './SavedPage.css'

export const SavedPage: React.FC = () => {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [savedJobs, setSavedJobs] = useState<string[]>([])
  const [toast, setToast] = useState<string | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem('savedJobs')
    if (saved) setSavedJobs(JSON.parse(saved))
  }, [])

  const handleSave = (jobId: string) => {
    const newSaved = savedJobs.filter(id => id !== jobId)
    setSavedJobs(newSaved)
    localStorage.setItem('savedJobs', JSON.stringify(newSaved))
  }

  const handleApply = (url: string) => {
    window.open(url, '_blank')
  }

  const handleStatusChange = (newStatus: JobStatus) => {
    if (newStatus !== 'Not Applied') {
      setToast(`Status updated: ${newStatus}`)
    }
  }

  const savedJobsList = allJobs.filter(job => savedJobs.includes(job.id))

  if (savedJobsList.length === 0) {
    return (
      <div className="saved">
        <div className="saved__empty">
          <h1 className="saved__empty-heading">No Saved Jobs</h1>
          <p className="saved__empty-text">
            Your saved opportunities will appear here.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="saved">
      <div className="saved__header">
        <h1 className="saved__heading">Saved Jobs</h1>
        <p className="saved__subtext">
          Jobs you've bookmarked for later review.
        </p>
      </div>

      <div className="saved__count">
        {savedJobsList.length} saved {savedJobsList.length === 1 ? 'job' : 'jobs'}
      </div>

      <div className="saved__jobs">
        {savedJobsList.map(job => (
          <JobCard
            key={job.id}
            job={job}
            onView={setSelectedJob}
            onSave={handleSave}
            onApply={handleApply}
            isSaved={true}
            onStatusChange={handleStatusChange}
          />
        ))}
      </div>

      {selectedJob && (
        <JobModal job={selectedJob} onClose={() => setSelectedJob(null)} />
      )}

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  )
}
