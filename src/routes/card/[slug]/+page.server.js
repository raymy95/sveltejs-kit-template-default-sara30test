import { error } from '@sveltejs/kit';

// @ts-ignore
export function load({ params }) {
    return {
        cardId: params.slug,
    };
}