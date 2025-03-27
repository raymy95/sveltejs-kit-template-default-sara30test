/*
  # Add RLS policies for user_cards table

  1. Security Changes
    - Enable RLS on user_cards table
    - Add policy for authenticated users to insert their own cards
    - Add policy for authenticated users to read their own cards
*/

-- Enable RLS
ALTER TABLE user_cards ENABLE ROW LEVEL SECURITY;

-- Policy for inserting cards (users can only insert their own cards)
CREATE POLICY "Users can insert their own cards"
ON user_cards
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Policy for reading cards (users can only read their own cards)
CREATE POLICY "Users can read their own cards"
ON user_cards
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);