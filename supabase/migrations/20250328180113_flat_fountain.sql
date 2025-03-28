/*
  # Add tokens table for access control

  1. New Tables
    - `tokens`
      - `id` (uuid, primary key)
      - `token` (text, unique)
      - `created_at` (timestamp)
      - `expires_at` (timestamp)
      - `is_active` (boolean)

  2. Security
    - Enable RLS
    - Add policy for public read access to active tokens
*/

CREATE TABLE IF NOT EXISTS tokens (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    token text UNIQUE NOT NULL,
    created_at timestamptz DEFAULT now(),
    expires_at timestamptz,
    is_active boolean DEFAULT true
);

-- Enable RLS
ALTER TABLE tokens ENABLE ROW LEVEL SECURITY;

-- Add policy to allow reading active tokens
CREATE POLICY "Anyone can read tokens"
    ON tokens
    FOR SELECT
    TO public
    USING (
        is_active = true 
        AND (expires_at IS NULL OR expires_at > now())
    );

-- Insert a default token
INSERT INTO tokens (token, is_active)
VALUES ('remyremy', true);