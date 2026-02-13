import { allTestsPassed } from './testChecklist'

export interface ProofLinks {
  lovableProject: string
  githubRepository: string
  deployedUrl: string
}

export interface StepStatus {
  id: string
  name: string
  completed: boolean
}

export const getProofLinks = (): ProofLinks => {
  const saved = localStorage.getItem('jobTrackerProofLinks')
  return saved ? JSON.parse(saved) : { lovableProject: '', githubRepository: '', deployedUrl: '' }
}

export const setProofLinks = (links: ProofLinks): void => {
  localStorage.setItem('jobTrackerProofLinks', JSON.stringify(links))
}

export const isValidUrl = (url: string): boolean => {
  if (!url) return false
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

export const allLinksProvided = (): boolean => {
  const links = getProofLinks()
  return isValidUrl(links.lovableProject) && 
         isValidUrl(links.githubRepository) && 
         isValidUrl(links.deployedUrl)
}

export const getProjectStatus = (): 'Not Started' | 'In Progress' | 'Shipped' => {
  const linksProvided = allLinksProvided()
  const testsComplete = allTestsPassed()
  
  if (linksProvided && testsComplete) return 'Shipped'
  if (linksProvided || testsComplete) return 'In Progress'
  return 'Not Started'
}

export const getStepStatuses = (): StepStatus[] => {
  const links = getProofLinks()
  const testsComplete = allTestsPassed()
  
  return [
    { id: 'setup', name: 'Project Setup', completed: true },
    { id: 'data', name: 'Job Data & Rendering', completed: true },
    { id: 'preferences', name: 'Preferences & Match Scoring', completed: true },
    { id: 'digest', name: 'Daily Digest Engine', completed: true },
    { id: 'status', name: 'Status Tracking', completed: true },
    { id: 'test', name: 'Test Checklist', completed: testsComplete },
    { id: 'links', name: 'Artifact Links', completed: allLinksProvided() },
    { id: 'ship', name: 'Final Submission', completed: getProjectStatus() === 'Shipped' }
  ]
}

export const formatFinalSubmission = (links: ProofLinks): string => {
  return `------------------------------------------
Job Notification Tracker — Final Submission

Lovable Project:
${links.lovableProject}

GitHub Repository:
${links.githubRepository}

Live Deployment:
${links.deployedUrl}

Core Features:
- Intelligent match scoring
- Daily digest simulation
- Status tracking
- Test checklist enforced
------------------------------------------`
}
