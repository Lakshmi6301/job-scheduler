import CreateJobForm from '../components/CreateJobForm'
import JobsTable from '../components/JobsTable'

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 px-6 py-8 space-y-8">
      <h1 className="text-4xl font-bold text-gray-900">
        Job Scheduler Dashboard
      </h1>

      <CreateJobForm />
      <JobsTable />
    </main>
  )
}
