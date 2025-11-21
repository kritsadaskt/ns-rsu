import Link from 'next/link'
import { createStudent } from '../actions'
import StudentForm from '../components/StudentForm'

export default function CreatePage() {
  return (
    <div className="container">
      <div className="header">
        <h1>Create New Student</h1>
        <nav className="nav">
          <Link href="/">View All</Link>
          <Link href="/create">Create New</Link>
        </nav>
      </div>

      <StudentForm action={createStudent} />
    </div>
  )
}
