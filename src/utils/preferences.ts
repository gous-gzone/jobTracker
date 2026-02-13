import { Job } from '../data/jobs'

export interface UserPreferences {
  roleKeywords: string[]
  preferredLocations: string[]
  preferredMode: string[]
  experienceLevel: string
  skills: string[]
  minMatchScore: number
}

export const calculateMatchScore = (job: Job, preferences: UserPreferences): number => {
  let score = 0

  // +25 if any roleKeyword appears in job.title (case-insensitive)
  if (preferences.roleKeywords.length > 0) {
    const titleLower = job.title.toLowerCase()
    if (preferences.roleKeywords.some(keyword => titleLower.includes(keyword.toLowerCase()))) {
      score += 25
    }
  }

  // +15 if any roleKeyword appears in job.description
  if (preferences.roleKeywords.length > 0) {
    const descLower = job.description.toLowerCase()
    if (preferences.roleKeywords.some(keyword => descLower.includes(keyword.toLowerCase()))) {
      score += 15
    }
  }

  // +15 if job.location matches preferredLocations
  if (preferences.preferredLocations.length > 0 && preferences.preferredLocations.includes(job.location)) {
    score += 15
  }

  // +10 if job.mode matches preferredMode
  if (preferences.preferredMode.length > 0 && preferences.preferredMode.includes(job.mode)) {
    score += 10
  }

  // +10 if job.experience matches experienceLevel
  if (preferences.experienceLevel && job.experience === preferences.experienceLevel) {
    score += 10
  }

  // +15 if overlap between job.skills and user.skills (any match)
  if (preferences.skills.length > 0) {
    const userSkillsLower = preferences.skills.map(s => s.toLowerCase())
    const jobSkillsLower = job.skills.map(s => s.toLowerCase())
    if (userSkillsLower.some(skill => jobSkillsLower.includes(skill))) {
      score += 15
    }
  }

  // +5 if postedDaysAgo <= 2
  if (job.postedDaysAgo <= 2) {
    score += 5
  }

  // +5 if source is LinkedIn
  if (job.source === 'LinkedIn') {
    score += 5
  }

  // Cap score at 100
  return Math.min(score, 100)
}

export const getMatchScoreColor = (score: number): 'success' | 'warning' | 'default' | 'muted' => {
  if (score >= 80) return 'success'
  if (score >= 60) return 'warning'
  if (score >= 40) return 'default'
  return 'muted'
}

export const savePreferences = (preferences: UserPreferences): void => {
  localStorage.setItem('jobTrackerPreferences', JSON.stringify(preferences))
}

export const loadPreferences = (): UserPreferences | null => {
  const saved = localStorage.getItem('jobTrackerPreferences')
  return saved ? JSON.parse(saved) : null
}
