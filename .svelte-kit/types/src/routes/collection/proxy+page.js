// @ts-nocheck
import { redirect } from '@sveltejs/kit';
import { isValidToken } from '$lib/token';

export const prerender = false;

/** @param {Parameters<import('./$types').PageLoad>[0]} event */
export async function load({ url }) {
    const token = url.searchParams.get('token');
    
    // Redirect to error page if token is missing or invalid
    if (!token || token === 'null') {
        throw redirect(303, '/error');
    }

    const isValid = await isValidToken(token);
    if (!isValid) {
        throw redirect(303, '/error');
    }

    return {
        token
    };
}