import { error } from '@sveltejs/kit';

export const prerender = false;

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
    return {
        cardId: params.slug
    };
}