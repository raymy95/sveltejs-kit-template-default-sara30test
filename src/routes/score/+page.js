// Disable prerendering since we need dynamic data
export const prerender = false;

/** @type {import('./$types').PageLoad} */
export async function load({ parent }) {
    // We need to wait for the parent layout data
    await parent();
    return {};
}