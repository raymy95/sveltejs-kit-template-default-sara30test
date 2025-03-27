/*
  # Update score function to only increment on correct answers

  1. Changes
    - Modify the update_card_score function to only add points for correct answers
    - Remove score increment for incorrect answers
    - Keep answered_correctly flag functionality
*/

-- Drop the existing function
DROP FUNCTION IF EXISTS update_card_score(uuid, uuid, boolean);
DROP FUNCTION IF EXISTS update_card_score(uuid, uuid, boolean, int);

-- Recreate the function with correct logic
CREATE OR REPLACE FUNCTION update_card_score(
    user_id_param uuid,
    card_id_param uuid,
    is_correct boolean
)
RETURNS void AS $$
BEGIN
    UPDATE user_cards
    SET 
        score = CASE 
            WHEN is_correct THEN score + 3  -- Only add points for correct answers
            ELSE score                      -- Keep current score for incorrect answers
        END,
        answered_correctly = CASE 
            WHEN is_correct THEN true       -- Mark as answered correctly if correct
            ELSE answered_correctly         -- Keep previous value if incorrect
        END
    WHERE user_id = user_id_param 
    AND card_id = card_id_param;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;