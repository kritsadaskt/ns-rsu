-- Enable Row Level Security on students table (if not already enabled)
ALTER TABLE students ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (optional - remove if you want to keep existing policies)
-- DROP POLICY IF EXISTS "Allow public read access" ON students;
-- DROP POLICY IF EXISTS "Allow public insert" ON students;
-- DROP POLICY IF EXISTS "Allow public update" ON students;
-- DROP POLICY IF EXISTS "Allow public delete" ON students;

-- Create policy for SELECT (read) operations
-- This allows anonymous users (anon role) to read all students
CREATE POLICY "Allow public read access" ON students
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Create policy for INSERT operations
-- This allows anonymous users to create new students
CREATE POLICY "Allow public insert" ON students
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Create policy for UPDATE operations
-- This allows anonymous users to update students
CREATE POLICY "Allow public update" ON students
  FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

-- Create policy for DELETE operations
-- This allows anonymous users to delete students
CREATE POLICY "Allow public delete" ON students
  FOR DELETE
  TO anon, authenticated
  USING (true);

-- Apply similar policies to related tables if needed
-- Uncomment and modify as needed:

-- ALTER TABLE academic_terms ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "Allow public access" ON academic_terms
--   FOR ALL
--   TO anon, authenticated
--   USING (true)
--   WITH CHECK (true);

-- ALTER TABLE subjects ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "Allow public access" ON subjects
--   FOR ALL
--   TO anon, authenticated
--   USING (true)
--   WITH CHECK (true);

-- ALTER TABLE student_grades ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "Allow public access" ON student_grades
--   FOR ALL
--   TO anon, authenticated
--   USING (true)
--   WITH CHECK (true);

-- ALTER TABLE citizen_detail ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "Allow public access" ON citizen_detail
--   FOR ALL
--   TO anon, authenticated
--   USING (true)
--   WITH CHECK (true);

-- ALTER TABLE current_addr ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "Allow public access" ON current_addr
--   FOR ALL
--   TO anon, authenticated
--   USING (true)
--   WITH CHECK (true);

-- ALTER TABLE defense_exam ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "Allow public access" ON defense_exam
--   FOR ALL
--   TO anon, authenticated
--   USING (true)
--   WITH CHECK (true);

-- ALTER TABLE proposal_exam ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "Allow public access" ON proposal_exam
--   FOR ALL
--   TO anon, authenticated
--   USING (true)
--   WITH CHECK (true);

