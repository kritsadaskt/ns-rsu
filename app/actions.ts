'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function getStudents() {
  const supabase = await createClient()
  
  // Verify environment variables
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
    throw new Error('Missing Supabase environment variables. Please check your .env file.')
  }
  
  const { data, error } = await supabase
    .from('students')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Supabase error:', error)
    throw new Error(`Failed to fetch students: ${error.message}`)
  }

  return data || []
}

export async function getStudent(studentId: string) {
  const supabase = await createClient()

  console.log('Get student', studentId)
  
  const { data, error } = await supabase
    .from('students')
    .select('*')
    .eq('student_id', studentId)
    .single()

  if (error) {
    console.error('Get student error:', error)
    throw new Error(`Failed to load student: ${error.message}`)
  }

  if (!data) {
    throw new Error('Student not found')
  }

  return data
}

export async function createStudent(formData: FormData) {
  const supabase = await createClient()
  
  const studentData = {
    student_id: formData.get('student_id') as string,
    prefix: formData.get('prefix') as string | null,
    first_name: formData.get('first_name') as string,
    last_name: formData.get('last_name') as string | null,
    age: formData.get('age') ? parseInt(formData.get('age') as string) : null,
    citizen_id: formData.get('citizen_id') as string | null,
    tel: formData.get('tel') as string | null,
    personal_email: formData.get('personal_email') as string | null,
    rsu_email: formData.get('rsu_email') as string | null,
    graduated_from: formData.get('graduated_from') as string | null,
    gpa: formData.get('gpa') ? parseFloat(formData.get('gpa') as string) : null,
    license_number: formData.get('license_number') as string | null,
    work_addr: formData.get('work_addr') as string | null,
    work_position: formData.get('work_position') as string | null,
    status: formData.get('status') as string | null,
    main_advisor: formData.get('main_advisor') as string | null,
    co_advisor: formData.get('co_advisor') as string | null,
    published: formData.get('published') === 'true',
    complete_nofi: formData.get('complete_nofi') === 'true',
    dob: formData.get('dob') as string | null,
  }

  const { data, error } = await supabase
    .from('students')
    .insert([studentData])
    .select()
    .single()

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/')
  return data
}

export async function updateStudent(studentId: string, formData: FormData) {
  const supabase = await createClient()
  
  // Helper function to get value or null
  const getValue = (key: string): string | null => {
    const value = formData.get(key)
    return value ? (value as string).trim() || null : null
  }

  // Helper function to get number or null
  const getNumber = (key: string): number | null => {
    const value = getValue(key)
    return value ? parseFloat(value) : null
  }

  // Helper function to get integer or null
  const getInteger = (key: string): number | null => {
    const value = getValue(key)
    return value ? parseInt(value) : null
  }

  // Build update object - include all fields, even if null
  const studentData: any = {
    prefix: getValue('prefix'),
    first_name: getValue('first_name') || '',
    last_name: getValue('last_name'),
    age: getInteger('age'),
    citizen_id: getValue('citizen_id'),
    tel: getValue('tel'),
    personal_email: getValue('personal_email'),
    rsu_email: getValue('rsu_email'),
    graduated_from: getValue('graduated_from'),
    gpa: getNumber('gpa'),
    license_number: getValue('license_number'),
    work_addr: getValue('work_addr'),
    work_position: getValue('work_position'),
    status: getValue('status'),
    main_advisor: getValue('main_advisor'),
    co_advisor: getValue('co_advisor'),
    published: formData.get('published') === 'true',
    complete_nofi: formData.get('complete_nofi') === 'true',
    dob: getValue('dob'),
    updated_at: new Date().toISOString(),
  }

  // Only remove truly empty strings for optional fields, but keep nulls for database
  // Convert empty strings to null for optional fields
  const optionalFields = ['prefix', 'last_name', 'age', 'citizen_id', 'tel', 'personal_email', 
    'rsu_email', 'graduated_from', 'gpa', 'license_number', 'work_addr', 'work_position', 
    'status', 'main_advisor', 'co_advisor', 'dob']
  
  optionalFields.forEach(key => {
    if (studentData[key] === '') {
      studentData[key] = null
    }
  })

  const { data, error } = await supabase
    .from('students')
    .update(studentData)
    .eq('student_id', studentId)
    .select()
    .single()

  if (error) {
    console.error('Update error:', error)
    throw new Error(`Failed to update student: ${error.message}`)
  }

  revalidatePath('/')
  revalidatePath(`/edit/${studentId}`)
  return data
}

export async function deleteStudent(studentId: string) {
  const supabase = await createClient()
  
  const { error } = await supabase
    .from('students')
    .delete()
    .eq('student_id', studentId)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/')
}
