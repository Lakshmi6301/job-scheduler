'use client'

import { useEffect, useState, useCallback } from 'react'
import { fetchJobs, runJob } from '../services/api'

export default function JobsTable() {
  const [jobs, setJobs] = useState([])
  const [statusFilter, setStatusFilter] = useState('')
  const [priorityFilter, setPriorityFilter] = useState('')
  const [loading, setLoading] = useState(false)

  const loadJobs = useCallback(async () => {
    setLoading(true)
    try {
      const data = await fetchJobs({
        status: statusFilter || undefined,
        priority: priorityFilter || undefined
      })
      setJobs(data)
    } finally {
      setLoading(false)
    }
  }, [statusFilter, priorityFilter])

  useEffect(() => {
    loadJobs()
  }, [loadJobs])

  const handleRunJob = async (id) => {
    await runJob(id)
    loadJobs()
  }

  const statusBadge = (status) => {
    if (status === 'pending') return 'bg-yellow-100 text-yellow-800'
    if (status === 'running') return 'bg-blue-100 text-blue-800'
    if (status === 'completed') return 'bg-green-100 text-green-800'
    return ''
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">
        Jobs
      </h2>

      <div className="flex gap-4 mb-6">
        <select
          className="border border-gray-300 px-3 py-2 rounded text-gray-800"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="running">Running</option>
          <option value="completed">Completed</option>
        </select>

        <select
          className="border border-gray-300 px-3 py-2 rounded text-gray-800"
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
        >
          <option value="">All Priority</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      {loading ? (
        <p className="text-gray-600">Loading jobs...</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b text-left text-gray-900">
              <th className="py-3">Task</th>
              <th className="py-3">Priority</th>
              <th className="py-3">Status</th>
              <th className="py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr
                key={job.id}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="py-3 text-blue-600 underline">
                  <a href={`/jobs/${job.id}`}>{job.taskName}</a>
                </td>
                <td className="py-3 text-gray-800">{job.priority}</td>
                <td className="py-3">
                  <span
                    className={`px-2 py-1 rounded text-sm font-medium capitalize ${statusBadge(
                      job.status
                    )}`}
                  >
                    {job.status}
                  </span>
                </td>
                <td className="py-3">
                  {job.status === 'pending' ? (
                    <button
                      onClick={() => handleRunJob(job.id)}
                      className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
                    >
                      Run Job
                    </button>
                  ) : (
                    <span className="text-gray-500 text-sm">—</span>
                  )}
                </td>
              </tr>
            ))}

            {jobs.length === 0 && (
              <tr>
                <td colSpan="4" className="py-6 text-center text-gray-500">
                  No jobs found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  )
}
