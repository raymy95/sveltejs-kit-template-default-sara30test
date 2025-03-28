/*
  # Fix specialToken table

  1. Changes
    - Drop old tables if they exist
    - Create specialToken table with proper casing
    - Add RLS policies
    - Insert default token

  2. Security
    - Enable RLS on specialToken table
    - Add policy for public read access of active tokens
*/

-- Drop old tables if they exist
DROP TABLE IF EXISTS tokens;
DROP TABLE IF EXISTS specialtoken;
DROP TABLE IF EXISTS "specialToken";

-- Create new table with correct name
CREATE TABLE IF NOT EXISTS specialtoken (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    token text UNIQUE NOT NULL,
    created_at timestamptz DEFAULT now(),
    expires_at timestamptz,
    is_active boolean DEFAULT true
);

-- Enable RLS
ALTER TABLE specialtoken ENABLE ROW LEVEL SECURITY;

-- Add policy to allow reading active tokens
CREATE POLICY "Anyone can read tokens"
    ON specialtoken
    FOR SELECT
    TO public
    USING (
        is_active = true 
        AND (expires_at IS NULL OR expires_at > now())
    );

-- Insert a default token
INSERT INTO specialtoken (token, is_active)
VALUES ('remyremy', true);