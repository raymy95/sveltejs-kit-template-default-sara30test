/*
  # Add questions and answers to cards

  1. Changes
    - Update existing cards with questions and answers
    - Each card will have:
      - A question related to its theme
      - One correct answer
      - Three wrong answers
*/

-- Update Dragon's Breath card
UPDATE cards
SET 
  question = 'What color is typically associated with a dragon''s fire breath?',
  correct_answer = 'Orange-red',
  wrong_answer_1 = 'Blue-green',
  wrong_answer_2 = 'Purple',
  wrong_answer_3 = 'Rainbow'
WHERE name = 'Dragon''s Breath';

-- Update Mystic Wizard card
UPDATE cards
SET 
  question = 'What is a wizard''s primary source of power?',
  correct_answer = 'Magic knowledge and study',
  wrong_answer_1 = 'Physical strength',
  wrong_answer_2 = 'Divine blessing',
  wrong_answer_3 = 'Natural talent alone'
WHERE name = 'Mystic Wizard';

-- Update Forest Spirit card
UPDATE cards
SET 
  question = 'Which season do forest spirits prefer?',
  correct_answer = 'Spring',
  wrong_answer_1 = 'Winter',
  wrong_answer_2 = 'Summer',
  wrong_answer_3 = 'Autumn'
WHERE name = 'Forest Spirit';

-- Update Ancient Golem card
UPDATE cards
SET 
  question = 'What material are golems typically made from?',
  correct_answer = 'Clay or stone',
  wrong_answer_1 = 'Pure gold',
  wrong_answer_2 = 'Wood',
  wrong_answer_3 = 'Glass'
WHERE name = 'Ancient Golem';

-- Update Shadow Assassin card
UPDATE cards
SET 
  question = 'When do shadow assassins prefer to strike?',
  correct_answer = 'At night',
  wrong_answer_1 = 'At noon',
  wrong_answer_2 = 'During sunrise',
  wrong_answer_3 = 'During a festival'
WHERE name = 'Shadow Assassin';

-- Update Healing Fairy card
UPDATE cards
SET 
  question = 'What color is associated with healing magic?',
  correct_answer = 'Green',
  wrong_answer_1 = 'Red',
  wrong_answer_2 = 'Black',
  wrong_answer_3 = 'Brown'
WHERE name = 'Healing Fairy';

-- Update Phoenix Rising card
UPDATE cards
SET 
  question = 'How does a phoenix regenerate?',
  correct_answer = 'From its own ashes',
  wrong_answer_1 = 'By eating special herbs',
  wrong_answer_2 = 'Through meditation',
  wrong_answer_3 = 'By absorbing moonlight'
WHERE name = 'Phoenix Rising';

-- Update Storm Giant card
UPDATE cards
SET 
  question = 'What weather phenomenon do storm giants control?',
  correct_answer = 'Thunder and lightning',
  wrong_answer_1 = 'Gentle rain',
  wrong_answer_2 = 'Snow',
  wrong_answer_3 = 'Rainbows'
WHERE name = 'Storm Giant';

-- Update Forest Elf card
UPDATE cards
SET 
  question = 'What weapon do forest elves typically use?',
  correct_answer = 'Bow and arrow',
  wrong_answer_1 = 'Battle axe',
  wrong_answer_2 = 'War hammer',
  wrong_answer_3 = 'Morning star'
WHERE name = 'Forest Elf';

-- Update Crystal Dragon card
UPDATE cards
SET 
  question = 'What special ability do crystal dragons have?',
  correct_answer = 'Light refraction',
  wrong_answer_1 = 'Fire breathing',
  wrong_answer_2 = 'Ice creation',
  wrong_answer_3 = 'Earth moving'
WHERE name = 'Crystal Dragon';

-- Update remaining cards with default questions
UPDATE cards
SET 
  question = 'What type of creature is this?',
  correct_answer = name,
  wrong_answer_1 = 'Dragon',
  wrong_answer_2 = 'Wizard',
  wrong_answer_3 = 'Spirit'
WHERE question IS NULL;