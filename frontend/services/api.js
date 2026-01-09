const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export const createJob = async (jobData) => {
  const response = await fetch(`${API_BASE_URL}/jobs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(jobData)
  })

  if (!response.ok) {
    throw new Error('Failed to create job')
  }

  return response.json()
}

export const fetchJobs = async (filters = {}) => {
  const params = new URLSearchParams(filters)
  const response = await fetch(`${API_BASE_URL}/jobs?${params.toString()}`)

  if (!response.ok) {
    throw new Error('Failed to fetch jobs')
  }

  return response.json()
}

export const fetchJobById = async (id) => {
  const response = await fetch(`${API_BASE_URL}/jobs/${id}`)

  if (!response.ok) {
    throw new Error('Failed to fetch job')
  }

  return response.json()
}

export const runJob = async (id) => {
  const response = await fetch(`${API_BASE_URL}/run-job/${id}`, {
    method: 'POST'
  })

  if (!response.ok) {
    throw new Error('Failed to run job')
  }

  return response.json()
}
