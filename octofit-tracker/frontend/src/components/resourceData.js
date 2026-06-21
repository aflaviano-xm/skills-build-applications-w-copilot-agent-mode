const getRecords = (payload) => {
  if (Array.isArray(payload)) {
    return payload
  }

  if (Array.isArray(payload?.results)) {
    return payload.results
  }

  if (Array.isArray(payload?.items)) {
    return payload.items
  }

  if (Array.isArray(payload?.data)) {
    return payload.data
  }

  return []
}

const formatValue = (value) => {
  if (value === null || value === undefined || value === '') {
    return 'Not set'
  }

  if (Array.isArray(value)) {
    return value.map(formatValue).join(', ')
  }

  if (typeof value === 'object') {
    return value.username || value.name || value.title || value.email || value._id || JSON.stringify(value)
  }

  return String(value)
}

export { formatValue, getRecords }