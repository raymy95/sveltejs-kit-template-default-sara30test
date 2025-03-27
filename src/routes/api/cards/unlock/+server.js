import { json } from '@sveltejs/kit';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import cardsData from '$lib/data/cards.json';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const usersPath = join(__dirname, '../../../../lib/data/users.json');

export async function POST({ request }) {
    const { username, cardId, password } = await request.json();
    
    try {
        // Find the card and check the password
        const card = cardsData.cards.find(c => c.id === cardId);
        if (!card || card.unlockPassword !== password) {
            return json({ success: false });
        }

        // Load current users data
        let usersData = JSON.parse(fs.readFileSync(usersPath, 'utf-8'));
        
        // Initialize user data if it doesn't exist
        if (!usersData.users[username]) {
            usersData.users[username] = { unlockedCards: [] };
        }

        // Add the card to user's collection if not already present
        if (!usersData.users[username].unlockedCards.includes(cardId)) {
            usersData.users[username].unlockedCards.push(cardId);
        }

        // Save updated data
        fs.writeFileSync(usersPath, JSON.stringify(usersData, null, 2));

        return json({ success: true });
    } catch (error) {
        console.error('Error unlocking card:', error);
        return json({ success: false });
    }
}