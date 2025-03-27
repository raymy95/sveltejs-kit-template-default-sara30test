/*
  # Fix score update function

  1. Changes
    - Update the score update function to match frontend usage
    - Remove new_score parameter and use fixed values
    - Ensure answered_correctly is properly set
*/

-- Drop the existing function
DROP FUNCTION IF EXISTS update_card_score(uuid, uuid, boolean, int);

-- Recreate the function with correct parameters
CREATE OR REPLACE FUNCTION update_card_score(
    user_id_param uuid,
    card_id_param uuid,
    is_correct boolean
)
RETURNS void AS $$
BEGIN
    UPDATE user_cards
    SET 
        score = score + CASE 
            WHEN is_correct THEN 3  -- Add 3 points for correct answer
            ELSE 1                  -- Add 1 point for incorrect answer
        END,
        answered_correctly = CASE 
            WHEN is_correct THEN true  -- Mark as answered correctly if correct
            ELSE answered_correctly    -- Keep previous value if incorrect
        END
    WHERE user_id = user_id_param 
    AND card_id = card_id_param;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;