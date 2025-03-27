/*
  # Complete RLS setup for user_cards table
  
  1. Security
    - Drop existing policies to start fresh
    - Enable RLS on user_cards table
    - Add comprehensive policies for authenticated users to:
      - Insert their own cards
      - Read their own cards
      - Delete their own cards
    
  Note: This migration provides a complete reset of policies
*/

-- First, drop existing policies to start fresh
DROP POLICY IF EXISTS "Users can insert their own cards" ON user_cards;
DROP POLICY IF EXISTS "Users can read their own cards" ON user_cards;

-- Enable RLS
ALTER TABLE user_cards ENABLE ROW LEVEL SECURITY;

-- Create comprehensive policies
CREATE POLICY "Users can insert their own cards"
ON user_cards
FOR INSERT
TO authenticated
WITH CHECK (
    auth.uid() = user_id
);

CREATE POLICY "Users can read their own cards"
ON user_cards
FOR SELECT
TO authenticated
USING (
    auth.uid() = user_id
);

-- Add delete policy for completeness
CREATE POLICY "Users can delete their own cards"
ON user_cards
FOR DELETE
TO authenticated
USING (
    auth.uid() = user_id
);