/*
  # Add tracking for correct answers

  1. Changes
    - Add answered_correctly column to user_cards table
    - Update score function to also mark questions as answered correctly
    
  2. Security
    - Maintain existing RLS policies
*/

-- Add column to track if question was answered correctly
ALTER TABLE user_cards 
ADD COLUMN IF NOT EXISTS answered_correctly boolean DEFAULT false;

-- Update the score function to also mark correct answers
CREATE OR REPLACE FUNCTION update_card_score(
    user_id_param uuid,
    card_id_param uuid,
    is_correct boolean,
    new_score int
)
RETURNS void AS $$
BEGIN
    UPDATE user_cards
    SET 
        score = score + CASE 
            WHEN is_correct THEN new_score  
        END,
        answered_correctly = CASE 
            WHEN is_correct THEN true  -- Mark as answered correctly if correct
            ELSE answered_correctly    -- Keep previous value if incorrect
        END
    WHERE user_id = user_id_param 
    AND card_id = card_id_param;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;