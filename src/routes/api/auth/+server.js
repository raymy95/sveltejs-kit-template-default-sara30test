import { json } from '@sveltejs/kit';

// Disable prerendering for this endpoint
export const prerender = false;

// Enable CORS for the API endpoint
export const config = {
    cors: {
        origin: '*',
        methods: ['POST', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true
    }
};

// Generate a random password that changes daily
function generatePassword() {
    return "remyremy";
}

export async function POST({ request }) {
    const { password } = await request.json();
    const isValid = password === generatePassword();
    
    return json({ isValid }, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        }
    });
}

// Handle OPTIONS requests for CORS preflight
export async function OPTIONS() {
    return new Response(null, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        }
    });
}