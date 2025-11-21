import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getStudent, updateStudent } from '../../actions'
import StudentForm from '../../components/StudentForm'

export default async function EditPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  let student = null
  let error = null

  try {
    student = await getStudent(id)
  } catch (e) {
    error = e instanceof Error ? e.message : 'Failed to load student'
    console.error('Error loading student:', e)
  }

  if (error || !student) {
    return (
      <div className="container">
        <div className="header">
          <h1>แก้ไขข้อมูลนักศึกษา {student?.student_id}</h1>
        </div>
        <div className="alert alert-error">
          <strong>Error:</strong> {error || 'Student not found'}
        </div>
        <Link href="/" className="btn btn-secondary">
          Back to Home
        </Link>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="header">
        <h1>แก้ไขข้อมูลนักศึกษา {student?.student_id}</h1>
      </div>

      <StudentForm action={updateStudent.bind(null, id)} initialData={student} />
    </div>
  )
}
