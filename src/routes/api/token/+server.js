import { json } from '@sveltejs/kit';
import { supabase } from '$lib/supabase';

export const prerender = false;

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