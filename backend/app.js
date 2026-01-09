require('dotenv').config()
const express = require('express')
const cors = require('cors')
const jobsRoutes = require('./routes/jobsRoutes')

const app = express()

app.use(cors())
app.use(express.json())

app.use(jobsRoutes)

app.get('/', (req, res) => {
  res.json({ message: 'Job Scheduler API running' })
})

const PORT = 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
