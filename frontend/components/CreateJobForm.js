'use client'

import { useState } from 'react'
import { createJob } from '../services/api'

export default function CreateJobForm() {
  const [taskName, setTaskName] = useState('')
  const [priority, setPriority] = useState('Low')
  const [payload, setPayload] = useState('{}')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const parsedPayload = JSON.parse(payload)

      await createJob({
        taskName,
        priority,
        payload: parsedPayload
      })

      setTaskName('')
      setPriority('Low')
      setPayload('{}')
      setMessage('Job created successfully')
    } catch {
      setMessage('Invalid JSON or server error')
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow border border-gray-200 mb-8">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">
        Create Job
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Task Name
          </label>
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter task name"
            required
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Priority
          </label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900">
            Payload (JSON)
          </label>
          <textarea
            value={payload}
            onChange={(e) => setPayload(e.target.value)}
            rows="5"
            className="w-full border border-gray-300 px-3 py-2 rounded font-mono text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder='{"email":"test@example.com"}'
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded font-medium"
        >
          Create Job
        </button>
      </form>

      {message && (
        <p className="mt-4 text-sm font-medium text-green-600">
          {message}
        </p>
      )}
    </div>
  )
}
