/*
  # Update RLS policies for user_cards table
  
  1. Security
    - Enable RLS on user_cards table if not already enabled
    - Add policies for authenticated users to:
      - Insert their own cards
      - Read their own cards
    
  Note: Uses DO blocks to check for existing policies before creating
*/

-- Enable RLS if not already enabled
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_tables
        WHERE schemaname = 'public'
        AND tablename = 'user_cards'
        AND rowsecurity = true
    ) THEN
        ALTER TABLE user_cards ENABLE ROW LEVEL SECURITY;
    END IF;
END $$;

-- Create insert policy if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_policies
        WHERE schemaname = 'public'
        AND tablename = 'user_cards'
        AND policyname = 'Users can insert their own cards'
    ) THEN
        CREATE POLICY "Users can insert their own cards"
        ON user_cards
        FOR INSERT
        TO authenticated
        WITH CHECK (auth.uid() = user_id);
    END IF;
END $$;

-- Create select policy if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_policies
        WHERE schemaname = 'public'
        AND tablename = 'user_cards'
        AND policyname = 'Users can read their own cards'
    ) THEN
        CREATE POLICY "Users can read their own cards"
        ON user_cards
        FOR SELECT
        TO authenticated
        USING (auth.uid() = user_id);
    END IF;
END $$;