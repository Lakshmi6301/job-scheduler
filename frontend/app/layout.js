import './globals.css'

export const metadata = {
  title: 'Job Scheduler',
  description: 'Job Scheduler & Automation Dashboard'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
