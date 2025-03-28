export const VALID_TOKEN = 'remyremy';

export async function isValidToken(token) {
    if (!token || token === 'null') return false;

    try {
        const response = await fetch(`/.netlify/functions/token?token=${encodeURIComponent(token)}`);
        const data = await response.json();
        return data.valid;
    } catch (e) {
        console.error('Token validation error:', e);
        return false;
    }
}