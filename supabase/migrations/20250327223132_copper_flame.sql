/*
  # Update score calculation based on wrong answers

  1. Changes
    - Add wrong_answers column to track number of attempts
    - Modify update_card_score function to calculate score as (5 - wrong_answers)
    - Only update score on correct answer
*/

-- Add column to track wrong answers
ALTER TABLE user_cards 
ADD COLUMN IF NOT EXISTS wrong_answers integer DEFAULT 0;

-- Drop existing functions to avoid conflicts
DROP FUNCTION IF EXISTS update_card_score(uuid, uuid, boolean);
DROP FUNCTION IF EXISTS update_card_score(uuid, uuid, boolean, int);

-- Create new function with updated score calculation
CREATE OR REPLACE FUNCTION update_card_score(
    user_id_param uuid,
    card_id_param uuid,
    is_correct boolean
)
RETURNS void AS $$
BEGIN
    -- If answer is incorrect, increment wrong_answers counter
    IF NOT is_correct THEN
        UPDATE user_cards
        SET wrong_answers = COALESCE(wrong_answers, 0) + 1
        WHERE user_id = user_id_param 
        AND card_id = card_id_param;
    END IF;

    -- If answer is correct, update score and mark as answered correctly
    IF is_correct THEN
        UPDATE user_cards
        SET 
            score = score + (5 - LEAST(COALESCE(wrong_answers, 0), 4)), -- Cap penalty at 4 wrong answers
            answered_correctly = true
        WHERE user_id = user_id_param 
        AND card_id = card_id_param;
    END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;