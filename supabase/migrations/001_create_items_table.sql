-- Create items table
CREATE TABLE IF NOT EXISTS items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  status TEXT
);

-- Enable Row Level Security
ALTER TABLE items ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows all operations (adjust based on your security needs)
-- For production, you should create more restrictive policies
CREATE POLICY "Allow all operations" ON items
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Create an index on created_at for better query performance
CREATE INDEX IF NOT EXISTS idx_items_created_at ON items(created_at DESC);

