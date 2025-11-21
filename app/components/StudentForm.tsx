'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link'

interface Student {
  student_id?: string
  prefix?: string | null
  first_name: string
  last_name?: string | null
  age?: number | null
  citizen_id?: string | null
  tel?: string | null
  personal_email?: string | null
  rsu_email?: string | null
  graduated_from?: string | null
  gpa?: number | null
  license_number?: string | null
  work_addr?: string | null
  work_position?: string | null
  status?: string | null
  main_advisor?: string | null
  co_advisor?: string | null
  published?: boolean | null
  complete_nofi?: boolean | null
  dob?: string | null
}

interface StudentFormProps {
  action: (formData: FormData) => Promise<Student>
  initialData?: Student
}

export default function StudentForm({ action, initialData }: StudentFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true)
    setError(null)
    setSuccess(false)

    try {
      const result = await action(formData)
      if (result) {
        setSuccess(true)
        setTimeout(() => {
          router.push('/')
          router.refresh()
        }, 1500)
      } else {
        setIsSubmitting(false)
      }
    } catch (e) {
      console.error('Form submission error:', e)
      setError(e instanceof Error ? e.message : 'Failed to save student')
      setIsSubmitting(false)
    }
  }

  return (
    <form action={handleSubmit} className="form">
      {success && (
        <div className="alert alert-success">
          Student saved successfully! Redirecting...
        </div>
      )}

      {error && (
        <div className="alert alert-error">
          Error: {error}
        </div>
      )}

      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="student_id">รหัสนักศึกษา *</label>
          <input
            type="text"
            id="student_id"
            name="student_id"
            required
            defaultValue={initialData?.student_id || ''}
            disabled={isSubmitting || !!initialData}
          />
        </div>

        <div className="form-group">
          <label htmlFor="prefix">คำนำหน้า</label>
          <select
            id="prefix"
            name="prefix"
            defaultValue={initialData?.prefix || ''}
            disabled={isSubmitting}
          >
            <option value="">เลือกคำนำหน้า</option>
            <option value="นาย">นาย</option>
            <option value="นาง">นาง</option>
            <option value="นางสาว">นางสาว</option>
            <option value="ดร.">ดร.</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="first_name">ชื่อ *</label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            required
            defaultValue={initialData?.first_name || ''}
            disabled={isSubmitting}
          />
        </div>

        <div className="form-group">
          <label htmlFor="last_name">นามสกุล</label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            defaultValue={initialData?.last_name || ''}
            disabled={isSubmitting}
          />
        </div>

        <div className="form-group">
          <label htmlFor="dob">วัน/เดือน/ปีเกิด</label>
          <input
            type="date"
            id="dob"
            name="dob"
            defaultValue={
              initialData?.dob 
                ? (initialData.dob.includes('T') 
                    ? initialData.dob.split('T')[0] 
                    : initialData.dob.split(' ')[0])
                : ''
            }
            disabled={isSubmitting}
          />
        </div>

        <div className="form-group">
          <label htmlFor="age">อายุ</label>
          <input
            type="number"
            id="age"
            name="age"
            min="0"
            defaultValue={initialData?.age || ''}
            disabled={isSubmitting}
          />
        </div>

        <div className="form-group">
          <label htmlFor="citizen_id">รหัสประชาชน</label>
          <input
            type="text"
            id="citizen_id"
            name="citizen_id"
            defaultValue={initialData?.citizen_id || ''}
            disabled={isSubmitting}
          />
        </div>

        <div className="form-group">
          <label htmlFor="tel">เบอร์โทรศัพท์</label>
          <input
            type="tel"
            id="tel"
            name="tel"
            defaultValue={initialData?.tel || ''}
            disabled={isSubmitting}
          />
        </div>

        <div className="form-group">
          <label htmlFor="personal_email">อีเมลส่วนตัว</label>
          <input
            type="email"
            id="personal_email"
            name="personal_email"
            defaultValue={initialData?.personal_email || ''}
            disabled={isSubmitting}
          />
        </div>

        <div className="form-group">
          <label htmlFor="rsu_email">อีเมล RSU</label>
          <input
            type="email"
            id="rsu_email"
            name="rsu_email"
            defaultValue={initialData?.rsu_email || ''}
            disabled={isSubmitting}
          />
        </div>

        <div className="form-group">
          <label htmlFor="graduated_from">จบการศึกษาจาก</label>
          <input
            type="text"
            id="graduated_from"
            name="graduated_from"
            defaultValue={initialData?.graduated_from || ''}
            disabled={isSubmitting}
          />
        </div>

        <div className="form-group">
          <label htmlFor="gpa">GPA</label>
          <input
            type="number"
            id="gpa"
            name="gpa"
            step="0.01"
            min="0"
            max="4"
            defaultValue={initialData?.gpa || ''}
            disabled={isSubmitting}
          />
        </div>

        <div className="form-group">
          <label htmlFor="license_number">เลขที่ใบอนุญาต</label>
          <input
            type="text"
            id="license_number"
            name="license_number"
            defaultValue={initialData?.license_number || ''}
            disabled={isSubmitting}
          />
        </div>

        <div className="form-group">
          <label htmlFor="status">สถานะ</label>
          <select
            id="status"
            name="status"
            defaultValue={initialData?.status || ''}
            disabled={isSubmitting}
          >
            <option value="">Select status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="graduated">Graduated</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="main_advisor">อาจารย์ที่ปรึกษาหลัก</label>
          <input
            type="text"
            id="main_advisor"
            name="main_advisor"
            defaultValue={initialData?.main_advisor || ''}
            disabled={isSubmitting}
          />
        </div>

        <div className="form-group">
          <label htmlFor="co_advisor">อาจารย์ที่ปรึกษาร่วม</label>
          <input
            type="text"
            id="co_advisor"
            name="co_advisor"
            defaultValue={initialData?.co_advisor || ''}
            disabled={isSubmitting}
          />
        </div>

        <div className="form-group">
          <label htmlFor="work_position">ตำแหน่งงาน</label>
          <input
            type="text"
            id="work_position"
            name="work_position"
            defaultValue={initialData?.work_position || ''}
            disabled={isSubmitting}
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="work_addr">สถานที่ทำงาน</label>
        <input
          type='text'
          id="work_addr"
          name="work_addr"
          defaultValue={initialData?.work_addr || ''}
          disabled={isSubmitting}
        />
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <div className="form-group" style={{ margin: 0 }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
            <input
              type="checkbox"
              id="published"
              name="published"
              value="true"
              defaultChecked={initialData?.published || false}
              disabled={isSubmitting}
            />
            Published
          </label>
        </div>

        <div className="form-group" style={{ margin: 0 }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
            <input
              type="checkbox"
              id="complete_nofi"
              name="complete_nofi"
              value="true"
              defaultChecked={initialData?.complete_nofi || false}
              disabled={isSubmitting}
            />
            Complete NOFI
          </label>
        </div>
      </div>

      <div className="form-actions">
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-primary"
        >
          {isSubmitting ? 'Saving...' : initialData ? 'Update' : 'Create'}
        </button>
        <Link href="/" className="btn btn-secondary">
          Cancel
        </Link>
      </div>
    </form>
  )
}
