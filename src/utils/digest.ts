import { Job } from '../data/jobs'

export interface DigestJob {
  id: string
  title: string
  company: string
  location: string
  experience: string
  matchScore: number
  applyUrl: string
}

export interface Digest {
  date: string
  jobs: DigestJob[]
}

export const getTodayKey = (): string => {
  const today = new Date()
  return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`
}

export const saveDigest = (digest: Digest): void => {
  localStorage.setItem(`jobTrackerDigest_${digest.date}`, JSON.stringify(digest))
}

export const loadDigest = (date: string): Digest | null => {
  const saved = localStorage.getItem(`jobTrackerDigest_${date}`)
  return saved ? JSON.parse(saved) : null
}

export const formatDigestText = (digest: Digest): string => {
  let text = `TOP 10 JOBS FOR YOU — 9AM DIGEST\n`
  text += `Date: ${digest.date}\n\n`
  
  digest.jobs.forEach((job, index) => {
    text += `${index + 1}. ${job.title}\n`
    text += `   Company: ${job.company}\n`
    text += `   Location: ${job.location}\n`
    text += `   Experience: ${job.experience}\n`
    text += `   Match Score: ${job.matchScore}%\n`
    text += `   Apply: ${job.applyUrl}\n\n`
  })
  
  text += `This digest was generated based on your preferences.`
  return text
}

export const formatDateDisplay = (dateStr: string): string => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
}
