import React, { useState, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { jobs as allJobs } from '../data/jobs'
import { Button, Badge } from '../components'
import { loadPreferences, calculateMatchScore } from '../utils/preferences'
import { getTodayKey, saveDigest, loadDigest, formatDigestText, formatDateDisplay, Digest, DigestJob } from '../utils/digest'
import { getStatusUpdates, getStatusColor } from '../utils/status'
import './DigestPage.css'

export const DigestPage: React.FC = () => {
  const navigate = useNavigate()
  const [digest, setDigest] = useState<Digest | null>(null)
  const preferences = loadPreferences()
  const statusUpdates = getStatusUpdates()

  useEffect(() => {
    const todayKey = getTodayKey()
    const existingDigest = loadDigest(todayKey)
    if (existingDigest) {
      setDigest(existingDigest)
    }
  }, [])

  const generateDigest = () => {
    if (!preferences) return

    const jobsWithScores = allJobs.map(job => ({
      job,
      matchScore: calculateMatchScore(job, preferences)
    }))

    const sortedJobs = jobsWithScores
      .sort((a, b) => {
        if (b.matchScore !== a.matchScore) {
          return b.matchScore - a.matchScore
        }
        return a.job.postedDaysAgo - b.job.postedDaysAgo
      })
      .slice(0, 10)

    const digestJobs: DigestJob[] = sortedJobs.map(({ job, matchScore }) => ({
      id: job.id,
      title: job.title,
      company: job.company,
      location: job.location,
      experience: job.experience,
      matchScore,
      applyUrl: job.applyUrl
    }))

    const newDigest: Digest = {
      date: getTodayKey(),
      jobs: digestJobs
    }

    saveDigest(newDigest)
    setDigest(newDigest)
  }

  const copyToClipboard = () => {
    if (!digest) return
    const text = formatDigestText(digest)
    navigator.clipboard.writeText(text)
  }

  const createEmailDraft = () => {
    if (!digest) return
    const text = formatDigestText(digest)
    const subject = encodeURIComponent('My 9AM Job Digest')
    const body = encodeURIComponent(text)
    window.open(`mailto:?subject=${subject}&body=${body}`)
  }

  const getMatchScoreVariant = (score: number) => {
    if (score >= 80) return 'success'
    if (score >= 60) return 'warning'
    if (score >= 40) return 'default'
    return 'muted'
  }

  if (!preferences) {
    return (
      <div className="digest">
        <div className="digest__blocking">
          <h1 className="digest__blocking-heading">Set Preferences First</h1>
          <p className="digest__blocking-text">
            Set preferences to generate a personalized digest.
          </p>
          <Button variant="primary" onClick={() => navigate('/settings')}>
            Go to Settings
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="digest">
      <div className="digest__header">
        <h1 className="digest__heading">Daily Digest</h1>
        <p className="digest__subtext">
          Your personalized job digest delivered daily at 9AM.
        </p>
        <p className="digest__demo-note">
          Demo Mode: Daily 9AM trigger simulated manually.
        </p>
      </div>

      {!digest && (
        <div className="digest__generate">
          <Button variant="primary" onClick={generateDigest}>
            Generate Today's 9AM Digest (Simulated)
          </Button>
        </div>
      )}

      {digest && (
        <>
          {digest.jobs.length === 0 ? (
            <div className="digest__blocking">
              <h2 className="digest__blocking-heading">No Matching Roles Today</h2>
              <p className="digest__blocking-text">
                No matching roles today. Check again tomorrow.
              </p>
            </div>
          ) : (
            <>
              <div className="digest__card">
                <div className="digest__card-header">
                  <h2 className="digest__card-title">Top 10 Jobs For You — 9AM Digest</h2>
                  <p className="digest__card-date">{formatDateDisplay(digest.date)}</p>
                </div>

                <div className="digest__jobs">
                  {digest.jobs.map((job, index) => (
                    <div key={job.id} className="digest__job">
                      <div className="digest__job-header">
                        <div>
                          <h3 className="digest__job-title">
                            {index + 1}. {job.title}
                          </h3>
                          <div className="digest__job-company">{job.company}</div>
                        </div>
                        <Badge variant={getMatchScoreVariant(job.matchScore)}>
                          {job.matchScore}% match
                        </Badge>
                      </div>

                      <div className="digest__job-meta">
                        <span>{job.location}</span>
                        <span>• {job.experience}</span>
                      </div>

                      <div className="digest__job-actions">
                        <Button 
                          variant="primary" 
                          onClick={() => window.open(job.applyUrl, '_blank')}
                        >
                          Apply
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="digest__card-footer">
                  This digest was generated based on your preferences.
                </div>
              </div>

              <div className="digest__actions">
                <Button variant="secondary" onClick={copyToClipboard}>
                  Copy Digest to Clipboard
                </Button>
                <Button variant="secondary" onClick={createEmailDraft}>
                  Create Email Draft
                </Button>
                <Button variant="secondary" onClick={generateDigest}>
                  Regenerate Digest
                </Button>
              </div>

              {statusUpdates.length > 0 && (
                <div className="digest__status-updates">
                  <h2 className="digest__status-updates-title">Recent Status Updates</h2>
                  <div className="digest__status-list">
                    {statusUpdates.slice(0, 10).map((update, index) => (
                      <div key={index} className="digest__status-item">
                        <div className="digest__status-info">
                          <div className="digest__status-job">{update.jobTitle}</div>
                          <div className="digest__status-company">{update.company}</div>
                        </div>
                        <div className="digest__status-meta">
                          <Badge variant={getStatusColor(update.status)}>{update.status}</Badge>
                          <span className="digest__status-date">
                            {new Date(update.timestamp).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  )
}
