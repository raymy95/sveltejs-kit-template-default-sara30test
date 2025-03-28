// @ts-nocheck
// This ensures client-side routing works properly
export const ssr = false;

// Don't prerender any pages since they all depend on dynamic data
export const prerender = false;

/** @param {Parameters<import('./$types').LayoutLoad>[0]} event */
export async function load({ url }) {
    const token = url.searchParams.get('token');
    
    // Allow access to error page without token
    if (url.pathname === '/error') {
        return {};
    }

    // Redirect to error page if no token or token is 'null'
    if (!token || token === 'null') {
        return {
            error: 'No token provided',
            redirect: '/error'
        };
    }

    return {
        token
    };
}