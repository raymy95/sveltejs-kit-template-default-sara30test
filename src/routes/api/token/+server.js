import { json } from '@sveltejs/kit';
import { supabase } from '$lib/supabase';

export const prerender = false;

// Handle GET requests
export async function GET({ url }) {
    const token = url.searchParams.get('token');

    if (!token || token === 'null') {
        return json({ valid: false });
    }

    try {
        const { data, error } = await supabase
            .from('specialtoken')
            .select('id')
            .eq('token', token)
            .eq('is_active', true)
            .is('expires_at', null)
            .maybeSingle();

        if (error) {
            console.error('Token validation error:', error);
            return json({ valid: false });
        }

        return json({ valid: !!data });
    } catch (e) {
        console.error('Token validation error:', e);
        return json({ valid: false });
    }
}

// Handle POST requests
export async function POST({ request }) {
    const { token } = await request.json();

    if (!token || token === 'null') {
        return json({ valid: false });
    }

    try {
        const { data, error } = await supabase
            .from('specialtoken')
            .select('id')
            .eq('token', token)
            .eq('is_active', true)
            .is('expires_at', null)
            .maybeSingle();

        if (error) {
            console.error('Token validation error:', error);
            return json({ valid: false });
        }

        return json({ valid: !!data });
    } catch (e) {
        console.error('Token validation error:', e);
        return json({ valid: false });
    }
}

// Handle OPTIONS requests for CORS
export async function OPTIONS() {
    return new Response(null, {
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        }
    });
}