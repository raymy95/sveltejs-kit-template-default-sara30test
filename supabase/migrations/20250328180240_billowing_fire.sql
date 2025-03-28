/*
  # Rename tokens table to specialToken

  1. Changes
    - Rename 'tokens' table to 'specialToken'
    - Recreate policies for the new table name
*/

-- Drop old table if it exists
DROP TABLE IF EXISTS tokens;

-- Create new table with updated name
CREATE TABLE IF NOT EXISTS specialToken (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    token text UNIQUE NOT NULL,
    created_at timestamptz DEFAULT now(),
    expires_at timestamptz,
    is_active boolean DEFAULT true
);

-- Enable RLS
ALTER TABLE specialToken ENABLE ROW LEVEL SECURITY;

-- Add policy to allow reading active tokens
CREATE POLICY "Anyone can read tokens"
    ON specialToken
    FOR SELECT
    TO public
    USING (
        is_active = true 
        AND (expires_at IS NULL OR expires_at > now())
    );

-- Insert a default token
INSERT INTO specialToken (token, is_active)
VALUES ('remyremy', true);