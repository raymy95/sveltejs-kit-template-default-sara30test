import { images } from '../../images.js';

// Disable prerendering for this dynamic route
export const prerender = false;

// @ts-ignore
export function load({ params }) {
    return {
        cardId: params.slug,
    };
}