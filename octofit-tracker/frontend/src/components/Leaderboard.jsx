import { useEffect, useState } from 'react'

import ResourceList from './ResourceList'
import { getRecords } from './resourceData'

const endpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
  : 'http://localhost:8000/api/leaderboard/'

function Leaderboard() {
  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadLeaderboard = async () => {
      try {
        const response = await fetch(endpoint)
        if (!response.ok) {
          throw new Error(`Unable to load leaderboard: ${response.status}`)
        }

        const payload = await response.json()
        setRecords(getRecords(payload))
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to load leaderboard')
      } finally {
        setLoading(false)
      }
    }

    loadLeaderboard()
  }, [])

  return (
    <ResourceList
      title="Leaderboard"
      description="Competitive rankings based on OctoFit activity scores."
      endpoint={endpoint}
      records={records}
      fields={[
        { key: 'rank', label: 'Rank' },
        { key: 'user', label: 'User' },
        { key: 'score', label: 'Score' },
      ]}
      loading={loading}
      error={error}
    />
  )
}

export default Leaderboard