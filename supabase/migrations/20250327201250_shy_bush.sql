/*
  # Fix RLS policies for user management

  1. Changes
    - Add policy to allow public user creation
    - Add policy to allow users to update their own data
    - Add policy to allow public to read usernames
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Users can read their own data" ON users;

-- Add new policies for users table
CREATE POLICY "Enable read access for all users"
  ON users FOR SELECT
  USING (true);

CREATE POLICY "Enable insert access for public"
  ON users FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Enable update for users based on id"
  ON users FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);