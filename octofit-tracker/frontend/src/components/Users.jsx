import { useEffect, useState } from 'react'

import ResourceList from './ResourceList'
import { getRecords } from './resourceData'

const endpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`
  : 'http://localhost:8000/api/users/'

function Users() {
  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await fetch(endpoint)
        if (!response.ok) {
          throw new Error(`Unable to load users: ${response.status}`)
        }

        const payload = await response.json()
        setRecords(getRecords(payload))
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to load users')
      } finally {
        setLoading(false)
      }
    }

    loadUsers()
  }, [])

  return (
    <ResourceList
      title="Users"
      description="Registered OctoFit athletes and profile details."
      endpoint={endpoint}
      records={records}
      fields={[
        { key: 'username', label: 'Username' },
        { key: 'email', label: 'Email' },
        { key: 'profileImageUrl', label: 'Profile Image' },
      ]}
      loading={loading}
      error={error}
    />
  )
}

export default Users