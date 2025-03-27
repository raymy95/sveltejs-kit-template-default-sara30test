// @ts-nocheck
import { error } from '@sveltejs/kit';

export const prerender = false;

/** @param {Parameters<import('./$types').PageLoad>[0]} event */
export function load({ params }) {
    return {
        cardId: params.slug
    };
}