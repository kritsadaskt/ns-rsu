import Link from 'next/link'
import { createStudent } from '../actions'
import StudentForm from '../components/StudentForm'
import { FaArrowLeft } from 'react-icons/fa'

export default function CreatePage() {
  return (
    <div className="container">
      <div className="header">
        <h1>สร้างข้อมูลนักศึกษาใหม่</h1>
        <div className="h-7"></div>
        <Link href="/" className="flex items-center gap-2 text-blue-600"><FaArrowLeft /> กลับหน้าหลัก</Link>
      </div>

      <StudentForm action={createStudent} />
    </div>
  )
}
