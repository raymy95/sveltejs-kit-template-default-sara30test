import { json } from '@sveltejs/kit';

// Generate a random password that changes daily
function generatePassword() {
    // const date = new Date().toISOString().split('T')[0];
    // const seed = date + 'your-secret-salt';
    // let hash = 0;
    // for (let i = 0; i < seed.length; i++) {
    //     const char = seed.charCodeAt(i);
    //     hash = ((hash << 5) - hash) + char;
    //     hash = hash & hash;
    // }
    // return Math.abs(hash).toString(16).substring(0, 6);
    return "remyremy";
}

export async function POST({ request }) {
    const { password } = await request.json();
    const isValid = password === generatePassword();
    
    return json({ isValid });
}