import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export default async function TestConnection() {
  let connectionStatus = 'Testing...'
  let error = null
  let studentCount = 0

  try {
    // Check environment variables
    const hasUrl = !!process.env.SUPABASE_URL
    const hasKey = !!process.env.SUPABASE_ANON_KEY

    if (!hasUrl || !hasKey) {
      throw new Error(
        `Missing environment variables:\n` +
        `SUPABASE_URL: ${hasUrl ? '✓' : '✗'}\n` +
        `SUPABASE_ANON_KEY: ${hasKey ? '✓' : '✗'}`
      )
    }

    const supabase = await createClient()
    
    // Test connection by fetching students
    const { data, error: queryError } = await supabase
      .from('students')
      .select('*', { count: 'exact' })

    if (queryError) {
      throw new Error(`Supabase query error: ${queryError.message}\nCode: ${queryError.code}\nDetails: ${queryError.details}`)
    }

    studentCount = data?.length || 0
    connectionStatus = '✓ Connected successfully!'
  } catch (e) {
    error = e instanceof Error ? e.message : 'Unknown error'
    connectionStatus = '✗ Connection failed'
  }

  return (
    <div className="container">
      <div className="header">
        <h1>Supabase Connection Test</h1>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <h2>Status: {connectionStatus}</h2>
        
        {error && (
          <div className="alert alert-error" style={{ marginTop: '1rem', whiteSpace: 'pre-wrap' }}>
            <strong>Error Details:</strong><br />
            {error}
          </div>
        )}

        {!error && (
          <div className="alert alert-success" style={{ marginTop: '1rem' }}>
            <p><strong>Students found:</strong> {studentCount}</p>
            <p style={{ marginTop: '0.5rem', fontSize: '0.9rem', opacity: 0.8 }}>
              If you see 0 students, your database might be empty or RLS policies might be blocking access.
            </p>
          </div>
        )}

        <div style={{ marginTop: '2rem', padding: '1rem', background: '#f3f4f6', borderRadius: '6px' }}>
          <h3>Environment Variables:</h3>
          <ul style={{ marginTop: '0.5rem', listStyle: 'none' }}>
            <li>
              SUPABASE_URL: {process.env.SUPABASE_URL ? '✓ Set' : '✗ Missing'}
            </li>
            <li>
              SUPABASE_ANON_KEY: {process.env.SUPABASE_ANON_KEY ? '✓ Set' : '✗ Missing'}
            </li>
          </ul>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <h3>Troubleshooting:</h3>
          <ul style={{ marginTop: '0.5rem', lineHeight: '1.8' }}>
            <li>Make sure your <code style={{ background: '#f3f4f6', padding: '0.125rem 0.25rem', borderRadius: '4px' }}>.env</code> or <code style={{ background: '#f3f4f6', padding: '0.125rem 0.25rem', borderRadius: '4px' }}>.env.local</code> file exists in the project root</li>
            <li>Verify your Supabase URL and anon key in your Supabase project settings</li>
            <li>Check if Row Level Security (RLS) is enabled on the students table</li>
            <li>If RLS is enabled, you may need to create policies to allow SELECT operations</li>
            <li>Restart your dev server after changing environment variables</li>
          </ul>
        </div>

        <div style={{ marginTop: '2rem' }}>
          <Link href="/" className="btn btn-primary">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
