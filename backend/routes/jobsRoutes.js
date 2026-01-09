const express = require('express')
const {
  createJob,
  listJobs,
  getJobById,
  runJob
} = require('../controllers/jobsController')

const router = express.Router()

router.post('/jobs', createJob)
router.get('/jobs', listJobs)
router.get('/jobs/:id', getJobById)
router.post('/run-job/:id', runJob)

module.exports = router
