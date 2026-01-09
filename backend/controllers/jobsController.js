const db = require('../database/db')
const axios = require('axios')

const createJob = (req, res) => {
  const { taskName, payload, priority } = req.body

  if (!taskName || !priority) {
    return res.status(400).json({ message: 'taskName and priority are required' })
  }

  let payloadString = '{}'
  if (payload) {
    try {
      payloadString = JSON.stringify(payload)
    } catch {
      return res.status(400).json({ message: 'Invalid payload JSON' })
    }
  }

  const now = new Date().toISOString()

  db.run(
    `
      INSERT INTO jobs (taskName, payload, priority, status, createdAt, updatedAt)
      VALUES (?, ?, ?, ?, ?, ?)
    `,
    [taskName, payloadString, priority, 'pending', now, now],
    function (err) {
      if (err) {
        return res.status(500).json({ message: 'Database error' })
      }

      res.status(201).json({
        id: this.lastID,
        taskName,
        priority,
        status: 'pending'
      })
    }
  )
}

const listJobs = (req, res) => {
  const { status, priority } = req.query

  let query = 'SELECT * FROM jobs WHERE 1=1'
  const params = []

  if (status) {
    query += ' AND status = ?'
    params.push(status)
  }

  if (priority) {
    query += ' AND priority = ?'
    params.push(priority)
  }

  query += ' ORDER BY createdAt DESC'

  db.all(query, params, (err, rows) => {
    if (err) {
      return res.status(500).json({ message: 'Database error' })
    }

    const jobs = rows.map(job => ({
      ...job,
      payload: job.payload ? JSON.parse(job.payload) : {}
    }))

    res.json(jobs)
  })
}

const getJobById = (req, res) => {
  const { id } = req.params

  db.get('SELECT * FROM jobs WHERE id = ?', [id], (err, job) => {
    if (err) {
      return res.status(500).json({ message: 'Database error' })
    }

    if (!job) {
      return res.status(404).json({ message: 'Job not found' })
    }

    job.payload = job.payload ? JSON.parse(job.payload) : {}
    res.json(job)
  })
}

const runJob = (req, res) => {
  const { id } = req.params

  db.get('SELECT * FROM jobs WHERE id = ?', [id], (err, job) => {
    if (err) {
      return res.status(500).json({ message: 'Database error' })
    }

    if (!job) {
      return res.status(404).json({ message: 'Job not found' })
    }

    if (job.status !== 'pending') {
      return res.status(400).json({ message: 'Job already processed' })
    }

    const runningTime = new Date().toISOString()

    db.run(
      'UPDATE jobs SET status = ?, updatedAt = ? WHERE id = ?',
      ['running', runningTime, id]
    )

    setTimeout(async () => {
      const completedAt = new Date().toISOString()

      db.run(
        'UPDATE jobs SET status = ?, updatedAt = ?, completedAt = ? WHERE id = ?',
        ['completed', completedAt, completedAt, id]
      )

      const webhookPayload = {
        jobId: job.id,
        taskName: job.taskName,
        priority: job.priority,
        payload: job.payload ? JSON.parse(job.payload) : {},
        completedAt
      }

      try {
        const response = await axios.post(
          process.env.WEBHOOK_URL,
          webhookPayload
        )

        console.log('Webhook sent:', response.status)
      } catch (error) {
        console.log('Webhook failed:', error.message)
      }
    }, 3000)

    res.json({ message: 'Job started' })
  })
}

module.exports = {
  createJob,
  listJobs,
  getJobById,
  runJob
}
