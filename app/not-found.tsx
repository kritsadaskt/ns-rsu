import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="container">
      <div className="header">
        <h1>404 - Page Not Found</h1>
      </div>
      <p style={{ fontSize: '1.125rem', marginBottom: '1.5rem' }}>The page you are looking for does not exist.</p>
      <Link href="/" className="btn btn-primary">
        Go Home
      </Link>
    </div>
  )
}
