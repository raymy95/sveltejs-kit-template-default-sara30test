import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
    process.env.VITE_SUPABASE_URL,
    process.env.VITE_SUPABASE_ANON_KEY
);

export async function handler(event) {
    // Add CORS headers
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
    };

    // Handle OPTIONS request for CORS
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 204,
            headers
        };
    }

    try {
        const token = event.queryStringParameters?.token;

        if (!token || token === 'null') {
            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({ valid: false })
            };
        }

        const { data, error } = await supabase
            .from('specialtoken')
            .select('id')
            .eq('token', token)
            .eq('is_active', true)
            .is('expires_at', null)
            .maybeSingle();

        if (error) {
            console.error('Token validation error:', error);
            return {
                statusCode: 200,
                headers,
                body: JSON.stringify({ valid: false })
            };
        }

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ valid: !!data })
        };
    } catch (e) {
        console.error('Token validation error:', e);
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ valid: false })
        };
    }
}