export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      students: {
        Row: {
          student_id: string
          prefix: string | null
          first_name: string
          last_name: string | null
          age: number | null
          citizen_id: string | null
          tel: string | null
          personal_email: string | null
          rsu_email: string | null
          graduated_from: string | null
          gpa: number | null
          license_number: string | null
          work_addr: string | null
          work_position: string | null
          status: string | null
          main_advisor: string | null
          co_advisor: string | null
          published: boolean | null
          complete_nofi: boolean | null
          created_at: string
          updated_at: string
          dob: string | null
        }
        Insert: {
          student_id: string
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
          created_at?: string
          updated_at?: string
          dob?: string | null
        }
        Update: {
          student_id?: string
          prefix?: string | null
          first_name?: string
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
          created_at?: string
          updated_at?: string
          dob?: string | null
        }
      }
      academic_terms: {
        Row: {
          term_id: number
          academic_year: number
          semester: string
          calendar_year: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          term_id?: number
          academic_year: number
          semester: string
          calendar_year?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          term_id?: number
          academic_year?: number
          semester?: string
          calendar_year?: number | null
          created_at?: string
          updated_at?: string
        }
      }
      subjects: {
        Row: {
          subject_id: number
          subject_code: string
          subject_name: string
          credits: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          subject_id?: number
          subject_code: string
          subject_name: string
          credits?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          subject_id?: number
          subject_code?: string
          subject_name?: string
          credits?: number | null
          created_at?: string
          updated_at?: string
        }
      }
      student_grades: {
        Row: {
          grade_id: number
          student_id: string | null
          subject_id: number | null
          term_id: number | null
          grade: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          grade_id?: number
          student_id?: string | null
          subject_id?: number | null
          term_id?: number | null
          grade?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          grade_id?: number
          student_id?: string | null
          subject_id?: number | null
          term_id?: number | null
          grade?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      citizen_detail: {
        Row: {
          student_id: string
          citizen_card_addr: string | null
          citizen_card_postcode: string | null
          citizen_card_province: string | null
          citizen_card_district: string | null
          citizen_card_sub_district: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          student_id: string
          citizen_card_addr?: string | null
          citizen_card_postcode?: string | null
          citizen_card_province?: string | null
          citizen_card_district?: string | null
          citizen_card_sub_district?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          student_id?: string
          citizen_card_addr?: string | null
          citizen_card_postcode?: string | null
          citizen_card_province?: string | null
          citizen_card_district?: string | null
          citizen_card_sub_district?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      current_addr: {
        Row: {
          student_id: string
          current_postcode: string | null
          current_province: string | null
          current_district: string | null
          current_sub_district: string | null
          current_addr: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          student_id: string
          current_postcode?: string | null
          current_province?: string | null
          current_district?: string | null
          current_sub_district?: string | null
          current_addr?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          student_id?: string
          current_postcode?: string | null
          current_province?: string | null
          current_district?: string | null
          current_sub_district?: string | null
          current_addr?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      defense_exam: {
        Row: {
          defense_exam_id: number
          student_id: string | null
          date: string | null
          status: string | null
          edit: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          defense_exam_id?: number
          student_id?: string | null
          date?: string | null
          status?: string | null
          edit?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          defense_exam_id?: number
          student_id?: string | null
          date?: string | null
          status?: string | null
          edit?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      proposal_exam: {
        Row: {
          proposal_exam_id: number
          student_id: string | null
          date: string | null
          status: string | null
          edit: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          proposal_exam_id?: number
          student_id?: string | null
          date?: string | null
          status?: string | null
          edit?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          proposal_exam_id?: number
          student_id?: string | null
          date?: string | null
          status?: string | null
          edit?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
