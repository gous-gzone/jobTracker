import React, { useState, useEffect, useMemo } from 'react'
import { jobs as allJobs, Job } from '../data/jobs'
import { JobCard, JobModal, FilterBar, Toast } from '../components'
import { loadPreferences, calculateMatchScore, UserPreferences } from '../utils/preferences'
import { getJobStatus, JobStatus } from '../utils/status'
import './DashboardPage.css'

export const DashboardPage: React.FC = () => {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)
  const [savedJobs, setSavedJobs] = useState<string[]>([])
  const [keyword, setKeyword] = useState('')
  const [location, setLocation] = useState('')
  const [mode, setMode] = useState('')
  const [experience, setExperience] = useState('')
  const [source, setSource] = useState('')
  const [sort, setSort] = useState('latest')
  const [status, setStatus] = useState('')
  const [showOnlyMatches, setShowOnlyMatches] = useState(false)
  const [preferences, setPreferences] = useState<UserPreferences | null>(null)
  const [toast, setToast] = useState<string | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem('savedJobs')
    if (saved) setSavedJobs(JSON.parse(saved))
    setPreferences(loadPreferences())
  }, [])

  const handleSave = (jobId: string) => {
    const newSaved = savedJobs.includes(jobId)
      ? savedJobs.filter(id => id !== jobId)
      : [...savedJobs, jobId]
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

  const jobsWithScores = useMemo(() => {
    return allJobs.map(job => ({
      job,
      matchScore: preferences ? calculateMatchScore(job, preferences) : undefined
    }))
  }, [preferences])

  const filteredJobs = useMemo(() => {
    return jobsWithScores.filter(({ job, matchScore }) => {
      if (keyword && !job.title.toLowerCase().includes(keyword.toLowerCase()) && 
          !job.company.toLowerCase().includes(keyword.toLowerCase())) return false
      if (location && job.location !== location) return false
      if (mode && job.mode !== mode) return false
      if (experience && job.experience !== experience) return false
      if (source && job.source !== source) return false
      if (status && getJobStatus(job.id) !== status) return false
      if (showOnlyMatches && preferences && matchScore !== undefined && matchScore < preferences.minMatchScore) return false
      return true
    })
  }, [jobsWithScores, keyword, location, mode, experience, source, status, showOnlyMatches, preferences])

  const sortedJobs = useMemo(() => {
    return [...filteredJobs].sort((a, b) => {
      if (sort === 'latest') return a.job.postedDaysAgo - b.job.postedDaysAgo
      if (sort === 'oldest') return b.job.postedDaysAgo - a.job.postedDaysAgo
      if (sort === 'match-score' && a.matchScore !== undefined && b.matchScore !== undefined) {
        return b.matchScore - a.matchScore
      }
      return 0
    })
  }, [filteredJobs, sort])

  return (
    <div className="dashboard">
      <div className="dashboard__header">
        <h1 className="dashboard__heading">Job Dashboard</h1>
        <p className="dashboard__subtext">
          Browse and track opportunities matched to your preferences.
        </p>
      </div>

      {!preferences && (
        <div className="dashboard__banner">
          Set your preferences to activate intelligent matching.
        </div>
      )}

      <FilterBar
        keyword={keyword}
        location={location}
        mode={mode}
        experience={experience}
        source={source}
        sort={sort}
        status={status}
        onKeywordChange={setKeyword}
        onLocationChange={setLocation}
        onModeChange={setMode}
        onExperienceChange={setExperience}
        onSourceChange={setSource}
        onSortChange={setSort}
        onStatusChange={setStatus}
      />

      {preferences && (
        <div className="dashboard__toggle">
          <label className="dashboard__toggle-label">
            <input
              type="checkbox"
              checked={showOnlyMatches}
              onChange={(e) => setShowOnlyMatches(e.target.checked)}
              className="dashboard__toggle-input"
            />
            Show only jobs above my threshold ({preferences.minMatchScore}%)
          </label>
        </div>
      )}

      <div className="dashboard__count">
        Showing {sortedJobs.length} of {allJobs.length} jobs
      </div>

      {sortedJobs.length === 0 ? (
        <div className="dashboard__empty">
          <h2 className="dashboard__empty-heading">No roles match your criteria</h2>
          <p className="dashboard__empty-text">
            Adjust filters or lower threshold.
          </p>
        </div>
      ) : (
        <div className="dashboard__jobs">
          {sortedJobs.map(({ job, matchScore }) => (
            <JobCard
              key={job.id}
              job={job}
              onView={setSelectedJob}
              onSave={handleSave}
              onApply={handleApply}
              isSaved={savedJobs.includes(job.id)}
              matchScore={matchScore}
              onStatusChange={handleStatusChange}
            />
          ))}
        </div>
      )}

      {selectedJob && (
        <JobModal job={selectedJob} onClose={() => setSelectedJob(null)} />
      )}

      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  )
}
