/*
  # Fix RLS policies for user_cards table

  1. Changes
    - Drop all existing policies
    - Re-enable RLS
    - Create new policies with proper authentication checks
    
  2. Security
    - Enable RLS on user_cards table
    - Add policies for INSERT and SELECT operations
    - Ensure users can only access their own cards
    - Verify card existence before allowing insertion
*/

-- First, drop all existing policies
DROP POLICY IF EXISTS "Users can insert their own cards" ON user_cards;
DROP POLICY IF EXISTS "Users can read their own cards" ON user_cards;
DROP POLICY IF EXISTS "Users can delete their own cards" ON user_cards;
DROP POLICY IF EXISTS "Users can unlock cards" ON user_cards;
DROP POLICY IF EXISTS "Enable insert access for public" ON user_cards;
DROP POLICY IF EXISTS "Enable read access for all users" ON user_cards;

-- Make sure RLS is enabled
ALTER TABLE user_cards ENABLE ROW LEVEL SECURITY;

-- Create new INSERT policy with card existence check
CREATE POLICY "Users can insert their own cards"
ON user_cards
FOR INSERT
TO authenticated
WITH CHECK (
    auth.uid() = user_id AND
    EXISTS (
        SELECT 1 FROM cards 
        WHERE id = card_id
    )
);

-- Create new SELECT policy
CREATE POLICY "Users can read their own cards"
ON user_cards
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Create new DELETE policy
CREATE POLICY "Users can delete their own cards"
ON user_cards
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- Add unique constraint to prevent duplicate cards
ALTER TABLE user_cards DROP CONSTRAINT IF EXISTS user_cards_user_id_card_id_key;
ALTER TABLE user_cards ADD CONSTRAINT user_cards_user_id_card_id_key UNIQUE (user_id, card_id);