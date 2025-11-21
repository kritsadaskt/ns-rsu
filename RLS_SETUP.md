# Row Level Security (RLS) Setup Guide

## Problem

If your RLS policies are set to use the `postgres` role, only the database superuser can access the data. Since your Next.js app uses the `anon` key, it connects as an anonymous user and won't have access.

## Solution

You need to update your RLS policies to allow access for the `anon` and/or `authenticated` roles.

## Steps to Fix

### Option 1: Using Supabase Dashboard (Recommended for Quick Fix)

1. Go to your Supabase project dashboard
2. Navigate to **Authentication** → **Policies**
3. Select the `students` table
4. For each existing policy:
   - Click on the policy
   - Change the **Target roles** from `postgres` to `anon, authenticated`
   - Save the changes

### Option 2: Using SQL Editor (Recommended for Production)

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Run the SQL from `supabase/migrations/002_setup_rls_policies.sql`

This will:
- Enable RLS on the students table (if not already enabled)
- Create policies that allow `anon` and `authenticated` roles to:
  - SELECT (read) all students
  - INSERT (create) new students
  - UPDATE (edit) students
  - DELETE students

### Option 3: Disable RLS (Not Recommended for Production)

If you want to disable RLS entirely (not recommended for production):

```sql
ALTER TABLE students DISABLE ROW LEVEL SECURITY;
```

## Understanding Roles

- **`postgres`**: Database superuser - has full access to everything
- **`anon`**: Anonymous users - used when connecting with the anon key (what your Next.js app uses)
- **`authenticated`**: Logged-in users - used when users are authenticated

## Security Considerations

The policies in `002_setup_rls_policies.sql` allow full access to anyone. For production, you should:

1. Restrict access based on user authentication
2. Add conditions to policies (e.g., users can only edit their own data)
3. Use more granular permissions

Example of a more secure policy:

```sql
-- Only allow users to see their own data
CREATE POLICY "Users can view own data" ON students
  FOR SELECT
  TO authenticated
  USING (auth.uid()::text = student_id);
```

## Testing

After updating the policies:
1. Visit `http://localhost:3000/test-connection` to verify the connection
2. Check if students are now visible on the home page
3. Try creating, editing, and deleting a student to verify all operations work

