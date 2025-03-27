import { json } from '@sveltejs/kit';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const usersPath = join(__dirname, '../../../lib/data/users.json');

export async function GET({ url }) {
    const username = url.searchParams.get('username');
    
    try {
        const usersData = JSON.parse(fs.readFileSync(usersPath, 'utf-8'));
        const userCards = usersData.users[username]?.unlockedCards || [];
        
        return json({ unlockedCards: userCards });
    } catch (error) {
        return json({ unlockedCards: [] });
    }
}