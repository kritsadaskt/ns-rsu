'use client'

import { deleteStudent } from '../actions'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { FaSpinner } from 'react-icons/fa'

export default function DeleteButton({ id }: { id: string }) {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)

  async function handleDelete() {
    if (!confirm('Are you sure you want to delete this student?')) {
      return
    }

    setIsDeleting(true)
    try {
      await deleteStudent(id)
      router.refresh()
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Failed to delete student')
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      {isDeleting && <div className="delete-overlay" />}
      <button
        onClick={handleDelete}
        disabled={isDeleting}
        className="btn btn-danger"
      >
        {isDeleting ? (
          <>
            <FaSpinner className="spinner-icon" />
            Deleting...
          </>
        ) : (
          'Delete'
        )}
      </button>
    </div>
  )
}
