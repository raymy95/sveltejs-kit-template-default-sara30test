/*
  # Initial schema for card collection game

  1. New Tables
    - `users`
      - `id` (uuid, primary key)
      - `username` (text, unique)
      - `created_at` (timestamp)
    - `cards`
      - `id` (uuid, primary key)
      - `name` (text)
      - `image_url` (text)
      - `description` (text)
      - `rarity` (text)
      - `unlock_password` (text)
      - `created_at` (timestamp)
    - `user_cards`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references users)
      - `card_id` (uuid, references cards)
      - `unlocked_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create users table
CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  username text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create cards table
CREATE TABLE cards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  image_url text NOT NULL,
  description text NOT NULL,
  rarity text NOT NULL,
  unlock_password text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create user_cards table for tracking unlocked cards
CREATE TABLE user_cards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) NOT NULL,
  card_id uuid REFERENCES cards(id) NOT NULL,
  unlocked_at timestamptz DEFAULT now(),
  UNIQUE(user_id, card_id)
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_cards ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can read their own data"
  ON users
  FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Anyone can read cards"
  ON cards
  FOR SELECT
  TO PUBLIC
  USING (true);

CREATE POLICY "Users can read their unlocked cards"
  ON user_cards
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can unlock cards"
  ON user_cards
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);