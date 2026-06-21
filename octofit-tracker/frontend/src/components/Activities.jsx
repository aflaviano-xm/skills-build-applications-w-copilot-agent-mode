import { useEffect, useState } from 'react'

import ResourceList from './ResourceList'
import { getRecords } from './resourceData'

const endpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
  : 'http://localhost:8000/api/activities/'

function Activities() {
  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadActivities = async () => {
      try {
        const response = await fetch(endpoint)
        if (!response.ok) {
          throw new Error(`Unable to load activities: ${response.status}`)
        }

        const payload = await response.json()
        setRecords(getRecords(payload))
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to load activities')
      } finally {
        setLoading(false)
      }
    }

    loadActivities()
  }, [])

  return (
    <ResourceList
      title="Activities"
      description="Recent exercise sessions logged by OctoFit athletes."
      endpoint={endpoint}
      records={records}
      fields={[
        { key: 'user', label: 'User' },
        { key: 'type', label: 'Type' },
        { key: 'durationMinutes', label: 'Minutes' },
        { key: 'caloriesBurned', label: 'Calories' },
      ]}
      loading={loading}
      error={error}
    />
  )
}

export default Activities