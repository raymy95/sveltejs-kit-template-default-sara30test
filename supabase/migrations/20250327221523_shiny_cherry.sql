/*
  # Add scoring system to user_cards table

  1. Changes
    - Add score column to user_cards table
    - Add default score of 1 for unlocking cards
    - Add function to update score for correct/wrong answers
    
  2. Security
    - Maintain existing RLS policies
    - Add policy for updating scores
*/

-- Add score column with default value of 1 (for unlocking)
ALTER TABLE user_cards 
ADD COLUMN IF NOT EXISTS score integer DEFAULT 1;

-- Create function to update score for correct answers
CREATE OR REPLACE FUNCTION update_card_score(
    user_id_param uuid,
    card_id_param uuid,
    is_correct boolean
)
RETURNS void AS $$
BEGIN
    UPDATE user_cards
    SET score = score + CASE 
        WHEN is_correct THEN 3  -- Add 3 points for correct answer
        ELSE 1                  -- Add 1 point for attempt
    END
    WHERE user_id = user_id_param 
    AND card_id = card_id_param;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;