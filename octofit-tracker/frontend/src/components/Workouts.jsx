import { useEffect, useState } from 'react'

import ResourceList from './ResourceList'
import { getRecords } from './resourceData'

const endpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/'

function Workouts() {
  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadWorkouts = async () => {
      try {
        const response = await fetch(endpoint)
        if (!response.ok) {
          throw new Error(`Unable to load workouts: ${response.status}`)
        }

        const payload = await response.json()
        setRecords(getRecords(payload))
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to load workouts')
      } finally {
        setLoading(false)
      }
    }

    loadWorkouts()
  }, [])

  return (
    <ResourceList
      title="Workouts"
      description="Personalized workout recommendations for athletes."
      endpoint={endpoint}
      records={records}
      fields={[
        { key: 'title', label: 'Title' },
        { key: 'recommendedFor', label: 'Recommended For' },
        { key: 'difficulty', label: 'Difficulty' },
      ]}
      loading={loading}
      error={error}
    />
  )
}

export default Workouts