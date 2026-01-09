This project is a simple full-stack automation system designed to manage and execute background jobs. It allows users to create tasks, manually run them, monitor their execution status, and automatically notify external systems through webhooks once a job is completed.

This application was developed as part of the Dotix Technologies – Full Stack Developer Skill Test, with a focus on full-stack architecture, API design, and real-world workflow simulation.


Features

Create background jobs with a task name, priority level, and flexible JSON payload
Track the complete job lifecycle: Pending → Running → Completed
Manually trigger job execution from the dashboard
Filter jobs based on status and priority
View detailed job information with neatly formatted JSON payloads
Automatically send a webhook notification after job completion
Clean, responsive, and user-friendly interface built using Tailwind CSS


Tech Stack

Frontend

Next.js
React
Tailwind CSS

Backend

Node.js
Express.js
RESTful APIs

Database
SQLite

Integrations
Outbound webhook integration using webhook.site for testing and validation

Project Structure:

job-scheduler/
├── frontend/
│ ├── app/
│ ├── components/
│ └── services/
│
├── backend/
│ ├── routes/
│ ├── controllers/
│ ├── database/
│ └── app.js
│
-─- README.md



## Architecture Overview

The frontend communicates with the backend using REST APIs. All job-related actions such as creating jobs, fetching job lists, running jobs, and viewing job details are handled through these APIs.

The backend is responsible for job creation, simulating background job execution, managing job status transitions, and triggering webhooks. Job execution is simulated using asynchronous timers to represent background processing.

All job data is stored in a SQLite database. When a job finishes execution and its status changes to `completed`, the backend automatically sends a webhook notification to a configured external URL.

---

## Database Schema

### `jobs` Table

| Column     | Type         | Description |
|-----------|--------------|-------------|
| id        | INTEGER (PK) | Unique job identifier |
| taskName  | TEXT         | Name of the task |
| payload   | TEXT (JSON)  | Job data in JSON format |
| priority  | TEXT         | Job priority (Low, Medium, High) |
| status    | TEXT         | Current job status |
| createdAt| TEXT         | Job creation timestamp |
| updatedAt| TEXT         | Last updated timestamp |

---

## API Documentation

### Create Job  
**POST `/jobs`**

```json
{
  "taskName": "Send Email",
  "priority": "High",
  "payload": {
    "email": "test@example.com"
  }
}

List Jobs

GET /jobs
Optional query parameters:

status
priority

Get Job Details

GET /jobs/:id
Returns full details of a single job.

Run Job

POST /run-job/:id

Simulates background execution:

Updates status to running
Waits 3 seconds
Updates status to completed
Triggers webhook


Webhook Integration:

When a job completes, the backend sends a POST request to a configured webhook URL.
Webhook Payload
{
  "jobId": 1,
  "taskName": "Send Email",
  "priority": "High",
  "payload": {
    "email": "test@example.com"
  },
  "completedAt": "2026-01-09T12:00:00Z"
}

Setup Instructions:
Backend Setup:

cd backend
npm install
node app.js

Backend runs on:
http://localhost:5000

Frontend Setup
cd frontend
npm install
npm run dev

Frontend runs on:
http://localhost:3000


AI Usage Disclosure:
AI tools were used during development for support.
AI Tools Used:
ChatGPT
Model Used:
GPT- 3.5

How AI Helped:

Understanding project requirements
Debugging issues
Improving documentation clarity


Author: Venkata Lakshmi Karri