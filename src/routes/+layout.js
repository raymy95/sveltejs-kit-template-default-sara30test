import { redirect } from '@sveltejs/kit';
import { isValidToken } from '$lib/token';

export const ssr = false;
export const prerender = false;

/** @type {import('./$types').LayoutLoad} */
export function load({ url }) {
    const token = url.searchParams.get('token');
    
    // Allow access to error page without token
    if (url.pathname === '/error') {
        return {};
    }

    if (!token || !isValidToken(token)) {
        throw redirect(303, '/error');
    }

    return {
        token
    };
}