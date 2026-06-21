import { formatValue } from './resourceData'

function ResourceList({ title, description, endpoint, records, fields, loading, error }) {
  return (
    <section>
      <div className="section-heading">
        <div>
          <p className="eyebrow">OctoFit API</p>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        <code>{endpoint}</code>
      </div>

      {loading && <div className="alert alert-info">Loading {title.toLowerCase()}...</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && records.length === 0 && (
        <div className="alert alert-secondary">No records found.</div>
      )}

      {!loading && !error && records.length > 0 && (
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead>
              <tr>
                {fields.map((field) => (
                  <th key={field.key} scope="col">
                    {field.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {records.map((record, index) => (
                <tr key={record._id || record.id || index}>
                  {fields.map((field) => (
                    <td key={field.key}>{formatValue(record[field.key])}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}

export default ResourceList