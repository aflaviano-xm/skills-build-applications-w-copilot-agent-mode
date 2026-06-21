import { useEffect, useState } from 'react'

import ResourceList from './ResourceList'
import { getRecords } from './resourceData'

const endpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/'

function Teams() {
  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadTeams = async () => {
      try {
        const response = await fetch(endpoint)
        if (!response.ok) {
          throw new Error(`Unable to load teams: ${response.status}`)
        }

        const payload = await response.json()
        setRecords(getRecords(payload))
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to load teams')
      } finally {
        setLoading(false)
      }
    }

    loadTeams()
  }, [])

  return (
    <ResourceList
      title="Teams"
      description="Groups competing together in OctoFit challenges."
      endpoint={endpoint}
      records={records}
      fields={[
        { key: 'name', label: 'Team Name' },
        { key: 'members', label: 'Members' },
      ]}
      loading={loading}
      error={error}
    />
  )
}

export default Teams