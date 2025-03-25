// This ensures client-side routing works properly
export const ssr = false;
export const prerender = true;

// Configure hooks for handling API routes
export const config = {
  kit: {
    // Handle API routes through Netlify functions
    paths: {
      base: ''
    }
  }
};