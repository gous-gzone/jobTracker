export interface TestItem {
  id: string
  label: string
  howToTest: string
}

export const testItems: TestItem[] = [
  {
    id: 'preferences-persist',
    label: 'Preferences persist after refresh',
    howToTest: 'Set preferences in /settings, refresh page, verify they remain'
  },
  {
    id: 'match-score',
    label: 'Match score calculates correctly',
    howToTest: 'Check job cards show match % badges with correct colors'
  },
  {
    id: 'show-matches-toggle',
    label: '"Show only matches" toggle works',
    howToTest: 'Enable toggle on /dashboard, verify filtering by threshold'
  },
  {
    id: 'save-persist',
    label: 'Save job persists after refresh',
    howToTest: 'Save a job, refresh page, verify it remains in /saved'
  },
  {
    id: 'apply-new-tab',
    label: 'Apply opens in new tab',
    howToTest: 'Click Apply button, verify new tab opens with job URL'
  },
  {
    id: 'status-persist',
    label: 'Status update persists after refresh',
    howToTest: 'Change job status, refresh page, verify status remains'
  },
  {
    id: 'status-filter',
    label: 'Status filter works correctly',
    howToTest: 'Filter by status in /dashboard, verify only matching jobs show'
  },
  {
    id: 'digest-top-10',
    label: 'Digest generates top 10 by score',
    howToTest: 'Generate digest, verify 10 jobs sorted by match score'
  },
  {
    id: 'digest-persist',
    label: 'Digest persists for the day',
    howToTest: 'Generate digest, refresh page, verify digest remains'
  },
  {
    id: 'no-console-errors',
    label: 'No console errors on main pages',
    howToTest: 'Open console, navigate all pages, verify no errors'
  }
]

export const getTestStatus = (): Record<string, boolean> => {
  const saved = localStorage.getItem('jobTrackerTestStatus')
  return saved ? JSON.parse(saved) : {}
}

export const setTestStatus = (status: Record<string, boolean>): void => {
  localStorage.setItem('jobTrackerTestStatus', JSON.stringify(status))
}

export const getPassedCount = (): number => {
  const status = getTestStatus()
  return Object.values(status).filter(Boolean).length
}

export const allTestsPassed = (): boolean => {
  return getPassedCount() === testItems.length
}

export const resetTestStatus = (): void => {
  localStorage.removeItem('jobTrackerTestStatus')
}
