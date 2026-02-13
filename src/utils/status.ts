export type JobStatus = 'Not Applied' | 'Applied' | 'Rejected' | 'Selected'

export interface StatusUpdate {
  jobId: string
  jobTitle: string
  company: string
  status: JobStatus
  timestamp: string
}

export const getJobStatus = (jobId: string): JobStatus => {
  const statuses = localStorage.getItem('jobTrackerStatus')
  if (!statuses) return 'Not Applied'
  const parsed = JSON.parse(statuses)
  return parsed[jobId] || 'Not Applied'
}

export const setJobStatus = (jobId: string, status: JobStatus, jobTitle: string, company: string): void => {
  const statuses = localStorage.getItem('jobTrackerStatus')
  const parsed = statuses ? JSON.parse(statuses) : {}
  parsed[jobId] = status
  localStorage.setItem('jobTrackerStatus', JSON.stringify(parsed))

  if (status !== 'Not Applied') {
    const update: StatusUpdate = {
      jobId,
      jobTitle,
      company,
      status,
      timestamp: new Date().toISOString()
    }
    saveStatusUpdate(update)
  }
}

const saveStatusUpdate = (update: StatusUpdate): void => {
  const updates = localStorage.getItem('jobTrackerStatusUpdates')
  const parsed: StatusUpdate[] = updates ? JSON.parse(updates) : []
  parsed.unshift(update)
  localStorage.setItem('jobTrackerStatusUpdates', JSON.stringify(parsed.slice(0, 20)))
}

export const getStatusUpdates = (): StatusUpdate[] => {
  const updates = localStorage.getItem('jobTrackerStatusUpdates')
  return updates ? JSON.parse(updates) : []
}

export const getStatusColor = (status: JobStatus): 'default' | 'info' | 'danger' | 'success' => {
  switch (status) {
    case 'Applied': return 'info'
    case 'Rejected': return 'danger'
    case 'Selected': return 'success'
    default: return 'default'
  }
}
