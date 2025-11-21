import Link from 'next/link'
import { getStudents, deleteStudent } from './actions'
import DeleteButton from './components/DeleteButton'
import { FaPlus } from 'react-icons/fa'

export default async function Home() {
  let students = []
  let error = null

  try {
    students = await getStudents()
    // Log for debugging (remove in production)
    if (process.env.NODE_ENV === 'development') {
      console.log('Fetched students:', students?.length || 0)
    }
  } catch (e) {
    error = e instanceof Error ? e.message : 'Failed to load students'
    // Log error for debugging
    console.error('Error loading students:', e)
  }

  return (
    <div className="container">
      <div className="header flex justify-between items-center">
        <div>
          <h1>NS RSU Database</h1>
          <p>ระบบจัดการข้อมูลนักศึกษาปริญญาโท</p>
        </div>
        <div>
          <Link href="/create" className="btn btn-primary flex items-center gap-2">สร้าง <FaPlus /></Link>
        </div>
      </div>

      {error && (
        <div className="alert alert-error">
          Error: {error}
        </div>
      )}

      {!error && students.length === 0 && (
        <div className="loading">
          <p>No students found. <Link href="/create">Create your first student</Link></p>
        </div>
      )}

      {!error && students.length > 0 && (
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>รหัสนักศึกษา</th>
                <th>ชื่อ-นามสกุล</th>
                <th>อีเมล RSU</th>
                <th>สถานะ</th>
                <th>GPA</th>
                <th>วันที่สร้าง</th>
                <th>จัดการ</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.student_id}>
                  <td>{student.student_id}</td>
                  <td>
                    {student.prefix} {student.first_name} {student.last_name}
                  </td>
                  <td>{student.rsu_email || student.personal_email || '-'}</td>
                  <td>{student.status || '-'}</td>
                  <td>{student.gpa ? student.gpa.toFixed(2) : '-'}</td>
                  <td>{new Date(student.created_at).toLocaleDateString()}</td>
                  <td>
                    <div className="flex gap-2">
                      <Link href={`/edit/${student.student_id}`} className="btn btn-secondary">
                        Edit
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
