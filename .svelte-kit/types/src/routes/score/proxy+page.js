// @ts-nocheck
// Disable prerendering since we need dynamic data
export const prerender = false;

/** @param {Parameters<import('./$types').PageLoad>[0]} event */
export async function load({ parent }) {
    // We need to wait for the parent layout data
    await parent();
    return {};
}