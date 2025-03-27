// @ts-nocheck
import { redirect } from '@sveltejs/kit';
import { isValidToken } from '$lib/token';

export const prerender = false;

/** @param {Parameters<import('./$types').PageLoad>[0]} event */
export function load({ url }) {
    const token = url.searchParams.get('token');
    
    if (!token || !isValidToken(token)) {
        throw redirect(303, '/error');
    }

    return {
        token
    };
}