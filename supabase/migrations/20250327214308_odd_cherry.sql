/*
  # Add questions to cards table

  1. Changes
    - Add question and answers columns to cards table
      - `question` (text) - The question for the card
      - `correct_answer` (text) - The correct answer
      - `wrong_answer_1` (text) - First wrong answer
      - `wrong_answer_2` (text) - Second wrong answer
      - `wrong_answer_3` (text) - Third wrong answer

  2. Security
    - No changes to RLS policies needed as these are part of the cards table
*/

ALTER TABLE cards 
ADD COLUMN IF NOT EXISTS question text,
ADD COLUMN IF NOT EXISTS correct_answer text,
ADD COLUMN IF NOT EXISTS wrong_answer_1 text,
ADD COLUMN IF NOT EXISTS wrong_answer_2 text,
ADD COLUMN IF NOT EXISTS wrong_answer_3 text;